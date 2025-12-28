import React from 'react';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const ComplaintCard = ({ complaint, index }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 animate-slideUp border border-gray-100"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{complaint.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{complaint.description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[complaint.status]}`}>
          {complaint.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[complaint.priority]}`}>
          {complaint.priority} Priority
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {complaint.category}
        </span>
        <span className="text-xs text-gray-500 ml-auto">
          {formatDate(complaint.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ComplaintCard;