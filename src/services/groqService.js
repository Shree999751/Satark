/**
 * SATARK Groq AI Service
 * Powered by Groq Ultra-Fast LPU Inference
 * Evaluates digital financial fraud, SEBI violations, and provides conversational investor protection.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const PRIMARY_MODEL = 'qwen/qwen3.8-27b';
const FALLBACK_MODEL = 'openai/gpt-oss-120b';

const LANGUAGE_NAMES = {
  hi: 'Hindi (हिंदी)',
  en: 'English',
  gu: 'Gujarati (ગુજરાતી)',
  mr: 'Marathi (मराठी)',
  bn: 'Bengali (বাংলা)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)'
};

/**
 * Call Groq Chat Completions API with automatic fallback
 */
async function callGroqChat({ messages, temperature = 0.2, responseFormat = null }) {
  const models = [PRIMARY_MODEL, FALLBACK_MODEL, 'openai/gpt-oss-20b'];
  let lastError = null;

  for (const model of models) {
    try {
      const payload = {
        model,
        messages,
        temperature,
      };

      if (responseFormat) {
        payload.response_format = responseFormat;
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Groq HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return {
          content: data.choices[0].message.content,
          modelUsed: model,
        };
      }
      throw new Error('Unexpected Groq API response structure');
    } catch (err) {
      console.warn(`Groq model ${model} failed, trying next...`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('All Groq models failed');
}

/**
 * Analyze a suspected message / claimed SEBI ID / UPI handle using Groq LLM
 */
export async function analyzeScamWithGroq({ text, regNo = '', upi = '', lang = 'hi' }) {
  const targetLanguage = LANGUAGE_NAMES[lang] || 'English';

  const systemPrompt = `You are SATARK AI, a Senior Forensic Regulatory Auditor for the Securities and Exchange Board of India (SEBI) and Depositories (NSDL & CDSL).
Your objective: Protect Indian retail demat investors from financial fraud, illegal stock tips, fake pre-IPO quotas, unregistered advisory schemes, and UPI mule payment extortion.

Respond in strict JSON with the following schema:
{
  "aiThreatLevel": "CRITICAL" | "HIGH_RISK" | "CAUTION" | "SAFE",
  "aiRiskScore": <number between 0 and 100>,
  "aiConfidence": <number between 80 and 99>,
  "verdictTitle": "<A strong, punchy 3-6 word verdict in ${targetLanguage}>",
  "executiveSummary": "<2-3 sentence clear forensic explanation in ${targetLanguage}>",
  "psychologicalTriggers": ["<Manipulation tactic 1 in ${targetLanguage}>", "<Manipulation tactic 2 in ${targetLanguage}>"],
  "sebiViolations": ["<Specific SEBI act / circular / regulation violated in ${targetLanguage}>"],
  "recommendedActions": ["<Action step 1 in ${targetLanguage}>", "<Action step 2 in ${targetLanguage}>", "<Action step 3 in ${targetLanguage}>"],
  "upiRedFlag": "<One sentence analysis of the UPI payment vector in ${targetLanguage}>"
}

CRITICAL RULES:
- Translate all textual explanations (verdictTitle, executiveSummary, psychologicalTriggers, sebiViolations, recommendedActions, upiRedFlag) accurately into ${targetLanguage}.
- If the claimed return promises guaranteed profits, high daily ROI, or SME quota allotment, flag it as a CRITICAL scam.
- SEBI registered entities never collect funds into personal savings accounts or generic UPI handles (@okaxis, @ybl, @paytm, @ibl).
- Always return valid JSON only.`;

  const userPrompt = `Evaluate this suspected financial solicitation:
${text ? `MESSAGE CONTENT:\n"""\n${text}\n"""` : '(No message text provided)'}
${regNo ? `CLAIMED SEBI REGISTRATION NO: ${regNo}` : ''}
${upi ? `CLAIMED PAYMENT UPI HANDLE: ${upi}` : ''}`;

  try {
    const response = await callGroqChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
      responseFormat: { type: 'json_object' }
    });

    const parsed = JSON.parse(response.content);
    return {
      success: true,
      data: parsed,
      modelUsed: response.modelUsed
    };
  } catch (err) {
    console.error('Groq AI scam analysis failed:', err);
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Interactive Copilot: Ask SATARK AI any question regarding stock tips, brokers, and SEBI compliance
 */
export async function askSatarkAi({ query, context = '', lang = 'hi', history = [] }) {
  const targetLanguage = LANGUAGE_NAMES[lang] || 'English';

  const systemPrompt = `You are SATARK AI, India's premier Retail Investor Protection Co-pilot created for the SEBI & NSDL/CDSL investor ecosystem.
You speak clearly, warmly, and authoritatively to retail and Tier-2/3 investors.
Provide answers directly in ${targetLanguage}.
If they ask about an unknown tip, broker, or payment request, guide them using statutory rules:
- SEBI registered brokers/research analysts never guarantee returns.
- Official clearing corporation bank transfers or ASBA are the only legal way to pay for IPOs.
- Personal UPI IDs are never used by legitimate entities.
- If scammed, dial 1930 immediately within the golden hour, and lodge a complaint on SCORES (scores.sebi.gov.in).
Keep responses concise, scannable with bullet points, and actionable.`;

  const conversation = [
    { role: 'system', content: systemPrompt }
  ];

  if (context) {
    conversation.push({
      role: 'system',
      content: `CURRENT INVESTOR SCAN CONTEXT:\n${context}`
    });
  }

  // Append recent chat history
  history.slice(-4).forEach((msg) => {
    conversation.push({ role: msg.role, content: msg.content });
  });

  conversation.push({ role: 'user', content: query });

  try {
    const response = await callGroqChat({
      messages: conversation,
      temperature: 0.3
    });

    return {
      success: true,
      answer: response.content,
      modelUsed: response.modelUsed
    };
  } catch (err) {
    console.error('Groq AI Copilot query failed:', err);
    return {
      success: false,
      error: err.message
    };
  }
}
