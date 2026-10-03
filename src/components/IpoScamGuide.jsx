import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Lock, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  TrendingUp 
} from 'lucide-react';

const IPO_TEST_SCENARIOS = [
  {
    id: 'pre-ipo-upi',
    title: 'Pre-IPO "Guaranteed Allocation" via Private UPI',
    message: '🔥 Exclusive Pre-IPO Allotment: Get 500 shares before public issue at 40% discount! Guaranteed listing gain. Transfer ₹25,000 booking fee to desk UPI: ipo.allotment@okaxis immediately.',
    threat: 'CRITICAL_SCAM',
    rule: 'SEBI (ICDR) Regulations, 2018 & Upstreaming Circular',
    verdictHi: '100% फर्जी व अवैध — कभी भी किसी प्राइवेट UPI या व्यक्ति को पैसे न भेजें!',
    verdictEn: '100% Illegal Scam — SEBI prohibits upfront fund collection in private accounts!',
    explanationHi: 'आईपीओ में आवेदन केवल ASBA (बैंक खाते में फंड ब्लॉक) के जरिए ही वैध है। किसी भी प्री-आईपीओ के नाम पर सीधे UPI में पैसे मांगने वाले साइबर ठग होते हैं।',
    explanationEn: 'IPO bidding is legally permitted ONLY via ASBA (funds blocked in your own bank account). Any request to send money to personal UPI or bank accounts is a criminal scam.'
  },
  {
    id: 'sme-gmp-trap',
    title: 'SME IPO 300% GMP & "HNI Quota" Guarantee',
    message: 'SME IPO 350% Grey Market Premium (GMP) confirmed! Guaranteed allotment under institutional FII quota. Pay ₹15,000 processing charges to our research coordinator.',
    threat: 'CRITICAL_SCAM',
    rule: 'SEBI (PFUTP) Regulations, 2003',
    verdictHi: 'अवैध GMP प्रलोभन — आईपीओ आवंटन में कोई गारंटी संभव नहीं है!',
    verdictEn: 'Illegal GMP Pump Scheme — Guaranteed IPO allocation is mathematically impossible!',
    explanationHi: 'आईपीओ आवंटन पूरी तरह से रजिस्ट्रार (KFintech / Link Intime) के कंप्यूटराइज्ड लॉटरी सिस्टम से होता है। कोई भी ब्रोकर या व्यक्ति आवंटन गारंटी नहीं दे सकता।',
    explanationEn: 'IPO allotments are strictly randomized by exchange registrars through audited computer algorithms. No broker or third party can guarantee allocation.'
  },
  {
    id: 'legit-asba',
    title: 'Legitimate Exchange UPI Mandate (ASBA)',
    message: 'UPI Mandate Request received from BSE_IPO for ₹14,850. Purpose: IPO Application for ABC Ltd. Status: Amount will be blocked in your account until allotment.',
    threat: 'LEGITIMATE_SAFE',
    rule: 'SEBI ASBA & Stock Exchange Unified Payments Interface (UPI) Framework',
    verdictHi: 'वैध एवं सुरक्षित प्रक्रिया (Official ASBA Lien)',
    verdictEn: 'Legitimate & Compliant (Official ASBA Bank Block)',
    explanationHi: 'यह आधिकारिक प्रक्रिया है। इसमें पैसा आपके ही बैंक खाते में रहता है और केवल ब्लॉक (Lien) होता है। यदि शेयर आवंटित नहीं होते, तो ब्लॉक स्वतः हट जाता है।',
    explanationEn: 'This is the official SEBI ASBA mechanism. Funds remain in your bank account earning interest and are blocked, not debited, until allotment is confirmed.'
  },
  {
    id: 'fake-letterhead',
    title: 'Forged Allotment Letter with Fake SEBI Seal',
    message: 'Official Congratulatory Notice: You have been allotted 200 shares in anchor quota. To release shares into Demat, deposit ₹35,000 security deposit into corporate escrow savings account.',
    threat: 'CRITICAL_SCAM',
    rule: 'SEBI Intermediary Advisory & Banning of Unregistered Schemes',
    verdictHi: 'जालसाजी एवं फर्जी दस्तावेज (Forged Allotment Letter)',
    verdictEn: 'Forged Document Fraud — Registrars never demand release fees',
    explanationHi: 'रजिस्ट्रार या कंपनी कभी भी शेयर ट्रांसफर के लिए कोई रिलीज फीस या सिक्योरिटी डिपॉजिट नहीं मांगते। यह शत-प्रतिशत साइबर क्राइम है।',
    explanationEn: 'Registrars credit shares directly to your Demat account without asking for any release fee or security deposit.'
  }
];

const PRE_IPO_CHECKLIST = [
  {
    id: 'chk-1',
    ruleEn: 'The payment mode is official ASBA (bank block) and NOT a transfer to a private UPI or saving account.',
    ruleHi: 'भुगतान का तरीका आधिकारिक ASBA (बैंक ब्लॉक) है, न कि किसी निजी UPI या बैंक खाते में ट्रांसफर।'
  },
  {
    id: 'chk-2',
    ruleEn: 'The company has filed a formal Draft Red Herring Prospectus (DRHP) on SEBI or NSE/BSE website.',
    ruleHi: 'कंपनी ने सेबी अथवा एनएसई/बीएसई की वेबसाइट पर वैध ड्राफ्ट रेड हेरिंग प्रॉस्पेक्टस (DRHP) जमा किया है।'
  },
  {
    id: 'chk-3',
    ruleEn: 'Unlisted shares (if bought pre-IPO) are transferred directly into your CDSL/NSDL Demat account via DIS/e-DIS, not held on informal slips.',
    ruleHi: 'अनलिस्टेड शेयर सीधे आपके CDSL/NSDL डिमैट खाते में DIS/e-DIS द्वारा स्थानांतरित होते हैं, न कि किसी अनौपचारिक पर्ची पर।'
  },
  {
    id: 'chk-4',
    ruleEn: 'No entity is promising a "guaranteed allocation" or "guaranteed 200% listing return".',
    ruleHi: 'कोई भी व्यक्ति "निश्चित आवंटन (Guaranteed Allocation)" या "200% पक्का लिस्टिंग लाभ" का वादा नहीं कर रहा है।'
  },
  {
    id: 'chk-5',
    ruleEn: 'You independently verified the registrar allotment status on Link Intime, KFintech, or Bigshare.',
    ruleHi: 'आपने स्वयं लिंक इनटाइम, केफिनटेक अथवा बिगशेयर के आधिकारिक पोर्टल पर आवंटन की स्थिति जांची है।'
  }
];

export default function IpoScamGuide({ lang, theme = 'light' }) {
  // Collapsed by default to reduce space and keep focus on scanner & copilot
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'simulator' | 'checklist'
  const [selectedScenarioId, setSelectedScenarioId] = useState('pre-ipo-upi');
  const [checkedItems, setCheckedItems] = useState({});

  const selectedScenario = IPO_TEST_SCENARIOS.find((s) => s.id === selectedScenarioId) || IPO_TEST_SCENARIOS[0];
  const isDark = theme === 'dark';

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const checklistScore = Math.round((checkedCount / PRE_IPO_CHECKLIST.length) * 100);

  return (
    <section 
      id="ipo-knowledge-hub" 
      className={`rounded-2xl transition-all border ${
        isDark 
          ? 'bg-[#111111] border-neutral-800 text-white shadow-xl' 
          : 'bg-white border-neutral-200/90 text-[#171717] shadow-geist-card'
      } overflow-hidden`}
    >
      {/* Header Bar with Dropdown Arrow and Eye Icon Toggle */}
      <div 
        className={`px-5 py-4 border-b flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none transition ${
          isDark 
            ? 'bg-[#171717] border-neutral-800 hover:bg-neutral-850' 
            : 'bg-neutral-50/80 border-neutral-200/80 hover:bg-neutral-100/60'
        }`}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
            isDark ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'bg-white text-emerald-600 border border-neutral-200 shadow-sm'
          }`}>
            <TrendingUp className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isDark ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                SEBI ASBA & PRE-IPO DEFENSE
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
              {lang === 'hi' ? 'आईपीओ व प्री-आईपीओ धोखाधड़ी सुरक्षा केंद्र' : 'IPO & Pre-IPO Scam Defense Hub'}
            </h3>
          </div>
        </div>

        {/* Dropdown Arrow & Eye Icon controls */}
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
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden xs:inline">{lang === 'hi' ? 'देखें' : 'View Hub'}</span>
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

      {/* Collapsible Main Content */}
      {!isCollapsed && (
        <div className="animate-fadeIn">
          {/* Sub Navigation Tabs */}
          <div className={`px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
            isDark ? 'bg-[#0e0e0e] border-neutral-800' : 'bg-neutral-50/40 border-neutral-100'
          }`}>
            <div className="flex space-x-1 font-mono">
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  activeTab === 'rules'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-[#171717] text-white font-semibold'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang === 'hi' ? 'ASBA नियम' : 'ASBA Rules'}
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1 rounded-full font-medium transition flex items-center space-x-1 ${
                  activeTab === 'simulator'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-[#171717] text-white font-semibold'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{lang === 'hi' ? 'स्कैम सिम्युलेटर' : 'Scam Simulator'}</span>
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  activeTab === 'checklist'
                    ? isDark ? 'bg-white text-black font-semibold' : 'bg-[#171717] text-white font-semibold'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang === 'hi' ? '5-बिंदु चेकलिस्ट' : 'Safety Checklist'}
              </button>
            </div>

            <span className={`text-[11px] font-mono hidden md:inline-block ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              SEBI ICDR Regulations, 2018
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Tab 1: Rules & ASBA */}
            {activeTab === 'rules' && (
              <div className="space-y-5">
                {/* Golden Rule Banner */}
                <div className="bg-[#171717] text-white rounded-xl p-5 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      ★ THE GOLDEN SEBI RULE OF IPO BIDDING
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-white devanagari-safe">
                      {lang === 'hi'
                        ? 'आईपीओ में पैसा कभी भी आपके बैंक खाते से सीधे ट्रांसफर नहीं होता!'
                        : 'IPO funds NEVER leave your bank account during application!'}
                    </h4>
                    <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed devanagari-safe">
                      {lang === 'hi'
                        ? 'सेबी के अनिवार्य ASBA (Application Supported by Blocked Amount) नियम के तहत राशि केवल ब्लॉक (Lien-marked) होती है। पैसा केवल तभी कटता है जब शेयर वास्तविक रूप में आवंटित हों।'
                        : 'Under SEBI mandatory ASBA regulations, application money remains inside your bank account earning interest and is only blocked. Money is debited ONLY if shares are allotted on the official allotment date.'}
                    </p>
                  </div>

                  <div className="shrink-0 bg-neutral-900 border border-neutral-700/80 rounded-xl p-3 text-center min-w-[170px]">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">ASBA Compliance</div>
                    <div className="text-lg font-bold text-emerald-400">100% Mandatory</div>
                    <div className="text-[10px] text-neutral-400 font-mono">No Private UPI Allowed</div>
                  </div>
                </div>

                {/* 3 Core Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className={`p-4 rounded-xl border transition ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/90'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-bold text-xs mb-2.5">
                      01
                    </div>
                    <h5 className="font-semibold text-xs sm:text-sm mb-1 devanagari-safe">
                      {lang === 'hi' ? 'ASBA बनाम प्राइवेट UPI' : 'ASBA vs Private UPI Handles'}
                    </h5>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {lang === 'hi'
                        ? 'वैध आईपीओ आवेदन में केवल "Lien Block" आता है। यदि कोई आपको किसी व्यक्तिगत UPI ID पर पैसे भेजने को कहे, तो वह 100% स्कैम है।'
                        : 'Legitimate IPO bids show as a "Blocking Mandate" in your banking app. If anyone asks you to send money directly to a personal UPI ID, it is a confirmed scam.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border transition ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/90'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center font-bold text-xs mb-2.5">
                      02
                    </div>
                    <h5 className="font-semibold text-xs sm:text-sm mb-1 devanagari-safe">
                      {lang === 'hi' ? 'प्री-आईपीओ अनलिस्टेड शेयर जाल' : 'Pre-IPO Unlisted Share Racket'}
                    </h5>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {lang === 'hi'
                        ? 'स्कैमर्स नकली कॉर्पोरेट लेटरहेड बनाकर छूट पर शेयर देने का दावा करते हैं। वैध अनलिस्टेड शेयर हमेशा आपके BOID में सीधे ट्रांसफर होते हैं।'
                        : 'Scammers forge corporate letters promising pre-IPO quotas. Legitimate unlisted share purchases require off-market Demat transfer directly to your BOID.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border transition ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200/90'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center font-bold text-xs mb-2.5">
                      03
                    </div>
                    <h5 className="font-semibold text-xs sm:text-sm mb-1 devanagari-safe">
                      {lang === 'hi' ? 'SME IPO एवं फर्जी GMP प्रलोभन' : 'SME IPO & Bogus GMP Hype'}
                    </h5>
                    <p className={`text-xs leading-relaxed devanagari-safe ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {lang === 'hi'
                        ? 'ग्रे मार्केट प्रीमियम (GMP) गैर-विनियमित होता है। ठग फर्जी स्क्रीनशॉट बनाकर रीटेल निवेशकों से एडवांस अलॉटमेंट फीस वसूलते हैं।'
                        : 'Grey Market Premium (GMP) is unregulated and manipulated. Scammers use fake screenshots to trick retail investors into paying advance allocation fees.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Scam Simulator */}
            {activeTab === 'simulator' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {IPO_TEST_SCENARIOS.map((sc) => {
                    const isSelected = sc.id === selectedScenarioId;
                    return (
                      <button
                        key={sc.id}
                        onClick={() => setSelectedScenarioId(sc.id)}
                        className={`text-left p-3 rounded-xl border transition text-xs flex flex-col justify-between ${
                          isSelected
                            ? isDark 
                              ? 'bg-neutral-800 border-neutral-600 text-white font-medium' 
                              : 'bg-neutral-100 border-neutral-400 text-neutral-950 font-medium'
                            : isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        <span className="font-semibold block mb-1 truncate">{sc.title}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full inline-block w-fit ${
                          sc.threat === 'LEGITIMATE_SAFE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {sc.threat === 'LEGITIMATE_SAFE' ? 'SAFE ASBA' : 'DANGEROUS SCAM'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Scenario Live Evaluation Card */}
                <div className={`p-4 rounded-xl border ${
                  selectedScenario.threat === 'LEGITIMATE_SAFE'
                    ? isDark ? 'bg-emerald-950/30 border-emerald-800' : 'bg-emerald-50/60 border-emerald-200'
                    : isDark ? 'bg-rose-950/30 border-rose-800' : 'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {lang === 'hi' ? 'सिम्युलेटेड संदेश विश्लेषण' : 'Simulated Scam Attack Vector'}
                    </span>
                    <span className="text-[11px] font-mono opacity-70">
                      {selectedScenario.rule}
                    </span>
                  </div>

                  <div className={`p-3 rounded-lg font-mono text-xs mb-3 ${
                    isDark ? 'bg-black/60 text-neutral-200 border border-neutral-800' : 'bg-white text-neutral-800 border border-neutral-200'
                  }`}>
                    {selectedScenario.message}
                  </div>

                  <div className="text-xs space-y-1 devanagari-safe">
                    <p className="font-semibold text-rose-700 dark:text-rose-400">
                      {lang === 'hi' ? selectedScenario.verdictHi : selectedScenario.verdictEn}
                    </p>
                    <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                      {lang === 'hi' ? selectedScenario.explanationHi : selectedScenario.explanationEn}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Interactive 5-point Checklist */}
            {activeTab === 'checklist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span>{lang === 'hi' ? 'सुरक्षा अनुपालन स्कोर' : 'Pre-IPO Verification Score'}</span>
                  <span className="font-bold">{checklistScore}% ({checkedCount}/5 verified)</span>
                </div>

                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${checklistScore}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {PRE_IPO_CHECKLIST.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3 rounded-xl border transition flex items-start space-x-3 cursor-pointer text-xs ${
                          isChecked
                            ? isDark ? 'bg-emerald-950/20 border-emerald-800/80' : 'bg-emerald-50/70 border-emerald-300'
                            : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50/60 border-neutral-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-400 bg-white dark:bg-neutral-800'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="devanagari-safe leading-relaxed">
                          {lang === 'hi' ? item.ruleHi : item.ruleEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Official Exchange & Registrar Direct Portals */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-neutral-50/80 border-neutral-200'
            }`}>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium devanagari-safe">
                  {lang === 'hi' ? 'आधिकारिक एक्सचेंज एवं रजिस्ट्रार पोर्टल पर आवंटन जांचें:' : 'Verify Official Registrar Allotments:'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.bseindia.com/investors/appli_check.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition flex items-center space-x-1 ${
                    isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700' : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm'
                  }`}
                >
                  <span>BSE IPO Desk</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href="https://linkintime.co.in/initial_offer/public-issues.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition flex items-center space-x-1 ${
                    isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700' : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm'
                  }`}
                >
                  <span>Link Intime</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href="https://kosmic.kfintech.com/ipostatus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition flex items-center space-x-1 ${
                    isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700' : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm'
                  }`}
                >
                  <span>KFintech</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
