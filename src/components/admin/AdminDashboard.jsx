import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import { useToast } from '../../hooks/useToast';
import { signOut } from '../../services/auth';
import Navbar from '../common/Navbar';
import LoadingSpinner from '../common/LoadingSpinner';
import Toast from '../common/Toast';
import StatsCards from './StatsCards';
import ComplaintTable from './ComplaintTable';

const AdminDashboard = ({ user }) => {
  const [filter, setFilter] = useState({ status: 'all', priority: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const { complaints, loading, refetch } = useComplaints();
  const { toast, showToast, hideToast } = useToast();

  const handleLogout = async () => {
    await signOut();
  };

  const handleUpdate = (message, type = 'success') => {
    showToast(message, type);
    refetch();
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter.status === 'all' || c.status === filter.status;
    const matchesPriority = filter.priority === 'all' || c.priority === filter.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {toast && <Toast {...toast} onClose={hideToast} />}
      
      <Navbar user={user} onLogout={handleLogout} title="Admin Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <ComplaintTable complaints={filteredComplaints} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
