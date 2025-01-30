import { Button, YStack, Paragraph } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { AnimatePresence, MotiView } from "moti";
import { useFavoritesStore } from "contexts/FavoritesStore";
import RatedMovieCard from "./RatedMovieCard";

type RatingsSectionProps = {
  showRatings: boolean;
  onToggleRatings: () => void;
};

const RatingsSection = ({
  showRatings,
  onToggleRatings,
}: RatingsSectionProps) => {
  const { ratings } = useFavoritesStore();

  return (
    <>
      <Button
        iconAfter={showRatings ? ChevronUp : ChevronDown}
        bg="$backgroundHover"
        color="$color"
        width="100%"
        justify="space-between"
        mb="$2"
        onPress={onToggleRatings}
      >
        {`Rated Movies (${ratings.length})`}
      </Button>

      {showRatings && (
        <AnimatePresence>
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 150 }}
            style={{ width: "100%", overflow: "hidden" }}
          >
            <YStack width="100%" space>
              {ratings.length === 0 ? (
                <YStack items="center">
                  <Paragraph color="$color">No movies rated yet.</Paragraph>
                </YStack>
              ) : (
                ratings.map((ratedMovie) => (
                  <RatedMovieCard
                    key={ratedMovie.movie.id}
                    ratedMovie={ratedMovie}
                  />
                ))
              )}
            </YStack>
          </MotiView>
        </AnimatePresence>
      )}
    </>
  );
};
export default RatingsSection;
