import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../components/config";

const ViraAI = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For modal
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("descending");
  const [daysToSearch, setDaysToSearch] = useState(1);
  const entriesPerPage = 7;

  const calendarId = "5e8e29a689c0ec7f93a3ed065f7ad6f21e25696863e8977f10fd6dc6cc8ef4cf@group.calendar.google.com";

  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/calls`, {
          headers: { "x-access-token": token },
          params: { days_to_search: daysToSearch },
        });

        const mappedCalls = response.data.map((call) => ({
          _id: call.mongo_id,
          twilio_sid: call.twilio_sid,
          callStartTime: call.combined_data.call_times.mongo_start,
          callEndTime: call.combined_data.call_times.mongo_end,
          callDuration: `${call.combined_data.call_details.duration} seconds`,
          username: call.combined_data.caller_info.username,
          email: call.combined_data.caller_info.email,
          transcript: call.combined_data.call_details.transcript || [],
          phoneNumber: call.combined_data.caller_info.from_number,
          toNumber: call.combined_data.caller_info.to_number,
        }));

        setCalls(mappedCalls);
        const sortedCalls = [...mappedCalls].sort((a, b) => {
          const dateA = new Date(a.callStartTime);
          const dateB = new Date(b.callStartTime);
          return sortDirection === "ascending" ? dateA - dateB : dateB - dateA;
        });
        setFilteredCalls(sortedCalls);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching calls:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to fetch call entries.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [token, daysToSearch, sortDirection]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = calls.filter(
      (call) =>
        call.phoneNumber.toLowerCase().includes(query) ||
        call.username.toLowerCase().includes(query) ||
        call.toNumber.toLowerCase().includes(query)
    );
    setFilteredCalls(filtered);
    setCurrentPage(1);
  };

  const handleSort = (direction) => {
    setSortDirection(direction);
    const sortedCalls = [...filteredCalls].sort((a, b) => {
      const dateA = new Date(a.callStartTime);
      const dateB = new Date(b.callStartTime);
      return direction === "ascending" ? dateA - dateB : dateB - dateA;
    });
    setFilteredCalls(sortedCalls);
    setCurrentPage(1);
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp((`${query}`), "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const openTranscriptModal = (transcript) => setSelectedTranscript(transcript);
  const closeTranscriptModal = () => setSelectedTranscript(null);

  const openAppointmentModal = (callStartTime) => setSelectedAppointment(callStartTime);
  const closeAppointmentModal = () => setSelectedAppointment(null);

  const goToHome = () => navigate("/");

  const formatDateTime = (start, end) => {
    if (!start || !end) return "N/A";
    const startDate = new Date(start).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const endDate = new Date(end).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${startDate} - ${endDate}`;
  };

  const getCalendarIframeUrl = (callStartTime) => {
    const date = new Date(callStartTime);
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    return `https://calendar.google.com/calendar/embed?mode=AGENDA&dates=${formattedDate}/${formattedDate}&src=${calendarId}&ctz=Asia/Kolkata`;
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCalls.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCalls.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col py-12 px-6 relative">
      <button
        onClick={goToHome}
        className="absolute top-6 right-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-700 animate-pulse">
            Vira AI Call Logs
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            View and manage your call logs and appointments
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by number..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
          />
          <select
            value={daysToSearch}
            onChange={(e) => setDaysToSearch(Number(e.target.value))}
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <option value={1}>1 Day</option>
            <option value={3}>3 Days</option>
          </select>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M3 6h18M3 14h18M3 18h18"
                />
              </svg>
              All Call Logs
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("descending")}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                  sortDirection === "descending"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                title="Sort by latest first"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Latest
              </button>
              <button
                onClick={() => handleSort("ascending")}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                  sortDirection === "ascending"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                title="Sort by oldest first"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Older
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
            </div>
          )}
          {error && !loading && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && filteredCalls.length === 0 && (
            <p className="text-gray-500 italic text-center">
              No call logs available.
            </p>
          )}
          {!loading && !error && filteredCalls.length > 0 && (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="p-4 text-indigo-800 font-semibold border-b-2 border-indigo-200 w-48">
                      From Number
                    </th>
                    <th className="p-4 text-indigo-800 font-semibold border-b-2 border-indigo-200 w-48">
                      To Number
                    </th>
                    <th className="p-4 text-indigo-800 font-semibold border-b-2 border-indigo-200">
                      Call-logs
                    </th>
                    <th className="p-4 text-indigo-800 font-semibold border-b-2 border-indigo-200">
                      Transcript
                    </th>
                    <th className="p-4 text-indigo-800 font-semibold border-b-2 border-indigo-200">
                      Appointment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((call) => (
                    <tr
                      key={call._id}
                      className="hover:bg-indigo-50 transition-colors duration-200"
                    >
                      <td className="p-4 border-b border-indigo-100 w-48">
                        {highlightText(call.phoneNumber, searchQuery)}
                      </td>
                      <td className="p-4 border-b border-indigo-100 w-48">
                        {highlightText(call.toNumber, searchQuery)}
                      </td>
                      <td className="p-4 border-b border-indigo-100">
                        {formatDateTime(call.callStartTime, call.callEndTime)}
                      </td>
                      <td className="p-4 border-b border-indigo-100">
                        {call.transcript.length > 0 ? (
                          <ul className="space-y-1">
                            {call.transcript.slice(0, 1).map((entry, index) => (
                              <li key={index}>
                                <strong>User:</strong> {entry.user || "N/A"}{" "}
                                <br />
                                <strong>Agent:</strong> {entry.gpt || "N/A"}
                              </li>
                            ))}
                            {call.transcript.length > 1 && (
                              <button
                                onClick={() => openTranscriptModal(call.transcript)}
                                className="text-indigo-600 hover:underline italic"
                              >
                                ... (see more)
                              </button>
                            )}
                          </ul>
                        ) : (
                          "No transcript available"
                        )}
                      </td>
                      <td className="p-4 border-b border-indigo-100">
                        <div className="relative group">
                          <button
                            onClick={() => openAppointmentModal(call.callStartTime)}
                            className="text-indigo-600 hover:underline italic"
                          >
                            View Appointment
                          </button>
                          <div className="absolute hidden group-hover:block z-10 -top-48 left-0 w-64 h-48 bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300">
                            <iframe
                              src={getCalendarIframeUrl(call.callStartTime)}
                              style={{ border: 0 }}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              scrolling="no"
                              title="Appointment Calendar"
                            ></iframe>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center gap-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Transcript Modal */}
      {selectedTranscript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-800">Full Transcript</h3>
              <button
                onClick={closeTranscriptModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="space-y-4">
              {selectedTranscript.map((entry, index) => (
                <li key={index} className="border-b pb-2">
                  <strong className="text-indigo-600">User:</strong>{" "}
                  {entry.user || "N/A"} <br />
                  <strong className="text-indigo-600">Agent:</strong>{" "}
                  {entry.gpt || "N/A"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-800">Appointment Details</h3>
              <button
                onClick={closeAppointmentModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <iframe
              src={getCalendarIframeUrl(selectedAppointment)}
              style={{ border: 0 }}
              width="100%"
              height="500"
              frameBorder="0"
              scrolling="no"
              title="Appointment Calendar"
            ></iframe>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViraAI;