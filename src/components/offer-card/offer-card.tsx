import type {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/page-routes/page-routes.ts';
import {Offer} from '../../types/offer-types/offer.ts';
import {BookmarkButton} from '../bookmark-button/bookmark-button.tsx';
import {memo} from 'react';

type CardVariant = 'cities' | 'neighbours' | 'favorites';

interface OfferCardProps {
  offer: Offer;
  variant?: CardVariant;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const OfferCardComponent: FC<OfferCardProps> = ({offer, variant = 'cities', onMouseEnter, onMouseLeave, onClick}) => {
  const rating = `${offer.rating * 20}%`;
  const imageSize = variant === 'favorites' ? {width: '150', height: '110'} : {width: '260', height: '200'};

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

  return (
    <article className={getCardClassName()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={getImageWrapperClassName()}>
        <Link to={`${PageRoutes.OFFER}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
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
          <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} size={'small'}/>
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

export const OfferCard = memo(OfferCardComponent);
