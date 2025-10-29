import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {ReviewForm} from '../../components/ReviewForm/ReviewForm.tsx';
import {Map} from '../../components/Map/Map.tsx';
import {City, Point} from '../../types/types.ts';
import {Offer} from '../../types/offerTypes/offer.ts';
import {Reviews} from '../../components/Reviews/Reviews.tsx';
import {Review} from '../../types/offerTypes/review.ts';

interface OfferPage {
  isAuthorized: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
  offer: Offer;
  reviews: Review[];
}

export const OfferPage: FC<OfferPage> = ({isAuthorized, setIsAuthorized, offer, reviews}) => {
  const city: City = {
    title: 'Amsterdam',
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    zoom: 10,
  };

  const point: Point = {
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  };

  const points = [point];

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link className='header__logo-link' to={PageRoutes.MAIN}>
                <img
                  className='header__logo'
                  src='../../../markup/img/logo.svg' alt='6 cities logo' width='81' height='41'
                />
              </Link >
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to={isAuthorized ? PageRoutes.FAVORITES : PageRoutes.LOGIN}
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'>
                    </div>
                    <span className='header__user-name user__name'>
                      {isAuthorized ? 'Oliver.conner@gmail.com' : 'Guest'}
                    </span>
                    <span className='header__favorite-count'>{isAuthorized ? 3 : 0}</span>
                  </Link >
                </li>
                <li className='header__nav-item'>
                  <Link className='header__nav-link' to={PageRoutes.LOGIN}>
                    <span className='header__signout' onClick={() => setIsAuthorized(false)}>Sign out</span>
                  </Link >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container container'>
            <div className='offer__gallery'>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/room.jpg' alt='Photo studio'/>
              </div>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/apartment-01.jpg' alt='Photo studio'/>
              </div>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/apartment-02.jpg' alt='Photo studio'/>
              </div>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/apartment-03.jpg' alt='Photo studio'/>
              </div>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/studio-01.jpg' alt='Photo studio'/>
              </div>
              <div className='offer__image-wrapper'>
                <img className='offer__image' src='../../../markup/img/apartment-01.jpg' alt='Photo studio'/>
              </div>
            </div>
          </div>
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
                    <img className='offer__avatar user__avatar' src='../../../markup/img/avatar-angelina.jpg' width='74' height='74' alt='HostType avatar'/>
                  </div>
                  <span className='offer__user-name'>
                    Angelina
                  </span>
                  <span className='offer__user-status'>
                    Pro
                  </span>
                </div>
                <div className='offer__description'>
                  <p className='offer__text'>
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className='offer__text'>
                    An independent House, strategically located between Rembrand Square and National Opera, but where the
                    bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
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
              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <Link to={PageRoutes.OFFER}>
                    <img className='place-card__image' src='../../../markup/img/room.jpg' width='260' height='200' alt='Place image'/>
                  </Link >
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;80</b>
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
                      <span style={{width: '80%'}}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <Link to={PageRoutes.OFFER}>Wood and stone place</Link >
                  </h2>
                  <p className='place-card__type'>Room</p>
                </div>
              </article>

              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <Link to={PageRoutes.OFFER}>
                    <img className='place-card__image' src='../../../markup/img/apartment-02.jpg' width='260' height='200' alt='Place image'/>
                  </Link >
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;132</b>
                      <span className='place-card__price-text'>&#47;&nbsp;night</span>
                    </div>
                    <button className='place-card__bookmark-button button' type='button'>
                      <svg className='place-card__bookmark-icon' width='18' height='19'>
                        <use xlinkHref='#icon-bookmark'></use>
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{width: '80%'}}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <Link to={PageRoutes.OFFER}>Canal View Prinsengracht</Link >
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>

              <article className='near-places__card place-card'>
                <div className='place-card__mark'>
                  <span>Premium</span>
                </div>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <Link to={PageRoutes.OFFER}>
                    <img className='place-card__image' src='../../../markup/img/apartment-03.jpg' width='260' height='200' alt='Place image'/>
                  </Link >
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;180</b>
                      <span className='place-card__price-text'>&#47;&nbsp;night</span>
                    </div>
                    <button className='place-card__bookmark-button button' type='button'>
                      <svg className='place-card__bookmark-icon' width='18' height='19'>
                        <use xlinkHref='#icon-bookmark'></use>
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{width: '100%'}}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <Link to={PageRoutes.OFFER}>Nice, cozy, warm big bed apartment</Link >
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
