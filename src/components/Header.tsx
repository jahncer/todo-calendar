import React from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-semibold text-gray-900">TodoCalendar</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt="User avatar"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </button>
              {/* Add dropdown menu for user actions */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;