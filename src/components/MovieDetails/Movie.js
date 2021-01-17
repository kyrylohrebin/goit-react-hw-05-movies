import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesApi from '../../services/api';
import defaultImage from '../../images/img.jpg';
import spinLoader from '../Loader/Loader';
import s from './Movie.module.css';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Review'));

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesApi
      .fetchMovieDetails(movieId)
      .then(
        ({ poster_path, original_title, vote_average, overview, genres }) => {
          setMovie({
            src: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : `${defaultImage}`,
            title: original_title,
            vote_average,
            overview,
            genres,
          });
        },
      );
  }, [movieId]);

  const goBackHandler = () => {
    if (location.state && location.state.from) {
      history.push({
        ...location.state.from,
      });
      return;
    }
    history.push('/');
  };

  return (
    <>
      {movie && (
        <div className={s.container}>
          <button className={s.button} type="button" onClick={goBackHandler}>
            Go back
          </button>
          <div>
            <h2 className={s.title}>{movie.title}</h2>
            <div className={s.imgWrap}>
              <img
                className={s.img}
                src={movie.src}
                alt={movie.title}
                width="100"
              />
              <span className={s.vote}>{movie.vote_average}</span>
            </div>
            <div>
              <h3 className={s.detailTitle}>Overview</h3>
              <p className={s.overview}>{movie.overview}</p>
            </div>
            <div>
              <h3 className={s.detailTitle}>Genres:</h3>
              <ul className={s.genresList}>
                {movie.genres.map(genre => (
                  <li className={s.genresItem} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className={s.details}>
            <li className={s.detailsItem}>
              <NavLink
                className={s.style}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.detailsItem}>
              <NavLink
                className={s.style}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<spinLoader />}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </div>
      )}
    </>
  );
}
