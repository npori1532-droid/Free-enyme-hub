import React from 'react';
import { X, Star, Calendar, Clock, Film, Users, ExternalLink } from 'lucide-react';
import { Anime } from '../types';

interface AnimeModalProps {
  anime: Anime | null;
  onClose: () => void;
}

export const AnimeModal: React.FC<AnimeModalProps> = ({ anime, onClose }) => {
  if (!anime) return null;

  const handleWatchClick = () => {
    if (anime.link) {
        window.open(anime.link, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card-bg w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Hero Image Side */}
          <div className="relative h-64 md:h-full min-h-[400px]">
            <img 
              src={anime.img} 
              alt={anime.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card-bg md:bg-gradient-to-r md:from-transparent md:to-card-bg" />
          </div>

          {/* Content Side */}
          <div className="p-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-bold border border-neon-purple/50">
                  {anime.type}
                </span>
                <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <Star className="h-4 w-4 fill-current" /> {anime.score}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{anime.title}</h2>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((g, i) => (
                  <span key={i} className="text-sm text-gray-400 hover:text-neon-blue cursor-pointer transition-colors">
                    #{g}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {anime.description}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Calendar className="h-3 w-3" /> Release
                </div>
                <div className="text-white font-medium text-sm">{anime.release_date || 'N/A'}</div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Clock className="h-3 w-3" /> Status
                </div>
                <div className="text-white font-medium text-sm">Finished</div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Users className="h-3 w-3" /> Members
                </div>
                <div className="text-white font-medium text-sm truncate" title={anime.members}>{anime.members || 'N/A'}</div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
               <button 
                 onClick={handleWatchClick}
                 className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
               >
                 <Film className="h-5 w-5" /> Watch Stream
               </button>
               <button 
                 onClick={handleWatchClick}
                 className="flex-1 bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
               >
                 <ExternalLink className="h-5 w-5" /> Source Info
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};