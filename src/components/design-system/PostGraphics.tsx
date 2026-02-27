import React from 'react';

const DownloadButton = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    download 
    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-white text-[#121212] border border-[#ECECEA] rounded-full text-[11px] font-black uppercase tracking-[0.1em] no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[#121212]"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    {label}
  </a>
);

export default function PostGraphics() {
  return (
    <section id="post-elements" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">5. Post Graphics & Calls-to-Action (Vector)</h2>
        <p className="text-[#666666] text-base">Standardized visual elements for social media posts, banners, and digital flyers. <strong>Downloadable as layered SVGs for Illustrator.</strong></p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-xs font-bold uppercase mb-3 text-[#666666]">A. Impact Callout (Pricing/Offer)</h4>
          <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="inline-flex flex-col bg-[#121212] text-white p-[20px_32px] border-l-[6px] border-l-[#E62329] shadow-[20px_20px_0_rgba(230,35,41,0.1)] -skew-x-[5deg] mb-5">
              <div className="skew-x-[5deg]">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E62329] mb-1">Limited Time Offer</div>
                <div className="text-[40px] font-black italic leading-none tracking-tight">AED 1,499</div>
              </div>
            </div>
            <DownloadButton href="/design-system/social-graphics/impact-callout.svg" label="Download Vector (.svg)" />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase mb-3 text-[#666666]">B. Scan-to-Book QR Badge</h4>
          <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('/design-system/textures/wall-concrete.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex bg-[#131313] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-5 w-max">
              <div className="p-8 flex flex-col justify-center">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E62329] mb-2">Instant Booking</div>
                <div className="text-xl font-black uppercase text-white italic tracking-tight mb-2">Scan To<br />Reserve</div>
                <div className="text-[11px] text-[#A3A3A3] font-medium max-w-[160px] leading-relaxed">Point your camera to book your service instantly.</div>
              </div>
              <div className="bg-white p-5 flex items-center justify-center">
                <div className="w-[100px] h-[100px] bg-center bg-cover" style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h2v2h-2zM17 13h4v4h-4zM13 17h4v4h-4zM19 17h2v4h-2zM5 5v4h4V5zM15 5v4h4V5zM5 15v4h4v-4z" fill="%23121212"/></svg>')` }}></div>
              </div>
            </div>
            <DownloadButton href="/design-system/social-graphics/qr-badge.svg" label="Download Vector (.svg)" />
          </div>
        </div>

        <div className="col-span-2">
          <h4 className="text-xs font-bold uppercase mb-3 text-[#666666]">C. Technical Spec Badges</h4>
          <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex gap-4 mb-5">
              {[
                { label: 'Protection', value: '9H Nano' },
                { label: 'Warranty', value: '5 Years' },
                { label: 'Turnaround', value: '24 Hours' }
              ].map((spec) => (
                <div key={spec.label} className="bg-[#FAFAF9] border border-[#ECECEA] p-[16px_24px] rounded-xl min-w-[140px] relative overflow-hidden shadow-sm before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-[#E62329]">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#A3A3A3] mb-1">{spec.label}</div>
                  <div className="text-2xl font-black text-[#121212] tracking-tight">{spec.value}</div>
                </div>
              ))}
            </div>
            <DownloadButton href="/design-system/social-graphics/tech-spec-badge.svg" label="Download Vector (.svg)" />
          </div>
        </div>

        <div className="col-span-2">
          <h4 className="text-xs font-bold uppercase mb-3 text-[#666666]">D. Social Post Footer Strip</h4>
          <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex items-center justify-between bg-[#121212] rounded-full p-[12px_16px_12px_32px] text-white w-full shadow-lg mb-5">
              <div className="text-sm font-black uppercase tracking-[0.1em] flex items-center gap-3 after:content-[''] after:block after:w-px after:h-5 after:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Smart Motor
              </div>
              <div className="text-sm font-bold tracking-wide">800 76278 &nbsp; | &nbsp; smartmotor.ae</div>
              <div className="bg-[#E62329] text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em]">Book Now</div>
            </div>
            <DownloadButton href="/design-system/social-graphics/footer-strip.svg" label="Download Vector (.svg)" />
          </div>
        </div>
      </div>

      <h4 className="text-sm font-bold uppercase mt-16 mb-6 text-[#666666]">E. Service Category Badges</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
        {[
          'service-ppf.svg',
          'service-ceramic.svg',
          'service-paint-correction.svg',
          'service-engine-tuning.svg',
          'service-detailing.svg',
          'service-window-tint.svg'
        ].map((file) => (
          <img key={file} src={`/design-system/social-graphics/${file}`} alt={file} className="max-w-full" />
        ))}
      </div>

      <h4 className="text-sm font-bold uppercase mt-16 mb-6 text-[#666666]">F. Before/After Comparison Frames</h4>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center">
          <h5 className="text-[11px] font-bold uppercase mb-3 text-[#666666]">Side-by-Side Frame</h5>
          <img src="/design-system/social-graphics/before-after-sidebyside.svg" alt="Before After Side by Side" className="max-w-full rounded-lg" />
          <DownloadButton href="/design-system/social-graphics/before-after-sidebyside.svg" label="Download Vector (.svg)" />
        </div>
        <div className="bg-[#e5e5e5] p-10 rounded-2xl flex flex-col items-center">
          <h5 className="text-[11px] font-bold uppercase mb-3 text-[#666666]">Overlay Comparison Frame</h5>
          <img src="/design-system/social-graphics/before-after-overlay.svg" alt="Before After Overlay" className="max-w-full rounded-lg" />
          <DownloadButton href="/design-system/social-graphics/before-after-overlay.svg" label="Download Vector (.svg)" />
        </div>
      </div>

      <h4 className="text-sm font-bold uppercase mt-16 mb-6 text-[#666666]">G. Promo Tags & Stamps</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 mb-6">
        {[
          { file: 'promo-limited-time.svg', width: '120px' },
          { file: 'promo-sale-badge.svg', width: '120px' },
          { file: 'promo-discount.svg', width: '100px' },
          { file: 'promo-new-service.svg', width: '120px' },
          { file: 'promo-best-seller.svg', width: '100px' }
        ].map((item) => (
          <div key={item.file} className="bg-[#e5e5e5] p-6 rounded-2xl flex flex-col items-center justify-between">
            <img src={`/design-system/social-graphics/${item.file}`} alt={item.file} style={{ width: item.width }} />
            <a href={`/design-system/social-graphics/${item.file}`} download className="mt-3 px-4 py-2 bg-white rounded-full text-[9px] font-bold uppercase tracking-wider text-[#121212] border border-[#ECECEA]">Download</a>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-bold uppercase mt-16 mb-6 text-[#666666]">H. Contact Information Blocks</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-6">
        {['contact-phone.svg', 'contact-address.svg', 'contact-hours.svg', 'contact-location-pin.svg'].map(file => (
          <img key={file} src={`/design-system/social-graphics/${file}`} alt={file} className="max-w-full" />
        ))}
      </div>
      <div className="flex gap-4 flex-wrap mb-8">
        <DownloadButton href="/design-system/social-graphics/contact-phone.svg" label="Phone Block" />
        <DownloadButton href="/design-system/social-graphics/contact-address.svg" label="Address Block" />
        <DownloadButton href="/design-system/social-graphics/contact-hours.svg" label="Hours Block" />
        <DownloadButton href="/design-system/social-graphics/contact-location-pin.svg" label="Location Pin" />
      </div>

      <div className="bg-[#F4F3F1]/80 border border-[#ECECEA] border-l-4 border-l-[#E62329] rounded-lg p-6 mt-8">
        <h4 className="text-[#10B981] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">Do</h4>
        <ul className="list-none space-y-2">
          <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Download the SVG files and open them in Adobe Illustrator to edit the text and colors without losing resolution.</li>
          <li className="text-sm text-[#666666] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#10B981] before:font-black">Keep the Inter typography structure intact within the SVG.</li>
        </ul>
      </div>
    </section>
  );
}
