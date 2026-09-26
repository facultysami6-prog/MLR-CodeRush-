import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, CornerDownRight } from 'lucide-react';
import chatbotData from '../data/chatbotData.json';
import './css/AiChatbotWidget.css';

export default function AiChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: chatbotData.welcomeMessage }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (userText) => {
    const query = userText || inputValue;
    if (!query.trim()) return;

    // Add User Message
    const updatedMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMsgs);
    setInputValue('');

    // Process Bot Response via Rule-Based keyword matching
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let match = chatbotData.faqDatabase.find(faq =>
        faq.keywords.some(kw => lowerQuery.includes(kw))
      );

      const botReply = match ? match.answer : chatbotData.fallbackMessage;
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: botReply, actionLink: match?.actionLink }
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating Widget Launcher */}
      <button
        id="chat-launcher-btn"
        className="chatbot-floating-launcher"
        onClick={() => setIsOpen(!isOpen)}
        title="Open FreshFind AI Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
        {!isOpen && <span className="bot-badge-dot"></span>}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <Bot size={22} className="text-amber-400" />
              <div>
                <div>FreshFind AI Assistant</div>
              </div>
            </div>
            <button className="btn-close-chat" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`msg-bubble ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                <div>{msg.text}</div>
                {msg.actionLink && (
                  <button
                    className="mt-2 text-xs font-bold text-emerald-700 underline flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      const el = document.querySelector(msg.actionLink);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <CornerDownRight size={12} /> View Section
                  </button>
                )}
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Reply Preset Chips */}
          <div className="quick-prompts-container">
            {chatbotData.presetPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className="prompt-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask about markets, timings, produce..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" aria-label="Send Message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
