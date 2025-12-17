import {Provider} from 'react-redux';
import {FC, useEffect} from 'react';
import {MainContainer} from '../main-container/main-container.tsx';
import {appStore} from '../features/store/store.ts';
import {useAppDispatch, useAppSelector} from '../features/hooks/redux.ts';
import {fetchOffers} from '../features/offers/offers-thunks.ts';
import {selectOffersLoading} from '../features/offers/offersSelectors.ts';
import {selectAuthorizationStatus} from '../features/auth/authSelectors.ts';
import {Spinner} from '../components/spinner/spinner.tsx';
import {checkAuthorization} from '../features/auth/authorization-thunks.ts';
import {setFavorites} from '../features/offers/offers-slice.ts';
import {Offer} from '../types/offer-types/offer.ts';
import {fetchFavorites} from '../features/favorites/favorites-thunks.ts';
import {ToastProvider} from '../components/toast/toast-provider.tsx';

const AppInitializer: FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectOffersLoading);
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

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <MainContainer/>
  );
};

export const App: FC = () => (
  <Provider store={appStore}>
    <ToastProvider position={'top-right'}>
      <AppInitializer/>
    </ToastProvider>
  </Provider>
);
