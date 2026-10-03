import React from 'react';
import { 
  Flag, 
  ShieldAlert, 
  Scale, 
  CheckCircle2, 
} from 'lucide-react';

export default function EvidenceBreakdown({ flags, lang, theme = 'light' }) {
  if (!flags || flags.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-geist-card border border-neutral-200/90 dark:border-neutral-800 overflow-hidden transition-colors">
      {/* Section Header */}
      <div className="bg-[#171717] dark:bg-[#0d0d0d] px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <Flag className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center devanagari-safe">
              {lang === 'hi' ? 'लाल झंडी विश्लेषण (Lal Jhandi Red-Flag Forensics)' : 'Forensic Evidence & Red-Flag Audit'}
            </h3>
            <p className="text-[11px] text-neutral-400">
              {lang === 'hi' 
                ? 'सेबी एवं डिपॉजिटरी नियमों के आधार पर चिन्हित कारण' 
                : 'Violation breakdowns grounded in statutory SEBI & Depository regulations'}
            </p>
          </div>
        </div>

        <span className="text-xs bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700 font-mono">
          {flags.length} {lang === 'hi' ? 'पहलू' : 'Findings'}
        </span>
      </div>

      {/* Flag Items List */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80 p-2">
        {flags.map((flag, idx) => {
          const isCritical = flag.severity === 'CRITICAL';
          const isHigh = flag.severity === 'HIGH';
          const isSafe = flag.severity === 'SAFE';

          return (
            <div 
              key={flag.id || idx}
              className={`p-4 rounded-xl transition ${
                isCritical 
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50/70 dark:hover:bg-rose-950/40' 
                  : isHigh 
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/40' 
                  : 'bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                {/* Icon Badge */}
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${
                  isCritical 
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                    : isHigh 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' 
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  {isSafe ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-[#171717] dark:text-white devanagari-safe">
                      {lang === 'hi' ? flag.titleHi : flag.titleEn}
                    </h4>

                    {/* Legal Clause Tag */}
                    {flag.ruleCited && (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                        <Scale className="w-3 h-3 text-neutral-500" />
                        <span>{flag.ruleCited}</span>
                      </span>
                    )}
                  </div>

                  {/* Plain Language Explanation */}
                  <p className="text-xs sm:text-sm text-[#4d4d4d] dark:text-neutral-300 leading-relaxed devanagari-safe">
                    {lang === 'hi' ? flag.descHi : flag.descEn}
                  </p>

                  {/* Investor Action */}
                  {!isSafe && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center space-x-2 text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                      <span className="font-semibold text-rose-700 dark:text-rose-400 font-mono">
                        {lang === 'hi' ? 'सलाह:' : 'Investor Action:'}
                      </span>
                      <span className="devanagari-safe">
                        {lang === 'hi'
                          ? 'इस व्यक्ति/ग्रुप को तुरंत ब्लॉक करें और किसी भी लिंक पर अपनी डिमैट या बैंक जानकारी साझा न करें।'
                          : 'Block this contact immediately. Never transfer funds or share Demat TPIN/OTP.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
