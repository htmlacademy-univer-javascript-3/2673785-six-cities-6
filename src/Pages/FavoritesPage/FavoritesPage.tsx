import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {OfferCard} from '../../components/OfferCard/OfferCard.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {selectAuthorizationStatus, selectUser} from '../../selectors/selectors.ts';
import {logout} from '../../features/authorizationSlice.ts';

interface FavoritesPageProps {
  favorites: number[];
  offers: Offer[];
}

export const FavoritesPage: FC<FavoritesPageProps> = ({favorites, offers}) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getUserInfo = () => (
    isAuthorized ? (
      <>
        <li className="header__nav-item user">
          <Link to={PageRoutes.FAVORITES} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{user?.email || 'Guest'}</span>
            <span className="header__favorite-count">
              {isAuthorized ? offers.filter((offer) => offer.isFavorite).length : 0}
            </span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link to={PageRoutes.LOGIN} className="header__nav-link">
            <span className="header__signout" onClick={handleLogout}>Sign out</span>
          </Link>
        </li>
      </>
    ) : (
      <li className="header__nav-item">
        <Link className="header__nav-link" to={PageRoutes.LOGIN}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    )
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={PageRoutes.MAIN} className="header__logo-link">
                <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {getUserInfo()}
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
                  <OfferCard variant='favorites' offer={offers.find((offer) => offer.isFavorite)}/>
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
          <img className="footer__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};
