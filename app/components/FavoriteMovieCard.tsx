import { XStack, YStack, Image, Paragraph } from "tamagui";
import { Movie } from "../../constants/movie-types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type FavoriteMovieCardProps = {
  movie: Movie;
};

export const FavoriteMovieCard = ({ movie }: FavoriteMovieCardProps) => {
  return (
    <XStack key={movie.id} bg="$backgroundHover" p="$2" /* borderRadius="$2" */>
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
        }}
        width={50}
        height={75}
      />
      <YStack ml="$2" justify="center">
        <Paragraph>{movie.title}</Paragraph>
        <Paragraph color="$color">{movie.year}</Paragraph>
      </YStack>
    </XStack>
  );
};
