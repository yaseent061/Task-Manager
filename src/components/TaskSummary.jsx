import React from 'react';

const TaskSummary = ({ tasks }) => {
  const counts = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <SummaryCard label="Total Tasks" count={counts.total} color="bg-gray-50 text-gray-600" />
      <SummaryCard label="Pending" count={counts.pending} color="bg-yellow-50 text-yellow-600" />
      <SummaryCard label="In Progress" count={counts.inProgress} color="bg-blue-50 text-blue-600" />
      <SummaryCard label="Completed" count={counts.completed} color="bg-green-50 text-green-600" />
    </div>
  );
};

const SummaryCard = ({ label, count, color }) => (
  <div className={`p-4 rounded-xl border border-transparent ${color} bg-opacity-50`}>
    <p className="text-sm font-medium opacity-80">{label}</p>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default TaskSummary;
