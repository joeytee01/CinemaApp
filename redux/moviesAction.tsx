// Action Types
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';

// Action Creators

// Action to trigger saga with a movie type (either 'upcoming' or 'popular')
export const fetchMovies = (type) => ({ 
  type: FETCH_MOVIES, 
  payload: type 
});

// Action for successful fetching of movies (with type distinction)
export const fetchMoviesSuccess = (type, movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { type, movies }
});

// Action for errors when fetching movies
export const fetchMoviesError = (error) => ({
  type: FETCH_MOVIES_ERROR,
  payload: error
});