import {FC, useEffect} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Review} from '../types/offerTypes/review.ts';
import {Provider} from 'react-redux';
import {appStore} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../hooks/redux.ts';
import {fetchOffers} from '../features/offersThunks.ts';
import {selectAllOffers, selectOffersLoading} from '../selectors/selectors.ts';
import {Spinner} from '../components/Spinner/Spinner.tsx';
import {checkAuthorization} from '../features/authorizationThunks.ts';

interface AppProps {
  favorites: number[];
  reviews: Review[];
}

const AppInitializer: FC<AppProps> = ({ favorites, reviews }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectOffersLoading);
  const offers = useAppSelector(selectAllOffers);

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuthorization());
  }, [dispatch]);

  if (isLoading && offers.length === 0) {
    return (
      <Spinner />
    );
  }

  return (
    <MainContainer
      offers={offers}
      favorites={favorites}
      reviews={reviews}
    />
  );
};

export const App: FC<AppProps> = (props) => (
  <Provider store={appStore}>
    <AppInitializer {...props}/>
  </Provider>
);
