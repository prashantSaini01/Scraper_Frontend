import React from 'react';

function SessionSelector({ sessions, currentSession, onSelect, isLoading }) {
  return (
    <div className="space-y-3">
      <label htmlFor="session-select" className="block text-sm font-medium text-gray-700">
        Select Session
      </label>
      <div className="relative">
        <select
          id="session-select"
          value={currentSession || ''}
          onChange={(e) => onSelect(e.target.value)}
          disabled={!sessions.length || isLoading}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <option value="">Select a session</option>
          {sessions.map((session) => (
            <option key={session} value={session}>
              Session: {session.substring(0, 8)}...
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {sessions.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500 mt-2">
          No sessions available. Create a new session to get started.
        </p>
      )}
      
      {isLoading && (
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading sessions...
        </div>
      )}
    </div>
  );
}

export default SessionSelector;