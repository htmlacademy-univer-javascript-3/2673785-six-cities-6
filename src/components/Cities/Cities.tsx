import {FC, MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks/redux.ts';
import {setCity} from '../../actions/actions.ts';
import {CITIES} from '../../constants/constants.ts';

export const Cities: FC = () => {
  const dispatch = useAppDispatch();

  const handleOnCityClick = (city: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setCity(city));
  };

  const cities = CITIES.map((city) => (
    <li className='locations__item' key={city}>
      <a className='locations__item-link tabs__item' onClick={handleOnCityClick(city)}>
        <span>{city}</span>
      </a>
    </li>
  ));

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cities}
        </ul>
      </section>
    </div>
  );
};
