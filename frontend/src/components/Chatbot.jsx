import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Zap, Sprout, GraduationCap, RefreshCw, ExternalLink, ChevronDown } from 'lucide-react';

const API_URL = 'http://localhost:8000/api/v1';

// ── Quick Action Chips ──────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: '🎓 Student Schemes', message: 'Show me student schemes' },
  { label: '🌾 Farmer Schemes',  message: 'Show me farmer schemes' },
  { label: '👩 Women Schemes',   message: 'Show me schemes for women' },
  { label: '🔍 Find My Schemes', message: 'Find eligible schemes for me' },
];

// ── Scheme Card inside chat ─────────────────────────────────────
function SchemeCard({ scheme }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0',
      padding: '1rem', marginTop: '0.75rem', fontSize: '0.85rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <strong style={{ color: 'var(--text-dark)', lineHeight: '1.3', flex: 1 }}>{scheme.scheme_name}</strong>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '2px' }}
        >
          <ChevronDown size={16} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      {/* Why eligible tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.5rem' }}>
        {scheme.why_eligible?.map((reason, i) => (
          <span key={i} style={{
            background: '#ecfdf5', color: '#065f46', fontSize: '0.72rem',
            padding: '2px 8px', borderRadius: '50px', fontWeight: '600'
          }}>{reason}</span>
        ))}
      </div>

      {expanded && (
        <div style={{ marginTop: '0.75rem', color: 'var(--text-light)', lineHeight: '1.5' }}>
          {scheme.description && <p style={{ marginBottom: '0.5rem' }}>{scheme.description.substring(0, 120)}...</p>}
          {scheme.benefits && (
            <p style={{ color: '#065f46', fontSize: '0.8rem' }}>
              <strong>Benefit:</strong> {scheme.benefits.substring(0, 80)}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <a
          href={`/scheme/${scheme.id}`}
          style={{
            flex: 1, textAlign: 'center', padding: '5px 8px', borderRadius: '8px',
            border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.78rem',
            fontWeight: '600', textDecoration: 'none'
          }}
        >Details</a>
        {scheme.application_link ? (
          <a
            href={scheme.application_link}
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1.5, textAlign: 'center', padding: '5px 8px', borderRadius: '8px',
              background: 'var(--gradient-primary)', color: 'white', fontSize: '0.78rem',
              fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
            }}
          >Apply <ExternalLink size={12} /></a>
        ) : (
          <span style={{
            flex: 1.5, textAlign: 'center', padding: '5px 8px', borderRadius: '8px',
            background: '#f1f5f9', color: 'var(--text-light)', fontSize: '0.78rem'
          }}>Offline</span>
        )}
      </div>
    </div>
  );
}

// ── Message Bubble ───────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isAI = msg.sender === 'ai';
  return (
    <div className={`chat-bubble-wrapper ${msg.sender}`}>
      {isAI && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0, alignSelf: 'flex-end'
        }}>
          <Bot size={14} color="white" />
        </div>
      )}
      <div style={{ maxWidth: '85%' }}>
        <div className={`chat-bubble ${msg.sender}`} style={{ whiteSpace: 'pre-line' }}>
          {msg.text}
        </div>
        {/* Scheme cards rendered below the bubble */}
        {msg.schemes?.map((s, i) => <SchemeCard key={i} scheme={s} />)}
      </div>
    </div>
  );
}

// ── Main Chatbot Component ───────────────────────────────────────
const Chatbot = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Namaste! I\'m **Mitra**, your YojanaMitra assistant.\n\nTell me about yourself — age, state, income — and I\'ll find government schemes you\'re eligible for!\n\nOr pick a quick option below:'
    }
  ]);
  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext]   = useState({});   // accumulated profile
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(v => !v);

  const sendMessage = async (text) => {
    const userText = text ?? input;
    if (!userText.trim()) return;

    const userMessage = { sender: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, context })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      // Update context with what the backend extracted
      if (data.updated_context) setContext(data.updated_context);

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: data.reply,
        schemes: data.schemes || []
      }]);
    } catch {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: '⚠️ I\'m having trouble connecting to the server. Please make sure the backend is running.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleReset = () => {
    setContext({});
    setMessages([{
      sender: 'ai',
      text: '🔄 Chat cleared! Tell me about yourself to find matching schemes.'
    }]);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window shadow-card" style={{ width: '380px', height: '580px' }}>
          {/* Header */}
          <div className="chatbot-header" style={{ background: 'var(--gradient-primary)', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={20} color="white" />
              </div>
              <div>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1rem', fontWeight: '700' }}>Mitra AI</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.75rem' }}>YojanaMitra Assistant</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleReset} title="Reset chat"
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <RefreshCw size={14} />
              </button>
              <button onClick={toggleChat} className="close-btn" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Context Pills */}
          {Object.keys(context).length > 0 && (
            <div style={{ padding: '0.5rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {Object.entries(context).map(([k, v]) => (
                <span key={k} style={{
                  background: '#eff6ff', color: '#1e40af', fontSize: '0.7rem',
                  padding: '2px 8px', borderRadius: '50px', fontWeight: '600', textTransform: 'capitalize'
                }}>
                  {k}: {String(v)}
                </span>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="chatbot-messages" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} />
            ))}
            {isLoading && (
              <div className="chat-bubble-wrapper ai">
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={14} color="white" />
                </div>
                <div className="chat-bubble ai typing" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.75rem 1rem' }}>
                  <span className="dot-pulse"></span>
                  <span>Mitra is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9' }}>
              {QUICK_ACTIONS.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(qa.message)}
                  disabled={isLoading}
                  style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50px',
                    padding: '5px 10px', fontSize: '0.75rem', fontWeight: '600',
                    cursor: 'pointer', color: 'var(--text-dark)', transition: 'all 0.2s'
                  }}
                >{qa.label}</button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="chatbot-input-form" style={{ borderTop: '1px solid #e2e8f0', padding: '0.75rem', gap: '0.5rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I'm 22, from Punjab, income 2 lakh..."
              disabled={isLoading}
              style={{ flex: 1, borderRadius: '50px', fontSize: '0.875rem', padding: '0.6rem 1rem' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: 'var(--gradient-primary)', border: 'none', borderRadius: '50%',
                width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: (!input.trim() || isLoading) ? 0.5 : 1
              }}
            >
              <Send size={16} color="white" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="chatbot-toggle-btn shadow-card"
          style={{
            background: 'var(--gradient-primary)', border: 'none', borderRadius: '50px',
            padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
            cursor: 'pointer', color: 'white', fontWeight: '700', fontSize: '0.95rem',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)'
          }}
        >
          <Bot size={20} /> Mitra AI
          <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '50px', padding: '1px 8px', fontSize: '0.75rem' }}>
            ● Live
          </span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
