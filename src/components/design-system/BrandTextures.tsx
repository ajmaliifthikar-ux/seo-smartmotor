import React from 'react';

const TEXTURES = [
  { name: 'wall-concrete.jpg', path: '/design-system/textures/wall-concrete.jpg' },
  { name: 'metal-brushed.jpg', path: '/design-system/textures/metal-brushed.jpg' },
  { name: 'button-overlay.webp', path: '/design-system/textures/button-overlay.webp' },
  { name: 'car-paint-texture.png', path: '/design-system/textures/car-paint-texture.png' },
  { name: 'carbon-leak.png', path: '/design-system/textures/carbon-leak.png' },
  { name: 'paper-grain.png', path: '/design-system/textures/paper-grain.png' },
];

export default function BrandTextures() {
  return (
    <section id="brand-textures" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">7. Brand Textures</h2>
        <p className="text-[#666666] text-base">Raw assets for background materials and overlays.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {TEXTURES.map((texture) => (
          <div key={texture.name} className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eee] shadow-sm">
            <div 
              className="h-[180px] w-full bg-cover bg-center" 
              style={{ backgroundImage: `url('${texture.path}')` }}
            />
            <div className="p-4 flex justify-between items-center border-t border-[#eee]">
              <span className="font-bold text-[11px] uppercase text-[#888]">{texture.name}</span>
              <a 
                href={texture.path} 
                download 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[#121212] border border-[#ECECEA] rounded-full text-[9px] font-black uppercase tracking-[0.1em] no-underline transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[#121212]"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
