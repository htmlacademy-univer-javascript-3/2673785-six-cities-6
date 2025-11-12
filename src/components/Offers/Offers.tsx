import {OfferCard} from '../OfferCard/OfferCard.tsx';
import {FC, useState} from 'react';
import {useAppSelector} from '../../hooks/redux.ts';
import {
  selectCurrentCity,
  selectOffersByCurrentCity,
  selectOffersCountByCurrentCity
} from '../../selectors/selectors.ts';
import {EmptyOffers} from './EmptyOffers.tsx';
import {getSortedOffers, SortType, SortTypeToTitle} from './utils.ts';

interface OffersProps {}

export const Offers: FC<OffersProps> = () => {
  const [sortType, setSortType] = useState<SortType>('popular');
  const [selectOpened, setSelectOpened] = useState(false);
  const [, setActiveOfferId] = useState<number | null>(null);

  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectOffersByCurrentCity);
  const offersCount = useAppSelector(selectOffersCountByCurrentCity);

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

  const getOffers = () => {
    if (offers.length === 0) {
      return <EmptyOffers currentCity={currentCity}/>;
    }

    return getSortedOffers(sortType, offers).map((offer) => (
      <OfferCard
        offer={offer}
        key={offer.id}
        variant={'cities'}
        onMouseEnter={() => handleOfferMouseEnter(offer.id)}
        onMouseLeave={handleOfferMouseLeave}
      />
    ));
  };

  return (
    <section className='cities__places places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>{offersCount} places to stay in {currentCity}</b>
      <form className='places__sorting' action='#' method='get'>
        <span className='places__sorting-caption'>Sort by</span>
        <span className='places__sorting-type' tabIndex={0} onClick={handleOnSortSelectClick}>
          &nbsp;{SortTypeToTitle[sortType]}
          <svg className='places__sorting-arrow' width='7' height='4'>
            <use xlinkHref='#icon-arrow-select'></use>
          </svg>
        </span>
        {selectOpened && (
          <ul className='places__options places__options--custom places__options--opened'>
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
      <div className='cities__places-list places__list tabs__content'>
        {getOffers()}
      </div>
    </section>
  );
};
