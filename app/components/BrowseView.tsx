import { FlatList } from "react-native";
import { Input, Button, YStack, XStack, Paragraph, Spinner } from "tamagui";
import { Search } from "@tamagui/lucide-icons";
import { Movie } from "../../constants/movie-types";
import MovieItem from "./MovieItem";

type BrowseViewProps = {
  movies: Movie[];
  favorites: Movie[];
  searchQuery: string;
  isLoading: boolean;
  error: unknown;
  onSearchChange: (query: string) => void;
};

const BrowseView = ({
  movies,
  favorites,
  searchQuery,
  isLoading,
  error,
  onSearchChange,
}: BrowseViewProps) => {
  const renderMovieItem = ({ item }: { item: Movie }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    return <MovieItem movie={item} isFavorite={isFavorite} />;
  };

  return (
    <YStack flex={1} p="$4" bg="$background">
      <XStack items="center" mb="$4">
        <Input
          flex={1}
          placeholder="Search movies"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </XStack>
      {isLoading ? (
        <YStack flex={1} justify="center" items="center">
          <Spinner size="large" />
        </YStack>
      ) : error ? (
        <Paragraph>Error loading movies. Please try again.</Paragraph>
      ) : (
        <>
          <Paragraph my="$3" fontSize="$8">
            {searchQuery ? `Results for: ${searchQuery}` : "Trending"}
          </Paragraph>
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
};

export default BrowseView;
