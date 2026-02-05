export interface Anime {
  rank: number;
  title: string;
  img: string; // The API returns 'img' based on common scraps, mapping to 'image' for internal consistency if needed
  score: string;
  genres?: string[]; // Sometimes string, sometimes array depending on specific endpoint version
  id?: string;
  description?: string;
  release_date?: string;
  type?: string;
}

export interface AnimeState {
  items: Anime[];
  loading: boolean;
  error: string | null;
}

export interface FilterState {
  search: string;
  sortBy: 'rank' | 'score' | 'popularity';
}
