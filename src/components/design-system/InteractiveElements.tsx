'use client';

import React, { useRef } from 'react';

const FlipCard = () => (
  <div className="bg-transparent w-full aspect-[16/10] [perspective:1000px] group">
    <div className="relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xl">
      <div className="absolute w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden border border-white/10 bg-[#121212] bg-[url('/design-system/textures/carbon-leak.png')] bg-cover bg-center text-white flex flex-col justify-end p-8">
        <h3 className="text-3xl text-left font-black italic">Paint Protection Film</h3>
        <p className="text-left text-sm text-[#A3A3A3]">Self-healing, high-gloss film for ultimate rock chip defense.</p>
      </div>
      <div className="absolute w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden border border-white/10 bg-[#E62329] text-white [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8">
        <h4 className="text-sm font-black uppercase tracking-[0.1em] opacity-70">LEARN MORE</h4>
        <p className="text-lg font-medium mt-3">Discover our PPF packages starting from AED 4,500.</p>
      </div>
    </div>
  </div>
);

const SpotlightCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[16/10] bg-[#1A1A1A] rounded-3xl overflow-hidden p-8 flex flex-col justify-end text-white border border-white/10 group"
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.1), transparent 40%)`
        }}
      />
      <h3 className="text-[28px] font-black italic z-10">Engine Tuning</h3>
      <p className="text-sm text-[#A3A3A3] z-10">Unlock your vehicle's true potential with our custom ECU mapping.</p>
    </div>
  );
};

export default function InteractiveElements() {
  return (
    <section id="interactive-elements" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">8. Interactive Elements & CTAs</h2>
        <p className="text-[#666666] text-base">A collection of animated cards and advanced call-to-action buttons.</p>
      </div>

      <h4 className="text-sm font-bold uppercase mb-6 text-[#666666]">Interactive Cards</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 items-center mb-12">
        <FlipCard />
        <SpotlightCard />
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mb-16 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use 3D flips for service cards that have a clear "front" and "back".</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Apply the spotlight effect to premium or featured product cards.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#EF4444] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Don't</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Do not overuse 3D effects; limit them to key areas.</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Don't put critical information on the back of a flip card.</li>
          </ul>
        </div>
      </div>

      <h4 className="text-sm font-bold uppercase mb-6 text-[#666666]">Advanced CTA Buttons</h4>
      <div className="flex flex-wrap gap-6 items-center p-10 bg-white border border-[#ECECEA] rounded-2xl">
        <button className="relative overflow-hidden inline-flex items-center gap-3 pr-6 pl-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 bg-[#E62329] text-white shadow-lg shadow-red-600/20 after:absolute after:inset-0 after:bg-[url('/design-system/textures/button-overlay.webp')] after:bg-cover after:bg-center after:mix-blend-overlay after:opacity-35 after:pointer-events-none hover:after:opacity-60 group">
          <span className="relative z-10">Book Now</span>
          <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
        
        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all bg-[#121212] text-white shadow-lg group">
          <span className="relative z-10">Claim Offer</span>
          <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[25deg] transition-all duration-700 group-hover:left-[150%]"></div>
          <div className="absolute inset-0 bg-[url('/design-system/textures/button-overlay.webp')] bg-cover bg-center mix-blend-overlay opacity-35 pointer-events-none"></div>
        </button>
        
        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] bg-[#121212] text-transparent shadow-lg cursor-wait">
          <span className="relative z-10">Processing...</span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-[url('/design-system/textures/button-overlay.webp')] bg-cover bg-center mix-blend-overlay opacity-35 pointer-events-none"></div>
        </button>

        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] bg-[#121212] text-white shadow-lg opacity-50 cursor-not-allowed">
          <span className="relative z-10">Sold Out</span>
          <div className="absolute inset-0 bg-[url('/design-system/textures/button-overlay.webp')] bg-cover bg-center mix-blend-overlay opacity-35 pointer-events-none"></div>
        </button>
      </div>
    </section>
  );
}
