import { Anime } from '../types';
import { API_URL, MOCK_ANIME_DATA } from '../constants';

export const fetchTopAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // The API structure might be an array directly or wrapped in an object.
    // Based on common scraping APIs, it often returns a list.
    // We normalize the data here.
    
    const list = Array.isArray(data) ? data : data.data || [];
    
    // Map to ensure types are consistent
    return list.map((item: any, index: number) => ({
        rank: item.rank || index + 1,
        title: item.title || 'Unknown Title',
        img: item.img || item.image || 'https://picsum.photos/300/450',
        score: item.score || 'N/A',
        genres: item.genres ? (Array.isArray(item.genres) ? item.genres : [item.genres]) : [],
        description: item.synopsis || item.description || 'No description available.',
        type: item.type || 'TV'
    }));

  } catch (error) {
    console.error("Failed to fetch anime data, using mock data:", error);
    // Fallback to mock data for demo purposes if API fails (common with public free APIs)
    return MOCK_ANIME_DATA.map(item => ({...item, rank: item.rank, score: item.score}));
  }
};
