import { ScrollView, YStack, Avatar, H3, Paragraph, Separator } from "tamagui";
import { Movie } from "../../constants/movie-types";
import { FavoritesSection } from "./FavoritesSection";

type ProfileViewProps = {
  favorites: Movie[];
  showFavorites: boolean;
  onToggleFavorites: () => void;
};

export const ProfileView = ({
  favorites,
  showFavorites,
  onToggleFavorites,
}: ProfileViewProps) => {
  return (
    <ScrollView bg="$background">
      <YStack flex={1} items="center" bg="$background" p="$4" space>
        <Avatar circular size="$10">
          <Avatar.Image src="https://via.placeholder.com/150" />
          <Avatar.Fallback backgroundColor="$color" />
        </Avatar>
        <H3 mt="$4">John Doe</H3>
        <Paragraph color="$color">Movie Enthusiast</Paragraph>

        <Separator />

        <FavoritesSection
          favorites={favorites}
          showFavorites={showFavorites}
          onToggleFavorites={onToggleFavorites}
        />
      </YStack>
    </ScrollView>
  );
};
