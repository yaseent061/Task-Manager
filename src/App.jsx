import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import { LayoutDashboard, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-6">
        <div className="font-bold text-xl text-blue-600 mr-4">TaskMaster</div>
        <NavLink to="/" className={linkClass} end>
          <LayoutDashboard size={18} />
          All Tasks
        </NavLink>
        <NavLink to="/completed" className={linkClass}>
          <CheckSquare size={18} />
          Completed
        </NavLink>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/completed" element={<Dashboard showCompletedOnly={true} />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
