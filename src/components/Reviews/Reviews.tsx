import {FC} from 'react';
import type {Review as ReviewType} from '../../types/offerTypes/review.ts';
import {Review} from '../Review/Review.tsx';

interface ReviewsProps {
  reviews: ReviewType[];
}

export const Reviews: FC<ReviewsProps> = ({reviews}) => {
  const reviewsComponent = reviews.map((review) => (<Review key={review.id} review={review}/>));

  return (
    <>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>1</span></h2>
      <ul className='reviews__list'>
        {reviewsComponent}
      </ul>
    </>
  );
};
