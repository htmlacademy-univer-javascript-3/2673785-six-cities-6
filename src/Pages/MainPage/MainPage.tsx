import type {FC} from 'react';
import {Cities} from '../../components/Cities/Cities.tsx';
import {MainHeader} from '../../components/MainHeader/MainHeader.tsx';
import {CityPlaces} from '../../components/CityPlaces/CityPlaces.tsx';

interface MainPageProps {
}

export const MainPage: FC<MainPageProps> = () => (
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
