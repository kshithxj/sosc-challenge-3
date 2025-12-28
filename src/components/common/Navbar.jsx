import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import Button from './Button';

const Navbar = ({ user, onLogout, title = 'Dashboard' }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={onLogout}>
          <LogOut size={16} className="inline mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;