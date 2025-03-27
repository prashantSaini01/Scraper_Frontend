// import React, { useState } from 'react';
// import axios from 'axios';

// function ChatInterface({ sessionId, chatHistory, onNewMessage, isLoading }) {
//   const [question, setQuestion] = useState('');

//   const handleAsk = async () => {
//     if (!question.trim()) return;
//     try {
//       const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
//       setQuestion('');
//       onNewMessage();
//     } catch (error) {
//       alert(error.response?.data.error || 'Error processing question');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleAsk();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-grow h-96 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 mb-4 p-4">
//         {chatHistory.length > 0 ? (
//           <div className="space-y-4">
//             {chatHistory.map((msg, index) => (
//               <div 
//                 key={index} 
//                 className={`p-3 rounded-lg max-w-3xl ${
//                   msg.sender === 'User' 
//                     ? 'ml-auto bg-indigo-100 text-indigo-800' 
//                     : 'bg-white border border-gray-200 shadow-sm'
//                 }`}
//               >
//                 <div className="text-xs text-gray-500 mb-1">{msg.sender}</div>
//                 <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-400 text-sm italic">No messages yet. Start the conversation by asking a question about your documents.</p>
//           </div>
//         )}
//       </div>

//       <div className="relative">
//         <textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Ask a question about your documents..."
//           className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
//           rows="2"
//           disabled={isLoading}
//         />
//         <button 
//           onClick={handleAsk} 
//           disabled={!question.trim() || isLoading}
//           className="absolute right-2 bottom-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//           </svg>
//         </button>
//       </div>
//       {isLoading && (
//         <div className="text-xs text-gray-500 mt-2 flex items-center">
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Processing your request...
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatInterface;





// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// function ChatInterface({ sessionId, chatHistory, onNewMessage, isLoading }) {
//   const [question, setQuestion] = useState('');
  
//   const handleAsk = async () => {
//     if (!question.trim()) return;
//     try {
//       const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
//       setQuestion('');
//       onNewMessage();
//     } catch (error) {
//       alert(error.response?.data.error || 'Error processing question');
//     }
//   };
  
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleAsk();
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-grow h-96 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 mb-4 p-4">
//         {chatHistory.length > 0 ? (
//           <div className="space-y-4">
//             {chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-3 rounded-lg max-w-3xl ${
//                   msg.sender === 'User'
//                     ? 'ml-auto bg-indigo-100 text-indigo-800'
//                     : 'bg-white border border-gray-200 shadow-sm'
//                 }`}
//               >
//                 <div className="text-xs text-gray-500 mb-1">{msg.sender}</div>
//                 <div className="text-sm">
//                   {msg.sender === 'User' ? (
//                     <div className="whitespace-pre-wrap">{msg.content}</div>
//                   ) : (
//                     <div className="markdown-content">
//                       <ReactMarkdown>{msg.content}</ReactMarkdown>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-400 text-sm italic">No messages yet. Start the conversation by asking a question about your documents.</p>
//           </div>
//         )}
//       </div>
      
//       <div className="relative">
//         <textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Ask a question about your documents..."
//           className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
//           rows="2"
//           disabled={isLoading}
//         />
//         <button
//           onClick={handleAsk}
//           disabled={!question.trim() || isLoading}
//           className="absolute right-2 bottom-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//           </svg>
//         </button>
//       </div>
//       {isLoading && (
//         <div className="text-xs text-gray-500 mt-2 flex items-center">
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Processing your request...
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatInterface;







// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// function ChatInterface({ sessionId, chatHistory, onNewMessage, isLoading }) {
//   const [question, setQuestion] = useState('');
  
//   const handleAsk = async () => {
//     if (!question.trim()) return;
//     try {
//       const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
//       setQuestion('');
//       onNewMessage();
//     } catch (error) {
//       alert(error.response?.data.error || 'Error processing question');
//     }
//   };
  
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleAsk();
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg p-4">
//       <div className="flex-grow overflow-y-auto bg-white rounded-lg border border-gray-200 mb-4 p-4 shadow-inner">
//         {chatHistory.length > 0 ? (
//           <div className="space-y-6">
//             {chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start gap-3 ${
//                   msg.sender === 'User' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 {msg.sender !== 'User' && (
//                   <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                       <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
//                       <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
//                       <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
//                     </svg>
//                   </div>
//                 )}
                
//                 <div className={`p-4 rounded-lg max-w-[80%] ${
//                   msg.sender === 'User'
//                     ? 'bg-indigo-100 text-indigo-900 rounded-tr-none'
//                     : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
//                 }`}>
//                   <div className="text-sm font-medium text-gray-600 mb-2">{msg.sender}</div>
//                   <div className={`text-sm ${msg.sender === 'User' ? 'text-indigo-900' : 'text-gray-800'}`}>
//                     {msg.sender === 'User' ? (
//                       <div className="whitespace-pre-wrap">{msg.content}</div>
//                     ) : (
//                       <div className="markdown-content prose prose-sm max-w-none prose-indigo">
//                         <ReactMarkdown>{msg.content}</ReactMarkdown>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {msg.sender === 'User' && (
//                   <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center text-indigo-600">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                       <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full py-10 text-center">
//             <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
//               </svg>
//             </div>
//             <p className="text-gray-500 mb-1 font-medium">No messages yet</p>
//             <p className="text-gray-400 text-sm">Start the conversation by asking a question about your documents.</p>
//           </div>
//         )}
//       </div>
      
//       <div className="relative">
//         <textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Ask a question about your documents..."
//           className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none bg-white shadow-sm"
//           rows="3"
//           disabled={isLoading}
//         />
//         <button
//           onClick={handleAsk}
//           disabled={!question.trim() || isLoading}
//           className="absolute right-3 bottom-3 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//           </svg>
//         </button>
//       </div>
      
//       {isLoading && (
//         <div className="text-xs text-gray-500 mt-3 flex items-center justify-center">
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <span>Processing your request...</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatInterface;




import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ChatInterface({ sessionId, chatHistory, onNewMessage }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const handleAsk = async () => {
    if (!question.trim() || isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
      setQuestion('');
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
        {chatHistory.map((msg, index) => (
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