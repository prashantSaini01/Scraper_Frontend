import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ChatInterface({ sessionId, chatHistory, onNewMessage }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(chatHistory || []);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    setMessages(chatHistory || []);
    scrollToBottom();
  }, [chatHistory]);
  
  const handleAsk = async () => {
    if (!question.trim() || isLoading) return;

     // Immediately add user's message to chat
  const userMessage = {
    sender: 'user',
    content: question.trim()
  };
  setMessages(prevMessages => [...prevMessages, userMessage]);
  
    try {
      setIsLoading(true);
      // const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
      setQuestion('');
      const response = await axios.post(`docu_chat/sessions/${sessionId}/ask`, { 
      question: userMessage.content 
    });
      onNewMessage();
    } catch (error) {
      alert(error.response?.data.error || 'Error processing question');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };
  
  return (
    <div className="chat-interface" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <div className="chat-messages" style={{ 
        flex: '1 1 auto',
        overflowY: 'auto',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender}-message`}
            style={{
              padding: '12px',
              borderRadius: '8px',
              maxWidth: '90%',
              alignSelf: msg.sender === 'assistant' ? 'flex-start' : 'flex-end',
              backgroundColor: msg.sender === 'assistant' ? '#f0f0f0' : '#e6f2ff'
            }}
          >
            <div className="message-header" style={{ 
              fontWeight: 'bold', 
              marginBottom: '6px' 
            }}>
              {msg.sender === 'assistant' ? '🤖 AI Assistant' : '👤 You'}
            </div>
            <div className="message-content" style={{ 
              wordBreak: 'break-word'
            }}>
              {msg.sender === 'assistant' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message loading" style={{
            padding: '12px',
            borderRadius: '8px',
            maxWidth: '90%',
            alignSelf: 'flex-start',
            backgroundColor: '#f0f0f0'
          }}>
            <div className="message-header" style={{ 
              fontWeight: 'bold', 
              marginBottom: '6px' 
            }}>
              🤖 AI Assistant
            </div>
            <div className="typing-indicator" style={{ 
              display: 'flex', 
              gap: '4px' 
            }}>
              <span style={dotStyle}></span>
              <span style={{...dotStyle, animationDelay: '0.2s'}}></span>
              <span style={{...dotStyle, animationDelay: '0.4s'}}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input" style={{ 
        display: 'flex', 
        gap: '12px',
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        padding: '8px 0'
      }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your documents... 📚"
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            resize: 'none',
            minHeight: '50px',
            maxHeight: '120px',
            fontFamily: 'inherit'
          }}
        />
        <button
          onClick={handleAsk}
          disabled={!question.trim() || isLoading}
          className={isLoading ? 'loading' : ''}
          style={{
            padding: '0 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#6366f1',
            color: 'white',
            fontWeight: 'bold',
            cursor: question.trim() && !isLoading ? 'pointer' : 'not-allowed',
            opacity: !question.trim() || isLoading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isLoading ? '🤔' : '✨'} {isLoading ? 'Processing...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

// Style for typing indicator dots
const dotStyle = {
  width: '8px',
  height: '8px',
  backgroundColor: '#888',
  borderRadius: '50%',
  display: 'inline-block',
  animation: 'typing-animation 1s infinite ease-in-out'
};

// Add this to your CSS file:
/*
@keyframes typing-animation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
*/

export default ChatInterface;