import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  X, 
  ShieldCheck, 
  HelpCircle,
  FolderLock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '#', active: false },
    { label: 'Members Directory', icon: Users, href: '#', active: true },
    { label: 'Analytics', icon: BarChart3, href: '#', active: false },
    { label: 'Security & Access', icon: FolderLock, href: '#', active: false },
    { label: 'System Settings', icon: Settings, href: '#', active: false },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-white px-4 py-5 shadow-sm transition-transform duration-300 dark:border-slate-800/80 dark:bg-slate-900 md:sticky md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Logo & Close Menu button */}
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-650/20">
              <ShieldCheck className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                MemberFlow
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                SaaS Dashboard
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 md:hidden cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 space-y-1.5 px-1 mt-4">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                  ${
                    item.active
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm shadow-indigo-600/5'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-850/60 dark:hover:text-slate-200'
                  }
                `}
              >
                <Icon
                  className={`
                    w-4.5 h-4.5 transition-colors
                    ${
                      item.active
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-350'
                    }
                  `}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Bottom promo / help card */}
        <div className="mt-auto px-1 pt-4 border-t border-slate-100 dark:border-slate-805">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-900/60">
            <div className="flex items-center gap-2 text-slate-650 dark:text-slate-300">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">Take-Home Test</span>
            </div>
            <p className="text-[11px] text-slate-550 dark:text-slate-400 mt-1.5 leading-normal">
              Software Engineering Intern coding challenge submission.
            </p>
            <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>v1.0.0</span>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Documentation</a>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
