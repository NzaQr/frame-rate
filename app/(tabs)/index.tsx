import { Suspense, useState } from "react";
import { FlatList } from "react-native";
import {
  Input,
  Button,
  YStack,
  XStack,
  Card,
  H4,
  Paragraph,
  Image,
  Spinner,
  H3,
  H2,
  H5,
} from "tamagui";
import { Search, Heart } from "@tamagui/lucide-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Link } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TMDB_API_KEY = "7e8845586d780d43d2434f0780112873";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  year: number;
  poster: string;
};

const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: TMDB_API_KEY },
  });
  return response.data.results.map((movie: any) => ({
    ...movie,
    year: new Date(movie.release_date).getFullYear(),
  }));
};

const searchMovies = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: TMDB_API_KEY, query },
  });
  return response.data.results;
};

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavorites();

  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useQuery<Movie[]>({
    queryKey: ["movies", searchQuery],
    queryFn: () =>
      searchQuery ? searchMovies(searchQuery) : fetchPopularMovies(),
  });

  const renderMovieItem = ({ item }: { item: Movie }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <Link
        href={{ pathname: "/modal", params: { movie: JSON.stringify(item) } }}
        asChild
      >
        <Card elevate size="$2" bordered marginBottom="$4">
          <Card.Header padded>
            <Suspense fallback={<Spinner size="large" color="$red10" />}>
              <YStack>
                {isFavorite && (
                  <Heart
                    color={"red"}
                    fill={"red"}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 1,
                    }}
                  />
                )}
                <Image
                  source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                  width={150}
                  height={225}
                />
              </YStack>
            </Suspense>
          </Card.Header>
        </Card>
      </Link>
    );
  };

  return (
    <YStack flex={1} p="$4" bg="$background">
      <XStack items="center" mb="$4">
        <Input
          flex={1}
          placeholder="Search movies"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button icon={Search} ml="$2" onPress={() => refetch()} />
      </XStack>
      {isLoading ? (
        <YStack flex={1} justify="center" items="center">
          <Spinner size="large" />
        </YStack>
      ) : error ? (
        <Paragraph>Error loading movies. Please try again.</Paragraph>
      ) : (
        <>
          <H5 my="$3">
            {searchQuery ? `Results for: ${searchQuery}` : "Trending"}
          </H5>
          <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyboardDismissMode="on-drag"
          />
        </>
      )}
    </YStack>
  );
}
