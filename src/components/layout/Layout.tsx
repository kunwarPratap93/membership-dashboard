import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isDark,
  onToggleTheme,
  title,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 text-slate-900 dark:text-slate-100">
      
      {/* Navigation Sidebar Panel */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Workspace Frame */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          title={title}
        />
        
        {/* Scrollable Container Workspace */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 max-w-[1400px] w-full mx-auto">
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default Layout;
