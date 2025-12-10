import {FC, memo, MouseEvent, useCallback, useMemo} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setCity } from '../../features/offersSlice.ts';
import { CITIES } from '../../constants/constants.ts';
import { selectCurrentCity } from '../../selectors/selectors.ts';
import {CityType} from '../../types/offerTypes/offer.ts';

export const CitiesComponent: FC = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);

  const handleOnCityClick = useCallback((city: CityType) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setCity(city));
  }, [dispatch]);

  const cities = useMemo(() => CITIES.map((city) => (
    <li className='locations__item' key={city}>
      <a
        className={`locations__item-link tabs__item ${
          city === currentCity ? 'tabs__item--active' : ''
        }`}
        onClick={handleOnCityClick(city)}
      >
        <span>{city}</span>
      </a>
    </li>
  )), [currentCity, handleOnCityClick]);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className='tabs'>
        <section className='locations container'>
          <ul className='locations__list tabs__list'>
            {cities}
          </ul>
        </section>
      </div>
    </>
  );
};

export const Cities = memo(CitiesComponent);
