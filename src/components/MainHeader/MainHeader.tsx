import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers, selectAuthorizationStatus, selectUser} from '../../selectors/selectors.ts';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {logout} from '../../features/authorizationSlice.ts';

export const MainHeaderUserPart: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';
  const user = useAppSelector(selectUser);
  const offers = useAppSelector(selectAllOffers);

  const handleLogout = () => {
    dispatch(logout());
  };

  return isAuthorized ? (
    <>
      <li className='header__nav-item user'>
        <Link to={PageRoutes.FAVORITES} className='header__nav-link header__nav-link--profile'>
          <div className='header__avatar-wrapper user__avatar-wrapper'>
          </div>
          <span className='header__user-name user__name'>{user?.email || 'Guest'}</span>
          <span className='header__favorite-count'>{isAuthorized ? offers.filter((off) => off.isFavorite).length : 0}</span>
        </Link>
      </li>
      <li className='header__nav-item'>
        <Link to={PageRoutes.LOGIN} className='header__nav-link'>
          <span className='header__signout' onClick={handleLogout}>Sign out</span>
        </Link>
      </li>
    </>
  ) : (
    <li className='header__nav-item'>
      <Link className='header__nav-link' to={PageRoutes.LOGIN}>
        <span className='header__signout'>Sign in</span>
      </Link>
    </li>
  );
};

export const MainHeader: FC = () => (
  <header className='header'>
    <div className='container'>
      <div className='header__wrapper'>
        <div className='header__left'>
          <a className='header__logo-link header__logo-link--active'>
            <img className='header__logo' src='../../../markup/img/logo.svg' alt='6 cities logo' width='81' height='41'/>
          </a>
        </div>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <MainHeaderUserPart />
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
