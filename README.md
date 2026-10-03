# SATARK (सतर्क)

**Live demo:** https://satark-9b2ecr5kw-shreyansh21.vercel.app/
**Built for:** SANGYAN Investor Resilience Hackathon 2026, Track A (Digital Fraud & Scam Resilience)

SATARK helps first-time investors spot an investment scam while it is still happening, not after the money is gone.

## Why we built it

Most investment scams in India don't start with a payment request. They start with a friendly message: "You've been added to our VIP learning group, free class tonight." Over the next few weeks come tips that seem to work, a special "institutional" app, a small withdrawal that actually goes through, and then a big payment demand. People usually realise what happened when their withdrawal is blocked and someone asks for a "tax" to release it.

A checker that looks at one message at a time will call that first invite harmless, and technically it is. So we stopped judging single messages and started tracking the whole sequence.

## What it does

You forward anything suspicious to SATARK: a message, a screenshot, a link, a Hindi voice note, or a payment request. It replies with:

- **Where you are in the scam script.** We mapped seven steps, from the first hook to fake "recovery agents" who show up after a loss.
- **What the scammer will probably do next.** We save that prediction. When it comes true, SATARK tells you, and that moment does more to convince people than any warning.
- **Specific checks:**
  - Does the SEBI registration number exist, and does it belong to the person messaging you? Scammers often quote a real number that belongs to someone else.
  - Is the UPI ID an `@valid` handle, the kind SEBI-registered intermediaries use?
  - Is the "broker website" a recently registered lookalike?
- **What we verified and what we couldn't.** We never call anything "safe".

Every check also feeds a dashboard for SEBI/NSDL. It links UPI IDs, domains, phone numbers and reused profile photos across reports, so a brand-new group can be matched to an operation other people have already reported.

## What it will not do

- No stock tips, buy/sell signals or product suggestions.
- No ads, referrals or paid features.
- No reading of SMS, OTPs or contacts. It only sees what you forward.
- Your own personal details (PAN, Aadhaar, account numbers, your phone number) are stripped before anything is stored.
- A SEBI-registered firm cannot be flagged by crowd reports alone. It takes three independent reports plus a human review.

## How it's built

| Part | What we used |
|---|---|
| Backend | FastAPI (Python) |
| Language understanding | Groq (`openai/gpt-oss-120b`) plus a rules engine that works on its own if the model is down |
| Screenshots | Tesseract OCR with Hindi and English |
| Voice notes | Whisper via Groq |
| Clone detection | Playwright screenshots, perceptual hashing, WHOIS domain age |
| Scam clusters | networkx graph over SQL tables |
| Dashboard | React |
| Hosting | Vercel |

## Running it locally

```bash
git clone <this repo>
cd satark
cp .env.example .env    # add your Telegram bot token and Groq API key
docker compose up
```

To replay the demo journey without a phone:

```bash
python -m app.demo.replay
```

## About the data

All registry entries, scam clusters and journeys in this repo are **synthetic** and made up for the demo. The registration numbers are fake on purpose. The `@valid` UPI check is a format check only. For official verification, SATARK always sends users to SEBI Check.

## What we'd do next

- A WhatsApp channel, and more languages through Bhashini
- Integration with SEBI Check, the Saarthi app and the 1930 helpline
- An IVR / missed-call version for people without smartphones

## Team

<!-- Add your names, roles and contact here -->
