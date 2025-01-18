// utils/storage.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchMoviesFromStorage = async () => {
  try {
    const storedMovies = await AsyncStorage.getItem('movies');
    if (storedMovies !== null) {
      return JSON.parse(storedMovies);
    }
    return null;
  } catch (error) {
    console.error('Error fetching movies from storage', error);
    return null;
  }
};

const saveMoviesToStorage = async (movies: any) => {
  try {
    await AsyncStorage.setItem('movies', JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving movies to storage', error);
  }
};

export default { fetchMoviesFromStorage, saveMoviesToStorage };
