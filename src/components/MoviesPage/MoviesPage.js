import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import * as moviesApi from '../../services/api';
import { Link, useHistory, useLocation } from 'react-router-dom';
import s from './MoviesPage.module.css';
import noImage from '../../images/img.jpg';

export default function MoviesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesBySearch, setMoviesBySearch] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('searchQuery');
    setSearchQuery(newSearch);
  }, [location.search]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    moviesApi
      .fetchMoviesBySearch(searchQuery, page)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`No results were found for ${searchQuery}!`);
          return;
        }
        setMoviesBySearch(results);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [searchQuery, page]);

  const handleSearchBarSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setMoviesBySearch(null);
    history.push({ ...location, search: `searchQuery=${query}` });
  };

  return (
    <div className={s.moviesWrap}>
      {error && <p className={s.error}>Something went wrong. Try again</p>}
      <SearchBar onSubmit={handleSearchBarSubmit} />
      {moviesBySearch && (
        <ul className={s.list}>
          {moviesBySearch.map(movie => {
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImage;
            return (
              <li className={s.item} key={movie.id}>
                <Link
                  className={s.style}
                  to={{
                    pathname: `movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  <img
                    className={s.image}
                    src={poster}
                    alt={movie.title}
                    width="100"
                  />
                  <h3 className={s.title}>{movie.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
