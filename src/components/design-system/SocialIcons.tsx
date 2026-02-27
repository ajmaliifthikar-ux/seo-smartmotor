import React from 'react';

export default function SocialIcons() {
  return (
    <section id="social" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">4. Social Ecosystem</h2>
        <p className="text-[#666666] text-base">Standardized circle-wrapped icons.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <div className="bg-white border border-[#ECECEA] rounded-2xl p-8 flex flex-col items-center gap-6">
          <div className="text-[11px] font-black uppercase tracking-[0.1em] opacity-60">Brand Red</div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-[#E62329] hover:bg-[#121212] hover:scale-110 group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round group-hover:stroke-white">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-[#E62329] hover:bg-[#121212] hover:scale-110 group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round group-hover:stroke-white">
                <path d="M21 11.5a8 8 0 1 1-8-8h.5"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#121212] text-white rounded-2xl p-8 flex flex-col items-center gap-6">
          <div className="text-[11px] font-black uppercase tracking-[0.1em] opacity-60">Inverted Outline</div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-transparent border border-white/20 hover:border-white hover:scale-110 group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-transparent border border-white/20 hover:border-white hover:scale-110 group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round">
                <path d="M21 11.5a8 8 0 1 1-8-8h.5"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mt-8 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Icon size: 20px centered in 48px circle.</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Stroke width: 2px rounded.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#EF4444] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Don't</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">Do not use original platform colors (Green/Blue).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
