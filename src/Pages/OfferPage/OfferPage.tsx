import {FC} from 'react';
import {ReviewForm} from '../../components/ReviewForm/ReviewForm.tsx';
import {Map} from '../../components/Map/Map.tsx';
import {City, Point} from '../../types/types.ts';
import {Reviews} from '../../components/Reviews/Reviews.tsx';
import {Review} from '../../types/offerTypes/review.ts';
import {OfferCard} from '../../components/OfferCard/OfferCard.tsx';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers, selectCurrentOffer} from '../../selectors/selectors.ts';
import {MainHeader} from '../../components/MainHeader/MainHeader.tsx';
import {OfferPageImages} from "./OfferPageImages.tsx";

interface OfferPage {
  reviews: Review[];
}

export const OfferPage: FC<OfferPage> = ({reviews}) => {
  const offers = useAppSelector(selectAllOffers);
  const offer = useAppSelector(selectCurrentOffer);
  const neighbourOffers = offers.slice(1);

  if (!offer) {
    return;
  }

  const offerCity = offer.city;
  const city: City = {
    title: offerCity.name,
    lat: offerCity.location.latitude,
    lng: offerCity.location.longitude,
    zoom: 10,
  };

  const point: Point = {
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  };

  const points = neighbourOffers.map((off) => ({
    title: off.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  return (
    <div className='page'>
      <MainHeader/>

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <OfferPageImages/>
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              <div className='offer__mark'>
                <span>Premium</span>
              </div>
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className='offer__bookmark-button button' type='button'>
                  <svg className='offer__bookmark-icon' width='31' height='33'>
                    <use xlinkHref='#icon-bookmark'></use>
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{width: '80%'}}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value rating__value'>4.8</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>
                  Apartment
                </li>
                <li className='offer__feature offer__feature--bedrooms'>
                  3 Bedrooms
                </li>
                <li className='offer__feature offer__feature--adults'>
                  Max 4 adults
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;120</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>What&apos;s inside</h2>
                <ul className='offer__inside-list'>
                  <li className='offer__inside-item'>
                    Wi-Fi
                  </li>
                  <li className='offer__inside-item'>
                    Washing machine
                  </li>
                  <li className='offer__inside-item'>
                    Towels
                  </li>
                  <li className='offer__inside-item'>
                    Heating
                  </li>
                  <li className='offer__inside-item'>
                    Coffee machine
                  </li>
                  <li className='offer__inside-item'>
                    Baby seat
                  </li>
                  <li className='offer__inside-item'>
                    Kitchen
                  </li>
                  <li className='offer__inside-item'>
                    Dishwasher
                  </li>
                  <li className='offer__inside-item'>
                    Cabel TV
                  </li>
                  <li className='offer__inside-item'>
                    Fridge
                  </li>
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user user'>
                  <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='offer__avatar user__avatar' src='../../../markup/img/avatar-angelina.jpg' width='74'
                      height='74' alt='HostType avatar'
                    />
                  </div>
                  <span className='offer__user-name'>
                    Angelina
                  </span>
                  <span className='offer__user-status'>
                    Pro
                  </span>
                </div>
                <div className='offer__description'>
                  {/*{offer.description.map((descriptionPart) => (*/}
                  {/*  <p key={crypto.randomUUID()} className='offer__text'>*/}
                  {/*    {descriptionPart}*/}
                  {/*  </p>*/}
                  {/*))}*/}
                  Here should be description
                </div>
              </div>
              <section className='offer__reviews reviews'>
                <Reviews reviews={reviews}/>
                <ReviewForm></ReviewForm>
              </section>
            </div>
          </div>
          <section className='offer__map map'>
            <Map city={city} points={points} selectedPoint={point}></Map>
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              {neighbourOffers.map((neighbourOffer) => (
                <OfferCard offer={neighbourOffer} variant={'neighbours'} key={neighbourOffer.id}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
