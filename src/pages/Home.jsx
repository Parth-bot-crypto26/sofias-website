import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Instagram } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import SectionTitle from '../components/SectionTitle';

const ASSETS = {
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2880&auto=format&fit=crop",
  aboutBg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000",
    "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=1000",
    "https://images.unsplash.com/photo-1568106690101-fd6822e876f6?q=80&w=1000",
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000",
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

const Home = () => (
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
            <Link to="/menu" className="bg-white text-stone-900 px-10 py-4 text-sm tracking-widest uppercase hover:bg-stone-200 transition-all w-full md:w-auto shadow-xl text-center">
              View Menu
            </Link>
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
          <Link to="/menu" className="text-red-700 uppercase tracking-widest text-sm font-bold hover:text-stone-900 transition-colors flex items-center justify-center gap-2 mx-auto">
            Discover Our Menu <ChevronRight size={16} />
          </Link>
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
        <Link to="/menu" className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-colors">
          See Full Menu
        </Link>
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

    {/* Review Wall - Sleek Testimonials */}
    <section id="reviews" className="bg-stone-50 py-24 border-t border-stone-200 overflow-hidden relative">
      <div className="text-center mb-16">
        <RevealOnScroll>
          <h4 className="text-red-700 uppercase tracking-widest text-xs font-bold mb-3">Testimonials</h4>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">People Love Us</h3>
          <div className="flex justify-center text-red-600 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
        </RevealOnScroll>
      </div>

      <div className="flex animate-marquee-medium hover:[animation-play-state:paused] items-stretch gap-6">
        {[...REVIEWS, ...REVIEWS].map((review, i) => (
          <div key={i} className="flex-shrink-0 w-[360px] bg-white p-8 mx-2 shadow-lg rounded-lg border border-stone-100 flex flex-col">
            <div className="flex gap-1 mb-5">
              {[...Array(review.rating)].map((_, j) => (
                <Star key={j} fill="#dc2626" size={16} className="text-red-600" />
              ))}
            </div>
            <p className="text-stone-700 leading-relaxed text-base mb-6 flex-grow font-light italic">"{review.text}"</p>
            <div className="pt-4 border-t border-stone-100">
              <span className="text-stone-900 font-semibold tracking-wide text-sm block text-right">— {review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Home;

