import {FC, useState} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Offer} from '../types/offerTypes/offer.ts';
import {Review} from '../types/offerTypes/review.ts';

interface AppProps {
  offers: Offer[];
  favorites: number[];
  reviews: Review[];
}

export const App: FC<AppProps> = ({offers, favorites, reviews}) => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  return (
    <MainContainer setIsAuthorized={setIsAuthorized} offers={offers} offersCount={offers.length} favorites={favorites} isAuthorized={isAuthorized} reviews={reviews}/>
  );
};
