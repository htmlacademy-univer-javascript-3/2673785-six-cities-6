import {OfferCard} from '../OfferCard/OfferCard.tsx';
import {FC, useMemo, useState} from 'react';
import {Offer} from '../../types/offerTypes/offer.ts';

type SortType = 'priceLowToHigh' | 'priceHighToLow' | 'topRatedFirst' | 'popular';

const SortTypeToTitle: Record<SortType, string> = {
  priceHighToLow: 'Price: high to low',
  priceLowToHigh: 'Price: low to high',
  topRatedFirst: 'Top rated first',
  popular: 'Popular',
};

interface OffersProps {
  offersCount: number;
  offers: Offer[];
}

export const Offers: FC<OffersProps> = ({offersCount, offers}) => {
  const [sortType, setSortType] = useState<SortType>('popular');
  const [selectOpened, setSelectOpened] = useState(false);
  const [, setActiveOfferId] = useState<number | null>(null);

  const handleOnSortSelectClick = () => {
    setSelectOpened(!selectOpened);
  };

  const handleSetSortType = (type: SortType) => {
    setSortType(type);
    setSelectOpened(false);
  };

  const handleOfferMouseEnter = (offerId: number) => {
    setActiveOfferId(offerId);
  };

  const handleOfferMouseLeave = () => {
    setActiveOfferId(null);
  };

  const getSortedOffers = useMemo(() => {
    const offersCopy = [...offers];

    switch (sortType) {
      case 'priceLowToHigh':
        return offersCopy.sort((a, b) => a.price - b.price);

      case 'priceHighToLow':
        return offersCopy.sort((a, b) => b.price - a.price);

      case 'topRatedFirst':
        return offersCopy.sort((a, b) => b.rating - a.rating);

      case 'popular':
        return offersCopy.sort((a, b) => b.reviewIds.length - a.reviewIds.length);

      default:
        return offersCopy;
    }
  }, [offers, sortType]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersCount} places to stay in Amsterdam</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} onClick={handleOnSortSelectClick}>
          &nbsp;{SortTypeToTitle[sortType]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        {selectOpened && (
          <ul className="places__options places__options--custom places__options--opened">
            <li
              className={`places__option ${sortType === 'popular' && 'places__option--active'}`}
              onClick={() => handleSetSortType('popular')}
              tabIndex={0}
            >
              Popular
            </li>

            <li
              className={`places__option ${sortType === 'priceLowToHigh' && 'places__option--active'}`}
              onClick={() => handleSetSortType('priceLowToHigh')}
              tabIndex={0}
            >
              Price: low to high
            </li>

            <li
              className={`places__option ${sortType === 'priceHighToLow' && 'places__option--active'}`}
              onClick={() => handleSetSortType('priceHighToLow')}
              tabIndex={0}
            >
              Price: high to low
            </li>

            <li
              className={`places__option ${sortType === 'topRatedFirst' && 'places__option--active'}`}
              onClick={() => handleSetSortType('topRatedFirst')}
              tabIndex={0}
            >
              Top rated first
            </li>
          </ul>
        )}
      </form>
      <div className="cities__places-list places__list tabs__content">
        {getSortedOffers.map((offer) => (
          <OfferCard
            offer={offer}
            key={offer.id}
            onMouseEnter={() => handleOfferMouseEnter(offer.id)}
            onMouseLeave={handleOfferMouseLeave}
          />
        ))}
      </div>
    </section>
  );
};
