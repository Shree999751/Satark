import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/translations';

export default function LanguageSelector({ lang, setLang, theme = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
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

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button - Geist Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-full border transition shadow-sm ${
          isDark 
            ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700' 
            : 'bg-white hover:bg-neutral-50 text-[#171717] border-neutral-200/90'
        }`}
        title="Select Language / भाषा चुनें"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLangObj.flag}</span>
        <span className="font-medium tracking-wide">{currentLangObj.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border shadow-2xl p-3 z-50 animate-fadeIn ${
          isDark 
            ? 'bg-[#111111] border-neutral-800 text-white shadow-black/80' 
            : 'bg-white border-neutral-200 text-[#171717] shadow-xl'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-2 pb-2 mb-2 border-b ${
            isDark ? 'border-neutral-800 text-neutral-200' : 'border-neutral-100 text-neutral-800'
          }`}>
            <div className="flex items-center space-x-1.5 font-semibold text-xs uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>भारत भाषा चयन (Languages)</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isDark ? 'bg-neutral-800 text-neutral-300 border-neutral-700' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}>
              8 Regional
            </span>
          </div>

          {/* Quick Search */}
          <div className="mb-2 px-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language / भाषा खोजें..."
              className={`w-full rounded-lg px-2.5 py-1.5 text-xs outline-none transition border ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-600' 
                  : 'bg-neutral-50 border-neutral-200 text-[#171717] placeholder-neutral-400 focus:border-neutral-900'
              }`}
              autoFocus
            />
          </div>

          {/* Language Options Grid */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 no-scrollbar">
            {filteredLanguages.map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLang(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left group ${
                    isSelected
                      ? isDark 
                        ? 'bg-neutral-800 border border-neutral-600 text-white font-semibold' 
                        : 'bg-neutral-100 border border-neutral-300 text-neutral-950 font-semibold'
                      : isDark
                      ? 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white border border-transparent'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <div className="font-semibold transition-colors">
                        {item.name}
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {item.englishName} • <span className="font-mono">{item.script}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className={`mt-2 pt-2 border-t px-2 flex items-center justify-between text-[10px] ${
            isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-500'
          }`}>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400 mr-0.5" />
              <span>AI analyzes & responds in your native tongue</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
