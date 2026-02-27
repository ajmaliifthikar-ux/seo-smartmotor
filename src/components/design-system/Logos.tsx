import React from 'react';

export default function Logos() {
  return (
    <section id="logos" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">3. Logos & Clear Space</h2>
        <p className="text-[#666666] text-base">Correct usage of brand marks.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        <div className="bg-white border border-[#ECECEA] rounded-2xl p-[50px_30px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-[25px] border border-dashed border-[#E62329]/40 pointer-events-none before:content-['50%_Height_Clear_Zone'] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:bg-[#FAFAF9] before:text-[#E62329] before:text-[9px] before:font-black before:px-1.5 before:uppercase"></div>
          <img src="/design-system/branding/logo.png" alt="Light Mode Logo" className="max-w-full h-auto mb-6 relative z-10" />
          <div className="font-bold text-[13px]">Light Mode Logo</div>
        </div>

        <div className="bg-[#121212] border border-[#121212] text-white rounded-2xl p-[50px_30px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-[25px] border border-dashed border-[#E62329]/40 pointer-events-none before:content-['50%_Height_Clear_Zone'] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:bg-[#121212] before:text-[#E62329] before:text-[9px] before:font-black before:px-1.5 before:uppercase"></div>
          <img src="/design-system/branding/logo.png" alt="Dark Mode Logo" className="max-w-full h-auto mb-6 relative z-10 invert brightness-0" />
          <div className="font-bold text-[13px]">Dark Mode Logo</div>
        </div>

        <div className="bg-white border border-[#ECECEA] rounded-2xl p-[50px_30px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <img src="/design-system/favicons/favicon.svg" alt="SVG Favicon" className="w-16 h-auto mb-6" />
          <div className="font-bold text-[13px]">SVG Favicon</div>
        </div>
      </div>
    </section>
  );
}
