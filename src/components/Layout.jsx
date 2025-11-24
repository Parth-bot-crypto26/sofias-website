import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Instagram, Facebook } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const ORDER_LINK = "https://www.google.com/viewer/chooseprovider?mid=/g/11sh1ghw6f&g2lbs=AO8LyOJS_ARPS1tP537wJKiB7d88CK0ZndHDlvOUzivyi0qjSWFkrd5Fsceap9bNuMYRM4pw35iVdG5fLnxRosSjHuq-SbDkztdFCGlIr5W6O_RF6KR52DE%3D&hl=en-IN&gl=in&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=dNMjacDpGoCSseMPp_uUwQo&ei=dNMjacDpGoCSseMPp_uUwQo&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp";

const NewsTicker = ({ onTickerClick }) => (
  <div onClick={onTickerClick} className="bg-stone-900 text-white text-xs font-bold tracking-widest py-3 overflow-hidden relative z-50 cursor-pointer">
    <div className="whitespace-nowrap animate-marquee flex gap-12">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-3">
          <Star size={10} className="fill-red-600 text-red-600" /> 
          EXCLUSIVE OFFER: 20% OFF ALL ORDERS OVER $50 
          <span className="text-stone-600">|</span> 
          HAPPY HOUR: 4PM - 6PM DAILY 
          <span className="text-stone-600">|</span> 
          CLICK HERE TO JOIN OUR MAILING LIST
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 40s linear infinite; }
      .animate-marquee-medium { animation: marquee 25s linear infinite; }
    `}</style>
  </div>
);

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleTickerClick = () => scrollToSection('newsletter');

  // Nav Text Color Logic: White on transparent Hero (Home), Dark elsewhere
  const isHome = location.pathname === '/';
  const navTextColor = (isHome && !isScrolled) ? 'text-white' : 'text-stone-900';
  const navHoverColor = (isHome && !isScrolled) ? 'hover:text-red-300' : 'hover:text-red-700';
  const navLogoColor = (isHome && !isScrolled) ? 'text-white' : 'text-stone-900';

  return (
    <div className="font-sans bg-white text-stone-900 selection:bg-red-200 selection:text-red-900 overflow-x-hidden min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 w-full z-50">
        <NewsTicker onTickerClick={handleTickerClick} />
        
        <nav className={`w-full transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/"
              className={`text-2xl font-serif font-bold tracking-tighter cursor-pointer ${navLogoColor}`}
            >
              SOFIA'S <span className="text-red-700">ANTOJITOS</span>
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest ${navTextColor}`}>
              <Link to="/" className={`${navHoverColor} transition-colors`}>Home</Link>
              <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className={`${navHoverColor} transition-colors`}>Order Online</a>
              <Link to="/menu" className={`${navHoverColor} transition-colors`}>Menu</Link>
              <button onClick={() => scrollToSection('gallery')} className={`${navHoverColor} transition-colors`}>Gallery</button>
              <Link to="/contact" className={`${navHoverColor} transition-colors`}>Contact</Link>
            </div>

            {/* Mobile Toggle */}
            <button className={`md:hidden z-50 ${navTextColor}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col space-y-8 text-center text-xl font-serif uppercase tracking-widest text-stone-900">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="text-red-700">Order Online</a>
          <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
          <button onClick={() => { scrollToSection('gallery'); setMobileMenuOpen(false); }}>Gallery</button>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Newsletter - Red background */}
      <section id="newsletter" className="py-20 bg-red-800 text-white text-center px-6">
        <div className="container mx-auto max-w-2xl">
          <RevealOnScroll>
            <h3 className="text-3xl md:text-4xl font-serif mb-4">Don't Miss Out</h3>
            <p className="mb-8 text-red-100">Join our mailing list for exclusive offers, updates on new menu items, and birthday treats.</p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 bg-white text-stone-900 focus:outline-none rounded-none placeholder-stone-400"
              />
              <button className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-black transition-colors">
                Subscribe
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 text-center border-t border-stone-200">
        <div className="flex justify-center space-x-6 mb-8 text-stone-400">
          <Instagram className="hover:text-red-700 cursor-pointer transition-colors" />
          <Facebook className="hover:text-red-700 cursor-pointer transition-colors" />
        </div>
        <p className="text-stone-400 text-sm tracking-widest uppercase">
          &copy; 2024 Sofia's Antojitos. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;

