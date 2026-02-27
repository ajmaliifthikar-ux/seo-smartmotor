import {
  LayoutDashboard,
  Brain,
  Zap,
  Share2,
  Search,
  FileText,
  Calendar,
  Wrench,
  Settings,
  BarChart3,
  MessageSquare,
  Users,
  Cpu,
  TrendingUp,
  Globe,
  Palette,
  Briefcase,
  Layers,
  Sparkles,
  Home,
  FileSearch,
  Scan,
  Database,
  Car,
  Award
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface NavSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

export const adminNavigation: NavSection[] = [
  // 1. SYSTEM OPERATIONS
  {
    id: 'system-ops',
    label: 'System Operations',
    icon: Settings,
    items: [
      {
        id: 'overview',
        label: 'Metrics Overview',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        id: 'utilities',
        label: 'Tools & Utilities',
        href: '/admin/tools',
        icon: Wrench,
      },
      {
        id: 'multimodal-ops',
        label: 'File Operations',
        href: '/admin/workbench/files',
        icon: Layers,
      },
      {
        id: 'google-integrations',
        label: 'Integrations Hub',
        href: '/admin/settings/integrations',
        icon: Cpu,
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
      {
        id: 'audit-logs',
        label: 'Admin Audit Logs',
        href: '/admin/system-operations/audit-logs',
        icon: FileText,
      },
    ],
  },

  // 2. HUMAN RESOURCES
  {
    id: 'human-resources',
    label: 'Human Resources',
    icon: Users,
    items: [
      {
        id: 'team-roster',
        label: 'Employee Roster',
        href: '/admin/basecamp/roster',
        icon: Users,
      },
      {
        id: 'office-hq',
        label: 'Office HQ / Knowledge',
        href: '/admin/basecamp/knowledge',
        icon: Home,
      },
    ],
  },

  // 3. CUSTOMER MANAGEMENT
  {
    id: 'customer-management',
    label: 'Customer Mgmt',
    icon: Briefcase,
    items: [
      {
        id: 'client-database',
        label: 'Client Database',
        href: '/admin/customers',
        icon: Database,
      },
      {
        id: 'loyalty-program',
        label: 'Loyalty Program',
        href: '/admin/loyalty',
        icon: Award,
      },
      {
        id: 'ai-copilot',
        label: 'Booking Coordinator',
        href: '/admin/workbench',
        icon: MessageSquare,
      },
    ],
  },

  // 4. ENGINEERING (Workshop Operations)
  {
    id: 'engineering',
    label: 'Engineering',
    icon: Wrench,
    items: [
      {
        id: 'qr-scanner',
        label: 'QR Scanner Portal',
        href: '/admin/engineering/scanner',
        icon: Scan,
      },
      {
        id: 'vehicle-histories',
        label: 'Vehicle Database',
        href: '/admin/engineering/vehicles',
        icon: Car,
      },
      {
        id: 'service-config',
        label: 'Service Slots & Catalog',
        href: '/admin/service-config',
        icon: Wrench,
      },
    ],
  },

  // 5. MARKETING & BUSINESS INTELLIGENCE
  {
    id: 'marketing-bi',
    label: 'Marketing & B.I.',
    icon: Brain,
    items: [
      {
        id: 'seo-intelligence',
        label: 'SEO Intelligence',
        href: '/admin/strategy-lab/seo',
        icon: FileSearch,
      },
      {
        id: 'market-researcher',
        label: 'Market Searcher',
        href: '/admin/strategy-lab/market',
        icon: Search,
      },
      {
        id: 'content-studio',
        label: 'Content Studio',
        href: '/admin/studio',
        icon: Palette,
      },
      {
        id: 'blog-manager',
        label: 'Blog Manager',
        href: '/admin/blog',
        icon: FileText,
      },
      {
        id: 'social-planner',
        label: 'Planning Calendar',
        href: '/admin/social-media/calendar-view',
        icon: Calendar,
      },
      {
        id: 'auto-posting',
        label: 'Auto Posting',
        href: '/admin/social-media/post-scheduler',
        icon: Zap,
      },
      {
        id: 'analytics-details',
        label: 'Full Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
      },
    ],
  },
]

export function getAllNavItems(): NavItem[] {
  return adminNavigation.flatMap((section) => section.items)
}

export function getCurrentNavItem(href: string): {
  section?: NavSection
  item?: NavItem
} {
  for (const section of adminNavigation) {
    const item = section.items.find((i) => i.href === href)
    if (item) {
      return { section, item }
    }
  }
  return {}
}
