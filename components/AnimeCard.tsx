import React, { useRef, useState } from 'react';
import { Star, PlayCircle } from 'lucide-react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  isFavorite: boolean;
  toggleFavorite: (anime: Anime) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, isFavorite, toggleFavorite }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative group perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(anime)}
    >
      <div
        ref={cardRef}
        className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl transition-transform duration-100 ease-linear transform-style-3d cursor-pointer bg-card-bg border border-white/5 hover:border-neon-blue/50"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Image Background */}
        <div className="absolute inset-0">
          <img
            src={anime.img}
            alt={anime.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              // Fallback if the specific image URL is broken
              e.currentTarget.src = 'https://picsum.photos/300/450';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 text-xs font-bold bg-neon-blue text-black rounded-sm">
              Rank #{anime.rank}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold">{anime.score}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 leading-tight" title={anime.title}>
            {anime.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
             {anime.genres?.slice(0, 2).map((g, i) => (
               <span key={i} className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                 {g}
               </span>
             ))}
          </div>

          <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button className="flex items-center gap-2 text-sm font-medium text-neon-blue hover:text-white transition-colors">
              <PlayCircle className="h-5 w-5" />
              Watch Now
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(anime);
              }}
              className={`p-2 rounded-full ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-white'}`}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};