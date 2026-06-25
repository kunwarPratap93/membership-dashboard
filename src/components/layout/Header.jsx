import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, X, CheckCircle } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, text: 'Alice Johnson upgraded to Enterprise', time: '2m ago', read: false },
  { id: 2, text: 'New member Bob Martinez joined', time: '14m ago', read: false },
  { id: 3, text: "Clara Singh's membership expired", time: '1h ago', read: true },
  { id: 4, text: 'Revenue milestone: $18,700 reached', time: '3h ago', read: true },
];

export const Header = ({
  onToggleSidebar,
  isDark,
  onToggleTheme,
  title = 'Membership Portal',
}) => {
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
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
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-indigo-50 dark:bg-indigo-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-slate-900 dark:text-slate-100">{notif.text}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
