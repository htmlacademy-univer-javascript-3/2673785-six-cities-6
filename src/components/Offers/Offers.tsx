import {OfferCard} from '../OfferCard/OfferCard.tsx';
import {FC, memo, useCallback, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {
  selectCurrentCity,
  selectOffersByCurrentCity,
  selectOffersCountByCurrentCity,
  selectOffersLoading,
  selectOffersError
} from '../../selectors/selectors.ts';
import {EmptyOffers} from './EmptyOffers.tsx';
import {SortType, SortTypeToTitle, getSortedOffers} from './utils.ts';
import {Spinner} from '../Spinner/Spinner.tsx';
import {setOffer} from '../../features/offersSlice.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {SortOptions} from './SortOptions.tsx';

interface OffersProps {
}

const OffersComponent: FC<OffersProps> = () => {
  const [sortType, setSortType] = useState<SortType>('popular');
  const [selectOpened, setSelectOpened] = useState(false);
  const [, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectOffersByCurrentCity);
  const offersCount = useAppSelector(selectOffersCountByCurrentCity);
  const isLoading = useAppSelector(selectOffersLoading);
  const error = useAppSelector(selectOffersError);

  const handleOnSortSelectClick = useCallback(() => {
    setSelectOpened((prev) => !prev);
  }, []);

  const handleSetSortType = useCallback((type: SortType) => {
    setSortType(type);
    setSelectOpened(false);
  }, []);

  const handleOfferMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleOfferMouseLeave = () => {
    setActiveOfferId(null);
  };

  const handleOfferClick = useCallback((selectedOffer: Offer) => {
    dispatch(setOffer(selectedOffer));
  }, [dispatch]);

  const sortedOffers = useMemo(
    () =>
      getSortedOffers(sortType, offers),
    [sortType, offers]
  );

  const offersList = useMemo(
    () =>
      sortedOffers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          variant={'cities'}
          onClick={() => handleOfferClick(offer)}
          onMouseLeave={handleOfferMouseLeave}
          onMouseEnter={() => handleOfferMouseEnter(offer.id)}
        />
      )),
    [sortedOffers, handleOfferClick]
  );

  if (isLoading) {
    return (
      <section className="cities__places places">
        <div className="cities__status-wrapper tabs__content">
          <Spinner/>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="cities__places places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">Error loading offers</b>
          <p className="cities__status-description">{error}</p>
          <button
            className="cities__retry-button button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return <EmptyOffers currentCity={currentCity}/>;
  }

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
          <SortOptions sortType={sortType} selectOpened={selectOpened} onSelectType={handleSetSortType}/>
        )}
      </form>
      <div className='cities__places-list places__list tabs__content'>
        {offersList}
      </div>
    </section>
  );
};

export const Offers = memo(OffersComponent);
