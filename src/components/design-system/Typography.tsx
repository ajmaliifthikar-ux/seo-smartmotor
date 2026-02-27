import React from 'react';

export default function Typography() {
  return (
    <section id="typography" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">2. Typography System</h2>
        <p className="text-[#666666] text-base">Rules for hierarchy and multilingual support.</p>
      </div>

      <div className="bg-white border border-[#ECECEA] rounded-2xl p-10 mb-6">
        <div className="flex items-baseline mb-8 pb-8 border-b border-[#F4F3F1] last:border-0 last:mb-0 last:pb-0">
          <div className="w-[180px] shrink-0 text-[10px] font-black text-[#A3A3A3] uppercase tracking-[0.15em]">H1 Display</div>
          <div>
            <h1 className="text-7xl font-black leading-none tracking-tighter uppercase italic text-[#121212] mb-2">Smart Motor</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E62329]">Inter 900 Italic | -0.04em</p>
          </div>
        </div>

        <div className="flex items-baseline mb-8 pb-8 border-b border-[#F4F3F1] last:border-0 last:mb-0 last:pb-0">
          <div className="w-[180px] shrink-0 text-[10px] font-black text-[#A3A3A3] uppercase tracking-[0.15em]">H2 Heading</div>
          <div>
            <h2 className="text-5xl font-black leading-[1.1] tracking-tight uppercase text-[#121212] mb-2">Precision Services</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E62329]">Inter 900 | -0.03em</p>
          </div>
        </div>

        <div className="flex items-baseline mb-8 pb-8 border-b border-[#F4F3F1] last:border-0 last:mb-0 last:pb-0">
          <div className="w-[180px] shrink-0 text-[10px] font-black text-[#A3A3A3] uppercase tracking-[0.15em]">Arabic Heading</div>
          <div className="rtl text-right" dir="rtl">
            <h1 className="text-7xl font-black leading-none text-[#121212] mb-2 font-arabic-heading">سمارت موتور</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E62329] text-left ltr" dir="ltr">Tajawal 900 | RTL</p>
          </div>
        </div>

        <div className="flex items-baseline mb-0 pb-0 border-0">
          <div className="w-[180px] shrink-0 text-[10px] font-black text-[#A3A3A3] uppercase tracking-[0.15em]">Body Text</div>
          <div>
            <p className="text-lg text-[#666666]">Abu Dhabi's premier automotive atelier delivering excellence since 2009.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
