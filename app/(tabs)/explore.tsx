import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getMovieDetails } from '../../api/tmdb';
import { useFavorites } from '../../hooks/useFavorites';

export default function MovieDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites(id);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  // Update the favorite status in the parent screen
  const handleToggleFavorite = async () => {
    await toggleFavorite();
    // Notify the parent screen (movie list) about the change
    navigation.setParams({ isFavorite: !isFavorite });
  };

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>{movie.title}</Text>
      <Text>{movie.overview}</Text>
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleToggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the view takes up the full screen
    backgroundColor: '#fff', // Sets the background to white
    padding: 16, // Adds some padding for better layout
  },
});
