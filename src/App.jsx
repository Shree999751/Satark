import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VectorScanner from './components/VectorScanner';
import RiskMeter from './components/RiskMeter';
import EvidenceBreakdown from './components/EvidenceBreakdown';
import AiCopilotChat from './components/AiCopilotChat';
import DepositoryGuide from './components/DepositoryGuide';
import IpoScamGuide from './components/IpoScamGuide';
import DossierModal from './components/DossierModal';
import AiAssistantModal from './components/AiAssistantModal';
import Footer from './components/Footer';
import { analyzeVector } from './utils/analyzer';
import { DEMO_PRESETS } from './data/presets';
import { analyzeScamWithGroq } from './services/groqService';

export default function App() {
  // Support persistent language selection (defaults to 'hi' for Bharat-first focus)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('satark_lang') || 'hi';
  });

  // Support persistent theme selection (defaults to 'light' per Geist design system)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('satark_theme') || 'light';
  });

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [currentInputPayload, setCurrentInputPayload] = useState(null);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('satark_lang', lang);
  }, [lang]);

  // Sync theme with document class and localStorage
  useEffect(() => {
    localStorage.setItem('satark_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Re-trigger Groq AI analysis in the newly selected language if a scan already exists
  useEffect(() => {
    if (currentInputPayload) {
      handleAnalyze(currentInputPayload, lang);
    }
  }, [lang]);

  // Initialize with the Pre-IPO Telegram preset for instant evaluator value
  useEffect(() => {
    const initialPreset = DEMO_PRESETS[0];
    const payload = {
      text: initialPreset.sampleInput,
      regNoInput: initialPreset.claimedRegNo,
      upiInput: initialPreset.claimedUpi
    };
    setCurrentInputPayload(payload);
    handleAnalyze(payload, lang);
  }, []);

  const handleAnalyze = async ({ text, regNoInput, upiInput }, overrideLang) => {
    const targetLang = overrideLang || lang;
    setCurrentInputPayload({ text, regNoInput, upiInput });

    // Step 1: Instant deterministic rule-based analysis (~1ms)
    const ruleResult = analyzeVector({ text, regNoInput, upiInput });
    setAnalysisResult(ruleResult);

    // Step 2: Groq Ultra-Fast AI LPU Deep Reasoning (~1s)
    setIsAiAnalyzing(true);
    try {
      const groqRes = await analyzeScamWithGroq({
        text,
        regNo: regNoInput,
        upi: upiInput,
        lang: targetLang
      });

      if (groqRes.success) {
        setAnalysisResult((prev) => ({
          ...prev,
          aiAnalysis: groqRes.data,
          groqModelUsed: groqRes.modelUsed,
        }));
      }
    } catch (err) {
      console.warn('Groq analysis caught error:', err);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleScrollToScanner = () => {
    const el = document.getElementById('vector-scanner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAiCopilot = () => {
    const el = document.getElementById('satark-ai-copilot-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsAiCopilotOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000] text-[#171717] dark:text-[#ededed] flex flex-col font-sans selection:bg-[#171717] selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors">
      {/* Institutional Top Bar */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onOpenAiCopilot={handleScrollToAiCopilot}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Hero Section */}
      <Hero 
        lang={lang} 
        onScrollToScanner={handleScrollToScanner} 
        onOpenAiCopilot={handleScrollToAiCopilot}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 -mt-6 relative z-20">
        {/* 1. Scanner Engine Card */}
        <VectorScanner 
          onAnalyze={(payload) => handleAnalyze(payload, lang)} 
          lang={lang} 
          theme={theme}
        />

        {/* 2. Dynamic Risk Gauge, AI Forensics & Audio Narration Card */}
        {analysisResult && (
          <div className="space-y-6 animate-fadeIn">
            <RiskMeter 
              analysisResult={analysisResult} 
              lang={lang} 
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAiCopilot={handleScrollToAiCopilot}
              isAiAnalyzing={isAiAnalyzing}
              theme={theme}
            />

            {/* 3. Lal Jhandi Forensics Card */}
            <EvidenceBreakdown 
              flags={analysisResult.flags} 
              lang={lang} 
              theme={theme}
            />
          </div>
        )}

        {/* 4. Embedded Live SATARK AI Copilot Chatbot */}
        <AiCopilotChat
          lang={lang}
          theme={theme}
          currentScanContext={
            analysisResult
              ? `Threat: ${analysisResult.threatLevel}, Risk Score: ${analysisResult.riskScore}/100, Violations: ${analysisResult.flags.map(f => f.name).join(', ')}`
              : ''
          }
        />

        {/* Interactive IPO & Pre-IPO Knowledge and Scam Defense Hub (Collapsible) */}
        <IpoScamGuide lang={lang} theme={theme} />

        {/* CDSL / NSDL Depository Education & Protection Guide (Collapsible) */}
        <DepositoryGuide lang={lang} theme={theme} />
      </main>

      {/* Official SEBI SCORES Dossier Export Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        analysisResult={analysisResult}
        lang={lang}
        theme={theme}
      />

      {/* Investor Copilot Modal */}
      <AiAssistantModal
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
        lang={lang}
        theme={theme}
        currentScanContext={
          analysisResult
            ? `Threat: ${analysisResult.threatLevel}, Risk Score: ${analysisResult.riskScore}/100, Violations: ${analysisResult.flags.map(f => f.name).join(', ')}`
            : ''
        }
      />

      {/* Statutory Footer */}
      <Footer lang={lang} theme={theme} />
    </div>
  );
}
