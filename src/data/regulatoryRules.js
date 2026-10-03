// Regulatory references and legal citations for SANGYAN Hackathon compliance

export const REGULATORY_RULES = {
  pfutp: {
    code: 'SEBI (PFUTP) Reg. 4(2)(r)',
    title: 'Prohibition of Fraudulent and Unfair Trade Practices',
    summaryEn: 'Disseminating misleading statements or tips to induce purchase/sale of securities is a non-bailable offense under SEBI Act.',
    summaryHi: 'सेबी अधिनियम के तहत निवेशकों को झूठे मुनाफे का लालच देकर गुमराह करना गैर-कानूनी और दंडनीय अपराध है।'
  },
  raRegulations: {
    code: 'SEBI (Research Analysts) Reg. 2014, Rule 24',
    title: 'Ban on Assured Returns & Profit Sharing',
    summaryEn: 'No SEBI-registered Research Analyst shall promise guaranteed returns or charge profit-sharing fees from retail clients.',
    summaryHi: 'कोई भी सेबी पंजीकृत रिसर्च एनालिस्ट कभी भी तय मुनाफा या मुनाफे में हिस्सेदारी की मांग नहीं कर सकता।'
  },
  clientFundsUpstreaming: {
    code: 'SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/84',
    title: 'Mandatory Upstreaming of Client Funds',
    summaryEn: 'Brokers must route 100% of client funds to Clearing Corporations through designated upstreaming bank accounts. Collecting funds in individual savings or personal UPI is illegal.',
    summaryHi: 'दलाल केवल आधिकारिक बैंक गेटवे से ही फंड ले सकते हैं। किसी भी व्यक्ति के निजी UPI या बैंक खाते में पैसे मांगना 100% फ्रॉड है।'
  },
  depositorySecurity: {
    code: 'NSDL & CDSL Operational Guidelines (e-DIS / TPIN)',
    title: 'Depository Security & Demat Freeze Procedures',
    summaryEn: 'Depositories (NSDL/CDSL) NEVER request UPI money or direct bank transfers to unblock accounts. Genuine freezes are resolved exclusively through your verified Depository Participant (DP).',
    summaryHi: 'डिपॉजिटरी (NSDL/CDSL) कभी भी खाता चालू रखने के लिए UPI या निजी खाते में पैसे नहीं मांगती।'
  }
};

export const COMMON_PHISHING_DOMAINS = [
  'zerodha-vip-app.online',
  'groww-institutional.in',
  'sebi-clearance-portal.org',
  'cdsl-verify-demat.club',
  'nsdl-alert-reactivate.biz',
  'fii-institutional-direct.live',
  'pre-ipo-allocation-bse.co'
];
