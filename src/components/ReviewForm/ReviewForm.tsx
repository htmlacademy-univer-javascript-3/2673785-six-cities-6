import {FC, useState} from 'react';
import {Rating} from '../../types/offerTypes/review.ts';

interface Review {
  rating: Rating | null;
  comment: string;
}

export const ReviewForm: FC = () => {
  const [review, setReview] = useState<Review>({
    rating: null,
    comment: ''
  });

  const handleSetRating = (rating: Rating) => {
    setReview({...review, rating: rating});
  };

  const handleSetComment = (comment: string) => {
    setReview({...review, comment: comment});
  };

  const handleSubmitButtonClick = () => {
    if (!review.rating) {
      return false;
    }

    return review.comment.length >= 50;
  };

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
        <label
          htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect"
          onClick={() => handleSetRating(5)}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
        <label
          htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good"
          onClick={() => handleSetRating(4)}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
        <label
          htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad"
          onClick={() => handleSetRating(3)}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
        <label
          htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly"
          onClick={() => handleSetRating(2)}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
        <label
          htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly"
          onClick={() => handleSetRating(1)}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => handleSetComment(e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit"
          onClick={handleSubmitButtonClick}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
