import type {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {Offers} from '../../components/Offers/Offers.tsx';

interface MainPageProps {
  offersCount: number;
  offers: Offer[];
  favoritesCount: number;
  isAuthorized?: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const MainPage: FC<MainPageProps> = ({offersCount, offers, favoritesCount, isAuthorized = false, setIsAuthorized}) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81"
                height="41"
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={PageRoutes.FAVORITES} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{isAuthorized ? 'Oliver.conner@gmail.com' : 'Guest'}</span>
                  <span className="header__favorite-count">{isAuthorized ? favoritesCount : 0}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link to={PageRoutes.LOGIN} className="header__nav-link">
                  <span className="header__signout" onClick={() => setIsAuthorized(false)}>Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Paris</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Cologne</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Brussels</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Amsterdam</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Hamburg</span>
              </Link>
            </li>
            <li className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link tabs__item">
                <span>Dusseldorf</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <Offers offers={offers} offersCount={offersCount}/>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </div>
);
