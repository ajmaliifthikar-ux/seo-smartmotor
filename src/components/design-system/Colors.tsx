import React from 'react';

export default function Colors() {
  const colors = [
    { name: 'Brand Dark', hex: '#121212', bg: 'bg-[#121212]' },
    { name: 'Electric Red', hex: '#E62329', bg: 'bg-[#E62329]' },
    { name: 'Charcoal Gray', hex: '#1A1A1A', bg: 'bg-[#1A1A1A]' },
    { name: 'Primary Surface', hex: '#FAFAF9', bg: 'bg-[#FAFAF9] border-b border-[#eee]' },
    { name: 'Secondary Surface', hex: '#F4F3F1', bg: 'bg-[#F4F3F1]' },
    { name: 'Tertiary / Borders', hex: '#ECECEA', bg: 'bg-[#ECECEA]' },
  ];

  return (
    <section id="colors" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">1. Brand Colors</h2>
        <p className="text-[#666666] text-base">The definitive palette for the Smart Motor ecosystem.</p>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 mb-8">
        {colors.map((color) => (
          <div key={color.hex} className="rounded-xl overflow-hidden border border-[#ECECEA] bg-white">
            <div className={`h-[100px] w-full ${color.bg}`} />
            <div className="p-3">
              <div className="font-bold text-[13px] mb-0.5">{color.name}</div>
              <div className="font-mono text-[#666666] text-[11px]">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mt-8 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use #121212 for all primary body text.</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use #E62329 for primary CTAs and active states only.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#EF4444] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Don't</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Do not use pure black (#000000).</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Do not use red for background text blocks.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
