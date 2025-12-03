import { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setCity } from '../../features/offersSlice.ts';
import { CITIES } from '../../constants/constants.ts';
import { selectCurrentCity } from '../../selectors/selectors.ts';

export const Cities: FC = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);

  const handleOnCityClick = (city: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setCity(city));
  };

  const cities = CITIES.map((city) => (
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
  ));

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
