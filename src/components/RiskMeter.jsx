import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  FileText, 
  Ban, 
  CheckCircle, 
  AlertOctagon,
  Clock,
  Copy,
  Check,
  Share2,
  RotateCcw,
  ShieldAlert,
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';
import KebabMenu from './KebabMenu';

export default function RiskMeter({ analysisResult, lang, onOpenDossier, onOpenAiCopilot, isAiAnalyzing, theme = 'light' }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  if (!analysisResult) return null;

  const { riskScore, threatLevel, flags, voiceScriptEn, voiceScriptHi, timestamp } = analysisResult;
  const isDark = theme === 'dark';

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'hi' ? 'आपके ब्राउज़र में वॉयस फीचर समर्थित नहीं है।' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const script = lang === 'hi' ? voiceScriptHi : voiceScriptEn;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopySummary = async () => {
    const summary = `[SATARK INVESTOR SCAM REPORT]
Risk Score: ${riskScore}/100 (${threatLevel})
Timestamp: ${new Date(timestamp).toLocaleString()}

Detected Flags:
${flags.map((f) => `• ${f.name} (SEBI Rule: ${f.sebiCode})`).join('\n')}

Advisory Note:
${lang === 'hi' ? voiceScriptHi : voiceScriptEn}

Verify SEBI Registered Entities at: https://scores.sebi.gov.in
Report Financial Cybercrime: Toll-Free 1930 (https://cybercrime.gov.in)`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyFeedback(lang === 'hi' ? 'फॉरेंसिक रिपोर्ट कॉपी हो गई!' : 'Report summary copied!');
      setTimeout(() => setCopyFeedback(''), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShareAlert = async () => {
    const shareTitle = `SATARK Threat Alert: ${riskScore}/100 Risk Detected!`;
    const shareText = `⚠️ SEBI Investor Scam Alert: A suspicious financial tip/payment request scored ${riskScore}/100 risk level on SATARK. Violations: ${flags.map((f) => f.name).slice(0, 2).join(', ')}. Never transfer money to unverified personal UPI accounts!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback below
      }
    }
    
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + '\n\n' + shareText + '\n\nVerify at: ' + window.location.href)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToScanner = () => {
    const el = document.getElementById('vector-scanner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isExtreme = threatLevel === 'EXTREME_DANGER';
  const isCaution = threatLevel === 'CAUTION';
  const isSafe = threatLevel === 'SAFE';

  const riskKebabItems = [
    {
      label: lang === 'hi' ? 'फॉरेंसिक रिपोर्ट कॉपी करें' : 'Copy Forensic Summary',
      icon: copyFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />,
      onClick: handleCopySummary,
      badge: copyFeedback ? 'COPIED' : undefined,
      badgeColor: copyFeedback ? (isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-50 text-emerald-800') : undefined,
    },
    {
      label: lang === 'hi' ? 'चेतावनी शेयर करें' : 'Share Threat Warning',
      icon: <Share2 className="w-4 h-4" />,
      onClick: handleShareAlert,
    },
    {
      label: isPlayingAudio 
        ? (lang === 'hi' ? 'आवाज़ रोकें' : 'Stop Audio Voice') 
        : (lang === 'hi' ? 'बोलकर सुनाएं (Voice Alert)' : 'Listen Voice Warning'),
      icon: isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />,
      onClick: handleToggleVoice,
    },
    ...(isExtreme ? [{
      label: lang === 'hi' ? 'सेबी SCORES डोजियर बनाएं' : 'Generate SCORES 2.0 Dossier',
      icon: <FileText className="w-4 h-4" />,
      onClick: onOpenDossier,
      badge: 'SCORES',
      badgeColor: isDark ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-rose-50 text-rose-800 border border-rose-200',
    }] : []),
    { divider: true },
    {
      label: lang === 'hi' ? 'नया इनपुट / दोबारा जांचें' : 'Re-scan / Test Another Vector',
      icon: <RotateCcw className="w-4 h-4" />,
      onClick: handleScrollToScanner,
    },
    {
      label: lang === 'hi' ? '1930 साइबर हेल्पलाइन पर रिपोर्ट करें' : 'Report Incident to Cybercrime (1930)',
      icon: <ShieldAlert className="w-4 h-4" />,
      href: 'https://cybercrime.gov.in',
      danger: true,
      badge: '1930',
      badgeColor: isDark ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-rose-50 text-rose-800 border border-rose-200',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 sm:p-7 shadow-geist-card border border-neutral-200/90 dark:border-neutral-800 transition-colors">
      {/* Top Header bar with Forensic Status & Kebab Menu */}
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            {lang === 'hi' ? 'फॉरेंसिक मूल्यांकन' : 'Forensic Assessment'}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span>
            {flags.length} {lang === 'hi' ? 'जांच बिंदु मूल्यांकित' : 'rules checked'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {copyFeedback && (
            <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center space-x-1 animate-fadeIn">
              <Check className="w-3 h-3 text-emerald-600 mr-1" />
              {copyFeedback}
            </span>
          )}

          {/* Kebab action menu */}
          <KebabMenu
            theme={theme}
            items={riskKebabItems}
            ariaLabel={lang === 'hi' ? 'जोखिम कार्ड विकल्प' : 'Risk assessment actions'}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Score Gauge & Status */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          {/* Circular Score Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={isDark ? '#262626' : '#f2f2f2'}
                strokeWidth="9"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={isExtreme ? '#ee0000' : isCaution ? '#f5a623' : '#059669'}
                strokeWidth="9"
                strokeDasharray={`${(riskScore / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl font-semibold tracking-tight ${
                isExtreme ? 'text-[#ee0000]' : isCaution ? 'text-[#f5a623]' : 'text-emerald-600'
              }`}>
                {riskScore}
              </span>
              <span className="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">/ 100 Risk</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1.5">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wide ${
                isExtreme 
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                  : isCaution 
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' 
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}>
                {isExtreme && <AlertOctagon className="w-3.5 h-3.5 mr-1" />}
                {isCaution && <AlertTriangle className="w-3.5 h-3.5 mr-1" />}
                {isSafe && <ShieldCheck className="w-3.5 h-3.5 mr-1" />}
                <span>
                  {isExtreme 
                    ? (lang === 'hi' ? 'अत्यंत गंभीर जोखिम (Illegal Scam)' : 'High Threat: Probable Scam')
                    : isCaution 
                    ? (lang === 'hi' ? 'सावधानी अपेक्षित (High Caution)' : 'Moderate Risk: Caution Required')
                    : (lang === 'hi' ? 'सत्यापित सुरक्षित (Verified Safe)' : 'Low Risk: Verified Intermediary')}
                </span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-white tracking-tight">
              {isExtreme ? (
                lang === 'hi' ? 'पैसा न भेजें! यह धोखा है।' : 'DO NOT SEND MONEY: Scam Detected'
              ) : isCaution ? (
                lang === 'hi' ? 'संदिग्ध दावे पाए गए — सत्यापन करें' : 'Suspicious Elements Detected — Verify'
              ) : (
                lang === 'hi' ? 'वैध सेबी संस्था के संकेत' : 'Verified SEBI Regulatory Credentials'
              )}
            </h3>

            <p className="text-xs sm:text-sm text-[#4d4d4d] dark:text-neutral-400 max-w-xl mt-1.5 leading-relaxed devanagari-safe">
              {isExtreme ? (
                lang === 'hi'
                  ? 'इस संदेश में सेबी नियमों (PFUTP एवं रिसर्च एनालिस्ट एक्ट) का सीधा उल्लंघन पाया गया है। निजी बैंक या UPI में पैसे मांगने वाले जालसाज हैं।'
                  : 'This request violates core SEBI regulations. Brokers and Depositories never solicit funds into personal UPI handles or savings accounts.'
              ) : isCaution ? (
                lang === 'hi'
                  ? 'कुछ दावे अपुष्ट हैं। बिना आधिकारिक सेबी पोर्टल पर जांच किए कोई अग्रिम शुल्क न दें।'
                  : 'Contains unverified advisory claims. Cross-verify credentials before committing any financial resources.'
              ) : (
                lang === 'hi'
                  ? 'यह रजिस्ट्रेशन नंबर सेबी मास्टर डायरेक्टरी से मेल खाता है। भुगतान हमेशा आधिकारिक बैंक गेटवे से ही करें।'
                  : 'Credentials match official regulatory records. Always route payments through authorized banking clearing systems.'
              )}
            </p>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-2.5">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span>•</span>
              <span>
                {flags.length} {lang === 'hi' ? 'जांच बिंदु मूल्यांकित' : 'critical factors evaluated'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Audio Narration & Dossier Export (Geist Pills) */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
          {/* Bharat-First Voice Narration Button */}
          <button
            onClick={handleToggleVoice}
            className={`inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full text-xs font-medium border transition ${
              isPlayingAudio 
                ? 'bg-amber-500 text-white border-amber-600 animate-pulse' 
                : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-[#171717] dark:text-white border-neutral-200 dark:border-neutral-700 shadow-sm'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />}
            <span className="devanagari-safe">
              {isPlayingAudio 
                ? (lang === 'hi' ? 'आवाज़ रोकें' : 'Stop Audio Voice') 
                : (lang === 'hi' ? 'बोलकर सुनाएं (Voice Alert)' : 'Listen to Voice Warning')}
            </span>
          </button>

          {/* 1-Click SEBI SCORES Dossier Export */}
          {isExtreme && (
            <button
              onClick={onOpenDossier}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full text-xs font-medium bg-[#171717] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black shadow-sm transition"
            >
              <FileText className="w-4 h-4 text-rose-400 dark:text-rose-600" />
              <span className="devanagari-safe">
                {lang === 'hi' ? 'सेबी SCORES रिपोर्ट तैयार करें' : 'Generate SCORES 2.0 Dossier'}
              </span>
            </button>
          )}

          {/* Ask SATARK AI Button */}
          <button
            onClick={onOpenAiCopilot}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full text-xs font-medium bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-[#171717] dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm transition group"
          >
            <Sparkles className="w-4 h-4 text-neutral-700 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="devanagari-safe">
              {lang === 'hi' ? 'AI सुरक्षा सलाहकार से पूछें' : 'Ask SATARK AI Copilot'}
            </span>
          </button>
        </div>
      </div>

      {/* AI Loading State */}
      {isAiAnalyzing && (
        <div className="mt-6 pt-5 border-t border-neutral-100 bg-[#171717] text-white rounded-xl p-4 border border-neutral-800 flex items-center space-x-3 animate-pulse">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-mono font-medium text-white">AI Forensic Deep Reasoning in Progress...</div>
            <div className="text-[11px] text-neutral-400">Auditing SEBI compliance clauses and psychological manipulation traps in real-time...</div>
          </div>
        </div>
      )}

      {/* AI Deep Forensic Intelligence Card */}
      {analysisResult.aiAnalysis && (
        <div className="mt-6 pt-5 border-t border-neutral-100 bg-[#171717] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-neutral-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-neutral-200" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm sm:text-base font-semibold text-white devanagari-safe">
                    {lang === 'hi' ? 'SATARK AI गहन फॉरेंसिक विश्लेषण' : 'SATARK AI Deep Forensic Intelligence'}
                  </h4>
                  <span className="text-[10px] font-mono font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Zap className="w-2.5 h-2.5 text-amber-400" />
                    <span>AI ENGINE</span>
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-400">
                  Forensic Core: <span className="text-neutral-200">Neural Interceptor</span> • Confidence: {analysisResult.aiAnalysis.aiConfidence}%
                </p>
              </div>
            </div>

            <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
              analysisResult.aiAnalysis.aiThreatLevel === 'CRITICAL' || analysisResult.aiAnalysis.aiThreatLevel === 'HIGH_RISK'
                ? 'bg-rose-950/70 text-rose-300 border border-rose-800'
                : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
            }`}>
              {analysisResult.aiAnalysis.verdictTitle || analysisResult.aiAnalysis.aiThreatLevel}
            </span>
          </div>

          {/* Executive Summary */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-neutral-200 leading-relaxed devanagari-safe">
            <p>{analysisResult.aiAnalysis.executiveSummary}</p>
          </div>

          {/* Grid: Psychological Hooks & SEBI Regulatory Breaches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Psychological Hooks */}
            {analysisResult.aiAnalysis.psychologicalTriggers && (
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
                <div className="font-semibold text-neutral-200 flex items-center space-x-1.5 mb-2 devanagari-safe">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'hi' ? 'पहचाने गए मनोवैज्ञानिक प्रलोभन व दबाव' : 'Detected Psychological Manipulation Tactics'}</span>
                </div>
                <ul className="space-y-1.5 text-neutral-300 devanagari-safe">
                  {analysisResult.aiAnalysis.psychologicalTriggers.map((trick, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 shrink-0 font-bold">•</span>
                      <span>{trick}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SEBI Clauses Violated */}
            {analysisResult.aiAnalysis.sebiViolations && (
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
                <div className="font-semibold text-neutral-200 flex items-center space-x-1.5 mb-2 devanagari-safe">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lang === 'hi' ? 'सेबी नियामक नियमों का उल्लंघन' : 'SEBI Regulatory Clauses Violated'}</span>
                </div>
                <ul className="space-y-1.5 text-neutral-300 devanagari-safe">
                  {analysisResult.aiAnalysis.sebiViolations.map((clause, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-400 shrink-0 font-bold">•</span>
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommended Action Plan */}
          {analysisResult.aiAnalysis.recommendedActions && (
            <div className="mt-4 bg-neutral-900/60 border border-neutral-800 rounded-xl p-3.5 text-xs">
              <div className="font-semibold text-neutral-200 flex items-center space-x-1.5 mb-2 devanagari-safe">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'निवेशक सुरक्षा के लिए आवश्यक कदम' : 'Recommended Action Plan for Investor'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 devanagari-safe">
                {analysisResult.aiAnalysis.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-start space-x-2 bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/60">
                    <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
