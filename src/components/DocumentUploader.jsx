import React, { useState } from 'react';
import axios from 'axios';

function DocumentUploader({ sessionId, onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    for (let file of files) {
      formData.append('pdfs', file);
    }
    
    try {
      const response = await axios.post(`/sessions/${sessionId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      setFiles([]);
      onUploadSuccess();
      // Use a more subtle notification instead of an alert
      // You could implement a toast notification system here
    } catch (error) {
      alert(error.response?.data.error || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-900">Upload Documents</h3>
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 text-gray-400 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-xs text-gray-500">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF files only</p>
          </div>
          <input
            type="file" 
            className="hidden" 
            multiple 
            accept=".pdf" 
            onChange={handleFileChange} 
            disabled={isUploading}
          />
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md text-sm">
                <div className="flex items-center flex-grow overflow-hidden">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(index)} 
                  className="ml-2 flex-shrink-0 text-red-500 hover:text-red-700 focus:outline-none"
                  disabled={isUploading}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isUploading && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <button 
        onClick={handleUpload} 
        disabled={!files.length || isUploading}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Process Documents
          </>
        )}
      </button>
    </div>
  );
}

export default DocumentUploader;