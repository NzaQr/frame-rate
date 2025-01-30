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
      <Card elevate size="$2" bordered marginBottom="$4">
        <Card.Header padded>
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
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                width={150}
                height={225}
              />
            </YStack>
          </Suspense>
        </Card.Header>
      </Card>
    </Link>
  );
};

export default MovieItem;
