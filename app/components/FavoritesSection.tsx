import { Button, YStack, Paragraph } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { AnimatePresence, MotiView } from "moti";
import { Movie } from "../../constants/movie-types";
import { FavoriteMovieCard } from "./FavoriteMovieCard";

type FavoritesSectionProps = {
  favorites: Movie[];
  showFavorites: boolean;
  onToggleFavorites: () => void;
};

export const FavoritesSection = ({
  favorites,
  showFavorites,
  onToggleFavorites,
}: FavoritesSectionProps) => {
  return (
    <>
      <Button
        iconAfter={showFavorites ? ChevronUp : ChevronDown}
        bg="$backgroundHover"
        color="$color"
        width="100%"
        justify="space-between"
        mb="$2"
        onPress={onToggleFavorites}
      >
        {`Favorite Movies (${favorites.length})`}
      </Button>

      <AnimatePresence>
        {showFavorites && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 150 }}
            style={{ width: "100%", overflow: "hidden" }}
          >
            <YStack width="100%" space>
              {favorites.length === 0 ? (
                <YStack items="center">
                  <Paragraph color="$color">
                    No favorite movies found.
                  </Paragraph>
                </YStack>
              ) : (
                favorites.map((movie) => (
                  <FavoriteMovieCard key={movie.id} movie={movie} />
                ))
              )}
            </YStack>
          </MotiView>
        )}
      </AnimatePresence>
    </>
  );
};
