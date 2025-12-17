import {FC, MouseEvent, memo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {useNavigate} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {selectAuthorizationStatus} from '../../selectors/selectors.ts';
import {toggleFavorite as toggleFavoriteThunk} from '../../features/favoritesThunks.ts';

interface BookmarkButtonProps {
  offerId: string;
  isFavorite: boolean;
  size?: 'small' | 'large';
  className?: string;
  onClick?: () => void;
}

const BookmarkButtonComponent: FC<BookmarkButtonProps> = ({
  offerId,
  isFavorite,
  size = 'small',
  className = '',
  onClick
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectAuthorizationStatus) === 'AUTH';

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthorized) {
      navigate(PageRoutes.LOGIN, {
        state: {from: window.location.pathname}
      });
      return;
    }

    if (onClick) {
      onClick();
    }

    (async () => {
      try {
        await dispatch(toggleFavoriteThunk({
          offerId,
          isFavorite
        })).unwrap();
      } catch (error: unknown) { /* empty */
      }
    })();
  }, [dispatch, offerId, isFavorite, isAuthorized, navigate, onClick]);

  const buttonClass = size === 'large'
    ? 'offer__bookmark-button'
    : 'place-card__bookmark-button';

  // eslint-disable-next-line no-nested-ternary
  const activeClass = isFavorite
    ? (size === 'large' ? 'offer__bookmark-button--active' : 'place-card__bookmark-button--active')
    : '';

  const iconWidth = size === 'large' ? 31 : 18;
  const iconHeight = size === 'large' ? 33 : 19;

  const buttonText = isFavorite ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={`${buttonClass} ${activeClass} button ${className}`}
      type="button"
      onClick={handleClick}
      aria-label={buttonText}
      title={isAuthorized ? buttonText : 'Sign in to add to favorites'}
    >
      <svg
        className={`${size === 'large' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon'}`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
};

export const BookmarkButton = memo(BookmarkButtonComponent);
