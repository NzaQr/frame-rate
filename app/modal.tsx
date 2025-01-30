import { View, H3, Paragraph, Image, YStack, Button } from "tamagui";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "@tamagui/lucide-icons";
import { Movie, useFavorites } from "contexts/FavoritesContext";
import { AnimatePresence, MotiText } from "moti";

export default function ModalScreen() {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();

  const params = useLocalSearchParams<{ movie?: string }>();
  const { toggleFavorite, favorites } = useFavorites();
  let movieData: Movie | null = null;
  const [isFavorite, setIsFavorite] = useState(false);

  try {
    movieData = params.movie ? JSON.parse(params.movie) : null;
  } catch (error) {
    console.error("Error parsing movie data:", error);
  }

  useEffect(() => {
    if (movieData) {
      setIsFavorite(favorites.some((fav) => fav.id === movieData.id));
    }
  }, [favorites, movieData]);

  if (!movieData) {
    return (
      <View flex={1} p="$4" bg="$background" content="center" items="center">
        <Paragraph>No movie data available.</Paragraph>
        <Button icon={X} onPress={() => router.back()} mt="$4">
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <View flex={1} bg="$background">
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movieData.backdrop_path}` }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
        blurRadius={10}
      />
      <YStack flex={1} items="center" justify="center" space>
        <YStack items="center" mb="$5">
          <H3>{movieData.title}</H3>
          <Paragraph>{movieData.year}</Paragraph>
        </YStack>

        <Image
          source={{ uri: `${IMAGE_BASE_URL}${movieData.poster_path}` }}
          width={300}
          height={450}
        />

        <AnimatePresence>
          <Button
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(movieData);
            }}
            bg={isFavorite ? "$red10" : "$background"}
            pressStyle={{ bg: isFavorite ? "$red11" : "$red5" }}
            mt="$4"
          >
            <MotiText
              style={{
                color: isFavorite ? "$background" : "$color",
              }}
              key={isFavorite ? "added" : "add"}
              from={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
            >
              {isFavorite ? "Added to favorites" : "Add to favorites"}
            </MotiText>
          </Button>
        </AnimatePresence>
      </YStack>
    </View>
  );
}
