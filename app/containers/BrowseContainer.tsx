import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BrowseView from "../components/BrowseView";
import { useFavoritesStore } from "contexts/FavoritesStore";
import { movieApi } from "services/movieApi";

const BrowseContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavoritesStore();

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () =>
      searchQuery
        ? movieApi.searchMovies(searchQuery)
        : movieApi.fetchPopularMovies(),
  });

  return (
    <BrowseView
      movies={movies ?? []}
      favorites={favorites}
      searchQuery={searchQuery}
      isLoading={isLoading}
      error={error}
      onSearchChange={setSearchQuery}
    />
  );
};

export default BrowseContainer;
