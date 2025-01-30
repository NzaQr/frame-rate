export type Movie = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  year: number;
  poster: string;
};

export const TMDB_API_KEY = "7e8845586d780d43d2434f0780112873";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
