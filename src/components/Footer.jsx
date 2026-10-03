import React from 'react';

export default function Footer({ lang, theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <footer className="bg-[#fafafa] dark:bg-[#000000] border-t border-neutral-200/90 dark:border-neutral-850 text-neutral-600 dark:text-neutral-400 py-14 px-4 sm:px-6 lg:px-8 mt-16 text-xs transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-[#171717] dark:text-white font-semibold text-sm">
              <div className="w-6 h-6 rounded bg-[#171717] dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs">
                स
              </div>
              <span className="tracking-tight">SATARK (सतर्क) — Investor Resilience Shield</span>
            </div>
            <p className="text-[#4d4d4d] dark:text-neutral-400 leading-relaxed max-w-md devanagari-safe">
              {lang === 'hi'
                ? 'सेबी एवं डिपॉजिटरी (NSDL/CDSL) नियामक सुरक्षा दिशानिर्देशों के अनुरूप निर्मित सार्वजनिक-हित डिजिटल सुरक्षा प्रणाली। उद्देश्य: भारतीय निवेशकों को वित्तीय धोखाधड़ी और अनधिकृत टिप्स से बचाना।'
                : 'A public-good investor protection platform engineered in alignment with SEBI, NSDL, and CDSL regulatory standards. Mission: Intercept financial fraud before money changes hands.'}
            </p>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-500 font-mono">
              Digital Fraud & Scam Resilience | Public-Good Infrastructure
            </div>
          </div>

          {/* Quick Helpline Numbers */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717] dark:text-neutral-200 mb-3">
              {lang === 'hi' ? 'आपातकालीन हेल्पलाइन' : 'Official Emergency Helplines'}
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <span className="text-neutral-500 block">{lang === 'hi' ? 'राष्ट्रीय साइबर अपराध:' : 'National Cybercrime Helpline:'}</span>
                <span className="text-[#171717] dark:text-emerald-400 font-semibold">1930 / cybercrime.gov.in</span>
              </li>
              <li>
                <span className="text-neutral-500 block">{lang === 'hi' ? 'सेबी निवेशक टोल-फ्री:' : 'SEBI Investor Toll-Free:'}</span>
                <span className="text-[#171717] dark:text-emerald-400 font-semibold">1800 266 7575 / 1800 22 7575</span>
              </li>
              <li>
                <span className="text-neutral-500 block">{lang === 'hi' ? 'डिपॉजिटरी सहायता:' : 'Depository Helpdesk:'}</span>
                <span className="text-neutral-600 dark:text-neutral-400">helpdesk@cdslindia.com | info@nsdl.co.in</span>
              </li>
            </ul>
          </div>

          {/* Regulatory Mandates */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717] dark:text-neutral-200 mb-3">
              {lang === 'hi' ? 'महत्वपूर्ण सेबी नियम' : 'Core Statutory Framework'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">
              <li>• SEBI (PFUTP) Regulations, 2003</li>
              <li>• SEBI (Research Analysts) Reg., 2014</li>
              <li>• SEBI Upstreaming of Client Funds (2023)</li>
              <li>• CDSL & NSDL TPIN / e-DIS Security Standard</li>
              <li>• DoT Chakshu Digital Suspect Portal</li>
            </ul>
          </div>
        </div>

        {/* Guardrail Disclaimer */}
        <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <p className="devanagari-safe">
            {lang === 'hi'
              ? 'अस्वीकरण: सतर्क एक स्वतंत्र सुरक्षा एवं विश्लेषण उपकरण है। यह कोई स्टॉक टिप, निवेश सलाह या वित्तीय सिफारिश प्रदान नहीं करता है।'
              : 'Public Good Notice: SATARK is an analytical risk-interception tool. It provides zero financial advice, stock signals, or investment recommendations.'}
          </p>
          <div className="shrink-0 text-neutral-600 dark:text-neutral-400">
            Engineered for Bharat’s 16+ Cr Demat Accounts
          </div>
        </div>
      </div>
    </footer>
  );
}
