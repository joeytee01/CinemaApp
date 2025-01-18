import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
import { useFavorites } from '../../hooks/useFavorites'; // Importing the custom hook
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
  };
  onPress: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false); // Flag to indicate refetching

  // Use the custom useFavorites hook to manage the favorite state
  const { isFavorite, toggleFavorite } = useFavorites(movie.id, shouldRefetch);

  // Wrap setShouldRefetch in a stable callback
  const handleFocus = useCallback(() => {
    setShouldRefetch((prev) => !prev); // Toggle the flag to force refetching
  }, []);

  // Trigger refetch when the screen is focused again
  useFocusEffect(handleFocus);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.release_date && (
          <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        )}
        {/* Favorite Star */}
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteContainer}>
          <Icon
            name={isFavorite ? 'star' : 'star-o'} // Filled star if favorite, empty otherwise
            size={24}
            color={isFavorite ? 'yellow' : 'gray'} // Yellow when favorite, gray when not
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between', // Space between title, release date, and favorite icon
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 14,
    color: 'gray',
  },
  favoriteContainer: {
    alignSelf: 'flex-start', // Align the star to the top-left within its container
    marginTop: 5, // Slight margin for spacing, adjust as needed
  },
  
});
