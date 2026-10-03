import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  ExternalLink, 
  AlertTriangle,
  Building2,
  Smartphone,
  BookOpen,
  Info,
  Sparkles,
  Zap,
  TrendingUp,
  Sun,
  Moon
} from 'lucide-react';
import KebabMenu from './KebabMenu';
import LanguageSelector from './LanguageSelector';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ lang, setLang, onOpenAiCopilot, theme = 'light', setTheme }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isDark = theme === 'dark';

  const headerKebabItems = [
    {
      label: lang === 'hi' ? 'सेबी SCORES पोर्टल' : 'SEBI SCORES 2.0 Portal',
      icon: <ExternalLink className="w-4 h-4" />,
      href: 'https://scores.sebi.gov.in',
      badge: 'SEBI',
      badgeColor: isDark ? 'bg-neutral-800 text-neutral-200 border border-neutral-700' : 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    },
    {
      label: lang === 'hi' ? 'साइबर हेल्पलाइन 1930' : 'Cybercrime Helpline 1930',
      icon: <PhoneCall className="w-4 h-4" />,
      href: 'https://cybercrime.gov.in',
      badge: '1930',
      badgeColor: isDark ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'bg-rose-50 text-rose-700 border border-rose-200',
    },
    {
      label: lang === 'hi' ? 'आईपीओ व प्री-आईपीओ ज्ञान केंद्र' : 'IPO & Pre-IPO Scam Hub',
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      onClick: () => {
        const el = document.getElementById('ipo-knowledge-hub');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badge: 'NEW',
      badgeColor: isDark ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    },
    {
      label: lang === 'hi' ? 'सेबी Saa₹thi ऐप' : 'SEBI Saa₹thi Mobile App',
      icon: <Smartphone className="w-4 h-4" />,
      href: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doSaaRthi=yes',
      badge: 'APP',
    },
    { divider: true },
    {
      label: lang === 'hi' ? 'NSDL e-Services (IDeAS)' : 'NSDL IDeAS Portal',
      icon: <Building2 className="w-4 h-4" />,
      href: 'https://eservices.nsdl.com',
      badge: 'NSDL',
    },
    {
      label: lang === 'hi' ? 'CDSL MyEasi पोर्टल' : 'CDSL MyEasi Portal',
      icon: <Building2 className="w-4 h-4" />,
      href: 'https://web.cdslindia.com/myeasitoken/home/login',
      badge: 'CDSL',
    },
    { divider: true },
    {
      label: lang === 'hi' ? 'डिपॉजिटरी सुरक्षा नियम' : 'Depository Safety Rules',
      icon: <BookOpen className="w-4 h-4" />,
      onClick: () => {
        const el = document.getElementById('depository-guide');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: lang === 'hi' ? 'सतर्क सुरक्षा मंच' : 'About SATARK Platform',
      icon: <Info className="w-4 h-4" />,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  return (
    <header className="bg-white/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-neutral-200/90 dark:border-neutral-800/90 text-[#171717] dark:text-neutral-100 sticky top-0 z-40 transition-colors">
      {/* Top advisory strip - Minimalist Geist style */}
      <div className="bg-[#171717] dark:bg-[#0a0a0a] text-neutral-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between font-normal border-b border-neutral-800">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="devanagari-safe text-neutral-200">
            {t.nationalAdvisory}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-neutral-400">
          <span>{t.cyberHelpline} <strong className="font-mono text-emerald-400 font-semibold">1930</strong></span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline">{t.sebiTollFree} <strong className="font-mono text-emerald-400 font-semibold">1800 266 7575</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#171717] dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm border border-neutral-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-tight text-[#171717] dark:text-white flex items-center">
                SATARK <span className="text-neutral-500 text-xs ml-1 font-mono font-normal">(सतर्क)</span>
              </span>
              <span className="hidden sm:inline-flex bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                INVESTOR SHIELD
              </span>
              {/* Live AI status indicator */}
              <span className="hidden lg:inline-flex items-center space-x-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Zap className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                <span>AI LIVE</span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 devanagari-safe truncate max-w-xs sm:max-w-md hidden xs:block">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Section Anchor Links */}
        <nav className="hidden md:flex items-center space-x-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          <button
            onClick={() => document.getElementById('vector-scanner')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-2.5 py-1.5 rounded-lg hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            {lang === 'hi' ? 'स्कैनर' : 'Scanner'}
          </button>
          <button
            onClick={() => document.getElementById('ipo-knowledge-hub')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-2.5 py-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition flex items-center space-x-1"
          >
            <span>{lang === 'hi' ? 'आईपीओ हब' : 'IPO Hub'}</span>
            <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-mono">NEW</span>
          </button>
          <button
            onClick={() => document.getElementById('depository-guide')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-2.5 py-1.5 rounded-lg hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            {lang === 'hi' ? 'डिपॉजिटरी गाइड' : 'Depository'}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Dark / Light Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full border transition shadow-sm ${
              isDark 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-400 border-neutral-700' 
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
            }`}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Ask AI Copilot Button - Vercel pill button */}
          <button
            type="button"
            onClick={onOpenAiCopilot}
            className={`flex items-center space-x-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm transition active:scale-95 ${
              isDark 
                ? 'bg-white text-black hover:bg-neutral-200' 
                : 'bg-[#171717] text-white hover:bg-neutral-800'
            }`}
            title="Ask SATARK AI Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden xs:inline">Ask AI</span>
            <span className="xs:hidden">AI</span>
          </button>

          {/* Multi-lingual Language Selector Button */}
          <LanguageSelector lang={lang} setLang={setLang} theme={theme} />

          {/* Official Portals Shortcut (Desktop) */}
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full border transition ${
              isDark 
                ? 'text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-700' 
                : 'text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/70 border-neutral-200'
            }`}
          >
            <span>SEBI SCORES</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Kebab Menu (⋮) */}
          <KebabMenu
            theme={theme}
            items={headerKebabItems}
            ariaLabel={lang === 'hi' ? 'अतिरिक्त विकल्प व पोर्टल' : 'More portals & options'}
          />
        </div>
      </div>
    </header>
  );
}
