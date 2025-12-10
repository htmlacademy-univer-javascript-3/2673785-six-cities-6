import {Offer} from '../../types/offerTypes/offer.ts';
import {FC, memo} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {OfferCard} from '../OfferCard/OfferCard.tsx';

interface CitySectionProps {
  city: string;
  offers: Offer[];
  onOfferClick: (offer: Offer) => void;
}

const CitySectionComponent: FC<CitySectionProps> = ({city, offers, onOfferClick}) =>
  (
    <li className='favorites__locations-items' key={city}>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link className='locations__item-link' to={PageRoutes.FAVORITES}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className='favorites__places'>
        {offers.map((offer) => (
          <OfferCard
            variant='favorites'
            offer={offer}
            key={offer.id}
            onClick={() => onOfferClick(offer)}
          />
        ))}
      </div>
    </li>
  );

export const CitySection = memo(CitySectionComponent);
