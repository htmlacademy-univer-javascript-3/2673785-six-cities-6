import { FC } from 'react';
import { Review as ReviewType } from '../../types/offerTypes/review.ts';

interface ReviewProps {
  review: ReviewType;
}

export const Review: FC<ReviewProps> = ({ review }) => {
  const rating = `${review.rating * 20}%`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user?.avatarUrl || '../../../markup/img/avatar-max.jpg'}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.userName}
          {review.user?.isPro && (
            <span className="reviews__user-pro">Pro</span>
          )}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: rating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date}>
          {review.date}
        </time>
      </div>
    </li>
  );
};
