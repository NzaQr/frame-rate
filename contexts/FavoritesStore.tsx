import { create } from "zustand";
import { Movie } from "../constants/movie-types";

export type MovieRating = {
  movie: Movie;
  rating: number;
};

type FavoritesStore = {
  favorites: Movie[];
  ratings: MovieRating[];
  toggleFavorite: (movie: Movie) => void;
  setRating: (movie: Movie, rating: number) => void;
  getRating: (movie: Movie) => number;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  ratings: [],
  toggleFavorite: (movie: Movie) =>
    set((state) => {
      const isFavorite = state.favorites.some((fav) => fav.id === movie.id);
      if (isFavorite) {
        return {
          favorites: state.favorites.filter((fav) => fav.id !== movie.id),
        };
      } else {
        return {
          favorites: [...state.favorites, movie],
        };
      }
    }),
  setRating: (movie: Movie, rating: number) =>
    set((state) => {
      const existingRatingIndex = state.ratings.findIndex(
        (r) => r.movie.id === movie.id
      );
      if (existingRatingIndex >= 0) {
        const newRatings = [...state.ratings];
        newRatings[existingRatingIndex] = { movie, rating };
        return { ratings: newRatings };
      }
      return { ratings: [...state.ratings, { movie, rating }] };
    }),
  getRating: (movie: Movie) => {
    const rating = get().ratings.find((r) => r.movie.id === movie.id);
    return rating?.rating || 0;
  },
}));
