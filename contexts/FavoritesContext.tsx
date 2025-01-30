import { Movie } from "constants/movie-types";
import { create } from "zustand";

type FavoritesStore = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
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
}));
