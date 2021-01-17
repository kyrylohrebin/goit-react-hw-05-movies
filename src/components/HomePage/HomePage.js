import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import s from './HomePage.module.css';
import noImage from '../../images/img.jpg';

export default function HomePage() {
  const [moviesInTrend, setMoviesInTrend] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    moviesApi
      .fetchTrendingMovies()
      .then(({ results }) => {
        setMoviesInTrend(results);
      })
      .catch(error => setError(error));
  }, []);

  return (
    <div className={s.moviesWrap}>
      {error && <p className={s.error}>Something went wrong. Try again</p>}

      {moviesInTrend && (
        <ul className={s.list}>
          {moviesInTrend.map(movie => {
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImage;
            return (
              <li className={s.item} key={movie.id}>
                <Link className={s.style} to={`movies/${movie.id}`}>
                  <img
                    className={s.image}
                    src={poster}
                    alt={movie.title}
                    width="200"
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
