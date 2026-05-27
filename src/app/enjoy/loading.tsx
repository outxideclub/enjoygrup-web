export default function EnjoyLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 to-background" />
        <div className="relative z-10 flex flex-col items-center gap-6 animate-pulse">
          <div className="h-48 w-64 rounded-lg bg-white/5" />
          <div className="h-5 w-40 rounded bg-enjoy/10" />
          <div className="h-4 w-72 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
