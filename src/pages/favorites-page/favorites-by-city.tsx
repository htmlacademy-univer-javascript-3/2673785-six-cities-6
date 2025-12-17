import {FC, memo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../features/hooks/redux.ts';
import {
  selectFavoritesByCity,
  selectFavoritesCount, selectFavoritesError,
  selectFavoritesLoading
} from '../../features/favorites/favoritesSelectors.ts';
import {setOffer} from '../../features/offers/offers-slice.ts';
import {Offer} from '../../types/offer-types/offer.ts';
import {CitySection} from '../../components/city-section/city-section.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';

export const FavoritesByCityComponent: FC = () => {
  const dispatch = useAppDispatch();
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const favoritesLoading = useAppSelector(selectFavoritesLoading);
  const favoritesError = useAppSelector(selectFavoritesError);

  const handleOfferClick = useCallback((selectedOffer: Offer) => {
    dispatch(setOffer(selectedOffer));
  }, [dispatch]);

  const citySections = Object.entries(favoritesByCity).map(([city, offers]) =>
    offers.length > 0 ? (
      <CitySection
        key={city}
        city={city}
        offers={offers}
        onOfferClick={handleOfferClick}
      />
    ) : null
  );

  if (favoritesLoading) {
    return <Spinner/>;
  }

  if (favoritesError) {
    return (
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Error occurred while loading saved list</h1>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className='page__main page__main--favorites'>
      <div className='page__favorites-container container'>
        <section className='favorites'>
          {favoritesCount > 0 ? (
            <>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                {citySections}
              </ul>
            </>
          ) : (
            <h1 className='favorites__title'>Saved list is empty</h1>
          )}
        </section>
      </div>
    </main>
  );
};

export const FavoritesByCity = memo(FavoritesByCityComponent);
