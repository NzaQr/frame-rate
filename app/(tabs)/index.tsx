import { useState } from "react";
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
} from "tamagui";
import { Search, Heart } from "@tamagui/lucide-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Link } from "expo-router";

const mockMovies = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    poster:
      "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
  },
  {
    id: "2",
    title: "The Dark Knight",
    year: 2008,
    poster: "https://m.media-amazon.com/images/I/A1exRxgHRRL.jpg",
  },
];

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, toggleFavorite } = useFavorites();

  const renderMovieItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <Link
        href={{ pathname: "/modal", params: { movie: JSON.stringify(item) } }}
        asChild
      >
        <Card elevate size="$4" bordered marginBottom="$4">
          <Card.Header padded>
            <Image source={{ uri: item.poster }} width={150} height={225} />
            <YStack mt="$2" width="100%">
              <XStack justify="space-between" items="center">
                <H4>{item.title}</H4>
                <Button
                  icon={
                    <Heart
                      color={isFavorite ? "$red10" : "$color"}
                      fill={isFavorite ? "red" : "none"}
                    />
                  }
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  bg="transparent"
                />
              </XStack>
              <Paragraph color="$color">{item.year}</Paragraph>
            </YStack>
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
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          icon={Search}
          ml="$2"
          onPress={() => {
            /* Implementar búsqueda */
          }}
        />
      </XStack>
      <FlatList
        data={mockMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
      />
    </YStack>
  );
}
