import {FC, memo, useCallback, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers, selectAuthorizationStatus, selectUser} from '../../selectors/selectors.ts';
import {logout} from '../../features/authorizationSlice.ts';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';

export const MainHeaderUserPartComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';
  const user = useAppSelector(selectUser);
  const offers = useAppSelector(selectAllOffers);

  const favoriteCount = useMemo(
    () =>
      isAuthorized ? offers.filter((off) => off.isFavorite).length : 0, [isAuthorized, offers]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return isAuthorized ? (
    <>
      <li className='header__nav-item user'>
        <Link to={PageRoutes.FAVORITES} className='header__nav-link header__nav-link--profile'>
          <div className='header__avatar-wrapper user__avatar-wrapper'>
          </div>
          <span className='header__user-name user__name'>{user?.email || 'Guest'}</span>
          <span className='header__favorite-count'>
            {favoriteCount}
          </span>
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

export const MainHeaderUserPart = memo(MainHeaderUserPartComponent);
