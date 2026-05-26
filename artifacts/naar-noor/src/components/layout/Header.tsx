import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C65A1E] to-[#8B4513] flex items-center justify-center">
            <span className="font-forum text-xl font-bold text-white">2N</span>
          </div>
          <span className="font-forum text-xl text-white tracking-tight group-hover:text-[#C65A1E] transition-colors duration-300">
            Naar & Noor
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">About</a>
          <a href="#menu" className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">Menu</a>
          <a href="#chefs" className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">Chefs</a>
          <a href="#blog" className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">Blog</a>
          <a href="#locations" className="text-sm text-neutral-300 hover:text-white transition-colors duration-200">Locations</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#reserve"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#C65A1E] rounded-xl hover:bg-[#a84915] hover:shadow-[0_0_20px_rgba(198,90,30,0.4)] transition-all duration-300"
          >
            Book a Table
          </a>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 hover:text-[#C65A1E] transition-colors"
          >
            <iconify-icon
              icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
              width="28"
              height="28"
            ></iconify-icon>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/5 animate-fadeIn">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <a href="#about" onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-[#C65A1E] transition-colors duration-200 py-2">About</a>
            <a href="#menu" onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-[#C65A1E] transition-colors duration-200 py-2">Menu</a>
            <a href="#chefs" onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-[#C65A1E] transition-colors duration-200 py-2">Chefs</a>
            <a href="#blog" onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-[#C65A1E] transition-colors duration-200 py-2">Blog</a>
            <a href="#locations" onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-[#C65A1E] transition-colors duration-200 py-2">Locations</a>
            <a
              href="#reserve"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-[#C65A1E] rounded-xl hover:bg-[#a84915] transition-all duration-300 mt-2"
            >
              Book a Table
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
