import {Offers} from '../Offers/Offers.tsx';
import {Map} from '../Map/Map.tsx';
import {FC, useState} from 'react';
import {City, Point, Points} from '../../types/types.ts';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers} from '../../selectors/selectors.ts';

export const CityPlaces: FC = () => {
  const offers = useAppSelector(selectAllOffers);

  const city: City = offers.length > 0 ? {
    title: offers[0].city.name,
    lat: offers[0].city.location.latitude,
    lng: offers[0].city.location.longitude,
    zoom: 10,
  } : {
    title: 'Amsterdam',
    lat: 52.3740300,
    lng: 4.8896900,
    zoom: 10,
  };

  const points: Points = offers.length > 0 ? offers.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  })) : [];

  const [selectedPoint] = useState<Point>(points[0]);
  return (
    <div className='cities__places-container container'>
      <Offers/>
      <div className='cities__right-section'>
        <section className='cities__map map'>
          <Map city={city} selectedPoint={selectedPoint} points={points}/>
        </section>
      </div>
    </div>
  );
};
