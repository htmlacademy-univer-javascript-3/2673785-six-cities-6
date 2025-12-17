import { FC } from 'react';
import { Review } from '../Review/Review.tsx';
import { ReviewForm } from '../ReviewForm/ReviewForm.tsx';
import { useAppSelector } from '../../hooks/redux.ts';
import { selectSortedComments, selectAuthorizationStatus } from '../../selectors/selectors.ts';
import { Comment } from '../../types/offerTypes/comment.ts';

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
  const comments = useAppSelector(selectSortedComments);
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>

      <ul className="reviews__list">
        {comments.map((comment: Comment) => (
          <Review
            key={comment.id}
            review={{
              ...comment,
              userName: comment.user.name,
              text: comment.comment,
              date: formatDate(comment.date),
            }}
          />
        ))}
      </ul>

      {isAuthorized && <ReviewForm offerId={offerId} />}
    </section>
  );
};
