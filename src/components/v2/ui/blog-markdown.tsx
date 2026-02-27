'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Quote, TrendingUp, ChevronDown, CheckCircle2, Shield, Wrench, Settings, Zap, InfoIcon } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, AreaChart, Area } from 'recharts'
import { motion } from 'framer-motion'

interface BlogMarkdownProps {
    content: string
}

const getHeaderIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('maintenance') || t.includes('repair') || t.includes('service')) return <Wrench className="text-brand-red" size={24} />;
    if (t.includes('safety') || t.includes('protection') || t.includes('secure')) return <Shield className="text-brand-red" size={24} />;
    if (t.includes('performance') || t.includes('power') || t.includes('engine')) return <Zap className="text-brand-red" size={24} />;
    if (t.includes('tip') || t.includes('guide') || t.includes('how')) return <InfoIcon className="text-brand-red" size={24} />;
    if (t.includes('technical') || t.includes('spec') || t.includes('data')) return <Settings className="text-brand-red" size={24} />;
    return <CheckCircle2 className="text-brand-red" size={24} />;
}

function ChartRenderer({ data, type = 'line' }: { data: any[], type?: string }) {
    const ChartComp = type === 'bar' ? BarChart : type === 'area' ? AreaChart : LineChart;
    const DataComp = type === 'bar' ? Bar : type === 'area' ? Area : Line;

    return (
        <div className="my-12 p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden relative group hover:shadow-xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="flex items-center gap-2 mb-8 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <TrendingUp size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Data Visualization</span>
            </div>
            <div className="h-[300px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <ChartComp data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }}
                        />
                        <RechartsTooltip 
                            contentStyle={{
                                borderRadius: '12px', 
                                border: 'none', 
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}
                        />
                        <DataComp 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#E62329" 
                            fill={type === 'area' ? "#E6232933" : "#E62329"} 
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#E62329', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </ChartComp>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const lang = match ? match[1] : '';
                    const isInline = !match;
                    
                    if (!isInline && lang === 'chart') {
                        try {
                            const data = JSON.parse(String(children).replace(/\n/g, ''));
                            return <ChartRenderer data={data.data} type={data.type} />
                        } catch (e) {
                            return <pre className="bg-red-50 p-4 rounded-xl text-red-500 text-xs font-mono overflow-auto">{String(children)}</pre>
                        }
                    }
                    
                    return isInline ? (
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-brand-red font-bold text-[0.9em]" {...props}>
                            {children}
                        </code>
                    ) : (
                        <pre className="bg-brand-dark rounded-2xl p-6 text-white text-sm font-mono overflow-auto my-8 border border-white/5 shadow-xl relative group">
                            <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-white/20 group-hover:text-brand-red transition-colors">{lang || 'code'}</div>
                            <code {...props}>{children}</code>
                        </pre>
                    );
                },
                table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                        <Table className="w-full text-sm">
                            {children}
                        </Table>
                    </div>
                ),
                thead: ({ children }) => <TableHeader className="bg-gray-50/50">{children}</TableHeader>,
                tbody: ({ children }) => <TableBody>{children}</TableBody>,
                tr: ({ children }) => <TableRow className="hover:bg-gray-50/30 transition-colors">{children}</TableRow>,
                th: ({ children }) => <TableHead className="font-black uppercase tracking-widest text-[10px] text-brand-dark py-4 px-6">{children}</TableHead>,
                td: ({ children }) => <TableCell className="py-4 px-6 text-gray-600 font-medium">{children}</TableCell>,
                ul: ({ children }) => <ul className="my-8 space-y-4 list-none p-0">{children}</ul>,
                ol: ({ children }) => <ol className="my-8 space-y-4 list-decimal pl-6">{children}</ol>,
                li: ({ children, ...props }) => {
                    const isUnordered = (props as any).node?.parent?.tagName === 'ul';
                    return (
                        <li className="text-gray-600 leading-relaxed flex items-start gap-3">
                            {isUnordered && <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 shrink-0" />}
                            <span>{children}</span>
                        </li>
                    )
                },
                h3: ({ children, ...props }) => {
                    const text = String(children);
                    return (
                        <div className="flex flex-col gap-4 mt-16 mb-8 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-red/5 border border-brand-red/10 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-brand-red/20">
                                    {getHeaderIcon(text)}
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-brand-dark italic m-0" {...props}>{children}</h3>
                            </div>
                            <div className="h-1.5 w-24 bg-brand-red/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "0%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full w-full bg-brand-red"
                                />
                            </div>
                        </div>
                    )
                },
                p: ({ children, ...props }) => {
                    const allParagraphs = (props as any).node?.parent?.children?.filter((c: any) => c.type === 'element' && c.tagName === 'p');
                    const isFirstParagraph = allParagraphs && allParagraphs[0] === (props as any).node;
                    const isTopLevel = (props as any).node?.parent?.type === 'root';

                    return (
                        <p className={cn(
                            "mb-8 last:mb-0 text-gray-600 leading-[1.8] text-lg font-medium text-balance",
                            isFirstParagraph && isTopLevel && "first-letter:text-6xl first-letter:font-black first-letter:text-brand-red first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2"
                        )}>
                            {children}
                        </p>
                    )
                },
                // Custom Accordion using HTML details/summary
                details: ({ children }) => (
                    <details className="group my-6 border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow [&_p]:px-6 [&_ul]:px-6 [&_ol]:px-6 [&_div]:px-6">
                        {children}
                    </details>
                ),
                summary: ({ children }) => (
                    <summary className="bg-gray-50 px-6 py-4 font-black uppercase tracking-widest text-xs text-brand-dark cursor-pointer flex items-center justify-between list-none hover:bg-gray-100 transition-colors [&::-webkit-details-marker]:hidden outline-none focus:bg-gray-100 group-open:border-b border-gray-100">
                        {children}
                        <ChevronDown className="w-4 h-4 text-brand-red transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                ),
                blockquote: ({ children }) => (
                    <div className="my-16 relative py-10 px-12 border-l-4 border-brand-red bg-gray-50 rounded-r-[2.5rem] overflow-hidden group hover:shadow-lg transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -mr-16 -mt-16" />
                        <Quote className="absolute top-6 left-6 text-brand-red/10 w-20 h-20 -z-10" />
                        <div className="text-2xl font-black text-brand-dark italic leading-relaxed m-0 relative z-10 font-serif opacity-90 text-balance">
                            {children}
                        </div>
                    </div>
                ),
                hr: () => <hr className="my-16 border-gray-100" />,
                img: ({ src, alt }) => (
                    <figure className="my-16 group">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img src={src} alt={alt} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        {alt && <figcaption className="mt-6 text-center text-xs font-black uppercase tracking-widest text-gray-400 italic px-4 border-l border-r border-gray-100 mx-auto w-fit">{alt}</figcaption>}
                    </figure>
                ),
                strong: ({ children }) => <strong className="font-black text-brand-dark">{children}</strong>,
                a: ({ children, href }) => (
                    <a href={href} className="text-brand-red font-bold underline decoration-brand-red/30 underline-offset-4 hover:decoration-brand-red transition-all">
                        {children}
                    </a>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
