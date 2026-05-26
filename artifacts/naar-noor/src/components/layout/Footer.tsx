export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-20 pb-8 px-6 border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C65A1E] to-[#8B4513] flex items-center justify-center">
                <span className="font-forum text-2xl font-bold text-white">2N</span>
              </div>
              <span className="font-forum text-2xl text-white tracking-tight">Naar & Noor</span>
            </div>
            <p className="text-sm text-neutral-500 font-light leading-relaxed pr-4">
              Bold flavors. Warm moments. Unforgettable experiences crafted by fire.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-neutral-500 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#reserve" className="hover:text-[#C65A1E] transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-500 font-light">
              <li>+44 (0) 1481 123456</li>
              <li>hello@naarnooor.com</li>
              <li>Town Centre, Guernsey</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/20 transition-all">
                <iconify-icon icon="solar:camera-linear" width="20"></iconify-icon>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/20 transition-all">
                <iconify-icon icon="solar:letter-linear" width="20"></iconify-icon>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/20 transition-all">
                <iconify-icon icon="solar:globus-linear" width="20"></iconify-icon>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600 font-light">© {currentYear} Naar & Noor. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-neutral-600 font-light">
            <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
