import { View, H3, Paragraph, Image, YStack, Button } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "@tamagui/lucide-icons";

export default function ModalScreen() {
  const params = useLocalSearchParams<{ movie?: string }>();
  const router = useRouter();

  type MovieData = {
    poster: string;
    title: string;
    year: string;
  };

  let movieData: MovieData | null = null;
  try {
    movieData = params.movie ? JSON.parse(params.movie) : null;
  } catch (error) {
    console.error("Error parsing movie data:", error);
  }

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
    <View flex={1} p="$4" bg="$background">
      <YStack flex={1} items="center" justify="center" space>
        <Image source={{ uri: movieData.poster }} width={300} height={450} />
        <H3>{movieData.title}</H3>
        <Paragraph>Year: {movieData.year}</Paragraph>
        {/* Aquí puedes agregar más información de la película si la tienes disponible */}
      </YStack>
    </View>
  );
}
