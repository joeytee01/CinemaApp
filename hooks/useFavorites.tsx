import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavorites = (movieId: number, shouldRefetch: boolean) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to fetch the favorite status from AsyncStorage
  const fetchFavoriteStatus = async () => {
    try {
      const favoriteStatus = await AsyncStorage.getItem(`favorite-${movieId}`);
      if (favoriteStatus !== null) {
        setIsFavorite(JSON.parse(favoriteStatus)); // Parse the stored value and update state
      }
    } catch (error) {
      console.error('Error loading favorite status', error);
    }
  };

  // Fetch favorite status when the component mounts or the movieId changes
  useEffect(() => {
    fetchFavoriteStatus();
  }, [movieId, shouldRefetch]); // Re-fetch if shouldRefetch changes

  // Toggle favorite status and store it in AsyncStorage
  const toggleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      await AsyncStorage.setItem(`favorite-${movieId}`, JSON.stringify(newFavoriteStatus)); // Store the updated status
    } catch (error) {
      console.error('Error saving favorite status', error);
    }
  };

  return { isFavorite, toggleFavorite };
};
