// Realistic demo presets covering prevalent Indian retail financial scam vectors

export const DEMO_PRESETS = [
  {
    id: 'preset-pre-ipo',
    badge: 'Telegram / WhatsApp Vector',
    title: 'VIP Institutional Pre-IPO Club',
    targetCategory: 'message',
    description: 'High-yield unlisted stock pump with personal UPI transfer request',
    sampleInput: `🔥 SPECIAL FII INSTITUTIONAL ALLOTMENT 🔥
Get direct allotment in upcoming Mega IPO at 40% discount before BSE/NSE listing! 
Guaranteed 300% listing day profit assured by our institutional desk. 
SEBI Reg: INH9988776655 (VIP Desk)

⚠️ Only 4 slots left! 
Transfer minimum ₹25,000 token amount to our Institutional Manager UPI:
UPI ID: amit.verma92@okaxis (Account Name: Amit Verma)

Once paid, send screenshot to @Institutional_Head on Telegram for trading login! 🚀`,
    claimedRegNo: 'INH9988776655',
    claimedUpi: 'amit.verma92@okaxis',
  },
  {
    id: 'preset-impersonation',
    badge: 'SEBI License Theft Vector',
    title: 'Impersonated Research Analyst',
    targetCategory: 'sebi-check',
    description: 'Scammer using genuine registered name & number with fake personal Gmail & Telegram',
    sampleInput: `Hello Investor! I am Sunil Deshmukh, SEBI Registered Research Analyst (Reg: INH000001234). 
Join our exclusive WhatsApp Premium Circuit Group. 
Daily 2 Upper Circuit calls with 99.8% win rate guaranteed. 
Send subscription fee to private Paytm or deposit into our trading pool. 
Contact admin on Telegram: @sunil_sebi_analyst_official or email: sunildeshmukh.wealth@gmail.com`,
    claimedRegNo: 'INH000001234',
    claimedEmail: 'sunildeshmukh.wealth@gmail.com',
    claimedHandle: '@sunil_sebi_analyst_official',
  },
  {
    id: 'preset-cdsl-freeze',
    badge: 'Depository Phishing Vector',
    title: 'Fake CDSL Demat Account Freeze SMS',
    targetCategory: 'payment-check',
    description: 'Phishing notification claiming Demat suspension under SEBI mandate',
    sampleInput: `URGENT NOTICE: Your Demat Account ending in **4921 has been TEMPORARILY SUSPENDED under SEBI Circular 2026/89 due to non-verification of KYC. 
To prevent permanent asset forfeiture, pay penalty verification charge of ₹4,999 within 2 hours.
Pay immediately to Depository Clearing Desk: 
UPI: cdsl.clearance.desk@ybl
Or click link to upload PAN: https://cdsl-verify-demat.club/unlock`,
    claimedUpi: 'cdsl.clearance.desk@ybl',
    claimedLink: 'https://cdsl-verify-demat.club/unlock',
  },
  {
    id: 'preset-legit-broker',
    badge: 'Legitimate Broker Verification',
    title: 'Verified SEBI Intermediary',
    targetCategory: 'sebi-check',
    description: 'Official registered entity check showing green compliance signals',
    sampleInput: `Zerodha Broking Limited. Registered Stock Broker with SEBI Registration: INZ000031633. 
Official domain: zerodha.com. 
All client funds collected strictly through bank payment gateways directly to designated Clearing Corporation escrow accounts. No profit sharing or guaranteed returns promised.`,
    claimedRegNo: 'INZ000031633',
    claimedDomain: 'zerodha.com',
  }
];
