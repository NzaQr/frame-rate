import {
  YStack,
  Avatar,
  H3,
  Paragraph,
  Button,
  Separator,
  ScrollView,
  XStack,
  Image,
} from "tamagui";
import { Settings, Heart } from "@tamagui/lucide-icons";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function ProfileScreen() {
  const { favorites } = useFavorites();

  return (
    <ScrollView>
      <YStack flex={1} items="center" bg="$background" p="$4" space>
        <Avatar circular size="$10">
          <Avatar.Image src="https://via.placeholder.com/150" />
          <Avatar.Fallback backgroundColor="$color" />
        </Avatar>
        <H3 mt="$4">John Doe</H3>
        <Paragraph color="$color">Movie Enthusiast</Paragraph>

        <Separator />

        <Button
          icon={Heart}
          bg="$backgroundHover"
          color="$color"
          width="100%"
          justify="flex-start"
          mb="$2"
        >
          {`Favorite Movies (${favorites.length})`}
        </Button>
        <Button
          icon={Settings}
          bg="$backgroundHover"
          color="$color"
          width="100%"
          justify="flex-start"
        >
          Settings
        </Button>

        <YStack mt="$4" width="100%">
          <H3>Your Favorite Movies</H3>
          {favorites.map((movie) => (
            <XStack
              key={movie.id}
              mt="$2"
              bg="$backgroundHover"
              p="$2"
              borderTopLeftRadius="$2"
              borderTopRightRadius="$2"
              borderBottomLeftRadius="$2"
              borderBottomRightRadius="$2"
            >
              <Image source={{ uri: movie.poster }} width={50} height={75} />
              <YStack ml="$2" justify="center">
                <Paragraph>{movie.title}</Paragraph>
                <Paragraph color="$color">{movie.year}</Paragraph>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
