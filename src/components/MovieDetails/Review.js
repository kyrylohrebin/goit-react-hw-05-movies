import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/api';
import { toast } from 'react-toastify';
import s from './Review.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesApi.fetchMovieReview(movieId).then(({ results }) => {
      if (results.length === 0) {
        toast.error('There are no reviews for this movie');
        return;
      }
      setReviews(results);
    });
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul className={s.list}>
          {reviews.map(review => (
            <li className={s.item} key={review.id}>
              <h4>Author: {review.author}</h4>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
