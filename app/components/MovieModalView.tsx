import { View, H3, Paragraph, Image, YStack, Button } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { AnimatePresence } from "moti";
import type { Movie } from "../../constants/movie-types";
import FavoriteButton from "./FavoriteButton";
import StarRating from "./StarRating";
import ModalErrorView from "./ModalErrorView";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type MovieModalViewProps = {
  movie: Movie | null;
  isFavorite: boolean;
  rating: number;
  onToggleFavorite: (movie: Movie) => void;
  onRatingChange: (rating: number) => void;
  onClose: () => void;
};

const MovieModalView = ({
  movie,
  isFavorite,
  rating,
  onToggleFavorite,
  onRatingChange,
  onClose,
}: MovieModalViewProps) => {
  if (!movie) {
    return <ModalErrorView onBack={onClose} />;
  }

  return (
    <View flex={1} bg="$background">
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.backdrop_path}` }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
        blurRadius={10}
      />
      <Button
        opacity={0.6}
        bg="$background"
        position="absolute"
        rounded="$radius.10"
        width="$4"
        height="$4"
        style={{ top: 6, right: 6 }}
        icon={X}
        onPress={onClose}
      />
      <YStack flex={1} items="center" justify="center" space>
        <YStack items="center">
          <H3>{movie.title}</H3>
          <Paragraph>{movie.year}</Paragraph>
        </YStack>

        <Image
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          width={300}
          height={450}
        />

        <StarRating rating={rating} onRatingChange={onRatingChange} size={32} />

        <AnimatePresence>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            movie={movie}
          />
        </AnimatePresence>
      </YStack>
    </View>
  );
};
export default MovieModalView;
