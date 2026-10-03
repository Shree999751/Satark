import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

/**
 * Reusable Kebab Menu (⋮ 3-dots overflow action menu)
 * Supports dark & light themes, external links, action callbacks, icons, badges, and dividers.
 */
export default function KebabMenu({
  items = [],
  align = 'right',
  theme = 'dark',
  ariaLabel = 'More options',
  buttonClassName = '',
  menuClassName = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isDark = theme === 'dark';

  const defaultButtonStyles = isDark
    ? `text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700/90 ${isOpen ? 'bg-slate-700 text-white ring-2 ring-emerald-500/50' : ''}`
    : `text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 ${isOpen ? 'bg-slate-200 text-slate-900 ring-2 ring-emerald-500/40' : ''}`;

  const defaultMenuStyles = isDark
    ? 'bg-slate-900 border border-slate-700/90 text-slate-200 shadow-2xl shadow-black/60 divide-slate-800'
    : 'bg-white border border-slate-200 text-slate-700 shadow-2xl shadow-slate-900/10 divide-slate-100';

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* 3-dots Kebab Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 rounded-lg transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${isDark ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-white'} ${defaultButtonStyles} ${buttonClassName}`}
        aria-label={ariaLabel}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-4 h-4 shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 mt-2 w-64 rounded-xl py-1.5 backdrop-blur-md transition-all duration-150 transform origin-top animate-in fade-in-0 zoom-in-95 ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${defaultMenuStyles} ${menuClassName}`}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className={`my-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}
                />
              );
            }

            const itemContent = (
              <>
                <div className="flex items-center space-x-2.5 truncate">
                  {item.icon && (
                    <span
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        item.danger
                          ? 'text-rose-500'
                          : isDark
                          ? 'text-slate-400 group-hover:text-emerald-400'
                          : 'text-slate-500 group-hover:text-emerald-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 tracking-wide uppercase ${
                      item.badgeColor ||
                      (isDark
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-slate-100 text-slate-600 border border-slate-200')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            );

            const baseItemStyles = `group flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium transition-colors text-left select-none ${
              item.danger
                ? isDark
                  ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                  : 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                : isDark
                ? 'hover:bg-slate-800/90 hover:text-white'
                : 'hover:bg-slate-50 hover:text-slate-900'
            } ${item.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`;

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={baseItemStyles}
                >
                  {itemContent}
                </a>
              );
            }

            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  if (item.onClick) item.onClick();
                }}
                className={baseItemStyles}
              >
                {itemContent}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
