import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionSelector from '../components/SessionSelector';
import DocumentUploader from '../components/DocumentUploader';
import ChatInterface from '../components/ChatInterface';
import API_URL from "./config";
import './Lawbot.css';
 
axios.defaults.baseURL = API_URL 
 
function Lawbot () {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
 
  useEffect(() => {
    fetchSessions();
  }, []);
 
  const fetchSessions = async () => {
    const response = await axios.get('/sessions');
    setSessions(response.data);
  };
 
  const createNewSession = async () => {
    const response = await axios.post('/sessions');
    const newSessionId = response.data.session_id;
    setCurrentSession(newSessionId);
    setSessions([...sessions, newSessionId]);
    setChatHistory([]);
    setUploadedPdfs([]);
  };
 
  const selectSession = async (sessionId) => {
    setCurrentSession(sessionId);
    const messagesResponse = await axios.get(`/sessions/${sessionId}/messages`);
    setChatHistory(messagesResponse.data);
    const pdfsResponse = await axios.get(`/sessions/${sessionId}/pdfs`);
    setUploadedPdfs(pdfsResponse.data);
  };
 
  const deleteSession = async () => {
    if (currentSession) {
      await axios.delete(`/sessions/${currentSession}`);
      setCurrentSession(null);
      setChatHistory([]);
      setUploadedPdfs([]);
      fetchSessions();
    }
  };
 
  const fetchChatHistory = async () => {
    if (currentSession) {
      const response = await axios.get(`/sessions/${currentSession}/messages`);
      setChatHistory(response.data);
    }
  };
 
  const fetchUploadedPdfs = async () => {
    if (currentSession) {
      const response = await axios.get(`/sessions/${currentSession}/pdfs`);
      setUploadedPdfs(response.data);
    }
  };
 
  return (
<div className="app">
<h1>📚 Advanced PDF Chat Assistant</h1>
<p>Upload PDFs and chat with an AI assistant about their content.</p>
<div className="container">
<div className="sidebar">
<h2>Session Management</h2>
<SessionSelector
            sessions={sessions}
            currentSession={currentSession}
            onSelect={selectSession}
            onCreate={createNewSession}
            onDelete={deleteSession}
          />
          {currentSession && (
<>
<DocumentUploader sessionId={currentSession} onUploadSuccess={fetchUploadedPdfs} />
<h3>Uploaded Documents</h3>
              {uploadedPdfs.length > 0 ? (
                uploadedPdfs.map((pdf, index) => <p key={index}>📄 {pdf}</p>)
              ) : (
<p>No documents uploaded yet.</p>
              )}
</>
          )}
</div>
<div className="main">
<h2>Chat with Your Documents</h2>
          {currentSession ? (
<ChatInterface sessionId={currentSession} chatHistory={chatHistory} onNewMessage={fetchChatHistory} />
          ) : (
<p>Please select or create a session to start chatting.</p>
          )}
</div>
</div>
</div>
  );
}
 
export default Lawbot;