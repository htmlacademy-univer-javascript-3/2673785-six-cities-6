import {FC, useEffect} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
import {Review} from '../types/offerTypes/review.ts';
import {Provider} from 'react-redux';
import {appStore} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../hooks/redux.ts';
import {fetchOffers} from '../features/offersThunks.ts';
import {selectAllOffers, selectAuthorizationStatus, selectOffersLoading} from '../selectors/selectors.ts';
import {Spinner} from '../components/Spinner/Spinner.tsx';
import {checkAuthorization} from '../features/authorizationThunks.ts';
import {setFavorites} from '../features/offersSlice.ts';
import {Offer} from '../types/offerTypes/offer.ts';
import {fetchFavorites} from '../features/favoritesThunks.ts';

interface AppProps {
  reviews: Review[];
}

const AppInitializer: FC<AppProps> = ({ reviews }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectOffersLoading);
  const offers = useAppSelector(selectAllOffers);
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuthorization());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavorites())
        .unwrap()
        .then((favorites: Offer[]) => {
          dispatch(setFavorites(favorites));
        });
    } else {
      dispatch(setFavorites([]));
    }
  }, [dispatch, isAuthorized]);

  if (isLoading && offers.length === 0) {
    return (
      <Spinner />
    );
  }

  return (
    <MainContainer
      reviews={reviews}
    />
  );
};

export const App: FC<AppProps> = (props) => (
  <Provider store={appStore}>
    <AppInitializer {...props}/>
  </Provider>
);
