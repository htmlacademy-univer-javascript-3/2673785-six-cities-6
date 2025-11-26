import type {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offers} from '../../components/Offers/Offers.tsx';
import {City, Point, Points} from '../../types/types.ts';
import {useState} from 'react';
import {Map} from '../../components/Map/Map.tsx';
import {Cities} from '../../components/Cities/Cities.tsx';
import {Offer} from '../../types/offerTypes/offer.ts';

interface MainPageProps {
  offers: Offer[];
  favoritesCount: number;
  isAuthorized?: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const MainPage: FC<MainPageProps> = ({offers, favoritesCount, isAuthorized = false, setIsAuthorized}) => {
  const city: City = offers.length > 0 ? {
    title: offers[0].city.name,
    lat: offers[0].city.location.latitude,
    lng: offers[0].city.location.longitude,
    zoom: 10,
  } : {
    title: 'Amsterdam',
    lat: 52.3740300,
    lng: 4.8896900,
    zoom: 10,
  };

  const points: Points = offers.length > 0 ? offers.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  })) : [];

  const [selectedPoint] = useState<Point>(points[0]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
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
        <Cities />
        <div className="cities">
          <div className="cities__places-container container">
            <Offers />
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} selectedPoint={selectedPoint} points={points} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
