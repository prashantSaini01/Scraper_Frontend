import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAgentConfig, fetchAgentConfig } from '../redux/slices/lawbot/lawbotSlice';
import { toast } from 'react-toastify';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'technical', label: 'Technical' },
];

const AgentConfigPanel = ({ sessionId }) => {
  const dispatch = useDispatch();  const { agentConfig, isLoading, error } = useSelector((state) => state.lawbot);
  const [localConfig, setLocalConfig] = useState({    name: '',
    role: '',    expertise: '',
    tone: 'professional',  });
  useEffect(() => {
    if (sessionId) {      dispatch(fetchAgentConfig(sessionId));
    }  }, [sessionId, dispatch]);
  useEffect(() => {
    if (agentConfig) {      setLocalConfig(agentConfig);
    }  }, [agentConfig]);
  const handleChange = (e) => {
    const { name, value } = e.target;    setLocalConfig((prev) => ({
      ...prev,      [name]: value,
    }));  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!localConfig.name.trim()) {
      toast.error("Please enter an agent name");
      return;
    }
    if (!localConfig.role.trim()) {
      toast.error("Please enter an agent role");
      return;
    }
    if (!localConfig.expertise.trim()) {
      toast.error("Please enter agent expertise");
      return;
    }

    if (sessionId) {
      try {
        await dispatch(updateAgentConfig({ sessionId, config: localConfig })).unwrap();
        toast.success("Agent configuration updated successfully!");
      } catch (error) {
        toast.error(error || "Failed to update agent configuration");
      }
    }
  };
  if (!sessionId) return null;
  return (    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Configuration</h3>      <form onSubmit={handleSubmit}>
        <div className="space-y-4">          <div>
            <label className="block text-sm font-medium text-gray-700">Agent Name</label>            <input
              type="text"              name="name"
              value={localConfig.name}              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"              placeholder="Enter agent name"
            />          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>            <input
              type="text"              name="role"
              value={localConfig.role}              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"              placeholder="e.g., Legal Assistant"
            />          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expertise</label>            <input
              type="text"              name="expertise"
              value={localConfig.expertise}              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"              placeholder="e.g., Contract Law"
            />          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tone</label>            <select
              name="tone"              value={localConfig.tone}
              onChange={handleChange}              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >              {TONE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>                  {option.label}
                </option>              ))}
            </select>          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>          )}
          <button
            type="submit"            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}          >
            {isLoading ? 'Updating...' : 'Update Configuration'}          </button>
        </div>      </form>
    </div>  );
};

export default AgentConfigPanel;































































