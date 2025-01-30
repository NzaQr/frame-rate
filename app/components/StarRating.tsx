import { XStack, Text, YStack } from "tamagui";
import { Star, X } from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
};

const StarRating = ({ rating, onRatingChange, size = 24 }: StarRatingProps) => {
  return (
    <YStack space="$2" items="center">
      <XStack space="$1" items="center">
        <MotiView style={{ position: "absolute", left: -25 }}>
          {rating > 0 && (
            <X size={20} color="#666" onPress={() => onRatingChange(0)} />
          )}
        </MotiView>
        {[1, 2, 3, 4, 5].map((star) => (
          <MotiView
            key={star}
            from={{ scale: 1 }}
            animate={{ scale: rating >= star ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            style={{ marginHorizontal: 4 }}
          >
            <Star
              size={size}
              color={rating >= star ? "#FFD700" : "#666"}
              fill={rating >= star ? "#FFD700" : "transparent"}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                onRatingChange(star);
              }}
            />
          </MotiView>
        ))}
      </XStack>
      <Text color="$color" opacity={0.7}>
        {rating ? `${rating} of 5` : "Rate this movie"}
      </Text>
    </YStack>
  );
};
export default StarRating;
