import {FC, useCallback, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../features/hooks/redux.ts';
import {MainHeader} from '../../components/main-header/main-header.tsx';
import {Reviews} from '../../components/reviews/reviews.tsx';
import {Map} from '../../components/map/map.tsx';
import {OfferCard} from '../../components/offer-card/offer-card.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchComments,
} from '../../features/offer/offer-thunks.ts';
import {
  selectCurrentOffer,
  selectNearbyOffers,
  selectCurrentOfferLoading,
  selectCurrentOfferError,
} from '../../features/offer/offerSelectors.ts';
import {setOffer} from '../../features/offers/offers-slice.ts';
import {PageRoutes} from '../../constants/page-routes/page-routes.ts';
import {Point, Points} from '../../types/types.ts';
import {OfferDetailed, City} from '../../types/offer-types/offer.ts';
import {ErrorPage} from '../error-page/error-page.tsx';
import {OfferGallery} from '../../components/offer-components/offer-gallery.tsx';
import {OfferInfo} from '../../components/offer-components/offer-info.tsx';
import {OfferHost} from '../../components/offer-components/offer-host.tsx';

export const OfferPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const offer = useAppSelector(selectCurrentOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const isLoading = useAppSelector(selectCurrentOfferLoading);
  const error = useAppSelector(selectCurrentOfferError);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferById(id));
    dispatch(fetchNearbyOffers(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error === 'Offer not found') {
      navigate(PageRoutes.NOT_FOUND);
    }
  }, [error, navigate]);

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((offerId: string) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSelectedOfferId(null);
  }, []);

  const handleOfferClick = (selectedOffer: OfferDetailed) => {
    dispatch(setOffer(selectedOffer));
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const offers = nearbyOffers.slice(0, 3).map((nearbyOffer) => (
    <OfferCard
      key={nearbyOffer.id}
      offer={nearbyOffer}
      variant='neighbours'
      onClick={() => handleOfferClick(nearbyOffer as OfferDetailed)}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => handleMouseEnter(nearbyOffer.id)}
    />
  ));

  if (isLoading) {
    return (
      <div className='page'>
        <MainHeader/>
        <main className='page__main page__main--offer'>
          <Spinner/>
        </main>
      </div>
    );
  }

  if (error || !offer) {
    return <ErrorPage/>;
  }

  const city: City = {
    name: offer.city.name,
    location: {
      latitude: offer.city.location.latitude,
      longitude: offer.city.location.longitude,
      zoom: 10,
    }
  };

  const currentPoint: Point = {
    offerId: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  };

  const nearbyPoints: Points = nearbyOffers.slice(0, 3).map((nearbyOffer) => ({
    offerId: nearbyOffer.id,
    title: nearbyOffer.title,
    lat: nearbyOffer.location.latitude,
    lng: nearbyOffer.location.longitude,
  }));

  const allPoints = [currentPoint, ...nearbyPoints];

  return (
    <div className='page'>
      <MainHeader/>

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <OfferGallery images={offer.images}/>

          <div className='offer__container container'>
            <div className='offer__wrapper'>
              <OfferInfo offer={offer}></OfferInfo>

              <OfferHost host={offer.host} description={offer.description}/>

              <Reviews offerId={offer.id}/>
            </div>
          </div>

          <section className='offer__map map'>
            <Map
              city={city}
              points={allPoints}
              selectedPoint={currentPoint}
              selectedOfferId={selectedOfferId}
              height={'600px'}
              width={'1200px'}
              offset={'180px'}
            />
          </section>
        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <div className='near-places__list places__list'>
              {offers}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
