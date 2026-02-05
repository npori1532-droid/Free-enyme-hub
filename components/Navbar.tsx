import React from 'react';
import { Search, Menu, User, Tv } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchTerm: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, searchTerm }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Tv className="h-8 w-8 text-neon-blue animate-pulse" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
              Top Anime Hub
            </span>
          </div>

          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-neon-blue transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-900 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue sm:text-sm transition-all duration-300"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <User className="h-6 w-6" />
            </button>
            <button className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <input
          type="text"
          className="block w-full px-4 py-2 border border-gray-700 rounded-full bg-gray-800 text-gray-300 focus:border-neon-blue focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </nav>
  );
};
