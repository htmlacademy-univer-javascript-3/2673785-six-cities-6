import type {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../../types/offerTypes/offer.ts';

const PATH_TO_IMAGES = '../../../markup/img/';

type CardVariant = 'cities' | 'neighbours' | 'favorites';

interface OfferCardProps {
  offer?: Offer;
  variant?: CardVariant;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const OfferCard: FC<OfferCardProps> = ({offer, variant = 'cities', onMouseEnter, onMouseLeave}) => {
  if (!offer) {
    return;
  }

  const rating = `${offer.rating * 20}%`;

  const getCardClassName = () => {
    switch (variant) {
      case 'neighbours':
        return 'near-places__card place-card';
      case 'favorites':
        return 'favorites__card place-card';
      default:
        return 'cities__card place-card';
    }
  };

  const getImageWrapperClassName = () => {
    switch (variant) {
      case 'neighbours':
        return 'near-places__image-wrapper place-card__image-wrapper';
      case 'favorites':
        return 'favorites__image-wrapper place-card__image-wrapper';
      default:
        return 'cities__image-wrapper place-card__image-wrapper';
    }
  };

  const getImageSize = () => {
    if (variant === 'favorites') {
      return {width: '150', height: '110'};
    }
    return {width: '260', height: '200'};
  };

  const imageSize = getImageSize();

  return (
    <article className={getCardClassName()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={getImageWrapperClassName()}>
        <Link to={`${PageRoutes.OFFER}`}>
          <img
            className="place-card__image"
            src={`${PATH_TO_IMAGES}${offer.images[0]}`}
            width={imageSize.width}
            height={imageSize.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: rating}}></span>
            <span className="visually-hidden">Rating {offer.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${PageRoutes.OFFER}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
