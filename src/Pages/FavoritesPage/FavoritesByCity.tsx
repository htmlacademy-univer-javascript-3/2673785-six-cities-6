import {FC, memo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {selectFavoritesByCity, selectFavoritesCount} from '../../selectors/selectors.ts';
import {setOffer} from '../../features/offersSlice.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {CitySection} from '../../components/CitySection/CitySection.tsx';

export const FavoritesByCityComponent: FC = () => {
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const dispatch = useAppDispatch();

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
