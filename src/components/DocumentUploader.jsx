 
import React, { useState } from 'react';
import axios from 'axios';
 
function DocumentUploader({ sessionId, onUploadSuccess }) {
  const [files, setFiles] = useState([]);
 
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };
 
  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append('pdfs', file);
    }
    try {
      const response = await axios.post(`/sessions/${sessionId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      setFiles([]);
      onUploadSuccess();
    } catch (error) {
      alert(error.response?.data.error || 'Upload failed');
    }
  };
 
  return (
<div>
<h3>Upload Documents</h3>
<input type="file" multiple accept=".pdf" onChange={handleFileChange} />
<button onClick={handleUpload} disabled={!files.length}>
        Process Documents
</button>
</div>
  );
}
 
export default DocumentUploader;