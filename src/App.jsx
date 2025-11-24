import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Phone, Instagram, Facebook, ChevronRight, Star, Clock, ArrowRight } from 'lucide-react';

/**
 * SOFIA'S ANTOJITOS - LIGHT THEME (Le Thai Style)
 * - Theme: White Background, Dark Text, Deep Red Accents
 * - Font: Serif Headings, Sans-serif Body
 * - Menu: Separate "Page" view
 */

// --- Assets & Data ---
const ASSETS = {
  // We use a lighter/brighter overlay for the hero to match the light theme feel
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2880&auto=format&fit=crop",
  aboutBg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000",
    "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=1000",
    "https://images.unsplash.com/photo-1568106690101-fd6822e876f6?q=80&w=1000",
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000",
  ]
};

const FULL_MENU = {
  Appetizers: [
    { name: "Elote en Vaso", desc: "Corn in a cup, mayo, cotija cheese, chili powder, lime.", price: "$6" },
    { name: "Guacamole & Chips", desc: "Fresh smashed avocados, pico de gallo, house-made totopos.", price: "$10" },
    { name: "Queso Fundido", desc: "Melted chihuahua cheese, chorizo, flour tortillas.", price: "$12" },
    { name: "Nachos Supreme", desc: "Beans, cheese dip, jalapeños, cream, choice of meat.", price: "$13" },
  ],
  Tacos: [
    { name: "Birria Tacos", desc: "Slow-cooked beef, melted cheese, consommé dip (3 pcs).", price: "$14" },
    { name: "Carne Asada", desc: "Grilled steak, onions, cilantro, salsa verde.", price: "$4" },
    { name: "Al Pastor", desc: "Marinated pork, pineapple, onion, cilantro.", price: "$4" },
    { name: "Pollo Asado", desc: "Grilled chicken, avocado salsa.", price: "$4" },
  ],
  Especialidades: [
    { name: "Quesabirria", desc: "Large cheesy folded tortilla with spicy beef stew.", price: "$15" },
    { name: "Sopes", desc: "Thick corn tortilla, beans, lettuce, cheese, cream, choice of meat.", price: "$13" },
    { name: "Gorditas", desc: "Stuffed corn pastry, chicharron or beans & cheese.", price: "$5" },
    { name: "Torta Cubana", desc: "Telera bread, milanesa, ham, cheese, avocado, beans.", price: "$16" },
  ],
  Drinks: [
    { name: "Aguas Frescas", desc: "Horchata, Jamaica, Tamarindo (Large).", price: "$5" },
    { name: "Mexican Coke", desc: "Glass bottle.", price: "$3.50" },
  ],
  Desserts: [
    { name: "Mangonada", desc: "Mango sorbet, chamoy, tajin, fresh mango chunks.", price: "$9" },
    { name: "Churro Sundae", desc: "Vanilla ice cream, fresh churros, caramel drizzle.", price: "$10" },
  ]
};

const REVIEWS = [
  { name: "Maria G.", text: "Best antojitos in Colorado Springs! Just like home.", rating: 5 },
  { name: "David L.", text: "The vibes are immaculate and the food is even better.", rating: 5 },
  { name: "Sarah J.", text: "A hidden gem. street food to fine dining atmosphere.", rating: 5 },
  { name: "Carlos M.", text: "Fast service and huge portions. The Mangonada changed my life.", rating: 5 },
  { name: "Jessica P.", text: "Perfect for date night or a quick lunch.", rating: 5 },
];

const ORDER_LINK = "https://www.google.com/viewer/chooseprovider?mid=/g/11sh1ghw6f&g2lbs=AO8LyOJS_ARPS1tP537wJKiB7d88CK0ZndHDlvOUzivyi0qjSWFkrd5Fsceap9bNuMYRM4pw35iVdG5fLnxRosSjHuq-SbDkztdFCGlIr5W6O_RF6KR52DE%3D&hl=en-IN&gl=in&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=dNMjacDpGoCSseMPp_uUwQo&ei=dNMjacDpGoCSseMPp_uUwQo&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp";

// --- Helper Components ---

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }) => (
  <RevealOnScroll className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <span className="text-red-700 uppercase tracking-[0.2em] text-xs font-bold mb-3 block">{subtitle}</span>
    <h3 className="text-4xl md:text-5xl font-serif text-stone-900">{title}</h3>
  </RevealOnScroll>
);

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
      /* Medium speed for reviews - 25s is faster than 40s but smooth */
      .animate-marquee-medium { animation: marquee 25s linear infinite; }
    `}</style>
  </div>
);

// --- VIEWS ---

const HomeView = ({ setView }) => (
  <>
    {/* Hero - Light Theme style (Bright overlay) */}
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
      />
      {/* Dark overlay with white text for contrast */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <RevealOnScroll>
          <p className="text-white text-lg tracking-[0.3em] uppercase mb-4 font-medium">A Colorado Springs Original</p>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 drop-shadow-lg">
            Sofia's <br/><span className="text-red-500">Antojitos</span>
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={400}>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="bg-red-700 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-red-800 transition-all w-full md:w-auto shadow-xl">
              Order Online
            </a>
            <button onClick={() => setView('menu')} className="bg-white text-stone-900 px-10 py-4 text-sm tracking-widest uppercase hover:bg-stone-200 transition-all w-full md:w-auto shadow-xl">
              View Menu
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    {/* Intro - White Background */}
    <section className="py-24 bg-white text-center px-6">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle title="Authentic Flavors" subtitle="Welcome" />
        <RevealOnScroll delay={200}>
          <p className="text-stone-600 text-lg leading-relaxed mb-12 font-light">
            Established in the heart of Colorado Springs, Sofia's Antojitos brings the vibrant street food culture of Mexico to a modern, elegant dining experience. From our slow-simmered Birria to our handcrafted refreshing drinks, every detail is a tribute to tradition.
          </p>
          <button onClick={() => setView('menu')} className="text-red-700 uppercase tracking-widest text-sm font-bold hover:text-stone-900 transition-colors flex items-center justify-center gap-2 mx-auto">
            Discover Our Menu <ChevronRight size={16} />
          </button>
        </RevealOnScroll>
      </div>
    </section>

    {/* Specialties Split Section */}
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-96 md:h-auto overflow-hidden relative group">
         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${ASSETS.aboutBg})` }} />
      </div>
      <div className="bg-stone-50 p-12 md:p-24 flex flex-col justify-center items-start">
        <SectionTitle title="Our Specialties" subtitle="Taste the Difference" centered={false} />
        
        <div className="space-y-8 w-full mb-12">
          {[
            { n: "Birria Tacos", p: "$14" }, 
            { n: "Mangonada", p: "$9" }, 
            { n: "Quesabirria", p: "$15" }
          ].map((item, i) => (
            <div key={i} className="border-b border-stone-300 pb-4 flex justify-between items-center group cursor-pointer">
              <span className="text-xl font-serif text-stone-900 group-hover:text-red-700 transition-colors">{item.n}</span>
              <span className="text-red-700 font-bold">{item.p}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setView('menu')} className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-colors">
          See Full Menu
        </button>
      </div>
    </section>

    {/* Gallery Strip */}
    <section id="gallery" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <SectionTitle title="Gallery" subtitle="A Visual Taste of Mexico" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ASSETS.gallery.map((img, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
               <div className="aspect-square overflow-hidden relative group cursor-pointer">
                 <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Instagram className="text-white" size={32} />
                 </div>
               </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Review Wall - Updated with Grey Cards and Medium Speed */}
    <section id="reviews" className="bg-white py-24 border-t border-stone-200 overflow-hidden relative">
      <div className="text-center mb-16">
        <h4 className="text-red-700 uppercase tracking-widest text-sm font-bold mb-4">Guest Love</h4>
        <div className="flex justify-center text-stone-900 gap-1">
           {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
        </div>
      </div>

      <div className="flex animate-marquee-medium hover:[animation-play-state:paused] items-center">
        {[...REVIEWS, ...REVIEWS].map((review, i) => (
          <div key={i} className="inline-block w-[400px] bg-stone-200 p-10 mx-6 shadow-sm whitespace-normal rounded-sm">
            <p className="text-black italic leading-relaxed text-lg mb-6 font-light">"{review.text}"</p>
            <span className="text-stone-900 font-bold tracking-wider text-xs uppercase block text-right">— {review.name}</span>
          </div>
        ))}
      </div>
    </section>
  </>
);

// Completely Redesigned Menu Page
const MenuView = () => (
  <div className="pt-40 pb-24 px-6 bg-white min-h-screen">
    <div className="container mx-auto max-w-5xl">
      <RevealOnScroll>
        <div className="text-center mb-20">
          <span className="text-red-700 uppercase tracking-widest text-xs font-bold mb-4 block">Discover</span>
          <h2 className="text-6xl font-serif text-stone-900 mb-6">The Menu</h2>
          <div className="w-24 h-1 bg-red-700 mx-auto"></div>
        </div>
      </RevealOnScroll>
      
      <div className="grid md:grid-cols-2 gap-16">
        {Object.entries(FULL_MENU).map(([category, items], idx) => (
          <RevealOnScroll key={category} delay={idx * 100} className="mb-12">
            <h4 className="text-3xl font-serif text-stone-900 mb-8 pb-4 border-b-2 border-red-700 inline-block">{category}</h4>
            <div className="space-y-8">
              {items.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h5 className="text-lg font-bold text-stone-800 uppercase tracking-wide group-hover:text-red-700 transition-colors">{item.name}</h5>
                    <span className="text-red-700 font-serif font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-stone-500 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
      
      <div className="text-center mt-20 p-12 bg-stone-50">
        <h4 className="text-2xl font-serif text-stone-900 mb-6">Ready to enjoy?</h4>
        <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-700 text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-red-800 shadow-lg transition-all hover:scale-105">
          Order Online Now
        </a>
      </div>
    </div>
  </div>
);

const ContactView = () => (
  <div className="pt-40 pb-24 px-6 bg-white min-h-screen">
    <div className="container mx-auto max-w-6xl">
       <SectionTitle title="Get in Touch" subtitle="Visit Us" />
       
       <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 bg-stone-50 p-12">
            <div className="flex gap-6 items-start">
              <MapPin className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Location</h4>
                <p className="text-stone-600">1035 N Academy Blvd<br/>Colorado Springs, CO 80909</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <Clock className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Hours</h4>
                <div className="text-stone-600 space-y-1 text-sm">
                   <p className="flex gap-4"><span>Mon - Thu:</span> <span>11am - 9pm</span></p>
                   <p className="flex gap-4"><span>Fri - Sat:</span> <span>11am - 10pm</span></p>
                   <p className="flex gap-4"><span>Sunday:</span> <span>12pm - 9pm</span></p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <Phone className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Phone</h4>
                <p className="text-stone-600">(719) 555-0199</p>
              </div>
            </div>
          </div>

          <div className="h-[500px] bg-stone-100 w-full overflow-hidden shadow-xl border-4 border-white">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.674966601246!2d-104.76015692356567!3d38.84033267173663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x871345cabfd58d2d%3A0x2bf06ce2b1b7374d!2sSofia's%20Antojitos!5e0!3m2!1sen!2sus!4v1714856000000!5m2!1sen!2sus"
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "grayscale(0%)" }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
       </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleTickerClick = () => scrollToSection('newsletter');

  // Nav Text Color Logic: White on transparent Hero (Home), Dark elsewhere
  const navTextColor = (currentView === 'home' && !isScrolled) ? 'text-white' : 'text-stone-900';
  const navHoverColor = (currentView === 'home' && !isScrolled) ? 'hover:text-red-300' : 'hover:text-red-700';
  const navLogoColor = (currentView === 'home' && !isScrolled) ? 'text-white' : 'text-stone-900';

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
            <div 
              className={`text-2xl font-serif font-bold tracking-tighter cursor-pointer ${navLogoColor}`}
              onClick={() => handleNavClick('home')}
            >
              SOFIA'S <span className="text-red-700">ANTOJITOS</span>
            </div>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest ${navTextColor}`}>
              <button onClick={() => handleNavClick('home')} className={`${navHoverColor} transition-colors`}>Home</button>
              <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className={`${navHoverColor} transition-colors`}>Order Online</a>
              <button onClick={() => handleNavClick('menu')} className={`${navHoverColor} transition-colors`}>Menu</button>
              <button onClick={() => scrollToSection('gallery')} className={`${navHoverColor} transition-colors`}>Gallery</button>
              <button onClick={() => handleNavClick('contact')} className={`${navHoverColor} transition-colors`}>Contact</button>
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
          <button onClick={() => handleNavClick('home')}>Home</button>
          <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="text-red-700">Order Online</a>
          <button onClick={() => handleNavClick('menu')}>Menu</button>
          <button onClick={() => scrollToSection('gallery')}>Gallery</button>
          <button onClick={() => handleNavClick('contact')}>Contact</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView setView={handleNavClick} />}
        {currentView === 'menu' && <MenuView />}
        {currentView === 'contact' && <ContactView />}
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
}