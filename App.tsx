import React, { useEffect, useState, useMemo } from 'react';
import { ThreeScene } from './components/ThreeScene';
import { Navbar } from './components/Navbar';
import { AnimeCard } from './components/AnimeCard';
import { Footer } from './components/Footer';
import { AnimeModal } from './components/AnimeModal';
import { fetchTopAnime } from './services/api';
import { Anime } from './types';
import { Flame, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('anime_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTopAnime();
        setAnimes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('anime_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (anime: Anime) => {
    if (!anime.title) return; // Fallback for key
    setFavorites(prev => 
      prev.includes(anime.title) 
        ? prev.filter(t => t !== anime.title)
        : [...prev, anime.title]
    );
  };

  const filteredAnimes = useMemo(() => {
    return animes.filter(anime => 
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.genres?.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [animes, searchTerm]);

  return (
    <div className="min-h-screen relative text-white selection:bg-neon-blue selection:text-black">
      {/* 3D Background */}
      <ThreeScene />
      
      {/* Navigation */}
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        
        {/* Hero Section Content */}
        {!searchTerm && (
          <div className="mb-16 text-center space-y-6 py-10">
             <div className="inline-block animate-bounce">
                <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20 text-sm font-semibold">
                  #1 Anime Streaming Platform
                </span>
             </div>
             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                Discover the <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(188,19,254,0.5)]">
                   Next Generation
                </span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg text-gray-400">
               Dive into a vast library of anime with immersive 3D interactions and premium streaming quality.
             </p>
          </div>
        )}

        {/* Content Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">{searchTerm ? 'Search Results' : 'Trending Now'}</h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-neon-blue mb-4" />
              <p className="text-gray-400 animate-pulse">Loading Anime Data...</p>
            </div>
          ) : (
            <>
              {filteredAnimes.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No anime found matching "{searchTerm}"
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAnimes.map((anime, index) => (
                    <div key={`${anime.title}-${index}`} className="h-full">
                      <AnimeCard 
                        anime={anime} 
                        onClick={setSelectedAnime}
                        isFavorite={favorites.includes(anime.title)}
                        toggleFavorite={toggleFavorite}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedAnime && (
        <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}

      <Footer />
    </div>
  );
};

export default App;
