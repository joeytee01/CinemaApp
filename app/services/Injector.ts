// services/Injector.ts
import { fetchMovies } from '../../redux/moviesAction';

// Simple DI container for API (you can expand this as needed)
export const injector = {
  api: {
    fetchMovies,
  },
};
