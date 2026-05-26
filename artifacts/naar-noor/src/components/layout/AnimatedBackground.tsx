export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-50 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f0a] to-[#0a0a0a] animate-gradient"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0a0a0a] via-[#1a0a0f] to-[#0a0a0a] animate-gradient-slow"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C65A1E] rounded-full filter blur-[32px] opacity-10 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8B4513] rounded-full filter blur-[32px] opacity-10 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#C65A1E] rounded-full filter blur-[32px] opacity-10 animate-float-slow"></div>
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>
    </div>
  );
}
