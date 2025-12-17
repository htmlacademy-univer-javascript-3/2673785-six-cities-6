import { FC } from 'react';
import { Review } from '../review/review.tsx';
import { ReviewForm } from '../review-form/review-form.tsx';
import { useAppSelector } from '../../features/hooks/redux.ts';
import { selectSortedComments } from '../../features/offer/offerSelectors.ts';
import {selectAuthorizationStatus} from '../../features/auth/authSelectors.ts';
import { Review as ReviewType } from '../../types/offer-types/review.ts';

interface ReviewsProps {
  offerId: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

export const Reviews: FC<ReviewsProps> = ({ offerId }) => {
  const reviews = useAppSelector(selectSortedComments);
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review: ReviewType) => (
          <Review
            key={review.id}
            review={{
              ...review,
              userName: review.user.name,
              comment: review.comment,
              date: formatDate(review.date),
            }}
          />
        ))}
      </ul>

      {isAuthorized && <ReviewForm offerId={offerId} />}
    </section>
  );
};
