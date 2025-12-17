import {FC, useEffect} from 'react';
import {MainContainer} from '../main-container/main-container.tsx';
import {Provider} from 'react-redux';
import {appStore} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../hooks/redux.ts';
import {fetchOffers} from '../features/offers-thunks.ts';
import {selectAllOffers, selectAuthorizationStatus, selectOffersLoading} from '../selectors/selectors.ts';
import {Spinner} from '../components/spinner/spinner.tsx';
import {checkAuthorization} from '../features/authorization-thunks.ts';
import {setFavorites} from '../features/offers-slice.ts';
import {Offer} from '../types/offer-types/offer.ts';
import {fetchFavorites} from '../features/favorites-thunks.ts';
import {ToastProvider} from '../components/toast/toast-provider.tsx';

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
    <ToastProvider position={'top-right'}>
      <AppInitializer />
    </ToastProvider>
  </Provider>
);
