import {FC, useState} from 'react';
import {BookmarkButton} from '../bookmark-button/bookmark-button.tsx';
import {OfferDetailed} from '../../types/offer-types/offer.ts';

interface OfferInfoProps {
  offer: OfferDetailed;
}

export const OfferInfo: FC<OfferInfoProps> = ({offer}) => {
  const [isFavorite, setIsFavorite] = useState(offer?.isFavorite || false);

  const handleBookmarkClick = () => {
    setIsFavorite((prev) => !prev);
  };

  const rating = `${Math.round(offer.rating) * 20}%`;

  return (
    <>
      {offer.isPremium && (
        <div className='offer__mark'>
          <span>Premium</span>
        </div>
      )}

      <div className='offer__name-wrapper'>
        <h1 className='offer__name'>{offer.title}</h1>
        <BookmarkButton
          offerId={offer.id}
          isFavorite={isFavorite}
          size='large'
          onClick={handleBookmarkClick}
        />
      </div>

      <div className='offer__rating rating'>
        <div className='offer__stars rating__stars'>
          <span style={{width: rating}}></span>
          <span className='visually-hidden'>Rating</span>
        </div>
        <span className='offer__rating-value rating__value'>
          {offer.rating.toFixed(1)}
        </span>
      </div>

      <ul className='offer__features'>
        <li className='offer__feature offer__feature--entire'>
          {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
        </li>
        <li className='offer__feature offer__feature--bedrooms'>
          {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
        </li>
        <li className='offer__feature offer__feature--adults'>
          Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
        </li>
      </ul>

      <div className='offer__price'>
        <b className='offer__price-value'>€{offer.price}</b>
        <span className='offer__price-text'>&nbsp;night</span>
      </div>

      <div className='offer__inside'>
        <h2 className='offer__inside-title'>What&apos;s inside</h2>
        <ul className='offer__inside-list'>
          {offer.goods.map((good) => (
            <li className='offer__inside-item' key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
