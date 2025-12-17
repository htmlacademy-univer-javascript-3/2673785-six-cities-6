import {FC, useEffect} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';
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

const AppInitializer: FC = () => {
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
        }).catch(() => {
          dispatch(setFavorites([]));
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
    <MainContainer />
  );
};

export const App: FC = () => (
  <Provider store={appStore}>
    <AppInitializer />
  </Provider>
);
