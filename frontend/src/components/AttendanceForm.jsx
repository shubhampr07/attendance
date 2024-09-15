import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 


const AttendanceForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (name.length > 0) {
        try {
          const response = await axios.get(`https://attendance-jgqz.onrender.com/names?prefix=${name}`);
          setSuggestions(response.data);
          setShowSuggestions(true); 
        } catch (error) {
          console.error('Error fetching name suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [name]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setSuggestions([]);
    setShowSuggestions(false); 
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleFocus = () => {
    if (name.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://attendance-jgqz.onrender.com/attendance', { name });
      onSubmit();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter your name"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white shadow-lg rounded-md z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-400 hover:text-gray-900"
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
};

AttendanceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AttendanceForm;
