import {FC, useEffect, useState} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Review} from '../types/offerTypes/review.ts';
import {Provider} from 'react-redux';
import {appStore} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../hooks/redux.ts';
import {fetchOffers} from '../features/offersThunks.ts';
import {selectAllOffers, selectOffersLoading} from '../selectors/selectors.ts';
import {Spinner} from '../components/Spinner/Spinner.tsx';

interface AppProps {
  favorites: number[];
  reviews: Review[];
}

const AppInitializer: FC<AppProps> = ({ favorites, reviews }) => {
  const dispatch = useAppDispatch();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const isLoading = useAppSelector(selectOffersLoading);
  const offers = useAppSelector(selectAllOffers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isLoading && offers.length === 0) {
    return (
      <Spinner />
    );
  }

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
