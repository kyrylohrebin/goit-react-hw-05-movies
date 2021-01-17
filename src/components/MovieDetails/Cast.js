import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/api';
import { toast } from 'react-toastify';
import defaultImage from '../../images/img.jpg';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    moviesApi.fetchMovieCredits(movieId).then(({ cast }) => {
      if (cast.length === 0) {
        toast.error('No information about authors');
        return;
      }
      setAuthors(cast);
    });
  }, [movieId]);

  return (
    <>
      {authors && (
        <ul className={s.list}>
          {authors.map(author => (
            <li className={s.item} key={author.id}>
              <img
                className={s.photo}
                src={
                  author.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${author.profile_path}`
                    : defaultImage
                }
                alt={author.original_name}
                width="100"
              />
              <h4 className={s.originalName}>{author.original_name}</h4>
              <p className={s.character}>{author.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
