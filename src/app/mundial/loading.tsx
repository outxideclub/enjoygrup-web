export default function MundialLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative flex h-[60vh] items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-background" />
        <div className="relative z-10 flex animate-pulse flex-col items-center gap-6">
          <div className="h-5 w-40 rounded bg-emerald-400/10" />
          <div className="h-12 w-80 rounded-lg bg-white/5" />
          <div className="h-4 w-72 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
