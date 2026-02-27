import React from 'react';

export default function MotionAssets() {
  return (
    <section id="media" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">9. Motion & Animation Assets</h2>
        <p className="text-[#666666] text-base">Official logo animations and video elements for social media and app intros.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8 items-center bg-white border border-[#ECECEA] rounded-2xl p-10 mb-6">
        <div className="bg-[#121212] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            src="/design-system/social-graphics/logo-animation.mov" 
            className="max-w-full max-h-full"
          />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight mb-2">Logo Intro Animation</h3>
          <p className="text-[#666666] mb-8 max-w-md">A high-energy, transparent logo sting for use in video content and mobile app splash screens.</p>
          <a 
            href="/design-system/social-graphics/logo-animation.mov" 
            download 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#121212] border border-[#ECECEA] rounded-full text-[11px] font-black uppercase tracking-[0.1em] no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[#121212]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Original (.mov)
          </a>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8 items-start mt-6">
        <div>
          <h3 className="text-lg font-black mb-1">Logo Animation Video</h3>
          <p className="text-sm text-[#666666] mb-3">Transparent video for intros/outros. Note: `.mov` has limited browser support.</p>
          <a href="/design-system/social-graphics/logo-animation.mov" download className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#121212] border border-[#ECECEA] rounded-full text-[9px] font-black uppercase tracking-[0.1em] no-underline hover:border-[#121212]">Download Original (.mov)</a>
        </div>
        <div>
          <h3 className="text-lg font-black mb-1">Static Poster Image</h3>
          <p className="text-sm text-[#666666] mb-3">High-resolution PNG fallback for platforms that do not support video.</p>
          <a href="/design-system/social-graphics/logo-animation-poster.png" download className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#121212] border border-[#ECECEA] rounded-full text-[9px] font-black uppercase tracking-[0.1em] no-underline hover:border-[#121212]">Download Poster (.png)</a>
        </div>
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mt-8 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use the video on platforms that support transparent `.mov` or after converting to a transparent `.webm`.</li>
            <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Use the PNG as a thumbnail or where video is not supported.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#EF4444] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Don't</h4>
          <ul className="list-none space-y-2">
            <li className="text-sm text-[#666666] pl-6 relative before:content-['×'] before:absolute before:left-0 before:text-[#EF4444] before:font-black before:text-lg before:-top-1">For production websites, do not embed the raw `.mov` file directly due to its large size and poor compatibility.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
