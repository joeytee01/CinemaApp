import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer, // Add more reducers here as your app grows
});

export default rootReducer;
