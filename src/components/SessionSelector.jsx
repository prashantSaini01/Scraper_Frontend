import React, { useState } from 'react';

function SessionSelector({ sessions, currentSession, onSelect, isLoading, onRename }) {
  const [editingSession, setEditingSession] = useState(null);
  const [newName, setNewName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEditClick = (session, e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    setEditingSession(session);
    setNewName(session);
  };

  const handleSave = async (session, e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    if (newName.trim()) {
      await onRename(session, newName.trim());
      setEditingSession(null);
      setNewName('');
    }
  };

  const handleSessionSelect = (session) => {
    onSelect(session);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Session
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="block truncate">
            {currentSession ? (currentSession.startsWith('202') ? currentSession.substring(0, 16) + '...' : currentSession) : 'Select a session'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg 
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute mt-1 w-full z-10 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {sessions.map((session) => (
              <div
                key={session}
                className={`relative cursor-pointer select-none hover:bg-gray-50 ${
                  currentSession === session ? 'bg-indigo-50' : ''
                }`}
              >
                {editingSession === session ? (
                  <div className="flex items-center px-3 py-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="block w-full text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => handleSave(session, e)}
                      className="ml-2 p-1 text-green-600 hover:text-green-800"
                      title="Save"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSession(null);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      title="Cancel"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-between px-3 py-2"
                    onClick={() => handleSessionSelect(session)}
                  >
                    <span className="block truncate">
                      {session.startsWith('202') ? session.substring(0, 16) + '...' : session}
                    </span>
                    <button
                      onClick={(e) => handleEditClick(session, e)}
                      className="ml-2 p-1 text-gray-400 hover:text-indigo-600"
                      title="Rename"
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {sessions.length === 0 && !isLoading && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No sessions available
              </div>
            )}
            
            {isLoading && (
              <div className="flex items-center px-3 py-2 text-sm text-gray-500">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading sessions...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionSelector;
