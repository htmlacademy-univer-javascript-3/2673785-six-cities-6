import {FC, memo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../features/hooks/redux.ts';
import {
  selectAuthorizationStatus,
  selectUser
} from '../../features/auth/authSelectors.ts';
import {selectFavoritesCount} from '../../features/favorites/favoritesSelectors.ts';
import {logout} from '../../features/auth/authorization-slice.ts';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/page-routes/page-routes.ts';

export const MainHeaderUserPartComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';
  const user = useAppSelector(selectUser);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const userName = user?.email || 'Guest';

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return isAuthorized ? (
    <>
      <li className='header__nav-item user'>
        <Link to={PageRoutes.FAVORITES} className='header__nav-link header__nav-link--profile'>
          <div className='header__avatar-wrapper user__avatar-wrapper'>
            {user?.avatarUrl && (
              <img
                className="header__avatar user__avatar"
                src={user.avatarUrl}
                width="20"
                height="20"
                alt={user.email}
              />
            )}
          </div>
          <span className='header__user-name user__name'>{userName}</span>
          <span className='header__favorite-count'>
            {favoritesCount}
          </span>
        </Link>
      </li>
      <li className='header__nav-item'>
        <Link to={PageRoutes.LOGIN} className='header__nav-link'>
          <span className='header__signout' onClick={handleLogout}>Log out</span>
        </Link>
      </li>
    </>
  ) : (
    <li className='header__nav-item'>
      <Link className='header__nav-link' to={PageRoutes.LOGIN}>
        <span className='header__signout'>Log in</span>
      </Link>
    </li>
  );
};

export const MainHeaderUserPart = memo(MainHeaderUserPartComponent);
