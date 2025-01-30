import axios from "axios";
import { Movie, BASE_URL, TMDB_API_KEY } from "constants/movie-types";

export const movieApi = {
  fetchPopularMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY },
    });
    return response.data.results.map((movie: any) => ({
      ...movie,
      year: new Date(movie.release_date).getFullYear(),
    }));
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query },
    });
    return response.data.results;
  },
};
