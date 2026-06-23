import "server-only";

/**
 * Minimal GitHub Contents API helper used by the admin panel to persist data
 * file changes as commits. On Vercel the filesystem is read-only, so instead of
 * writing to disk we commit the file to the repo; Vercel then auto-redeploys and
 * the change goes live.
 *
 * Required env vars (set these in Vercel → Project → Settings → Environment):
 *   GITHUB_TOKEN  — fine-grained PAT with "Contents: Read and write" on the repo
 *   GITHUB_REPO   — "owner/name", e.g. "outxideclub/enjoygrup-web"
 *   GITHUB_BRANCH — target branch (defaults to "main")
 */

const API = "https://api.github.com";

interface GitHubConfig {
  token: string;
  repo: string;
  branch: string;
}

function getConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";
  if (!token || !repo) return null;
  return { token, repo, branch };
}

export function isGitHubConfigured(): boolean {
  return getConfig() !== null;
}

function encodePath(repoPath: string): string {
  // Keep slashes as path separators, encode each segment.
  return repoPath
    .split("/")
    .map((s) => encodeURIComponent(s))
    .join("/");
}

async function ghFetch(
  cfg: GitHubConfig,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "grupo-enjoy-admin",
      ...(init?.headers ?? {}),
    },
  });
}

async function getCurrentSha(
  cfg: GitHubConfig,
  repoPath: string,
): Promise<string | null> {
  const res = await ghFetch(
    cfg,
    `/repos/${cfg.repo}/contents/${encodePath(repoPath)}?ref=${encodeURIComponent(cfg.branch)}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub getSha ${repoPath} failed: ${res.status}`);
  }
  const json = (await res.json()) as { sha?: string };
  return json.sha ?? null;
}

/**
 * Create or update a file in the repo via a single commit.
 * `content` may be a UTF-8 string (JSON) or a binary Buffer (uploads).
 */
export async function commitFile(
  repoPath: string,
  content: Buffer | string,
  message: string,
): Promise<void> {
  const cfg = getConfig();
  if (!cfg) throw new Error("GitHub no está configurado (faltan GITHUB_TOKEN/GITHUB_REPO)");

  const base64 = Buffer.isBuffer(content)
    ? content.toString("base64")
    : Buffer.from(content, "utf-8").toString("base64");

  // Retry once on a 409 (sha race with a concurrent edit).
  for (let attempt = 0; attempt < 2; attempt++) {
    const sha = await getCurrentSha(cfg, repoPath);
    const res = await ghFetch(cfg, `/repos/${cfg.repo}/contents/${encodePath(repoPath)}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: base64,
        branch: cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (res.ok) return;
    if (res.status === 409 && attempt === 0) continue;
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub commit ${repoPath} failed: ${res.status} ${detail}`);
  }
}
