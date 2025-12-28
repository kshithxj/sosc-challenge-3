import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import Button from '../common/Button';
import { createComplaint } from '../../services/firestore';
import { categorizeComplaint } from '../../services/gemini';

const ComplaintForm = ({ user, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Get AI categorization
      const aiResult = await categorizeComplaint(title + ' ' + description);
      
      // Create complaint with AI data
      await createComplaint({
        title,
        description,
        category: aiResult.category,
        priority: aiResult.priority,
        status: 'Pending',
        userId: user.uid,
        userEmail: user.email
      });

      onSuccess('Complaint submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Error submitting complaint:', err);
      onSuccess('Failed to submit complaint', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Submit New Complaint</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="5"
              placeholder="Provide detailed information about your complaint..."
              required
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <Zap size={16} className="text-blue-600" />
            <span>AI will automatically categorize and prioritize your complaint</span>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
            <Button variant="secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;