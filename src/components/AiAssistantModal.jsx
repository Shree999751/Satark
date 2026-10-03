import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Zap
} from 'lucide-react';
import { askSatarkAi } from '../services/groqService';
import { TRANSLATIONS } from '../data/translations';

const QUICK_PROMPTS = {
  hi: [
    'क्या सेबी रिसर्च एनालिस्ट 400% पक्का रिटर्न दे सकते हैं?',
    'प्री-आईपीओ में पर्सनल UPI में पैसे मांग रहे हैं, क्या यह सही है?',
    'अगर मेरे साथ ऑनलाइन फ्रॉड हो जाए तो 1930 पर क्या करें?',
    'डिमैट e-DIS TPIN क्या है और इसे किसी को क्यों नहीं देना चाहिए?'
  ],
  en: [
    'Can a SEBI Registered Analyst legally guarantee 400% profit?',
    'Someone asked for pre-IPO allocation payment via personal UPI. Is this legal?',
    'What is the step-by-step procedure to report fraud on Cyber Helpline 1930?',
    'What is e-DIS TPIN and why should it never be shared?'
  ],
  gu: [
    'શું સેબી રિસર્ચ એનાલિસ્ટ ગેરંટીડ નફો આપી શકે?',
    'પ્રી-આઈપીઓ માટે પર્સનલ UPI માં પૈસા માંગે છે, શું આ કાયદેસર છે?',
    'સાયબર હેલ્પલાઇન 1930 પર ફરિયાદ કેવી રીતે કરવી?'
  ],
  mr: [
    'सेबी नोंदणीकृत सल्लागार हमी परतावा देऊ शकतात का?',
    'प्री-आयपीओसाठी वैयक्तिक UPI वर पैसे मागणे कायदेशीर आहे का?',
    '१९३० सायबर हेल्पलाइनवर तक्रार कशी करावी?'
  ]
};

export default function AiAssistantModal({ isOpen, onClose, lang = 'hi', currentScanContext = '', theme = 'light' }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'hi'
        ? 'नमस्ते! मैं सतर्क AI (SATARK Copilot) हूँ। किसी भी संदिग्ध स्टॉक टिप, सेबी नियम या साइबर धोखाधड़ी से बचाव के बारे में मुझसे पूछें।'
        : 'Hello! I am SATARK AI Copilot. Ask me anything about suspicious stock tips, SEBI regulations, or financial scam prevention.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const quickChips = QUICK_PROMPTS[lang] || QUICK_PROMPTS.en;
  const isDark = theme === 'dark';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const result = await askSatarkAi({
      query,
      context: currentScanContext,
      lang,
      history: newMessages.slice(-6)
    });

    if (result.success) {
      setMessages((prev) => [...prev, { role: 'assistant', content: result.answer, modelUsed: result.modelUsed }]);
    } else {
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'assistant', 
          content: lang === 'hi' 
            ? 'क्षमा करें, AI उत्तर प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।' 
            : 'Apologies, failed to retrieve AI response. Please try again.',
          isError: true
        }
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/60 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] sm:max-h-[85vh] transition-colors ${
          isDark 
            ? 'bg-[#111111] border border-neutral-800 text-white' 
            : 'bg-white border border-neutral-200/90 text-[#171717]'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-50/80 border-neutral-200/80'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${
              isDark ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'bg-white text-emerald-600 border border-neutral-200'
            }`}>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#171717]'}`}>
                  SATARK AI Copilot
                </h3>
                <span className={`flex items-center space-x-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                }`}>
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  <span>AI ENGINE</span>
                </span>
              </div>
              <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.askAiSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips - Fixed scrollbar with .no-scrollbar */}
        <div className={`px-4 py-2.5 border-b overflow-x-auto flex space-x-2 no-scrollbar ${
          isDark ? 'bg-[#0e0e0e] border-neutral-800' : 'bg-neutral-50/40 border-neutral-100'
        }`}>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className={`text-left text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full transition shrink-0 ${
                isDark 
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700' 
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 border border-neutral-200/90 shadow-sm'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Conversation Box */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 ${
          isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'
        }`}>
          {messages.map((msg, index) => {
            const isAi = msg.role === 'assistant';
            return (
              <div
                key={index}
                className={`flex items-start space-x-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? msg.isError
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : isDark
                        ? 'bg-[#171717] border border-neutral-800 text-neutral-100 shadow-sm'
                        : 'bg-white border border-neutral-200/90 text-[#171717] shadow-sm'
                      : isDark
                      ? 'bg-neutral-800 text-white font-medium shadow-sm'
                      : 'bg-[#171717] text-white font-medium shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line devanagari-safe">{msg.content}</p>
                  {msg.modelUsed && (
                    <span className="block mt-1.5 text-[9px] font-mono opacity-60">
                      ⚡ SATARK AI Neural Core
                    </span>
                  )}
                </div>

                {!isAi && (
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
              }`}>
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className={`rounded-2xl px-4 py-3 text-xs flex items-center space-x-2 ${
                isDark ? 'bg-[#171717] border border-neutral-800 text-neutral-400' : 'bg-white border border-neutral-200 text-neutral-500'
              }`}>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Analyzing SEBI regulatory guidelines...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className={`p-3 border-t flex items-center space-x-2 ${
            isDark ? 'bg-[#111111] border-neutral-800' : 'bg-white border-neutral-200/90'
          }`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.copilotPlaceholder}
            className={`flex-1 rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none transition ${
              isDark 
                ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-600' 
                : 'bg-neutral-50/80 border border-neutral-200 text-[#171717] placeholder-neutral-400 focus:border-neutral-900'
            }`}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`font-medium text-xs px-5 py-2.5 rounded-full transition flex items-center space-x-1.5 shrink-0 shadow-sm ${
              !inputValue.trim() || isLoading
                ? isDark ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                : isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#171717] hover:bg-neutral-800 text-white'
            }`}
          >
            <span>{t.btnAsk}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
