import { Suspense } from "react";
import { Card, YStack, Image, Spinner } from "tamagui";
import { Heart } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Movie, IMAGE_BASE_URL } from "../../constants/movie-types";

type MovieItemProps = {
  movie: Movie;
  isFavorite: boolean;
};

const MovieItem = ({ movie, isFavorite }: MovieItemProps) => {
  return (
    <Link
      href={{ pathname: "/modal", params: { movie: JSON.stringify(movie) } }}
      asChild
    >
      <Card
        elevate
        size="$0.25"
        bg="transparent"
        borderColor="$accentBackground"
        borderWidth={0.75}
        borderRadius="$2"
        marginBottom="$5"
      >
        <Card.Header rounded="$2">
          <Suspense fallback={<Spinner size="large" color="$red10" />}>
            <YStack>
              {isFavorite && (
                <Heart
                  color="red"
                  fill="red"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                borderRadius="$1"
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                width={100}
                height={150}
              />
            </YStack>
          </Suspense>
        </Card.Header>
      </Card>
    </Link>
  );
};

export default MovieItem;
