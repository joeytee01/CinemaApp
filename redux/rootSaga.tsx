import { all } from 'redux-saga/effects';
import watchMoviesSaga from './moviesSaga';

export default function* rootSaga() {
  yield all([
    watchMoviesSaga(),
  ]);
}
