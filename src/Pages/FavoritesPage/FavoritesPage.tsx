import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {OfferCard} from '../../components/OfferCard/OfferCard.tsx';

interface FavoritesPageProps {
  favorites: number[];
  offers: Offer[];
  isAuthorized: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const FavoritesPage: FC<FavoritesPageProps> = ({favorites, offers, isAuthorized, setIsAuthorized}) => (
  <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={PageRoutes.MAIN} className="header__logo-link">
              <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={PageRoutes.FAVORITES} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{isAuthorized ? 'Oliver.conner@gmail.com' : 'Guest'}</span>
                  <span className="header__favorite-count">{isAuthorized ? favorites.length : 0}</span>
                </Link>
              </li>
              <li className="header__nav-item">

                <Link className="header__nav-link" to={PageRoutes.LOGIN}>
                  <span className="header__signout" onClick={() => setIsAuthorized(false)}>Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={PageRoutes.FAVORITES}>
                    <span>Amsterdam</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                <OfferCard variant='favorites' offer={offers.find((offer) => offer.id === favorites[0])}/>
                <OfferCard variant='favorites' offer={offers.find((offer) => offer.id === favorites[1])}/>
              </div>
            </li>

            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={PageRoutes.FAVORITES}>
                    <span>Cologne</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                <OfferCard variant='favorites' offer={offers.find((offer) => offer.id === favorites[2])}/>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link to={PageRoutes.MAIN} className="footer__logo-link">
        <img className="footer__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  </div>
);
