import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';

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

const ORDER_LINK = "https://www.google.com/viewer/chooseprovider?mid=/g/11sh1ghw6f&g2lbs=AO8LyOJS_ARPS1tP537wJKiB7d88CK0ZndHDlvOUzivyi0qjSWFkrd5Fsceap9bNuMYRM4pw35iVdG5fLnxRosSjHuq-SbDkztdFCGlIr5W6O_RF6KR52DE%3D&hl=en-IN&gl=in&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=dNMjacDpGoCSseMPp_uUwQo&ei=dNMjacDpGoCSseMPp_uUwQo&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp";

const Menu = () => (
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

export default Menu;

