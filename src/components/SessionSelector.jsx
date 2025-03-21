 
import React from 'react';
 
function SessionSelector({ sessions, currentSession, onSelect, onCreate, onDelete }) {
  return (
<div>
<select
        value={currentSession || ''}
        onChange={(e) => onSelect(e.target.value)}
        disabled={!sessions.length}
>
<option value="">Select a session</option>
        {sessions.map((session) => (
<option key={session} value={session}>
            {session}
</option>
        ))}
</select>
<button onClick={onCreate}>Create New Session</button>
      {currentSession && <button onClick={onDelete}>Delete Session</button>}
</div>
  );
}
 
export default SessionSelector;