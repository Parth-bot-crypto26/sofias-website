import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Phone, Instagram, Facebook, ChevronRight, Star, Clock, ArrowRight, Utensils, Wine, CreditCard, Car, Baby } from 'lucide-react';

/**
 * SOFIA'S ANTOJITOS - COMPLETE WEBSITE
 * Recreated based on Le Thai Las Vegas style.
 */

// --- Assets & Data ---
const ASSETS = {
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2880&auto=format&fit=crop",
  aboutBg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000", // Birria
    "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=1000", // Tacos
    "https://images.unsplash.com/photo-1568106690101-fd6822e876f6?q=80&w=1000", // Drink
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000", // Street food
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
    { name: "Lengua", desc: "Slow cooked beef tongue, cilantro, onion.", price: "$5" },
  ],
  Especialidades: [
    { name: "Quesabirria", desc: "Large cheesy folded tortilla with spicy beef stew.", price: "$15" },
    { name: "Sopes", desc: "Thick corn tortilla, beans, lettuce, cheese, cream, choice of meat.", price: "$13" },
    { name: "Gorditas", desc: "Stuffed corn pastry, chicharron or beans & cheese.", price: "$5" },
    { name: "Torta Cubana", desc: "Telera bread, milanesa, ham, cheese, avocado, beans.", price: "$16" },
    { name: "Menudo", desc: "Traditional spicy tripe soup (Weekends only).", price: "$15" },
  ],
  Drinks: [
    { name: "Aguas Frescas", desc: "Horchata, Jamaica, Tamarindo (Large).", price: "$5" },
    { name: "Mexican Coke", desc: "Glass bottle.", price: "$3.50" },
    { name: "Jarritos", desc: "Various flavors.", price: "$3" },
  ],
  Desserts: [
    { name: "Mangonada", desc: "Mango sorbet, chamoy, tajin, fresh mango chunks.", price: "$9" },
    { name: "Churro Sundae", desc: "Vanilla ice cream, fresh churros, caramel drizzle.", price: "$10" },
    { name: "Fresas con Crema", desc: "Fresh strawberries, sweet cream, granola.", price: "$8" },
  ]
};

const REVIEWS = [
  { name: "Maria G.", text: "Best antojitos in Colorado Springs! Just like home.", rating: 5 },
  { name: "David L.", text: "The vibes are immaculate and the food is even better. The Birria is a must-try.", rating: 5 },
  { name: "Sarah J.", text: "A hidden gem. The transition from street food to fine dining atmosphere is amazing.", rating: 5 },
  { name: "Carlos M.", text: "Fast service and huge portions. The Mangonada changed my life.", rating: 5 },
  { name: "Jessica P.", text: "Perfect for date night or a quick lunch. Love the outdoor seating option.", rating: 5 },
  { name: "Robert T.", text: "Authentic flavors, great prices. Will definitely be coming back.", rating: 5 },
  { name: "Emily R.", text: "The Quesabirria is out of this world. Highly recommend!", rating: 5 },
  { name: "Michael B.", text: "Great service and the staff is very friendly.", rating: 5 },
];

const ORDER_LINK = "https://www.google.com/viewer/chooseprovider?mid=/g/11sh1ghw6f&g2lbs=AO8LyOJS_ARPS1tP537wJKiB7d88CK0ZndHDlvOUzivyi0qjSWFkrd5Fsceap9bNuMYRM4pw35iVdG5fLnxRosSjHuq-SbDkztdFCGlIr5W6O_RF6KR52DE%3D&hl=en-IN&gl=in&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=dNMjacDpGoCSseMPp_uUwQo&ei=dNMjacDpGoCSseMPp_uUwQo&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp";

// --- Components ---

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
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

const SectionTitle = ({ title, subtitle, light = false }) => (
  <RevealOnScroll className="text-center mb-16">
    <span className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-4 block">{subtitle}</span>
    <h3 className={`text-4xl md:text-5xl font-serif ${light ? 'text-white' : 'text-white'}`}>{title}</h3>
    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6"></div>
  </RevealOnScroll>
);

const NewsTicker = ({ onTickerClick }) => (
  <div 
    onClick={onTickerClick}
    className="bg-amber-600 text-white text-sm font-bold tracking-widest py-2 overflow-hidden relative z-50 cursor-pointer hover:bg-amber-700 transition-colors"
  >
    <div className="whitespace-nowrap animate-marquee flex gap-8">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-4 flex items-center gap-2">
          <Star size={12} className="fill-white" /> 
          EXCLUSIVE OFFER: 20% OFF ALL ORDERS OVER $50 
          <span className="text-amber-200">|</span> 
          HAPPY HOUR: 4PM - 6PM DAILY 
          <span className="text-amber-200">|</span> 
          CLICK HERE TO JOIN OUR MAILING LIST FOR EXCLUSIVE DEALS
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 30s linear infinite; }
      .animate-marquee-reverse { animation: marquee-reverse 60s linear infinite; }
      @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
    `}</style>
  </div>
);

// --- VIEW COMPONENTS ---

const HomeView = ({ setView }) => (
  <>
    {/* Hero */}
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url(${ASSETS.heroBg})`, filter: "brightness(0.4)" }}
      />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <RevealOnScroll>
          <p className="text-amber-400 text-lg md:text-xl tracking-[0.3em] uppercase mb-4 font-medium">A Colorado Springs Original</p>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
            Sofia's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Antojitos</span>
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={400}>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href={ORDER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-amber-700 transition-all w-full md:w-auto shadow-lg hover:scale-105 transform duration-300 rounded"
            >
              Order Online
            </a>
            <button 
              onClick={() => setView('menu')}
              className="border border-white text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-all w-full md:w-auto hover:scale-105 transform duration-300 rounded"
            >
              View Menu
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    {/* Intro */}
    <section className="py-24 bg-stone-900 text-center px-6">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle title="Authentic Flavors" subtitle="Welcome" />
        <RevealOnScroll delay={200}>
          <p className="text-stone-400 text-lg leading-relaxed mb-12">
            Established in the heart of Colorado Springs, Sofia's Antojitos brings the vibrant street food culture of Mexico to a modern, elegant dining experience. From our slow-simmered Birria to our handcrafted refreshing drinks, every detail is a tribute to tradition.
          </p>
          <button onClick={() => setView('menu')} className="text-amber-500 uppercase tracking-widest text-sm font-bold hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
            Discover Our Menu <ChevronRight size={16} />
          </button>
        </RevealOnScroll>
      </div>
    </section>

    {/* Menu Teaser */}
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-96 md:h-auto overflow-hidden relative group">
         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${ASSETS.aboutBg})` }} />
         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
      </div>
      <div className="bg-stone-800 p-12 md:p-24 flex flex-col justify-center items-start">
        <RevealOnScroll>
          <span className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-4 block">Taste the Difference</span>
          <h3 className="text-3xl md:text-5xl font-serif mb-8 text-white">Our Specialties</h3>
        </RevealOnScroll>
        <div className="space-y-6 w-full mb-10">
          <div className="border-b border-stone-700 pb-2 flex justify-between items-center">
            <span className="text-xl font-serif text-white">Birria Tacos</span>
            <span className="text-amber-500">$14</span>
          </div>
          <div className="border-b border-stone-700 pb-2 flex justify-between items-center">
            <span className="text-xl font-serif text-white">Mangonada</span>
            <span className="text-amber-500">$9</span>
          </div>
          <div className="border-b border-stone-700 pb-2 flex justify-between items-center">
            <span className="text-xl font-serif text-white">Quesabirria</span>
            <span className="text-amber-500">$15</span>
          </div>
        </div>
        <RevealOnScroll delay={200}>
          <button onClick={() => setView('menu')} className="bg-stone-100 text-stone-900 px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-white transition-all">
            See Full Menu
          </button>
        </RevealOnScroll>
      </div>
    </section>

    {/* Gallery Strip (4 Images) */}
    <section id="gallery" className="bg-stone-950 py-24">
      <div className="container mx-auto px-6">
        <SectionTitle title="Gallery" subtitle="A Visual Taste of Mexico" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ASSETS.gallery.map((img, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
               <div className="aspect-square overflow-hidden relative group cursor-pointer rounded-lg">
                 <img 
                   src={img} 
                   alt={`Gallery item ${i}`}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Instagram className="text-white" size={32} />
                 </div>
               </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Review Wall (Spacious Auto Scrolling) */}
    <section id="reviews" className="bg-stone-900 py-24 border-t border-stone-800 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-stone-900 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-stone-900 to-transparent z-10"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h4 className="text-2xl font-serif text-white uppercase tracking-widest mb-2">Guest Love</h4>
        <div className="flex justify-center text-amber-500">
           {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} className="mx-0.5" />)}
        </div>
      </div>

      <div className="flex animate-marquee-reverse whitespace-nowrap hover:[animation-play-state:paused] items-center">
        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
          <div key={i} className="inline-block w-[85vw] md:w-[30vw] min-w-[300px] max-w-[500px] bg-stone-800/30 p-10 rounded-xl mx-8 border border-stone-700/50 whitespace-normal backdrop-blur-sm hover:border-amber-500/50 transition-colors">
            <div className="mb-6">
              <div className="flex text-amber-500 mb-3 gap-1">
                 {[...Array(5)].map((_, r) => <Star key={r} size={14} fill="currentColor" />)}
              </div>
              <p className="text-stone-200 italic leading-relaxed text-xl font-light">"{review.text}"</p>
            </div>
            <div className="flex justify-start items-center border-t border-stone-700/50 pt-4">
               <span className="text-amber-500 font-bold tracking-wider text-sm uppercase">{review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

const MenuView = () => (
  <div className="pt-32 pb-24 px-6 bg-stone-900 min-h-screen">
    <div className="container mx-auto max-w-4xl">
      <SectionTitle title="The Menu" subtitle="Authentic & Fresh" />
      
      {Object.entries(FULL_MENU).map(([category, items], idx) => (
        <RevealOnScroll key={category} delay={idx * 100} className="mb-16">
          <h4 className="text-3xl font-serif text-amber-500 mb-8 border-b border-stone-800 pb-4">{category}</h4>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {items.map((item, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <h5 className="text-xl font-bold text-stone-200 group-hover:text-amber-400 transition-colors">{item.name}</h5>
                  <span className="text-amber-500 font-mono">{item.price}</span>
                </div>
                <p className="text-stone-500 text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      ))}
      
      <div className="text-center mt-12">
        <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-600 text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-amber-700 shadow-xl transition-all hover:scale-105">
          Order For Delivery
        </a>
      </div>
    </div>
  </div>
);

const ContactView = () => (
  <div className="pt-32 pb-24 px-6 bg-stone-900 min-h-screen">
    <div className="container mx-auto max-w-6xl">
       <SectionTitle title="Get in Touch" subtitle="Visit Us" />
       
       <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="flex gap-4 items-start group">
              <div className="bg-stone-800 p-4 rounded-full group-hover:bg-amber-600 transition-colors">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-serif text-white mb-2">Location</h4>
                <p className="text-stone-400 text-lg">1035 N Academy Blvd<br/>Colorado Springs, CO 80909</p>
                <p className="text-stone-500 mt-2">United States</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="bg-stone-800 p-4 rounded-full group-hover:bg-amber-600 transition-colors">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-serif text-white mb-2">Hours</h4>
                <div className="text-stone-400 text-lg space-y-1">
                   <p className="flex justify-between w-64"><span>Mon - Thu:</span> <span>11am - 9pm</span></p>
                   <p className="flex justify-between w-64"><span>Fri - Sat:</span> <span>11am - 10pm</span></p>
                   <p className="flex justify-between w-64"><span>Sunday:</span> <span>12pm - 9pm</span></p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="bg-stone-800 p-4 rounded-full group-hover:bg-amber-600 transition-colors">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-serif text-white mb-2">Phone</h4>
                <p className="text-stone-400 text-lg">(719) 555-0199</p>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full bg-stone-800 rounded-lg overflow-hidden border border-stone-700 shadow-2xl">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.674966601246!2d-104.76015692356567!3d38.84033267173663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x871345cabfd58d2d%3A0x2bf06ce2b1b7374d!2sSofia's%20Antojitos!5e0!3m2!1sen!2sus!4v1714856000000!5m2!1sen!2sus"
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
       </div>
    </div>
  </div>
);

// 3. Main App Layout
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'menu' | 'contact'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigating to a view
  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to section on Home Page
  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Handle Ticker click - scroll to newsletter
  const handleTickerClick = () => scrollToSection('newsletter');

  return (
    <div className="font-sans bg-stone-900 text-stone-100 selection:bg-amber-500 selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-50">
        <NewsTicker onTickerClick={handleTickerClick} />
        
        <nav className={`w-full transition-all duration-500 ${
          isScrolled ? "bg-stone-950/95 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-6"
        }`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <div 
              className="text-2xl font-serif font-bold tracking-tighter text-white z-50 cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              SOFIA'S <span className="text-amber-500">ANTOJITOS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest">
              <button onClick={() => handleNavClick('home')} className={`hover:text-amber-500 transition-colors ${currentView === 'home' ? 'text-amber-500' : 'text-white'}`}>Home</button>
              
              <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors text-white">Order Online</a>
              
              <button onClick={() => handleNavClick('menu')} className={`hover:text-amber-500 transition-colors ${currentView === 'menu' ? 'text-amber-500' : 'text-white'}`}>Menu</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-amber-500 transition-colors text-white">Gallery</button>
              <button onClick={() => handleNavClick('contact')} className={`hover:text-amber-500 transition-colors ${currentView === 'contact' ? 'text-amber-500' : 'text-white'}`}>Contact</button>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden z-50 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col space-y-6 text-center text-xl font-serif uppercase tracking-widest">
          <button onClick={() => handleNavClick('home')}>Home</button>
          <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="text-amber-500">Order Online</a>
          <button onClick={() => handleNavClick('menu')}>Menu</button>
          <button onClick={() => scrollToSection('gallery')}>Gallery</button>
          <button onClick={() => handleNavClick('contact')}>Contact</button>
        </div>
      </div>

      {/* --- PAGE CONTENT RENDERER --- */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView setView={handleNavClick} />}
        {currentView === 'menu' && <MenuView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      {/* --- MAILING LIST SECTION (Bottom of Home, or Global Footer) --- */}
      <section id="newsletter" className="py-20 bg-amber-600 text-white text-center px-6">
        <div className="container mx-auto max-w-2xl">
          <RevealOnScroll>
            <h3 className="text-3xl md:text-4xl font-serif mb-4">Don't Miss Out</h3>
            <p className="mb-8 text-amber-100">Join our mailing list for exclusive offers, updates on new menu items, and birthday treats.</p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:bg-white/20 text-white rounded-none"
              />
              <button className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-black transition-colors">
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-4 opacity-60">We respect your privacy. Unsubscribe at any time.</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 px-6 text-center border-t border-stone-800">
        <div className="flex justify-center space-x-6 mb-8 text-stone-500">
          <Instagram className="hover:text-white cursor-pointer transition-colors" />
          <Facebook className="hover:text-white cursor-pointer transition-colors" />
        </div>
        <p className="text-stone-600 text-sm tracking-widest uppercase">
          &copy; 2024 Sofia's Antojitos. All rights reserved.
        </p>
      </footer>

    </div>
  );
}