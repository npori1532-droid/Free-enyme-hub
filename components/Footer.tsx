import React from 'react';
import { Github, Twitter, ExternalLink, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-white/10 pt-12 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
              Top Anime Hub
            </h2>
            <p className="text-gray-400 max-w-sm">
              Your ultimate destination for premium anime streaming. Experience the next generation of anime viewing with 3D interactivity and seamless performance.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Latest Releases</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Trending Now</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Top Rated</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Genres</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Developer Info</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="font-medium text-white">Developer:</span> Tech Master
              </p>
              <a href="https://t.me/tech_master_a2z" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-blue transition-colors">
                <Send className="h-4 w-4" /> Dev Channel
              </a>
              <a href="https://t.me/GAJARBOTOLZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-blue transition-colors">
                <Send className="h-4 w-4" /> Official Telegram
              </a>
              <a href="https://www.gajarbotol.site/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-blue transition-colors">
                <ExternalLink className="h-4 w-4" /> Website
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Top Anime Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <Github className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};
