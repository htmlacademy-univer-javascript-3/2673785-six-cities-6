import type {FC} from 'react';
import {Cities} from '../../components/Cities/Cities.tsx';
import {MainHeader} from '../../components/MainHeader/MainHeader.tsx';
import {CityPlaces} from '../../components/CityPlaces/CityPlaces.tsx';
import {useAppSelector} from '../../hooks/redux.ts';
import {
  selectCurrentCity,
  selectOffersByCurrentCity,
  selectOffersError,
  selectOffersLoading
} from '../../selectors/selectors.ts';
import {EmptyMainPage} from './EmptyMainPage.tsx';
import {Spinner} from '../../components/Spinner/Spinner.tsx';

interface MainPageProps {
}

export const MainPage: FC<MainPageProps> = () => {
  const offers = useAppSelector(selectOffersByCurrentCity);
  const isLoading = useAppSelector(selectOffersLoading);
  const isError = useAppSelector(selectOffersError);
  const city = useAppSelector(selectCurrentCity);

  if (isLoading) {
    return (
      <div className="page page--gray page--main">
        <MainHeader/>
        <main className="page__main page__main--index">
          <Cities/>
          <div className="cities">
            <div className="cities__places-container container">
              <Spinner/>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return <EmptyMainPage city={city} type={'error'}/>;
  }

  if (offers.length === 0) {
    return <EmptyMainPage city={city} type={'empty'}/>;
  }

  return (
    <div className='page page--gray page--main'>
      <MainHeader/>

      <main className='page__main page__main--index'>
        <Cities/>
        <div className='cities'>
          <CityPlaces/>
        </div>
      </main>
    </div>
  );
};
