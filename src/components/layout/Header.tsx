import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, X, CheckCircle } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  title?: string;
}

const NOTIFICATIONS = [
  { id: 1, text: 'Alice Johnson upgraded to Enterprise', time: '2m ago', read: false },
  { id: 2, text: 'New member Bob Martinez joined', time: '14m ago', read: false },
  { id: 3, text: "Clara Singh's membership expired", time: '1h ago', read: true },
  { id: 4, text: 'Revenue milestone: $18,700 reached', time: '3h ago', read: true },
];

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isDark,
  onToggleTheme,
  title = 'Membership Portal',
}) => {
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900 md:px-6 shadow-sm">

      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden cursor-pointer transition-colors"
          aria-label="Toggle Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-bold text-slate-900 dark:text-white md:text-xl tracking-tight leading-none">
          {title}
        </h1>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-2">

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Notification Bell */}
        <div ref={bellRef} className="relative">
          <button
            onClick={() => setBellOpen((prev) => !prev)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-500" />
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {bellOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                  Notifications {unreadCount > 0 && <span className="ml-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">({unreadCount} new)</span>}
                </span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setBellOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <ul className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors ${
                      n.read
                        ? 'bg-white dark:bg-slate-900'
                        : 'bg-indigo-50/50 dark:bg-indigo-950/20'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        n.read ? 'text-slate-300 dark:text-slate-600' : 'text-indigo-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`leading-snug ${n.read ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-100 font-medium'}`}>
                        {n.text}
                      </p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 block">{n.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div
          className="h-9 w-9 overflow-hidden rounded-full border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-600 flex items-center justify-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
          title="Admin User"
        >
          <span className="text-white font-bold text-sm select-none">A</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
