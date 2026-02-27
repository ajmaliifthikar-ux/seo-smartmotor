import React from 'react';

const CarbonFiber = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div 
    className={`bg-[#131313] ${className}`}
    style={{
      backgroundImage: `
        linear-gradient(27deg, #151515 5px, transparent 5px),
        linear-gradient(207deg, #151515 5px, transparent 5px),
        linear-gradient(27deg, #1b1b1b 5px, transparent 5px),
        linear-gradient(207deg, #1b1b1b 5px, transparent 5px),
        linear-gradient(90deg, #111 10px, transparent 10px),
        linear-gradient(#1a1a1a 25%, #151515 25%, #151515 50%, transparent 50%, transparent 75%, #1d1d1d 75%, #1d1d1d)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 5px, 10px 0px, 0px 10px, 10px 5px, 0 0, 0 0'
    }}
  >
    {children}
  </div>
);

export default function TexturedButtons() {
  return (
    <section id="textured-buttons" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">6. Textured UI Buttons & Cards</h2>
        <p className="text-[#666666] text-base">The authentic textured buttons used across the Smart Motor website.</p>
      </div>

      <div className="flex flex-wrap gap-8 p-10 bg-[#f9f9f9] rounded-3xl border border-[#eee]">
        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 bg-[#121212] text-white shadow-lg after:absolute after:inset-0 after:bg-[url('/design-system/textures/button-overlay.webp')] after:bg-cover after:bg-center after:mix-blend-overlay after:opacity-35 after:pointer-events-none hover:after:opacity-60">
          <span className="relative z-10">Premium Service</span>
        </button>
        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 bg-[#E62329] text-white shadow-lg shadow-red-600/20 after:absolute after:inset-0 after:bg-[url('/design-system/textures/button-overlay.webp')] after:bg-cover after:bg-center after:mix-blend-overlay after:opacity-35 after:pointer-events-none hover:after:opacity-60">
          <span className="relative z-10">Book Appointment</span>
        </button>
        <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-[18px] rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 bg-white text-[#121212] border border-[#eee] shadow-sm after:absolute after:inset-0 after:bg-[url('/design-system/textures/button-overlay.webp')] after:bg-cover after:bg-center after:mix-blend-overlay after:opacity-35 after:pointer-events-none hover:after:opacity-60">
          <span className="relative z-10">View Details</span>
        </button>
      </div>

      <h4 className="text-xl font-bold mt-10 mb-5">Carbon Fiber Material Cards</h4>
      <div className="flex gap-6">
        <CarbonFiber className="w-[300px] h-[180px] rounded-3xl p-[30px] flex flex-col justify-end border border-white/10 shadow-2xl">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 mb-2">Service Package</div>
          <div className="text-white font-black text-2xl uppercase italic">Elite Care</div>
        </CarbonFiber>
        <CarbonFiber className="w-[300px] h-[180px] rounded-3xl p-[30px] flex flex-col justify-end border border-[#E62329] shadow-2xl">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E62329] mb-2">Exclusive</div>
          <div className="text-white font-black text-2xl uppercase italic">Paint Protection</div>
        </CarbonFiber>
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mt-8 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use `mix-blend-mode: overlay` for button textures.</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Apply `.carbon-fiber` class to dark containers for depth.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#EF4444] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Don't</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Do not use high-opacity textures that obscure text.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
