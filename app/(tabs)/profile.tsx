import React, { useState } from "react";
import {
  YStack,
  Avatar,
  H3,
  Paragraph,
  Button,
  Separator,
  ScrollView,
  XStack,
  Image,
  AnimatePresence,
} from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import { MotiView } from "moti";

export default function ProfileScreen() {
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <ScrollView bg="$background">
      <YStack flex={1} items="center" bg="$background" p="$4" space>
        <Avatar circular size="$10">
          <Avatar.Image src="https://via.placeholder.com/150" />
          <Avatar.Fallback backgroundColor="$color" />
        </Avatar>
        <H3 mt="$4">John Doe</H3>
        <Paragraph color="$color">Movie Enthusiast</Paragraph>

        <Separator />

        <Button
          iconAfter={showFavorites ? ChevronUp : ChevronDown}
          bg="$backgroundHover"
          color="$color"
          width="100%"
          justify="space-between"
          mb="$2"
          onPress={toggleFavorites}
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
            <Paragraph color="$color">No favorite movies found.</Paragraph>
          ) : (
            favorites.map((movie) => (
              <XStack
                key={movie.id}
                bg="$backgroundHover"
                p="$2"
                borderTopLeftRadius="$2"
                borderTopRightRadius="$2"
                borderBottomLeftRadius="$2"
                borderBottomRightRadius="$2"
              >
                <Image
            source={{ uri: movie.poster }}
            width={50}
            height={75}
                />
                <YStack ml="$2" justify="center">
            <Paragraph>{movie.title}</Paragraph>
            <Paragraph color="$color">{movie.year}</Paragraph>
                </YStack>
              </XStack>
            ))
          )}
              </YStack>
            </MotiView>
          )}
        </AnimatePresence>
      </YStack>
    </ScrollView>
  );
}
