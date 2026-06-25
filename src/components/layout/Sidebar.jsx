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

export const Sidebar = ({ isOpen, onClose }) => {
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
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                MemberPro
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Dashboard</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    item.active
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer Help Section */}
        <div className="px-3 py-3 border-t border-slate-100 dark:border-slate-800">
          <a
            href="#"
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium">Help & Support</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
