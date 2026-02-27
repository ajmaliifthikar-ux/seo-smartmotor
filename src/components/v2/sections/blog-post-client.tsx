'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight, Quote, Activity, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import dynamic from 'next/dynamic'
import { BlogPost } from '@/types'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { BlogMarkdown } from '@/components/v2/ui/blog-markdown'

const BookingForm = dynamic(() => import('@/components/v2/sections/booking-form').then((mod) => mod.BookingForm), { ssr: false })

interface BlogPostClientProps {
    post: BlogPost
    relatedPosts: BlogPost[]
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    const authorName = typeof post.author === 'string' ? post.author : post.author.name
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        }
        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                navigator.clipboard.writeText(window.location.href)
                toast.success('Link copied to clipboard')
            }
        } catch (err) {
            console.error('Error sharing:', err)
        }
    }

    return (
        <main className="min-h-screen bg-[#Fdfdfd] relative">
            <Navbar />

            {/* Reading Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* ─── Magazine Hero (Immersive) ─── */}
            <section ref={targetRef} className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-[#0A0A0A]">
                <motion.div 
                    style={{ opacity, scale, y }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />
                    <img
                        src={post.image || '/images/blog/textures/carbon-leak.png'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Hero Content */}
                <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl"
                    >
                        {/* Meta Badge */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg border border-brand-red/50 backdrop-blur-md flex items-center gap-2">
                                <Sparkles size={12} /> {post.category || 'Insight'}
                            </span>
                            <span className="h-px w-12 bg-white/30" />
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock size={14} className="text-brand-red" /> 5 Min Read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 drop-shadow-2xl">
                            {post.title}
                        </h1>

                        {/* Author Bar */}
                        <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red border border-white/20 backdrop-blur-sm">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Author</p>
                                    <p className="text-white font-bold tracking-wide uppercase text-sm">{authorName}</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Published</p>
                                    <p className="text-white font-bold tracking-wide uppercase text-sm">{post.date}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Magazine Content Layout ─── */}
            <section className="relative z-30 -mt-12 md:-mt-20 pb-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* Sidebar (Desktop) */}
                        <div className="hidden lg:block lg:col-span-3 pt-32 space-y-12 sticky top-8 h-fit">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share Insight</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleShare}
                                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                    <button 
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`)}
                                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all shadow-sm"
                                    >
                                        <Twitter size={18} />
                                    </button>
                                    <button 
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}
                                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all shadow-sm"
                                    >
                                        <Linkedin size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-brand-dark text-white shadow-xl relative overflow-hidden group/cta">
                                <div className="absolute inset-0 bg-[url('/images/blog/textures/carbon-leak.png')] opacity-30 bg-cover bg-center transition-transform duration-700 group-hover/cta:scale-110" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-lg bg-brand-red flex items-center justify-center mb-4 shadow-lg">
                                        <Activity size={20} className="text-white animate-pulse" />
                                    </div>
                                    <p className="text-brand-red font-black uppercase tracking-widest text-[9px] mb-2">Technical Assistance</p>
                                    <h3 className="text-xl font-bold mb-4 italic tracking-tight">Need Expert <br /> Advice?</h3>
                                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">Our master technicians specialize in {post.category || 'luxury vehicle'} engineering and restoration.</p>
                                    <Link href="#booking" className="flex items-center justify-center gap-2 w-full py-4 bg-white text-brand-dark text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all shadow-xl group/btn">
                                        Secure Slot <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 lg:col-start-4">
                            <div className="bg-white rounded-t-[3rem] p-8 md:p-16 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] relative border border-gray-100/50">
                                {/* Paper Texture Overlay */}
                                <div className="absolute inset-0 bg-[url('/images/blog/textures/paper-grain.png')] opacity-40 pointer-events-none rounded-t-[3rem] mix-blend-multiply" />
                                
                                <div className="relative z-10">
                                    {/* Back Link Mobile */}
                                    <Link href="/smart-tips" className="lg:hidden inline-flex items-center gap-2 text-gray-400 hover:text-brand-red mb-8 transition-colors text-[10px] font-black uppercase tracking-widest">
                                        <ArrowLeft size={14} /> Back to Tips
                                    </Link>

                                    {/* Excerpt */}
                                    <p className="text-xl md:text-2xl font-medium text-brand-dark leading-relaxed mb-12 font-serif italic opacity-80">
                                        {post.excerpt}
                                    </p>

                                    {/* Drop Cap Body */}
                                    <article className="prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-brand-dark prose-p:text-gray-600 prose-p:leading-8 prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-dark prose-img:rounded-3xl max-w-none font-medium">
                                        <BlogMarkdown content={post.content} />
                                    </article>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── Related Articles (Dark Mode) ─── */}
            <section className="py-24 bg-[#111] text-white border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/blog/textures/carbon-leak.png')] opacity-10 bg-cover bg-fixed mix-blend-overlay" />
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Read Next</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Related <span className="text-gray-600">Insights</span></h2>
                        </div>
                        <Link href="/smart-tips" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-brand-red transition-colors border border-white/20 px-6 py-3 rounded-full hover:bg-white/5">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPosts.map((rPost, index) => (
                            <motion.div
                                key={rPost.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/smart-tips/${rPost.slug}`} className="block">
                                    <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                                        <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-colors duration-500 z-10" />
                                        <img
                                            src={rPost.image || '/bg-placeholder.jpg'}
                                            alt={rPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                                                {rPost.category}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-3 text-white group-hover:text-brand-red transition-colors">
                                        {rPost.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                        {rPost.excerpt}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <BookingForm />
            <Footer />
        </main>
    )
}
