'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BarChart3, 
  Globe, 
  MapPin, 
  Tag, 
  TrendingUp, 
  Search, 
  ExternalLink,
  Code2,
  Settings2,
  CheckCircle2,
  Copy
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function GoogleCommandCenter() {
  const tabs = [
    {
      id: 'business',
      label: 'Business Profile',
      content: <BusinessTab />
    },
    {
      id: 'analytics',
      label: 'Analytics & SEO',
      content: <AnalyticsTab />
    },
    {
      id: 'tags',
      label: 'Tags & Ads',
      content: <TagsTab />
    },
    {
      id: 'maps',
      label: 'Maps & Places',
      content: <MapsTab />
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-dark">
          Google Integrations <span className="text-brand-red">Command Center</span>
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Centralized management for Smart Motor's Google ecosystem. Monitor business presence, 
          track SEO performance, and manage advertising tags.
        </p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  )
}

function SectionHeader({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-brand-dark p-3 rounded-2xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-black uppercase tracking-widest text-sm text-brand-dark">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}

function CredentialField({ label, value, description }: { label: string, value: string, description?: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input 
            readOnly 
            value={value} 
            className="bg-gray-50 border-gray-100 rounded-xl font-mono text-xs pr-10"
          />
          <button 
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
      {description && <p className="text-[10px] text-gray-400 italic">{description}</p>}
    </div>
  )
}

function BusinessTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
        <SectionHeader 
          title="Google Business Profile" 
          description="Manage your local business presence and support IDs."
          icon={MapPin}
        />
        <div className="space-y-6">
          <CredentialField 
            label="Business Profile ID" 
            value="13422713370771878630" 
            description="Unique identifier for Smart Motor's primary location."
          />
          <CredentialField 
            label="Shop Code" 
            value="02376026792070482670" 
            description="Internal code associated with the Business Profile."
          />
          <div className="pt-4 border-t border-gray-50 flex gap-4">
            <Button variant="outline" className="rounded-full w-full uppercase text-[10px] font-black tracking-widest h-12">
              <ExternalLink className="w-3 h-3 mr-2" />
              Manage Profile
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-brand-dark text-white rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <MapPin className="w-32 h-32" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="font-black uppercase tracking-widest text-sm mb-2">Profile Status</h3>
            <div className="flex items-center gap-2 text-green-400 mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Verified & Live</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              Your business profile is correctly configured. Smart Motor is visible on Google Search and Maps for local automotive repair queries in the UAE.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="block text-[10px] text-gray-500 uppercase font-black mb-1">Reviews</span>
              <span className="text-2xl font-black">4.9</span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="block text-[10px] text-gray-500 uppercase font-black mb-1">Visibility</span>
              <span className="text-2xl font-black">+24%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <SectionHeader 
            title="Google Analytics 4" 
            description="Track traffic, user behavior, and conversions."
            icon={BarChart3}
          />
          <CredentialField label="Property ID" value="524841403" />
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-gray-400">Status</span>
              <span className="text-[10px] font-black uppercase text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-gray-400">Data Stream</span>
              <span className="text-[10px] font-black uppercase text-gray-600">Smart Motor Web</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <SectionHeader 
            title="Search Console" 
            description="Monitor indexing, crawl errors, and search rankings."
            icon={Search}
          />
          <div className="space-y-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Connected to <code className="text-brand-red font-bold">smartmotor.ae</code>.
              Automated indexing is enabled for all new blog posts and service pages.
            </p>
            <Button className="w-full rounded-full bg-brand-dark hover:bg-brand-red uppercase font-black tracking-widest text-[10px] h-12">
              <Search className="w-3 h-3 mr-2" />
              Check Indexing Status
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <SectionHeader 
            title="Trends & SEO" 
            description="Research tools for market positioning."
            icon={TrendingUp}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:border-brand-red transition-all cursor-pointer group">
              <span className="text-xs font-bold text-gray-600">Google Trends UAE</span>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand-red" />
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:border-brand-red transition-all cursor-pointer group">
              <span className="text-xs font-bold text-gray-600">Keywords Planner</span>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand-red" />
            </div>
            <p className="text-[10px] text-gray-400 italic">
              Use these tools for SEO research workflows. No credentials required for public access.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-8 border-none shadow-sm bg-brand-bg border-2 border-dashed border-gray-200 rounded-3xl text-center">
        <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-gray-400">SEO Integration Live</h4>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Deep integration with Google Search Console and Analytics allows the Smart Motor AI to automatically optimize metadata based on real-time ranking data.
        </p>
      </Card>
    </div>
  )
}

function TagsTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
        <SectionHeader 
          title="Google Tag Manager" 
          description="Manage tracking codes and third-party scripts."
          icon={Tag}
        />
        <div className="space-y-6">
          <CredentialField label="Container ID" value="GTM-MN8BGVZ2" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Head Snippet</label>
              <Button variant="ghost" className="h-6 px-2 text-[10px] uppercase font-black">Copy Code</Button>
            </div>
            <div className="bg-brand-dark p-4 rounded-2xl">
              <code className="text-[10px] text-gray-400 block whitespace-pre overflow-x-auto">
                {`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MN8BGVZ2');</script>
<!-- End Google Tag Manager -->`}
              </code>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <SectionHeader 
            title="Google Ads" 
            description="Campaign management and conversion tracking."
            icon={BarChart3}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-brand-red/5 border border-brand-red/10 rounded-2xl">
              <div className="bg-brand-red p-2 rounded-lg">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-brand-red">Ads ID</span>
                <span className="text-sm font-bold text-brand-dark">AW-11086269452</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Conversion Tags</span>
              <div className="grid grid-cols-1 gap-2">
                {['Booking Success', 'Phone Call Lead', 'WhatsApp Click'].map(tag => (
                  <div key={tag} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-bold text-gray-600">{tag}</span>
                    <span className="text-[10px] font-black uppercase text-blue-500">Linked</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        <div className="bg-gradient-to-br from-brand-dark to-[#242424] p-6 rounded-3xl text-white">
          <h4 className="font-black uppercase tracking-widest text-sm mb-4">Ad Performance</h4>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-black">AED 14.2</span>
            <span className="text-[10px] text-gray-500 uppercase font-black mb-1">Avg CPC</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
            Campaign: Luxury Service Abu Dhabi <br/>
            Status: <span className="text-green-500">Active</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function MapsTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
        <SectionHeader 
          title="Google Maps & Places" 
          description="API keys for location services and address completion."
          icon={Globe}
        />
        <div className="space-y-6">
          <CredentialField 
            label="Maps API Key" 
            value="AIzaSyCXwc-oklmk1Ss1Ah3zanMp5iDCv5GWAk0" 
            description="Restricted to Smart Motor domains."
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">HTML Structure</label>
              <div className="bg-gray-900 p-4 rounded-2xl">
                <code className="text-[9px] text-gray-400 block whitespace-pre overflow-x-auto">
{`<div id="map"></div>
<div id="place-details"></div>`}
                </code>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">CSS Styling</label>
              <div className="bg-gray-900 p-4 rounded-2xl">
                <code className="text-[9px] text-gray-400 block whitespace-pre overflow-x-auto">
{`#map {
  height: 400px;
  width: 100%;
  border-radius: 1.5rem;
}
.place-card {
  padding: 1.5rem;
  background: white;
  border: 1px solid #ECECEA;
}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm bg-brand-dark rounded-3xl h-48 flex flex-col items-center justify-center text-center">
          <MapPin className="w-8 h-8 text-brand-red mb-4" />
          <h4 className="text-white font-black uppercase tracking-widest text-xs">Interactive Map Preview</h4>
          <p className="text-gray-500 text-[10px] mt-2">Map will render here in live environment</p>
        </Card>
        
        <div className="bg-white p-6 border-none shadow-sm rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-50 p-2 rounded-xl">
               <Settings2 className="w-4 h-4 text-blue-600" />
             </div>
             <span className="text-xs font-black uppercase tracking-widest text-brand-dark">API Restrictions</span>
          </div>
          <ul className="space-y-2">
            {[
              'Restricted to smartmotor.ae',
              'Places API enabled',
              'Directions API enabled',
              'Static Maps enabled'
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                <div className="w-1 h-1 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
