import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {FC} from 'react';

const PATH_TO_IMAGES = '../../../markup/img/';

interface FavoritesOfferCardProps {
  offer: Offer | undefined;
}

export const FavoritesOfferCard: FC<FavoritesOfferCardProps> = ({offer}) => {
  if (!offer) {
    return null;
  }

  const rating = `${offer.rating * 20}%`;

  return (
    <article className='favorites__card place-card'>
      <div className='place-card__mark'>
        <span>{offer.isPremium}</span>
      </div>
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to={PageRoutes.OFFER}>
          <img className='place-card__image' src={`${PATH_TO_IMAGES}${offer.previewImage}`} width='150' height='110' alt='Place image'/>
        </Link>
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className='place-card__bookmark-button place-card__bookmark-button--active button' type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: rating}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={PageRoutes.OFFER}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
};
