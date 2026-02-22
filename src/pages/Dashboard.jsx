import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import TaskSummary from '../components/TaskSummary';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';

const Dashboard = ({ showCompletedOnly = false }) => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'

  // Derived state for filtering and sorting
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Route-based filtering (Challenge Requirement)
    if (showCompletedOnly) {
      result = result.filter(t => t.status === 'Completed');
    } 
    // 2. Dropdown filtering
    else if (filterStatus !== 'All') {
      result = result.filter(t => t.status === filterStatus);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [tasks, filterStatus, sortBy, showCompletedOnly]);

  const handleAddEdit = (taskData) => {
    if (editingTask) {
      updateTask({ ...taskData, id: editingTask.id });
    } else {
      addTask(taskData);
    }
  };

  const handleStatusUpdate = (task, newStatus) => {
    updateTask({ ...task, status: newStatus });
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {showCompletedOnly ? 'Completed Tasks' : 'Task Dashboard'}
          </h1>
          <p className="text-gray-500 mt-1">Manage your productivity efficiently</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </header>

      {!showCompletedOnly && <TaskSummary tasks={tasks} />}

      {/* Controls Bar */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {!showCompletedOnly && (
        <div className="flex items-center gap-2 text-gray-600">
          <Filter size={18} />
          <span className="text-sm font-medium">Filter:</span>
          <select
            className="bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 py-1 px-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            disabled={showCompletedOnly}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        )}

        <div className="flex items-center gap-2 text-gray-600 ml-auto">
          <ArrowUpDown size={18} />
          <span className="text-sm font-medium">Sort by:</span>
          <select
            className="bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 py-1 px-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {processedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={deleteTask}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">No tasks found matching your criteria.</p>
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEdit}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;
