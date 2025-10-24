import {FC, useState} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Offer} from '../types/offerTypes/offer.ts';

interface AppProps {
  offers: Offer[];
  favorites: number[];
}

export const App: FC<AppProps> = ({offers, favorites}) => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  return (
    <MainContainer setIsAuthorized={setIsAuthorized} offers={offers} offersCount={offers.length} favorites={favorites} isAuthorized={isAuthorized}/>
  );
};
