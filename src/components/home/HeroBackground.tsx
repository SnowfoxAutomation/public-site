export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl animate-hero-pulse" />

        <div className="absolute -right-48 top-40 h-96 w-96 rounded-full bg-accent/8 blur-3xl animate-hero-float" />

        <div className="absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-brand-soft/60 blur-3xl animate-hero-float-delayed" />

        <div className="absolute inset-0 opacity-[0.045] bg-grid-pattern" />
      </div>
    </>
  );
}