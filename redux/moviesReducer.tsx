import { FETCH_MOVIES, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR } from './moviesAction';

const initialState = {
  upcomingMovies: [],
  popularMovies: [],
  loading: false,
  error: null,
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, loading: true };
      
    case FETCH_MOVIES_SUCCESS:
      if (action.payload.type === 'upcoming') {
        return { ...state, upcomingMovies: action.payload.movies, loading: false };
      }
      if (action.payload.type === 'popular') {
        return { ...state, popularMovies: action.payload.movies, loading: false };
      }
      return state;

    case FETCH_MOVIES_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
