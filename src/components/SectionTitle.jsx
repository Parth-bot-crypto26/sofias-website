import RevealOnScroll from './RevealOnScroll';

const SectionTitle = ({ title, subtitle, centered = true }) => (
  <RevealOnScroll className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <span className="text-red-700 uppercase tracking-[0.2em] text-xs font-bold mb-3 block">{subtitle}</span>
    <h3 className="text-4xl md:text-5xl font-serif text-stone-900">{title}</h3>
  </RevealOnScroll>
);

export default SectionTitle;

