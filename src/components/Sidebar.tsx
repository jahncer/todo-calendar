import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, CheckSquare, Home, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/todos', icon: CheckSquare, label: 'Todos' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="bg-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold text-gray-800">TodoCalendar</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;