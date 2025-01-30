import { useState } from "react";
import { useFavoritesStore } from "../../contexts/FavoritesContext";
import { ProfileView } from "../components/ProfileView";

export const ProfileContainer = () => {
  const { favorites } = useFavoritesStore();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <ProfileView
      favorites={favorites}
      showFavorites={showFavorites}
      onToggleFavorites={handleToggleFavorites}
    />
  );
};
