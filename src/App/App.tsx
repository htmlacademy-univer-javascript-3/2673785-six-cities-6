import {FC, useEffect, useState} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Offer} from '../types/offerTypes/offer.ts';
import {Review} from '../types/offerTypes/review.ts';
import {Provider, useDispatch} from 'react-redux';
import {setOffers} from '../actions/actions.ts';
import {appStore} from '../store/store.ts';

interface AppProps {
  offers: Offer[];
  favorites: number[];
  reviews: Review[];
}

const AppInitializer: FC<AppProps> = ({ offers, favorites, reviews }) => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Инициализируем offers в Redux store при монтировании
  useEffect(() => {
    dispatch(setOffers(offers));
  }, [dispatch, offers]);

  return (
    <MainContainer
      setIsAuthorized={setIsAuthorized}
      offers={offers}
      favorites={favorites}
      isAuthorized={isAuthorized}
      reviews={reviews}
    />
  );
};

export const App: FC<AppProps> = (props) => (
  <Provider store={appStore}>
    <AppInitializer {...props}/>
  </Provider>
);
