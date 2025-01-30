import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MovieModalView from "../components/MovieModalView";
import { useFavoritesStore } from "contexts/FavoritesStore";
import type { Movie } from "../../constants/movie-types";

 const MovieModalContainer = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ movie?: string }>();
  const { favorites, toggleFavorite, setRating, getRating } =
    useFavoritesStore();
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

  const handleRatingChange = (rating: number) => {
    if (movieData) {
      setRating(movieData, rating);
    }
  };

  const currentRating = movieData ? getRating(movieData) : 0;

  return (
    <MovieModalView
      movie={movieData}
      isFavorite={isFavorite}
      rating={currentRating}
      onToggleFavorite={toggleFavorite}
      onRatingChange={handleRatingChange}
      onClose={handleClose}
    />
  );
};
export default MovieModalContainer;