export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-48 rounded-lg bg-white/5" />
        <div className="h-4 w-32 rounded bg-white/5" />
      </div>
    </div>
  );
}
