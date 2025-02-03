import { XStack, YStack, Image, Paragraph } from "tamagui";
import { Movie } from "../../constants/movie-types";
import { Link } from "expo-router";
import { useFavoritesStore } from "contexts/FavoritesStore";
import { Star } from "@tamagui/lucide-icons";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type FavoriteMovieCardProps = {
  movie: Movie;
};

const FavoriteMovieCard = ({ movie }: FavoriteMovieCardProps) => {
  const { ratings } = useFavoritesStore();
  return (
    <Link
      href={{
        pathname: "/modal",
        params: { movie: JSON.stringify(movie) },
      }}
      asChild
    >
      <XStack key={movie.id} bg="$backgroundHover" p="$2" rounded="$2">
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}${movie.poster_path}`,
          }}
          width={50}
          height={75}
        />
        <YStack ml="$2" justify="center">
          <Paragraph>{movie.title}</Paragraph>
          <Paragraph color="$color">{movie.year}</Paragraph>
          <XStack>
            {ratings.find((ratedMovie) => ratedMovie.movie.id === movie.id) &&
              Array.from({
                length:
                  ratings.find((ratedMovie) => ratedMovie.movie.id === movie.id)
                    ?.rating || 0,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={15}
                  color={"#FFD700"}
                  fill={"#FFD700"}
                />
              ))}
          </XStack>
        </YStack>
      </XStack>
    </Link>
  );
};

export default FavoriteMovieCard;
