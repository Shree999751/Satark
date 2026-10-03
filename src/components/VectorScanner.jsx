import React, { useState } from 'react';
import { 
  MessageSquare, 
  FileCheck2, 
  CreditCard, 
  UploadCloud, 
  Sparkles, 
  RotateCcw, 
  Search, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/presets';

export default function VectorScanner({ onAnalyze, lang, theme = 'light' }) {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'sebi-check' | 'payment-check'
  const [messageText, setMessageText] = useState('');
  const [regNoInput, setRegNoInput] = useState('');
  const [upiInput, setUpiInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const isDark = theme === 'dark';

  const handleApplyPreset = (preset) => {
    setMessageText(preset.sampleInput);
    setRegNoInput(preset.claimedRegNo || '');
    setUpiInput(preset.claimedUpi || '');
    setActiveTab(preset.targetCategory);
    setSelectedFileName(null);

    // Auto-trigger scan for instant demo feel
    triggerScan(preset.sampleInput, preset.claimedRegNo || '', preset.claimedUpi || '');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      // Simulate multimodal OCR extraction from screenshot
      if (file.name.toLowerCase().includes('profit') || file.name.toLowerCase().includes('telegram') || file.name.toLowerCase().includes('screen')) {
        setMessageText(`[Extracted from Screenshot "${file.name}"]: \n🔥 VIP INSIDER CLUB: 400% Target Hit! \nAllotment in SME Circuit guaranteed. Send ₹15,000 to admin UPI: rajat.wealth@okaxis for premium signals!`);
      } else {
        setMessageText(`[OCR Extracted from ${file.name}]: \nSEBI Approved Research Desk (Reg: INH98231245). Transfer booking amount to private wallet immediately before market open.`);
      }
    }
  };

  const triggerScan = (customText, customReg, customUpi) => {
    setIsScanning(true);
    setTimeout(() => {
      onAnalyze({
        text: customText !== undefined ? customText : messageText,
        regNoInput: customReg !== undefined ? customReg : regNoInput,
        upiInput: customUpi !== undefined ? customUpi : upiInput
      });
      setIsScanning(false);
    }, 450);
  };

  const handleReset = () => {
    setMessageText('');
    setRegNoInput('');
    setUpiInput('');
    setSelectedFileName(null);
  };

  return (
    <div id="vector-scanner" className="bg-white dark:bg-[#111111] rounded-2xl shadow-geist-card border border-neutral-200/90 dark:border-neutral-800 overflow-hidden transition-colors">
      {/* Quick Test Presets Banner */}
      <div className="bg-[#171717] dark:bg-[#0d0d0d] px-4 py-3.5 border-b border-neutral-800 text-neutral-300">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-white flex items-center space-x-1.5 uppercase tracking-wider devanagari-safe">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'त्वरित डेमो परीक्षण (Live Presets)' : 'Interactive Test Vectors (1-Click Evaluation)'}</span>
            </span>
            <span className="inline-flex items-center text-[10px] font-mono text-neutral-300 bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-full">
              AI READY
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 devanagari-safe font-mono">
            {lang === 'hi' ? 'किसी भी परिदृश्य पर क्लिक करें' : 'Click any preset to test instantly'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className="text-left text-xs bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 p-2.5 rounded-xl transition group flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 block mb-0.5">{p.badge}</span>
                <span className="font-medium text-white group-hover:text-neutral-100 transition block truncate">{p.title}</span>
              </div>
              <span className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{p.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs - Geist Segmented Bar */}
      <div className="flex border-b border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
        <button
          onClick={() => setActiveTab('message')}
          className={`flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 border-b-2 transition ${
            activeTab === 'message'
              ? 'border-[#171717] dark:border-white text-[#171717] dark:text-white bg-white dark:bg-[#111111] font-semibold'
              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <MessageSquare className="w-4 h-4 opacity-80 shrink-0" />
          <span className="devanagari-safe">{lang === 'hi' ? 'संदेश व स्क्रीनशॉट जांच' : 'Tip Message / Chat Vector'}</span>
        </button>

        <button
          onClick={() => setActiveTab('sebi-check')}
          className={`flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 border-b-2 transition ${
            activeTab === 'sebi-check'
              ? 'border-[#171717] dark:border-white text-[#171717] dark:text-white bg-white dark:bg-[#111111] font-semibold'
              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <FileCheck2 className="w-4 h-4 opacity-80 shrink-0" />
          <span className="devanagari-safe">{lang === 'hi' ? 'सेबी रजिस्ट्रेशन जांच' : 'SEBI Registry Validator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('payment-check')}
          className={`flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 border-b-2 transition ${
            activeTab === 'payment-check'
              ? 'border-[#171717] dark:border-white text-[#171717] dark:text-white bg-white dark:bg-[#111111] font-semibold'
              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <CreditCard className="w-4 h-4 opacity-80 shrink-0" />
          <span className="devanagari-safe">{lang === 'hi' ? 'UPI व बैंक खाता सुरक्षा' : 'Fund & Depository Shield'}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 sm:p-6 bg-white dark:bg-[#111111]">
        {activeTab === 'message' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide font-mono">
                {lang === 'hi' 
                  ? 'व्हाट्सएप/टेलीग्राम संदेश या सोशल मीडिया दावा पेस्ट करें' 
                  : 'Paste suspicious WhatsApp, Telegram, or social media text'}
              </label>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1 opacity-70" />
                {lang === 'hi' ? 'संदेश में उल्लिखित बैंक/UPI विवरण भी शामिल करें' : 'Include phone numbers, UPI, or links'}
              </span>
            </div>

            <textarea
              rows={5}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={lang === 'hi' 
                ? 'उदा: "विशेष FII कोटा: आगामी IPO में 300% मुनाफा पक्का! टोकन राशि ₹25,000 हमारे UPI: xyz@okaxis पर भेजें..."' 
                : 'e.g., "Special Pre-IPO Allotment! Guaranteed 200% return on listing day. Transfer booking fee ₹20,000 to our institutional desk UPI: manager@okaxis..."'}
              className="w-full text-sm font-sans p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 outline-none text-[#171717] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 bg-neutral-50/30 dark:bg-neutral-900/50 transition"
            />

            {/* Multimodal screenshot upload simulation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <label className="cursor-pointer inline-flex items-center space-x-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/70 dark:hover:bg-neutral-700 px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 transition">
                <UploadCloud className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span>
                  {selectedFileName ? `Loaded: ${selectedFileName}` : (lang === 'hi' ? 'स्क्रीनशॉट अपलोड करें (OCR)' : 'Upload Chat Screenshot (OCR)')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {selectedFileName && (
                <span className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-700 font-mono">
                  {lang === 'hi' ? 'स्क्रीनशॉट से विवरण निकाले गए' : 'Text successfully parsed from screenshot'}
                </span>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sebi-check' && (
          <div className="space-y-4">
            <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 p-3.5 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>{lang === 'hi' ? 'महत्वपूर्ण सेबी नियम:' : 'Critical SEBI Rule:'}</strong>{' '}
                {lang === 'hi'
                  ? 'स्कैमर्स अक्सर असली रिसर्च एनालिस्ट का नाम और नंबर चुराकर अपने पर्सनल जीमेल या टेलीग्राम पर पैसे मांगते हैं।'
                  : 'Scammers frequently steal real registration numbers of authorized analysts while giving their own personal Gmail or Telegram handle.'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-1.5 font-mono">
                  {lang === 'hi' ? 'दावा किया गया सेबी रजिस्ट्रेशन नंबर' : 'Claimed SEBI Registration No.'}
                </label>
                <input
                  type="text"
                  value={regNoInput}
                  onChange={(e) => setRegNoInput(e.target.value)}
                  placeholder="e.g. INH000001234 or INZ000031633"
                  className="w-full text-sm font-mono p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 outline-none text-[#171717] dark:text-white bg-neutral-50/30 dark:bg-neutral-900/50"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block font-mono">
                  Format: INH (Analyst), INA (Adviser), INZ (Stock Broker)
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-1.5 font-mono">
                  {lang === 'hi' ? 'संदेश या ईमेल/टेलीग्राम संदर्भ' : 'Message or Contact Channel Used'}
                </label>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="e.g. Received from @analyst_vip on Telegram, private Gmail"
                  className="w-full text-sm p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 outline-none text-[#171717] dark:text-white bg-neutral-50/30 dark:bg-neutral-900/50"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment-check' && (
          <div className="space-y-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-3.5 rounded-xl text-xs text-neutral-800 dark:text-neutral-200 flex items-start space-x-2.5">
              <CreditCard className="w-4 h-4 text-neutral-700 dark:text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <strong>{lang === 'hi' ? 'गोल्डन फंड सुरक्षा नियम:' : 'Golden Fund Safety Rule:'}</strong>{' '}
                {lang === 'hi'
                  ? 'सेबी नियम SEBI/HO/MIRSD के तहत निवेशक फंड केवल आधिकारिक पेमेंट गेटवे से "क्लियरिंग कॉर्पोरेशन" खाते में जाना चाहिए।'
                  : 'SEBI mandates 100% Upstreaming of Client Funds. No licensed intermediary can collect funds in individual savings or personal UPI.'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-1.5 font-mono">
                  {lang === 'hi' ? 'भुगतान हेतु दिया गया UPI ID या खाता' : 'Beneficiary UPI ID or Bank Details'}
                </label>
                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder="e.g. amit.verma92@okaxis or payments@privatebank"
                  className="w-full text-sm font-mono p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 outline-none text-[#171717] dark:text-white bg-neutral-50/30 dark:bg-neutral-900/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-1.5 font-mono">
                  {lang === 'hi' ? 'दावे का प्रकार (डिमैट फ्रीज / निवेश)' : 'Claim Description'}
                </label>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="e.g. Fee to unfreeze CDSL Demat account or IPO token money"
                  className="w-full text-sm p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 outline-none text-[#171717] dark:text-white bg-neutral-50/30 dark:bg-neutral-900/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-5">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'साफ़ करें' : 'Clear Form'}</span>
          </button>

          <button
            onClick={() => triggerScan()}
            disabled={isScanning || (!messageText.trim() && !regNoInput.trim() && !upiInput.trim())}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-medium text-sm transition shadow-sm ${
              isScanning || (!messageText.trim() && !regNoInput.trim() && !upiInput.trim())
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-[#171717] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black active:scale-95'
            }`}
          >
            <Search className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>
              {isScanning 
                ? (lang === 'hi' ? 'विश्लेषण चल रहा है...' : 'Running Forensic Scan...') 
                : (lang === 'hi' ? 'जोखिम का तत्काल विश्लेषण करें' : 'Run Scam Interception Analysis')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
