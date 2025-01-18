import React, { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/moviesAction';
import { MovieCard } from '../../components/ui/MovieCard';

export default function MoviesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { upcomingMovies, popularMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies('upcoming')); // Fetch upcoming movies
    dispatch(fetchMovies('popular')); // Fetch popular movies
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to fetch movies.</Text>
        <Button title="Retry" onPress={() => {
          dispatch(fetchMovies('upcoming'));
          dispatch(fetchMovies('popular'));
        }} />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Section for Upcoming Movies */}
      <Text style={styles.sectionTitle}>Upcoming Movies</Text>
      <FlatList
        data={upcomingMovies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Section for Popular Movies */}
      <Text style={styles.sectionTitle}>Popular Movies</Text>
      <FlatList
        data={popularMovies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop:40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});
