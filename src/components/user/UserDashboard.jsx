import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import { useToast } from '../../hooks/useToast';
import { signOut } from '../../services/auth';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import Toast from '../common/Toast';
import ComplaintForm from './ComplaintForm';
import ComplaintCard from './ComplaintCard';

const UserDashboard = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const { complaints, loading, refetch } = useComplaints(user.uid);
  const { toast, showToast, hideToast } = useToast();

  const handleLogout = async () => {
    await signOut();
  };

  const handleComplaintSuccess = (message, type = 'success') => {
    showToast(message, type);
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {toast && <Toast {...toast} onClose={hideToast} />}
      
      <Navbar user={user} onLogout={handleLogout} title="My Complaints" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">Track and manage your complaints</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={16} className="inline mr-2" />
            New Complaint
          </Button>
        </div>

        {showForm && (
          <ComplaintForm
            user={user}
            onClose={() => setShowForm(false)}
            onSuccess={handleComplaintSuccess}
          />
        )}

        {loading ? (
          <LoadingSpinner />
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center animate-fadeIn">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <AlertCircle size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No complaints yet</h3>
            <p className="text-gray-600 mb-6">Start by submitting your first complaint</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus size={16} className="inline mr-2" />
              Create Complaint
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {complaints.map((complaint, idx) => (
              <ComplaintCard key={complaint.id} complaint={complaint} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;