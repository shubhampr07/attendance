

import './App.css'
import AttendanceForm from './components/AttendanceForm'
import AttendanceList from './components/AttendanceList'

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gray-400 text-white py-6 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Attendance Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <AttendanceForm onSubmit={() => window.location.reload()} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <AttendanceList />
        </div>
      </main>
    </div>
  )
}

export default App
