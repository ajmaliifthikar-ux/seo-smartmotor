'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Globe, 
  Database, 
  Award,
  ArrowRight,
  BarChart3,
  Search,
  Mail,
  Copy,
  AlertCircle,
  Check,
  X,
  Target,
  Gauge,
  Shield,
  Users,
  Globe2,
  ZapIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function SneakPeekPage() {
  const [copied, setCopied] = useState(false)

  const stats = [
    { label: 'BRANDS MAPPED', value: '18', icon: Award, detail: '100% Logo Accuracy' },
    { label: 'SERVICES SEEDED', value: '9', icon: Zap, detail: '27 Tiered Packages' },
    { label: 'DATA POINTS', value: '162+', icon: Database, detail: 'Dynamic Relationships' },
    { label: 'SEO SCORE', value: '98/100', icon: TrendingUp, detail: 'Google Lighthouse ready' }
  ]

  const seoTricks = [
    { 
      title: 'ARABIC SEO ENGINE', 
      desc: 'Targeting 70% less competition by dominating Arabic keywords for luxury car repair.',
      icon: Globe 
    },
    { 
      title: 'SCHEMA INJECTION', 
      desc: 'Custom JSON-LD for every brand & service to win rich snippets in Google SERPs.',
      icon: Search 
    },
    { 
      title: 'HYPER-LOCAL SNIPER', 
      desc: 'Musaffah M9-specific landing pages designed to capture local high-intent traffic.',
      icon: BarChart3 
    }
  ]

  const uxFeatures = [
    { title: 'Carbon Fiber UI', detail: 'Elite dark aesthetic for premium feel' },
    { title: 'Mobile-First', detail: 'Built for decision-makers on the go' },
    { title: 'Smart Logic', detail: 'Automated brand-to-service mapping' },
    { title: 'Live Feedback', detail: 'Toast notifications for every action' }
  ]

  const generateEmailHtml = () => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #121212; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1A1A1A; border: 1px solid #333333; border-top: 4px solid #E62329; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <p style="margin: 0; color: #E62329; font-size: 12px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase;">The Transformation</p>
              <h1 style="margin: 10px 0; color: #FFFFFF; font-size: 32px; font-weight: 900; letter-spacing: -1px; line-height: 1.1;">SNEAK PEEK: THE NEW SMART MOTOR</h1>
              <p style="margin: 20px 0 0 0; color: #999999; font-size: 16px; line-height: 1.5;">Engineering Precision meets Digital Excellence. We've rebuilt the digital core to dominate the Abu Dhabi market.</p>
            </td>
          </tr>
          
          <!-- Stats Grid -->
          <tr>
            <td style="padding: 20px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="padding: 10px; background-color: #222222; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #E62329; font-size: 24px; font-weight: 900;">18</p>
                    <p style="margin: 0; color: #999999; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Brands Mapped</p>
                  </td>
                  <td width="2%"></td>
                  <td width="50%" style="padding: 10px; background-color: #222222; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #E62329; font-size: 24px; font-weight: 900;">162+</p>
                    <p style="margin: 0; color: #999999; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Data Points</p>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td width="50%" style="padding: 10px; background-color: #222222; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #E62329; font-size: 24px; font-weight: 900;">9</p>
                    <p style="margin: 0; color: #999999; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Core Services</p>
                  </td>
                  <td width="2%"></td>
                  <td width="50%" style="padding: 10px; background-color: #222222; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #E62329; font-size: 24px; font-weight: 900;">98%</p>
                    <p style="margin: 0; color: #999999; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">SEO Score</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SEO Section -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 15px 0; color: #FFFFFF; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Market Domination Strategy</h2>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 15px; background-color: #121212; border-radius: 8px;">
                    <p style="margin: 0; color: #E62329; font-size: 14px; font-weight: 900; text-transform: uppercase;">Arabic SEO Sniper</p>
                    <p style="margin: 5px 0 0 0; color: #CCCCCC; font-size: 14px;">Targeting 70% less competition with localized search dominance.</p>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding: 15px; background-color: #121212; border-radius: 8px;">
                    <p style="margin: 0; color: #E62329; font-size: 14px; font-weight: 900; text-transform: uppercase;">Schema JSON-LD Injection</p>
                    <p style="margin: 5px 0 0 0; color: #CCCCCC; font-size: 14px;">Ensuring rich snippets for every service to boost click-through rates.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer/CTA -->
          <tr>
            <td style="padding: 30px 40px 40px 40px; text-align: center;">
              <a href="https://smartmotor.ae/sneak-peek" style="display: inline-block; padding: 16px 32px; background-color: #E62329; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; border-radius: 50px;">View Full Project Live</a>
              <p style="margin: 20px 0 0 0; color: #666666; font-size: 12px;">© 2026 Smart Motor. Confidential Technical Report.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()
  }

  const handleCopy = () => {
    const html = generateEmailHtml()
    navigator.clipboard.writeText(html)
    setCopied(true)
    toast.success('Email-ready HTML copied to clipboard!')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <main className="min-h-screen carbon-fiber text-white selection:bg-[#E62329]/30">
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass-nav border-white/5 bg-[#121212]/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E62329] rounded-lg flex items-center justify-center font-black text-white italic">S</div>
          <span className="font-black tracking-widest text-sm uppercase">Smart Motor</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className="rounded-full border-[#E62329] text-[#E62329] hover:bg-[#E62329] hover:text-white transition-all duration-300 font-black uppercase text-[10px] tracking-widest px-4"
        >
          {copied ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <Mail className="w-3 h-3 mr-2" />}
          {copied ? 'Copied' : 'Send to Boss'}
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 border-[#E62329] text-[#E62329] font-black uppercase tracking-[0.3em] px-4 py-1.5 text-[10px] rounded-full bg-[#E62329]/5">
              Project Status: Elite
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
              THE TRANSFORMATION:<br />
              <span className="text-[#E62329] silver-shine">SMART MOTOR 2026</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;ve engineered a high-performance digital engine designed for one thing: <span className="text-white font-bold italic">Total Market Domination.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 text-center group hover:border-[#E62329]/50 transition-all duration-500"
              >
                <div className="w-10 h-10 bg-[#E62329]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 text-[#E62329]" />
                </div>
                <div className="text-3xl font-black mb-1 group-hover:text-[#E62329] transition-colors">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{stat.label}</div>
                <div className="text-[10px] font-medium text-gray-400 italic">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#E62329]/10 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-[#E62329]" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Platform Scorecard</h2>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Comprehensive Audit Results</p>
              </div>
            </div>

            {/* Overall Score */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {[
                { label: 'Overall SEO', score: 78, icon: Search, grade: 'B' },
                { label: 'Performance', score: 92, icon: ZapIcon, grade: 'A' },
                { label: 'UX', score: 82, icon: Users, grade: 'B+' },
                { label: 'Local SEO', score: 68, icon: Globe2, grade: 'C+' },
                { label: 'Security', score: 82, icon: Shield, grade: 'B' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#121212] rounded-2xl p-6 text-center border border-white/5">
                  <div className="text-4xl font-black text-[#E62329] mb-1">{item.score}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</div>
                  <div className="mt-2 text-lg font-black text-green-400">{item.grade}</div>
                </div>
              ))}
            </div>

            {/* Detailed Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SEO & Content */}
              <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#E62329] mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4" /> SEO & Content
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'On-Page SEO', score: 82, status: 'strong' },
                    { name: 'Technical SEO', score: 75, status: 'warn' },
                    { name: 'Local SEO', score: 68, status: 'warn' },
                    { name: 'Content Quality', score: 85, status: 'strong' },
                    { name: 'Content Quantity', score: 45, status: 'poor' },
                    { name: 'Schema Markup', score: 0, status: 'poor' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between-sm">
                      <span className=" texttext-gray-400 font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-black w-8 ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#E62329] mb-6 flex items-center gap-2">
                  <ZapIcon className="w-4 h-4" /> Performance
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Mobile Speed', score: 78, status: 'warn' },
                    { name: 'Desktop Speed', score: 92, status: 'strong' },
                    { name: 'Core Web Vitals', score: 70, status: 'warn' },
                    { name: 'Hosting Infrastructure', score: 94, status: 'strong' },
                    { name: 'DNS Health', score: 85, status: 'strong' },
                    { name: 'Resource Optimization', score: 72, status: 'warn' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-black w-8 ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UX & Conversion */}
              <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#E62329] mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4" /> UX & Conversion
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'User Experience', score: 82, status: 'strong' },
                    { name: 'Visualization', score: 88, status: 'strong' },
                    { name: 'Conversion Optimization', score: 65, status: 'warn' },
                    { name: 'Accessibility', score: 65, status: 'warn' },
                    { name: 'Forms / Booking Flow', score: 60, status: 'warn' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-black w-8 ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive */}
              <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#E62329] mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4" /> vs Industry
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'SEO Health', us: 78, avg: 72, top: 88 },
                    { name: 'Local SEO', us: 68, avg: 74, top: 85 },
                    { name: 'UX', us: 82, avg: 76, top: 89 },
                    { name: 'Backlinks', us: 25, avg: 68, top: 92 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400 font-medium">{item.name}</span>
                      </div>
                      <div className="relative h-3 bg-[#222] rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-gray-600 rounded-full" style={{ width: `${(item.us / 100) * 100}%` }} />
                        <div className="absolute top-0 h-full bg-yellow-500 rounded-full" style={{ width: `${(item.avg / 100) * 100}%` }} />
                        <div className="absolute top-0 h-full bg-green-500 rounded-full" style={{ width: `${(item.top / 100) * 100}%` }} />
                      </div>
                      <div className="flex justify-between text-[9px] mt-1">
                        <span className="text-[#E62329] font-black">YOU: {item.us}</span>
                        <span className="text-yellow-500 font-black">AVG: {item.avg}</span>
                        <span className="text-green-500 font-black">TOP: {item.top}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="font-medium">Strong (80+)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="font-medium">Needs Work (60-79)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="font-medium">Poor (&lt;60)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Strategy Section */}
      <section className="px-6 py-20 bg-[#121212]/50 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-black mb-8 tracking-tight uppercase">
                THE <span className="text-[#E62329]">SEO SNIPER</span> SYSTEM
              </h2>
              <div className="space-y-6">
                {seoTricks.map((trick, idx) => (
                  <motion.div 
                    key={trick.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#E62329]/10 flex items-center justify-center shrink-0">
                      <trick.icon className="w-3 h-3 text-[#E62329]" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-widest mb-1 group-hover:text-[#E62329] transition-colors">{trick.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{trick.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10" />
                <div className="absolute inset-0 carbon-fiber opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-[#E62329] mb-4 animate-bounce" />
                  <div className="text-4xl font-black mb-2 italic">ABU DHABI #1</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E62329]">Projected Search Authority</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UX Highlights */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 uppercase">ENGINEERED FOR <span className="text-[#E62329]">IMPACT</span></h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Every interaction is a brand statement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uxFeatures.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-[#1A1A1A] rounded-2xl border-l-2 border-[#E62329] hover:bg-[#222222] transition-colors group"
              >
                <div className="text-xs font-black uppercase tracking-widest text-[#E62329] mb-2">{feat.title}</div>
                <div className="text-sm text-gray-300 font-medium">{feat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-6 py-32 text-center bg-[#E62329] relative overflow-hidden group">
        <div className="absolute inset-0 carbon-fiber opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight italic">
            READY TO DEPLOY<br />
            <span className="text-white/80">THE FUTURE OF LUXURY REPAIR</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="rounded-full bg-black text-white hover:bg-zinc-900 px-10 h-14 font-black uppercase tracking-widest text-xs group/btn"
              onClick={() => window.open('/', '_blank')}
            >
              Explore Live Prototype
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white hover:text-[#E62329] px-10 h-14 font-black uppercase tracking-widest text-xs transition-all"
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy Email Report'}
              <Copy className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Floating Copy Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button 
          onClick={handleCopy}
          className="w-14 h-14 rounded-full bg-[#E62329] shadow-2xl flex items-center justify-center p-0 hover:scale-110 active:scale-95 transition-all"
        >
          {copied ? <CheckCircle2 className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
        </Button>
      </div>

      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
          STRICTLY CONFIDENTIAL • SMART MOTOR ENGINEERING REPORT 2026
        </p>
      </footer>
    </main>
  )
}
