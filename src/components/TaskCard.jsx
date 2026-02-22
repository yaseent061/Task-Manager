import React from 'react';
import { Calendar, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Completed': 'bg-green-100 text-green-800 border-green-200',
};


const TaskCard = ({ task, onEdit, onDelete, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <div className="flex gap-2">
          {task.status !== 'Completed' && (
            <button 
              onClick={() => onStatusUpdate(task, 'Completed')}
              className="flex items-center gap-1 text-blue-400 hover:text-green-600 transition-colors"
              aria-label="Mark as Completed"
              title="Mark as Completed"
            >
              Mark As Completed <CheckCircle size={18} />
            </button>
          )}
          <button 
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center text-gray-500 text-xs mt-auto pt-3 border-t border-gray-100">
        <Calendar size={14} className="mr-1.5" />
        <span>Due: {task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
