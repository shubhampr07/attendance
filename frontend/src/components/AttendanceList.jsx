


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from 'date-fns';

// const AttendanceList = () => {
//   const [attendances, setAttendances] = useState([]);
//   const [filteredAttendances, setFilteredAttendances] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const fetchAttendances = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/attendance');
//       setAttendances(response.data);
//       setFilteredAttendances(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance records:', error);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (date) {
//       const formattedDate = format(date, 'yyyy-MM-dd');
//       const filtered = attendances.filter((record) => {
//         const recordDate = new Date(record.checkInTime);
//         const recordDateString = format(recordDate, 'yyyy-MM-dd');
//         return recordDateString === formattedDate;
//       });
//       setFilteredAttendances(filtered);
//     } else {
//       setFilteredAttendances(attendances);
//     }
//   };

//   const handleCheckOut = async (id) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/attendance/${id}/checkout`);
//       setAttendances(attendances.map(record =>
//         record._id === id ? response.data : record
//       ));
//       setFilteredAttendances(filteredAttendances.map(record =>
//         record._id === id ? response.data : record
//       ));
//     } catch (error) {
//       console.error('Error checking out:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAttendances();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-4 border rounded-md shadow-md bg-white mt-6">
//       <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
//       <div className="mb-4">
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="yyyy-MM-dd"
//           className="p-2 border border-gray-300 rounded-md"
//           placeholderText="Select a date"
//         />
//       </div>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-200 border-b">
//             <th className="py-2 px-4 border text-left">Serial No.</th>
//             <th className="py-2 px-4 border text-left">Name</th>
//             <th className="py-2 px-4 border text-left">Check-In Time</th>
//             <th className="py-2 px-4 border text-left">Check-Out Time</th>
//             <th className="py-2 px-4 border text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAttendances.map((record, index) => (
//             <tr key={record._id} className="border-b">
//               <td className="py-2 px-4">{index + 1}</td>
//               <td className="py-2 px-4">{record.name}</td>
//               <td className="py-2 px-4">
//                 {new Date(record.checkInTime).toLocaleString()}
//               </td>
//               <td className="py-2 px-4">
//                 {record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : 'Not Checked Out'}
//               </td>
//               <td className="py-2 px-4">
//                 {!record.checkOutTime && (
//                   <button
//                     onClick={() => handleCheckOut(record._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                   >
//                     Check Out
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceList;


import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchAttendances = async (date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await axios.get(`http://localhost:5000/attendance?date=${formattedDate}`);
      setAttendances(response.data);
      setFilteredAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      fetchAttendances(date);
    }
  };

  const handleCheckOut = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/attendance/${id}/checkout`);
      setAttendances(attendances.map(record =>
        record._id === id ? response.data : record
      ));
      setFilteredAttendances(filteredAttendances.map(record =>
        record._id === id ? response.data : record
      ));
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  useEffect(() => {
    fetchAttendances(selectedDate);
  }, [selectedDate]);

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-md shadow-md bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      {filteredAttendances.length === 0 ? (
        <p className="text-center text-gray-500">No attendance records for this date.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-2 px-4 border text-left">Serial No.</th>
              <th className="py-2 px-4 border text-left">Name</th>
              <th className="py-2 px-4 border text-left">Check-In Time</th>
              <th className="py-2 px-4 border text-left">Check-Out Time</th>
              <th className="py-2 px-4 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.map((record, index) => (
              <tr key={record._id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{record.name}</td>
                <td className="py-2 px-4">
                  {new Date(record.checkInTime).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  {record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : 'Not Checked Out'}
                </td>
                <td className="py-2 px-4">
                  {!record.checkOutTime && (
                    <button
                      onClick={() => handleCheckOut(record._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceList;
