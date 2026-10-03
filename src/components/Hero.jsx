import React from 'react';
import { ShieldAlert, Award, CheckCircle2, Lock, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Hero({ lang, onScrollToScanner, onOpenAiCopilot }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200/80 dark:border-neutral-800/90 overflow-hidden bg-[#fafafa] dark:bg-[#000000] transition-colors">
      {/* Subtle Hairline Grid Background */}
      <div className="absolute inset-0 geist-grid-bg opacity-70 pointer-events-none" />

      {/* Multi-stop Mesh Bloom Gradient Confined to Hero */}
      <div className="geist-mesh-bloom pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Technical Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-6 shadow-sm">
          <Award className="w-3.5 h-3.5 text-neutral-800 dark:text-amber-400 shrink-0" />
          <span className="devanagari-safe truncate max-w-xs sm:max-w-xl">
            {t.trackInfo || 'SEBI & DEPOSITORY INVESTOR RESILIENCE INFRASTRUCTURE'}
          </span>
        </div>

        {/* Display Title - Fixed spacing between lines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-[#171717] dark:text-white leading-[1.12] sm:leading-[1.15] mb-5">
          <span className="block devanagari-safe">
            {t.heroHeadline1}
          </span>
          <span className="inline-block geist-text-gradient devanagari-safe">
            {t.heroHeadline2}
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-[#4d4d4d] dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 devanagari-safe">
          {t.heroSubhead}
        </p>

        {/* Resilience Badges - 4 Card Grid on White/Dark with Hairline Borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-9 text-left">
          <div className="bg-white dark:bg-[#111111] border border-neutral-200/90 dark:border-neutral-800 p-3.5 rounded-xl shadow-geist-card hover:border-neutral-300 dark:hover:border-neutral-700 transition">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#171717] dark:text-neutral-100 devanagari-safe truncate">
                  {t.badgeSebi}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {t.badgeSebiSub}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-neutral-200/90 dark:border-neutral-800 p-3.5 rounded-xl shadow-geist-card hover:border-neutral-300 dark:hover:border-neutral-700 transition">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#171717] dark:text-neutral-100 devanagari-safe truncate">
                  {t.badgeTip}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {t.badgeTipSub}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-neutral-200/90 dark:border-neutral-800 p-3.5 rounded-xl shadow-geist-card hover:border-neutral-300 dark:hover:border-neutral-700 transition">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/60 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#171717] dark:text-neutral-100 devanagari-safe truncate">
                  {t.badgeUpi}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {t.badgeUpiSub}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-neutral-200/90 dark:border-neutral-800 p-3.5 rounded-xl shadow-geist-card hover:border-neutral-300 dark:hover:border-neutral-700 transition">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/60 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#171717] dark:text-neutral-100 devanagari-safe truncate">
                  {t.badgeDepository}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {t.badgeDepositorySub}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pill-shaped Marketing Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onScrollToScanner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171717] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-[#171717] font-medium text-sm px-6 py-3 rounded-full shadow-sm transition active:scale-[0.98]"
          >
            <span>{t.ctaScan}</span>
            <ArrowDown className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />
          </button>

          <button
            onClick={onOpenAiCopilot}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-[#111111] hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-[#171717] dark:text-white border border-neutral-200/90 dark:border-neutral-800 font-medium text-sm px-6 py-3 rounded-full shadow-sm transition active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-neutral-700 dark:text-amber-400" />
            <span>{t.ctaAskAi}</span>
            <span className="text-[10px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
              AI
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
