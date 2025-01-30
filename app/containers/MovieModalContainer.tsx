import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFavoritesStore } from "../../contexts/FavoritesStore";
import { MovieModalView } from "../components/MovieModalView";
import type { Movie } from "../../constants/movie-types";

export const MovieModalContainer = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ movie?: string }>();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.movie) {
      try {
        const parsedMovie = JSON.parse(params.movie);
        setMovieData(parsedMovie);
      } catch (error) {
        console.error("Error parsing movie data:", error);
        setMovieData(null);
      }
    }
  }, [params.movie]);

  useEffect(() => {
    if (movieData) {
      setIsFavorite(favorites.some((fav) => fav.id === movieData.id));
    }
  }, [favorites, movieData]);

  const handleClose = () => {
    router.back();
  };

  return (
    <MovieModalView
      movie={movieData}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      onClose={handleClose}
    />
  );
};
