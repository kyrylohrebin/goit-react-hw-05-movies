const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '11dd3e08bfeee2e8132e785c7d4f74f5';

async function moviesApi(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 The page is not found'));
}

export function fetchTrendingMovies() {
  return moviesApi(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchMoviesBySearch(query, page) {
  return moviesApi(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
}

export function fetchMovieDetails(movieId) {
  return moviesApi(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchMovieReview(movieId) {
  return moviesApi(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
}

export function fetchMovieCredits(movieId) {
  return moviesApi(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}
