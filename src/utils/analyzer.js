import { SEBI_ENTITIES, KNOWN_SCAM_PATTERNS } from '../data/sebiRegistry';
import { REGULATORY_RULES, COMMON_PHISHING_DOMAINS } from '../data/regulatoryRules';

export function analyzeVector({ text = '', regNoInput = '', upiInput = '' }) {
  const flags = [];
  let riskScore = 15; // baseline low risk
  const normalizedText = (text + ' ' + regNoInput + ' ' + upiInput).toLowerCase();

  // 1. Check for personal UPI patterns
  const upiRegex = /([a-zA-Z0-9.\-_]{2,256}@(okaxis|okhdfcbank|okicici|oksbi|paytm|ybl|ibl|axl|apl|gpay))/gi;
  const foundUpis = normalizedText.match(upiRegex) || [];
  if (upiInput.trim()) foundUpis.push(upiInput.trim());

  if (foundUpis.length > 0) {
    const isGenericPersonal = foundUpis.some(id => 
      id.includes('okaxis') || id.includes('okhdfc') || id.includes('paytm') || 
      id.includes('ybl') || id.includes('gpay') || id.includes('ibl')
    );
    if (isGenericPersonal) {
      riskScore += 40;
      flags.push({
        id: 'flag-personal-upi',
        severity: 'CRITICAL',
        titleEn: 'Personal UPI / Savings Account Detected',
        titleHi: 'निजी UPI / बचत बैंक खाता पकड़ा गया',
        descEn: `Payment requested via personal UPI (${foundUpis[0]}). Under SEBI Upstreaming of Client Funds Circular (2023), legitimate brokers and depositories NEVER accept investor capital through private UPI handles or personal savings accounts.`,
        descHi: `व्यक्तिगत UPI (${foundUpis[0]}) पर पैसा मांगा गया है। सेबी सर्कुलर के अनुसार कोई भी वैध ब्रोकर या एडवाइजर कभी भी निजी UPI पर पैसे नहीं मांग सकता। यह 100% गैर-कानूनी है।`,
        ruleCited: REGULATORY_RULES.clientFundsUpstreaming.code,
        category: 'FUND_SAFETY'
      });
    }
  }

  // 2. Check for SEBI Registration format and impersonation
  const sebiRegRegex = /(IN[AHZ]\d{8,11}|IN-DP-[a-zA-Z0-9-]+)/gi;
  const foundRegs = (text + ' ' + regNoInput).match(sebiRegRegex) || [];
  
  if (foundRegs.length > 0) {
    const claimedNumber = foundRegs[0].toUpperCase();
    const matchedEntity = SEBI_ENTITIES.find(e => e.regNo.toUpperCase() === claimedNumber);

    if (!matchedEntity) {
      // Fake / Non-existent SEBI number
      riskScore += 35;
      flags.push({
        id: 'flag-invalid-sebi-reg',
        severity: 'CRITICAL',
        titleEn: 'Unverified / Fabricated SEBI Registration',
        titleHi: 'फर्जी / अमान्य सेबी पंजीकरण नंबर',
        descEn: `Claimed registration number "${claimedNumber}" does not exist in the official SEBI & Depository Master Intermediary database. Scammers often invent random 11-digit numbers.`,
        descHi: `दावा किया गया रजिस्ट्रेशन नंबर "${claimedNumber}" आधिकारिक सेबी रिकॉर्ड में मौजूद नहीं है। धोखेबाज अक्सर मनगढ़ंत नंबर दिखाकर विश्वास जीतते हैं।`,
        ruleCited: REGULATORY_RULES.pfutp.code,
        category: 'REGISTRY_FRAUD'
      });
    } else {
      // Matched an actual entity - now check for Impersonation / Stolen License
      const hasFreeEmail = /@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)/i.test(normalizedText);
      const hasTelegramHandle = /@([a-zA-Z0-9_]{4,})/i.test(normalizedText) && !normalizedText.includes(matchedEntity.officialDomain);

      if (hasFreeEmail || hasTelegramHandle) {
        riskScore += 45;
        flags.push({
          id: 'flag-impersonation-theft',
          severity: 'CRITICAL',
          titleEn: 'Identity Theft / Analyst Impersonation Warning',
          titleHi: 'पहचान की चोरी: फर्जी एडवाइजर का बड़ा खतरा',
          descEn: `Registration "${claimedNumber}" belongs to "${matchedEntity.name}" (Registered Domain: ${matchedEntity.officialDomain}). However, the contact channel uses an unauthorized private email or Telegram handle. Scammers routinely steal real SEBI credentials to defraud victims.`,
          descHi: `यह रजिस्ट्रेशन नंबर असल में "${matchedEntity.name}" का है। लेकिन चैट में प्राइवेट टेलीग्राम या जीमेल दिया गया है। धोखेबाज असली सेबी लाइसेंस का नाम चुराकर फ्रॉड कर रहे हैं।`,
          ruleCited: REGULATORY_RULES.raRegulations.code,
          category: 'IMPERSONATION'
        });
      } else {
        // Clean entity match
        flags.push({
          id: 'flag-valid-sebi-entity',
          severity: 'SAFE',
          titleEn: `Verified SEBI Entity: ${matchedEntity.name}`,
          titleHi: `सत्यापित सेबी पंजीकृत संस्था: ${matchedEntity.name}`,
          descEn: `Valid ${matchedEntity.type}. Registered Office: ${matchedEntity.registeredOffice}. Official Email: ${matchedEntity.officialEmail}.`,
          descHi: `वैध ${matchedEntity.type}। आधिकारिक पता: ${matchedEntity.registeredOffice}। अधिकृत ईमेल: ${matchedEntity.officialEmail}।`,
          ruleCited: 'Official SEBI Registered Entity',
          category: 'VERIFIED'
        });
      }
    }
  }

  // 3. Scan for Known Scam Keywords & Claims
  KNOWN_SCAM_PATTERNS.forEach(pattern => {
    if (normalizedText.includes(pattern.keyword)) {
      riskScore += pattern.severity === 'CRITICAL' ? 30 : 20;
      flags.push({
        id: `flag-${pattern.keyword.replace(/\s+/g, '-')}`,
        severity: pattern.severity,
        titleEn: pattern.title,
        titleHi: pattern.severity === 'CRITICAL' ? `गंभीर लाल झंडी: ${pattern.title}` : `चेतावनी: ${pattern.title}`,
        descEn: pattern.description,
        descHi: getHindiPatternDesc(pattern.keyword),
        ruleCited: pattern.keyword.includes('return') ? REGULATORY_RULES.raRegulations.code : REGULATORY_RULES.pfutp.code,
        category: 'DECEPTIVE_CLAIM'
      });
    }
  });

  // 4. Phishing link detection
  const foundPhishing = COMMON_PHISHING_DOMAINS.some(domain => normalizedText.includes(domain));
  if (foundPhishing || /https?:\/\/(?!nseindia|bseindia|sebi\.gov\.in|cdslindia|nsdl\.co\.in)[a-z0-9-]+\.(online|club|biz|live|top|xyz|vip)/i.test(normalizedText)) {
    riskScore += 35;
    flags.push({
      id: 'flag-phishing-url',
      severity: 'CRITICAL',
      titleEn: 'Suspicious / Cloned Domain Link',
      titleHi: 'फर्जी / संदिग्ध लिंक (Phishing)',
      descEn: 'The message contains an unofficial or deceptive domain mimicking stock exchange or depository portals. Never enter PAN, Demat credentials or OTP on unverified links.',
      descHi: 'मैसेज में अनधिकृत या फर्जी वेबसाइट का लिंक है जो आधिकारिक पोर्टल जैसा दिखता है। ऐसे लिंक पर पैन या पासवर्ड कभी न डालें।',
      ruleCited: 'Cyber Security Advisory 2026',
      category: 'CYBER_PHISHING'
    });
  }

  // 5. Final Risk Calculation & Severity Classification
  // If verified entity with no negative flags, lower risk to near zero
  const hasCritical = flags.some(f => f.severity === 'CRITICAL');
  const hasSafe = flags.some(f => f.severity === 'SAFE');
  
  if (hasSafe && !hasCritical && flags.length === 1) {
    riskScore = 5;
  } else {
    riskScore = Math.min(Math.max(riskScore, flags.length > 0 ? 35 : 10), 99);
  }

  let threatLevel = 'SAFE';
  let badgeColor = 'emerald';
  if (riskScore >= 70) {
    threatLevel = 'EXTREME_DANGER';
    badgeColor = 'rose';
  } else if (riskScore >= 35) {
    threatLevel = 'CAUTION';
    badgeColor = 'amber';
  }

  // Voice narration text for Web Speech synthesis
  const voiceScriptEn = generateVoiceScriptEn({ riskScore, threatLevel, flags });
  const voiceScriptHi = generateVoiceScriptHi({ riskScore, threatLevel, flags });

  return {
    riskScore,
    threatLevel,
    badgeColor,
    flags,
    scannedText: text,
    voiceScriptEn,
    voiceScriptHi,
    timestamp: new Date().toISOString()
  };
}

function getHindiPatternDesc(keyword) {
  switch (keyword) {
    case 'institutional account':
      return 'धोखेबाज "FII या स्पेशल इंस्टीट्यूशनल खाता" देने का झूठा दावा करते हैं। सेबी नियमों के अनुसार कोई भी आम नागरिक ऐसे खातों का उपयोग नहीं कर सकता।';
    case 'guaranteed return':
      return 'शेयर बाजार में किसी भी तरह के फिक्स्ड या तय मुनाफे का वादा करना सेबी कानून के तहत गैर-कानूनी और धोखे का सबसे बड़ा संकेत है।';
    case 'upper circuit':
      return 'अपर सर्किट में शेयर खरीदने का लालच देकर ऑपरेटर आम निवेशकों को फंसाते हैं (Pump and Dump)।';
    case 'pre-ipo allocation':
      return 'सस्ते में प्री-आईपीओ शेयर देने का झांसा देकर निजी बैंक या यूपीआई में पैसे जमा करवा लिए जाते हैं।';
    case 'demat freeze':
      return 'डिमैट खाता ब्लॉक होने का डर दिखाकर फीस मांगना साइबर अपराधियों का तरीका है। डिपॉजिटरी कभी फीस नहीं मांगती।';
    default:
      return 'यह एक अनधिकृत और जोखिम भरा निवेश दावा है।';
  }
}

function generateVoiceScriptEn({ riskScore, threatLevel, flags }) {
  if (threatLevel === 'SAFE') {
    return 'SATARK Verified: This intermediary matches the official SEBI directory. Always verify that all banking transactions go through official clearing accounts.';
  }
  const topFlag = flags[0]?.titleEn || 'Suspicious financial claims detected';
  return `Warning! SATARK detected a high risk score of ${riskScore} out of 100. Key violation: ${topFlag}. Do not transfer any money or share OTPs.`;
}

function generateVoiceScriptHi({ riskScore, threatLevel, flags }) {
  if (threatLevel === 'SAFE') {
    return 'सतर्क सत्यापन: यह सेबी से प्रमाणित संस्था है। कृपया सुनिश्चित करें कि कोई भी भुगतान केवल आधिकारिक पोर्टल से ही हो।';
  }
  const topFlag = flags[0]?.titleHi || 'संदिग्ध लेन-देन के संकेत मिले हैं';
  return `सावधान! सतर्क ने 100 में से ${riskScore} का उच्च जोखिम स्तर पाया है। मुख्य खतरा: ${topFlag}। किसी भी अनजान खाते में पैसे न भेजें।`;
}
