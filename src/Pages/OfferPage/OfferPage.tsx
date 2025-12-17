import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { MainHeader } from '../../components/MainHeader/MainHeader.tsx';
import { Reviews } from '../../components/Reviews/Reviews.tsx';
import { Map } from '../../components/Map/Map.tsx';
import { OfferCard } from '../../components/OfferCard/OfferCard.tsx';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { BookmarkButton } from '../../components/BookmarkButton/BookmarkButton.tsx';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchComments,
} from '../../features/offerThunks.ts';
import {
  selectCurrentOffer,
  selectNearbyOffers,
  selectCurrentOfferLoading,
  selectCurrentOfferError,
} from '../../selectors/selectors.ts';
import { setOffer } from '../../features/offersSlice.ts';
import { PageRoutes } from '../../constants/PageRoutes/PageRoutes.ts';
import { City, Point } from '../../types/types.ts';
import { OfferDetailed } from '../../types/offerTypes/offer.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

export const OfferPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleOfferClick = (selectedOffer: OfferDetailed) => {
    dispatch(setOffer(selectedOffer));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="page">
        <MainHeader />
        <main className="page__main page__main--offer">
          <Spinner />
        </main>
      </div>
    );
  }

  if (error || !offer) {
    return <ErrorPage />;
  }

  const city: City = {
    title: offer.city.name,
    lat: offer.city.location.latitude,
    lng: offer.city.location.longitude,
    zoom: 10,
  };

  const currentPoint: Point = {
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  };

  const nearbyPoints = nearbyOffers.slice(0, 3).map((nearbyOffer) => ({
    title: nearbyOffer.title,
    lat: nearbyOffer.location.latitude,
    lng: nearbyOffer.location.longitude,
  }));

  const allPoints = [currentPoint, ...nearbyPoints];
  const rating = `${Math.round(offer.rating) * 20}%`;

  return (
    <div className="page">
      <MainHeader />

      <main className="page__main page__main--offer">
        <section className="offer">
          {/* Галерея изображений */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, 6).map((image, index) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo studio ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <BookmarkButton
                  offerId={offer.id}
                  isFavorite={offer.isFavorite}
                  size="large"
                />
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: rating }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating.toFixed(1)}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt={offer.host.name}
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <Reviews offerId={offer.id} />
            </div>
          </div>

          <section className="offer__map map">
            <Map
              city={city}
              points={allPoints}
              selectedPoint={currentPoint}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.slice(0, 3).map((nearbyOffer) => (
                <OfferCard
                  key={nearbyOffer.id}
                  offer={nearbyOffer}
                  variant="neighbours"
                  onClick={() => handleOfferClick(nearbyOffer as OfferDetailed)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
