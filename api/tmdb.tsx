import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '541369b3dd5adebd8fe32a4439a6d910';

// Function to get movies by type (e.g., 'popular', 'top_rated', 'upcoming', etc.)
export const getMovies = async (type) => {
  try {
    const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.results; // Return movie results
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error.message);
    return []; // Return an empty array if there's an error
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    return response.data.results; // Return upcoming movies
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error; // Throw error to be handled in the saga
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results; // Return popular movies
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error; // Throw error to be handled in the saga
  }
};
// Function to get details of a single movie by its ID
export const getMovieDetails = async (id) => {
  try {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data; // Return movie details
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error.message);
    return null; // Return null if there's an error
  }
};
