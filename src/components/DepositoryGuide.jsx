import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ShieldX, 
  KeyRound, 
  FileSpreadsheet, 
  Check, 
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from 'lucide-react';

export default function DepositoryGuide({ lang, theme = 'light' }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'comparison'

  const isDark = theme === 'dark';

  return (
    <div 
      id="depository-guide" 
      className={`rounded-2xl transition-all border ${
        isDark 
          ? 'bg-[#111111] border-neutral-800 text-white shadow-xl' 
          : 'bg-white border-neutral-200/90 text-[#171717] shadow-geist-card'
      } overflow-hidden`}
    >
      {/* Header with Collapsible Trigger, Eye Icon & Dropdown Arrow */}
      <div 
        className={`px-5 py-4 border-b flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none transition ${
          isDark 
            ? 'bg-[#171717] border-neutral-800 hover:bg-neutral-850' 
            : 'bg-neutral-50/80 border-neutral-200/80 hover:bg-neutral-100/60'
        }`}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
            isDark ? 'bg-neutral-800 text-neutral-200 border border-neutral-700' : 'bg-white text-neutral-800 border border-neutral-200 shadow-sm'
          }`}>
            <Building2 className="w-4 h-4 text-cyan-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isDark ? 'bg-neutral-800 text-cyan-400 border border-neutral-700' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
              }`}>
                DEMAT & DEPOSITORY RULES
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full hidden sm:inline-block ${
                isDark ? 'text-neutral-400 bg-neutral-900' : 'text-neutral-500 bg-neutral-100'
              }`}>
                {isCollapsed ? (lang === 'hi' ? 'क्लिक करके देखें' : 'Click to expand') : (lang === 'hi' ? 'विस्तारित' : 'Expanded')}
              </span>
            </div>
            <h3 className={`text-sm sm:text-base font-semibold tracking-tight devanagari-safe mt-0.5 ${
              isDark ? 'text-white' : 'text-[#171717]'
            }`}>
              {lang === 'hi' ? 'डिपॉजिटरी (NSDL / CDSL) सुरक्षा गाइड' : 'NSDL & CDSL Depository Guard'}
            </h3>
          </div>
        </div>

        {/* Action Controls: Eye & Chevron */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed((prev) => !prev);
            }}
            className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
              isDark 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700' 
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 shadow-sm'
            }`}
            title={isCollapsed ? 'Show Section / देखें' : 'Hide Section / छुपाएं'}
          >
            {isCollapsed ? (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-500" />
                <span className="hidden xs:inline">{lang === 'hi' ? 'देखें' : 'View Rules'}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden xs:inline">{lang === 'hi' ? 'छुपाएं' : 'Collapse'}</span>
                <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="animate-fadeIn">
          {/* Sub Navigation Bar */}
          <div className={`px-5 py-2.5 border-b flex items-center justify-between text-xs ${
            isDark ? 'bg-[#0e0e0e] border-neutral-800' : 'bg-neutral-50/40 border-neutral-100'
          }`}>
            <div className="flex space-x-1 font-mono">
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-3.5 py-1 rounded-full font-medium transition ${
                  activeTab === 'rules'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-[#171717] text-white font-semibold'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang === 'hi' ? 'मुख्य नियम' : 'Core Rules'}
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3.5 py-1 rounded-full font-medium transition ${
                  activeTab === 'comparison'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-[#171717] text-white font-semibold'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang === 'hi' ? 'असली बनाम नकली' : 'Real vs Phishing'}
              </button>
            </div>

            <span className={`text-[11px] font-mono hidden sm:inline-block ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              SEBI Depository Audit Standard
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {activeTab === 'rules' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Rule 1 */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/80'
                }`}>
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center mb-3">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold mb-1.5 devanagari-safe">
                      {lang === 'hi' ? 'TPIN एवं e-DIS क्या है?' : 'Understanding TPIN & e-DIS'}
                    </h4>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-[#4d4d4d]'}`}>
                      {lang === 'hi'
                        ? 'TPIN केवल शेयर बेचने के समय आपकी सहमति के लिए दर्ज किया जाता है। कोई भी वैध अधिकारी या ब्रोकर कभी भी फोन पर आपका TPIN या OTP नहीं मांगता।'
                        : 'CDSL TPIN & NSDL e-DIS are entered ONLY on official depository pages during stock sale execution. Depository staff will NEVER phone you for your TPIN.'}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {lang === 'hi' ? 'नियम: TPIN किसी से साझा न करें' : 'Mandate: Never share TPIN over phone'}
                  </div>
                </div>

                {/* Rule 2 */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/80'
                }`}>
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800 flex items-center justify-center mb-3">
                      <ShieldX className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold mb-1.5 devanagari-safe">
                      {lang === 'hi' ? 'डिमैट सस्पेंशन का सच' : 'The Demat Freeze Myth'}
                    </h4>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-[#4d4d4d]'}`}>
                      {lang === 'hi'
                        ? 'यदि कभी केवाईसी के कारण खाता इनऑपरेटिव हो भी जाए, तो उसे सक्रिय करने के लिए कोई "पेनल्टी चार्ज या UPI फीस" नहीं ली जाती। यह शत-प्रतिशत स्कैम है।'
                        : 'KYC re-validation NEVER carries a penalty reactivation fee payable via UPI. Scammers exploit fear of account suspension to extort money.'}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono font-medium text-rose-600 dark:text-rose-400">
                    {lang === 'hi' ? 'नियम: कोई री-एक्टिवेशन शुल्क नहीं' : 'Mandate: Zero reactivation fees via UPI'}
                  </div>
                </div>

                {/* Rule 3 */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/80'
                }`}>
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800 flex items-center justify-center mb-3">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold mb-1.5 devanagari-safe">
                      {lang === 'hi' ? 'CAS स्टेटमेंट से मिलान' : 'Consolidated Account Statement (CAS)'}
                    </h4>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-[#4d4d4d]'}`}>
                      {lang === 'hi'
                        ? 'यदि किसी ने प्री-आईपीओ या शेयर देने का दावा किया है, तो NSDL/CDSL द्वारा सीधे भेजे जाने वाले मासिक CAS में देखें। अगर वहां नहीं है, तो शेयर मौजूद नहीं हैं।'
                        : 'The official monthly CAS sent directly by NSDL or CDSL to your registered email is the single source of truth for Demat holdings.'}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono font-medium text-blue-600 dark:text-blue-400">
                    {lang === 'hi' ? 'नियम: CAS ही अंतिम प्रमाण है' : 'Mandate: CAS is the sole proof of shares'}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Genuine communication */}
                <div className={`border p-4 rounded-xl ${
                  isDark ? 'border-emerald-800/80 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50/40'
                }`}>
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase mb-2 font-mono">
                    <Check className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'असली NSDL/CDSL संदेश' : 'Genuine Depository SMS'}</span>
                  </div>
                  <div className={`p-3 rounded-lg border font-mono text-xs mb-2 leading-relaxed ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
                  }`}>
                    "CDSL: Debit of 50 shares of TATASTEEL from A/c **3421 on 02-OCT-2026. If not authorized, call DP or report to CDSL helpdesk immediately."
                  </div>
                  <ul className={`text-[11px] space-y-1 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    <li>✓ {lang === 'hi' ? 'केवल सूचना देता है, पैसे की मांग नहीं करता' : 'Informational only — zero fund demand'}</li>
                    <li>✓ {lang === 'hi' ? 'कोई संदिग्ध बाहरी वेब लिंक नहीं होता' : 'No phishing links to private websites'}</li>
                  </ul>
                </div>

                {/* Phishing scam */}
                <div className={`border p-4 rounded-xl ${
                  isDark ? 'border-rose-800/80 bg-rose-950/20' : 'border-rose-200 bg-rose-50/40'
                }`}>
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-semibold text-xs uppercase mb-2 font-mono">
                    <X className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'फर्जी स्कैमर SMS (धोखा)' : 'Fraudulent / Phishing SMS'}</span>
                  </div>
                  <div className={`p-3 rounded-lg border font-mono text-xs mb-2 leading-relaxed ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
                  }`}>
                    "URGENT: Demat suspended by SEBI. Pay penalty ₹4,999 to UPI: cdsl.desk@ybl or your shares will be permanently liquidated within 2 hrs."
                  </div>
                  <ul className={`text-[11px] space-y-1 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                    <li>✗ {lang === 'hi' ? 'जल्दबाजी और डर पैदा करता है (Urgency/FOMO)' : 'Uses fear and artificial deadlines'}</li>
                    <li>✗ {lang === 'hi' ? 'निजी UPI या थर्ड-पार्टी लिंक पर भुगतान मांगता है' : 'Demands direct payment to UPI or suspicious URL'}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
