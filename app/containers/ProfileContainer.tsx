import { useState } from "react";
import { useFavoritesStore } from "../../contexts/FavoritesStore";
import ProfileView from "../components/ProfileView";

const ProfileContainer = () => {
  const { favorites } = useFavoritesStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRatings, setShowRatings] = useState(false);

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleToggleRatings = () => {
    setShowRatings(!showRatings);
  };

  return (
    <ProfileView
      favorites={favorites}
      showFavorites={showFavorites}
      onToggleFavorites={handleToggleFavorites}
      showRatings={showRatings}
      onToggleRatings={handleToggleRatings}
    />
  );
};
export default ProfileContainer;
