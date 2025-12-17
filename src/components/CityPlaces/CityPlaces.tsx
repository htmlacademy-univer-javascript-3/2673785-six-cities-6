import {Offers} from '../Offers/Offers.tsx';
import {Map} from '../Map/Map.tsx';
import {FC, useCallback, useMemo, useState} from 'react';
import {Points} from '../../types/types.ts';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAllOffers, selectCurrentCity} from '../../selectors/selectors.ts';
import {City} from '../../types/offerTypes/offer.ts';
import {CITY_COORDINATES} from '../../constants/constants.ts';

export const CityPlaces: FC = () => {
  const offers = useAppSelector(selectAllOffers);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const cityName = useAppSelector(selectCurrentCity);

  const city: City = useMemo(() => {
    const cityCoordinates = CITY_COORDINATES[cityName];

    return {
      name: cityName,
      location: {
        latitude: cityCoordinates.lat,
        longitude: cityCoordinates.lng,
        zoom: cityCoordinates.zoom,
      }
    };
  }, [cityName]);

  const points: Points = useMemo(() => (
    offers.map((offer) => ({
      offerId: offer.id,
      title: offer.title,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
    }))
  ), [offers]);
  const selectedPoint = useMemo(
    () =>
      selectedOfferId ? points.find((point) => point.offerId === selectedOfferId) : undefined,
    [selectedOfferId, points]
  );

  const handleMouseEnter = useCallback((offerId: string) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSelectedOfferId(null);
  }, []);

  return (
    <div className='cities__places-container container'>
      <Offers onOfferMouseEnter={handleMouseEnter} onOfferMouseLeave={handleMouseLeave}/>
      <div className='cities__right-section'>
        <section className='cities__map map'>
          <Map
            city={city}
            selectedPoint={selectedPoint}
            points={points}
            selectedOfferId={selectedOfferId}
            width={'512px'}
            height={'607px'}
          />
        </section>
      </div>
    </div>
  );
};
