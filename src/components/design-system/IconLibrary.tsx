'use client';

import React, { useState, useEffect } from 'react';

export default function IconLibrary() {
  const [icons, setIcons] = useState<string[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 50;

  useEffect(() => {
    fetch('/design-system/icons.json')
      .then(res => res.json())
      .then(data => {
        setIcons(data);
        setFilteredIcons(data);
      })
      .catch(err => console.error('Failed to load icons:', err));
  }, []);

  useEffect(() => {
    let filtered = icons;
    if (activeFilter !== 'all') {
      filtered = icons.filter(icon => icon.toLowerCase().includes(activeFilter.toLowerCase()));
    }
    setFilteredIcons(filtered);
    setPage(1);
  }, [activeFilter, icons]);

  const totalPages = Math.ceil(filteredIcons.length / perPage) || 1;
  const currentIcons = filteredIcons.slice((page - 1) * perPage, page * perPage);

  return (
    <section id="icon-library" className="mb-32 scroll-mt-10">
      <div className="mb-10 pb-5 border-b-2 border-[#ECECEA]">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">10. Universal Icon Library</h2>
        <p className="text-[#666666] text-base">Paginated view of all Car Brand, Tech, and Automotive icons.</p>
      </div>

      <div className="flex gap-2.5 mb-5 flex-wrap">
        {[
          { id: 'all', label: 'All Icons' },
          { id: 'car brand', label: 'Car Brands' },
          { id: 'Automotive-Icons', label: 'Automotive' },
          { id: 'All Apps & Techs', label: 'Tech Stack' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`inline-flex px-6 py-3 rounded-full text-[11px] font-black uppercase border-2 transition-all
              ${activeFilter === filter.id 
                ? 'bg-[#121212] text-white border-[#121212]' 
                : 'bg-transparent border-[#ECECEA] hover:border-[#121212]'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 mt-6">
        {currentIcons.map((icon, idx) => {
          const name = icon.split('/').pop()?.split('.')[0] || 'icon';
          return (
            <div key={`${icon}-${idx}`} className="bg-white border border-[#eee] rounded-xl p-4 text-center transition-all cursor-pointer hover:-translate-y-1 hover:border-[#E62329] flex flex-col items-center justify-center h-[100px]">
              <img src={icon} alt={name} className="w-10 h-10 object-contain mb-2" loading="lazy" />
              <div className="text-[9px] font-bold uppercase text-[#888] w-full overflow-hidden text-ellipsis whitespace-nowrap">{name}</div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-10 items-center">
        <button 
          onClick={() => {
            setPage(p => Math.max(1, p - 1));
            document.getElementById('icon-library')?.scrollIntoView({ behavior: 'smooth' });
          }}
          disabled={page === 1}
          className="inline-flex px-6 py-3 rounded-full text-[11px] font-black uppercase border-2 border-[#ECECEA] bg-transparent hover:border-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="font-black text-xs">PAGE {page} OF {totalPages}</span>
        <button 
          onClick={() => {
            setPage(p => Math.min(totalPages, p + 1));
            document.getElementById('icon-library')?.scrollIntoView({ behavior: 'smooth' });
          }}
          disabled={page === totalPages}
          className="inline-flex px-6 py-3 rounded-full text-[11px] font-black uppercase border-2 border-[#ECECEA] bg-transparent hover:border-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Page
        </button>
      </div>
    </section>
  );
}
