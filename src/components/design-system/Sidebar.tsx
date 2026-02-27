'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: 'colors', label: '1. Brand Colors' },
  { id: 'typography', label: '2. Typography System' },
  { id: 'logos', label: '3. Logos & Clear Space' },
  { id: 'social', label: '4. Social Ecosystem' },
  { id: 'post-elements', label: '5. Post Graphics (Vector)' },
  { id: 'textured-buttons', label: '6. Textured UI Buttons' },
  { id: 'brand-textures', label: '7. Brand Textures' },
  { id: 'interactive-elements', label: '8. Interactive Elements' },
  { id: 'media', label: '9. Motion & Animation' },
  { id: 'icon-library', label: '10. Universal Icon Library' },
];

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-[280px] h-screen bg-[#121212] text-white p-10 overflow-y-auto z-50 border-r border-white/5">
      <img 
        src="/design-system/branding/logo.png" 
        alt="Logo" 
        className="w-[140px] mb-10 invert brightness-0" 
        onError={(e) => (e.currentTarget.src = '/design-system/Logo/logo.png')}
      />
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-left px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] transition-all
              ${activeSection === item.id 
                ? 'bg-white/10 text-white' 
                : 'text-[#A3A3A3] hover:bg-white/10 hover:text-white'
              }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
