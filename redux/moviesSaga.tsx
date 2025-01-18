import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_MOVIES, fetchMoviesSuccess, fetchMoviesError } from './moviesAction';
import { getUpcomingMovies, getPopularMovies } from '../api/tmdb';  // Import the new functions

function* fetchMoviesSaga(action) {
  try {
    let movies = [];
    if (action.payload === 'upcoming') {
      movies = yield call(getUpcomingMovies); // Fetch upcoming movies
    } else if (action.payload === 'popular') {
      movies = yield call(getPopularMovies); // Fetch popular movies
    }
    yield put(fetchMoviesSuccess(action.payload, movies)); // Dispatch success action
  } catch (error) {
    yield put(fetchMoviesError(error.message)); // Dispatch error action
  }
}

// Watcher Saga to listen for FETCH_MOVIES actions
export default function* watchMoviesSaga() {
  yield takeEvery(FETCH_MOVIES, fetchMoviesSaga);
}