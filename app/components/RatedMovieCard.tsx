import { XStack, YStack, Image, Paragraph } from "tamagui";
import { MovieRating } from "contexts/FavoritesStore";
import { Star } from "@tamagui/lucide-icons";
import { Link } from "expo-router";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type RatedMovieCardProps = {
  ratedMovie: MovieRating;
};

const RatedMovieCard = ({ ratedMovie }: RatedMovieCardProps) => (
  <Link
    href={{
      pathname: "/modal",
      params: { movie: JSON.stringify(ratedMovie.movie) },
    }}
    asChild
  >
    <XStack key={ratedMovie.movie.id} bg="$backgroundHover" p="$2" rounded="$2">
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}${ratedMovie.movie.poster_path}`,
        }}
        width={50}
        height={75}
      />
      <YStack ml="$2">
        <XStack>
          <Paragraph>{ratedMovie.movie.title}</Paragraph>
          <Paragraph color="$color"> ({ratedMovie.movie.year})</Paragraph>
        </XStack>
        <XStack mt="$2" style={{ marginHorizontal: 4 }}>
          {Array.from({ length: ratedMovie.rating }).map((_, index) => (
            <Star key={index} size={15} color={"#FFD700"} fill={"#FFD700"} />
          ))}
        </XStack>
      </YStack>
    </XStack>
  </Link>
);

export default RatedMovieCard;
