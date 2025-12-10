import {FC, MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks/redux.ts';
import {toggleFavorite} from '../../features/offersSlice.ts';

interface BookmarkButtonProps {
  offerId: string;
  isFavorite: boolean;
  size?: 'small' | 'large';
  className?: string;
}

export const BookmarkButton: FC<BookmarkButtonProps> = ({offerId, isFavorite, size = 'small', className = ''}) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(offerId));
  };

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
