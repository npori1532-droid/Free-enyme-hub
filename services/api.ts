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
    const list = Array.isArray(data) ? data : data.data || [];
    
    // Map to ensure types are consistent
    return list.map((item: any, index: number) => {
        // Robust image extraction strategies to handle different API shapes
        let imageUrl = 
            item.img || 
            item.image || 
            item.thumbnail || 
            item.poster || 
            item.images?.jpg?.image_url || 
            item.images?.webp?.image_url ||
            item.picture_url ||
            item.cover;

        // Fix MAL low-res thumbnails to get high-res version
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('cdn.myanimelist.net')) {
             // Remove the /r/50x70/ part and the query parameters to get the original high-res image
             imageUrl = imageUrl.replace(/\/r\/\d+x\d+/, '').split('?')[0];
        }

        // Fallback if no image found
        if (!imageUrl) {
            imageUrl = 'https://picsum.photos/300/450';
        }

        return {
            rank: parseInt(item.rank) || index + 1,
            title: item.title || 'Unknown Title',
            img: imageUrl,
            score: item.score || 'N/A',
            genres: item.genres ? (Array.isArray(item.genres) ? item.genres : [item.genres]) : [],
            description: item.synopsis || item.description || 'No description available.',
            type: item.type || 'TV',
            release_date: item.release || item.release_date,
            members: item.members || 'N/A',
            link: item.link || '#'
        };
    });

  } catch (error) {
    console.error("Failed to fetch anime data, using mock data:", error);
    // Fallback to mock data for demo purposes if API fails
    return MOCK_ANIME_DATA.map(item => ({
        ...item, 
        rank: item.rank, 
        score: item.score,
        link: item.link || '#'
    }));
  }
};