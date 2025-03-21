import React, { useState } from 'react';
import axios from 'axios';
 
function ChatInterface({ sessionId, chatHistory, onNewMessage }) {
  const [question, setQuestion] = useState('');
 
  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      const response = await axios.post(`/sessions/${sessionId}/ask`, { question });
      setQuestion('');
      onNewMessage();
    } catch (error) {
      alert(error.response?.data.error || 'Error processing question');
    }
  };
 
  return (
<div>
<div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {chatHistory.map((msg, index) => (
<div key={index} style={{ margin: '10px 0' }}>
<strong>{msg.sender}:</strong> {msg.content}
</div>
        ))}
</div>
<input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about your documents..."
        style={{ width: '80%', marginTop: '10px' }}
      />
<button onClick={handleAsk} disabled={!question.trim()}>
        Send
</button>
</div>
  );
}
 
export default ChatInterface;