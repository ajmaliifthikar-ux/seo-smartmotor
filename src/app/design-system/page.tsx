'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/design-system/Sidebar';
import Colors from '@/components/design-system/Colors';
import Typography from '@/components/design-system/Typography';
import Logos from '@/components/design-system/Logos';
import SocialIcons from '@/components/design-system/SocialIcons';
import PostGraphics from '@/components/design-system/PostGraphics';
import TexturedButtons from '@/components/design-system/TexturedButtons';
import BrandTextures from '@/components/design-system/BrandTextures';
import InteractiveElements from '@/components/design-system/InteractiveElements';
import MotionAssets from '@/components/design-system/MotionAssets';
import IconLibrary from '@/components/design-system/IconLibrary';

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('colors');

  return (
    <div className="flex min-h-screen bg-[#FAFAF9] text-[#121212] font-sans">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="ml-[280px] p-20 max-w-[1400px] w-full">
        <Colors />
        <Typography />
        <Logos />
        <SocialIcons />
        <PostGraphics />
        <TexturedButtons />
        <BrandTextures />
        <InteractiveElements />
        <MotionAssets />
        <IconLibrary />
      </main>
    </div>
  );
}
