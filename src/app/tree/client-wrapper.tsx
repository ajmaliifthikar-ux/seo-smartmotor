'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, FileText, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TreeItem({ node, level = 0 }: { node: any; level?: number }) {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100/50 rounded-lg transition-colors group",
          level === 0 && "mt-2"
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
      >
        {/* Expand/Collapse Chevron */}
        {hasChildren ? (
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <span className="w-5 h-5" /> // Spacer
        )}

        {/* Icon */}
        <div className="flex-shrink-0">
          {node.icon ? node.icon : <FileText className="w-4 h-4 text-gray-400" />}
        </div>

        {/* Title & Link */}
        {node.href ? (
          <Link 
            href={node.href} 
            className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors flex items-center gap-2"
            target={node.href.startsWith('/admin') ? '_blank' : '_self'}
          >
            {node.title}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <span className="text-sm font-bold text-brand-dark">{node.title}</span>
        )}

        {/* Badges */}
        {node.isDynamic && (
          <span className="text-[9px] uppercase tracking-widest bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm ml-2 font-bold">
            Dynamic Route
          </span>
        )}
      </div>

      {/* Children Recursion */}
      {hasChildren && isOpen && (
        <div className="relative">
          {/* Vertical connecting line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" 
            style={{ left: `${level * 1.5 + 1.1}rem` }}
          />
          <div className="flex flex-col">
            {node.children.map((child: any, idx: number) => (
              <TreeItem key={idx} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function TreeClientWrapper({ nodes }: { nodes: any[] }) {
  return (
    <>
      {nodes.map((node, idx) => (
        <TreeItem key={idx} node={node} />
      ))}
    </>
  )
}
