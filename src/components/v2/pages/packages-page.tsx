'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Shield, Sun } from 'lucide-react'

const packages = [
  {
    id: 'premium-protection',
    title: 'Premium Automotive Protection',
    subtitle: 'Complete Vehicle Defense',
    image: '/packages/PREMIUM AUTOMOTIVE PROTECTION SOLUTIONS.jpeg',
    icon: <Shield className="w-8 h-8 text-brand-red" />,
    features: [
      'Lifetime Warranty Coverage',
      'Certified Installation',
      'Premium Grade Materials'
    ],
    highlight: 'Comprehensive Defense'
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film (PPF)',
    subtitle: 'Ultimate Defense with Lifetime Warranty',
    image: '/packages/PAINT PROTECTION FILM CPPF).jpeg',
    icon: <Shield className="w-8 h-8 text-brand-red" />,
    features: [
      'Full Body & Front-End Packages',
      'Self-Healing Technology',
      'UV & Yellowing Resistance',
      'High Gloss & Matte Finishes',
      'Lifetime Warranty Coverage'
    ],
    guarantees: ['No yellowing', 'No cracking', 'No peeling', 'No bubbling'],
    footer: 'Our lifetime warranty reflects our confidence in material quality and installation expertise.',
    highlight: 'Lifetime Warranty'
  },
  {
    id: 'window-tinting',
    title: 'Premium Window Tinting',
    subtitle: 'Ultimate Comfort & Privacy',
    image: '/packages/WINDOW TINTING.jpeg',
    icon: <Sun className="w-8 h-8 text-brand-red" />,
    features: [
      'Up to 99% UV Protection',
      'High Heat Rejection',
      'Enhanced Privacy',
      'UAE-Compliant Shade Options',
      '10-Year Warranty Coverage'
    ],
    guarantees: ['No fading', 'No peeling', 'No bubbling', 'No color change'],
    highlight: '10 Year Warranty'
  }
]

export function PackagesPageClient() {
  return (
    <div className="min-h-screen bg-brand-dark pb-24 px-6 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 micro-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-brand-red text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            Elite Care Solutions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none"
          >
            Protection <span className="text-brand-red">Packages</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/60 max-w-2xl mx-auto text-lg"
          >
            Military-grade protection and premium tinting solutions with industry-leading warranties.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="relative rounded-[2.5rem] overflow-hidden group h-full flex flex-col carbon-fiber border border-white/10 shadow-2xl"
            >
              {/* Image Header with Multiply Blend Mode */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gray-300">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    {pkg.highlight}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative flex-1 p-8 md:p-10 flex flex-col z-20 -mt-10">
                <div className="bg-[#1a1a1a] rounded-2xl w-16 h-16 flex items-center justify-center border border-white/10 shadow-xl mb-6">
                  {pkg.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-3">
                  {pkg.title}
                </h3>
                <p className="text-brand-red text-xs font-black uppercase tracking-[0.2em] mb-8">
                  {pkg.subtitle}
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {pkg.guarantees && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-4 group-hover:text-white">
                      The Smart Motor Guarantee
                    </p>
                    <div className="grid grid-cols-2 gap-y-3">
                      {pkg.guarantees.map((guarantee, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                          <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">{guarantee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.footer && (
                  <p className="text-gray-400 text-xs font-medium italic mb-8 border-l-2 border-brand-red pl-4">
                    "{pkg.footer}"
                  </p>
                )}

                <button className="w-full relative overflow-hidden bg-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-red transition-all shadow-xl mt-auto button-overlay z-10 group/btn">
                  <span className="relative z-20 pointer-events-none text-black group-hover/btn:text-white transition-colors duration-300">Book This Package</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}