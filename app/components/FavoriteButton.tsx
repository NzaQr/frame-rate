import { Button } from "tamagui";
import { MotiText } from "moti";
import type { Movie } from "../../constants/movie-types";
import * as Haptics from "expo-haptics";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  movie: Movie;
};

const FavoriteButton = ({
  isFavorite,
  onToggleFavorite,
  movie,
}: FavoriteButtonProps) => {
  return (
    <Button
      onPress={(e) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        e.stopPropagation();
        onToggleFavorite(movie);
      }}
      bg={isFavorite ? "$red10" : "#fff"}
      pressStyle={{ bg: isFavorite ? "$red11" : "$red5" }}
      mt="$4"
      borderWidth={0}
      style={{ borderRadius: 50, width: 200, height: 50 }}
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
  );
};

export default FavoriteButton;
