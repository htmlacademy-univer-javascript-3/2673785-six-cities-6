import React, {FC, useState, FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {postComment} from '../../features/offerThunks.ts';
import {selectCommentLoading, selectCommentError} from '../../selectors/selectors.ts';
import {clearCommentError} from '../../features/offerSlice.ts';

interface ReviewFormProps {
  offerId: string;
}

export const ReviewForm: FC<ReviewFormProps> = ({offerId}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCommentLoading);
  const error = useAppSelector(selectCommentError);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => () => {
    dispatch(clearCommentError());
  }, [dispatch]);

  const isFormValid = () => rating > 0 && comment.length >= 50 && comment.length <= 300;

  const handleRatingChange = (value: number) => {
    setRating(value);
    if (error) {
      dispatch(clearCommentError());
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (error) {
      dispatch(clearCommentError());
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    (async () => {
      try {
        await dispatch(postComment({
          offerId,
          commentData: {rating, comment}
        })).unwrap();

        setRating(0);
        setComment('');
      } catch { /* empty */
      }
    })();
  };

  const getStars = () => {
    const stars = [];
    const labels = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

    for (let i = 5; i >= 1; i--) {
      stars.push(
        <React.Fragment key={i}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={i}
            id={`${i}-stars`}
            type="radio"
            checked={rating === i}
            onChange={() => handleRatingChange(i)}
            disabled={isLoading}
          />
          <label
            htmlFor={`${i}-stars`}
            className="reviews__rating-label form__rating-label"
            title={labels[5 - i]}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      );
    }

    return stars;
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {getStars()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isLoading}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
          <br/>
          <span className="reviews__char-count">
            {comment.length}/300 characters
          </span>
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
