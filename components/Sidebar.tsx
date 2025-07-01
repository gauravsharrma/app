
import React from 'react';
import { AppId, AppInfo } from '../types';
import { APPS } from '../constants';

interface SidebarProps {
  activeApp: AppId;
  setActiveApp: (id: AppId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeApp, setActiveApp }) => {
  return (
    <nav className="flex flex-col p-4 space-y-2">
      <h1 className="px-4 pt-2 pb-4 text-2xl font-bold text-white tracking-wider">Tools</h1>
      {APPS.map((app: AppInfo) => (
        <button
          key={app.id}
          onClick={() => setActiveApp(app.id)}
          className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 text-white font-semibold text-left focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
            ${
              activeApp === app.id
                ? 'bg-white/20 shadow-lg'
                : 'bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <span className="text-purple-300">{app.icon}</span>
          <span>{app.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;
