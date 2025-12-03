import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {OfferCard} from '../../components/OfferCard/OfferCard.tsx';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers} from '../../selectors/selectors.ts';
import {getFavoritesByCity} from './utils.ts';

export const FavoritesByCity: FC = () => {
  const offers = useAppSelector(selectAllOffers);
  const favorites = offers.filter((offer) => offer.isFavorite);

  const favoritesByCity = getFavoritesByCity(favorites);

  const favoritesComponent =
    Object.entries(favoritesByCity)
      .map(([city, offersByCity]) =>
        offersByCity.length > 0 ? (
          <li className='favorites__locations-items' key={city}>
            <div className='favorites__locations locations locations--current'>
              <div className='locations__item'>
                <Link className='locations__item-link' to={PageRoutes.FAVORITES}>
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className='favorites__places'>
              {offersByCity.map((offer) => (
                <OfferCard variant='favorites' offer={offer} key={offer.id}/>
              ))}
            </div>
          </li>
        ) : null
      );

  return (
    <main className='page__main page__main--favorites'>
      <div className='page__favorites-container container'>
        <section className='favorites'>
          {favorites.length > 0 ? (
            <>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                {favoritesComponent}
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
