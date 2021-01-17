import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import spinLoader from './components/Loader/Loader';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const Movie = lazy(() => import('./components/MoviesPage/MoviesPage'));
const MovieDetails = lazy(() => import('./components/MovieDetails/Movie'));
const NotFound = lazy(() => import('./components/MoviesPage/NotFound'));

export default function App() {
  return (
    <div className={s.App}>
      <Header text="Movie DB" />
      <Navigation />

      <Suspense fallback={<spinLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <Movie />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3700} position="bottom-center" />
    </div>
  );
}
