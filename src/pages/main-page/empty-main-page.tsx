import {FC} from 'react';
import {MainHeader} from '../../components/main-header/main-header.tsx';
import {Cities} from '../../components/cities/cities.tsx';
import {CityType} from '../../types/offer-types/offer.ts';

type EmptyPageType = 'empty' | 'error';

interface EmptyMainPageProps {
  city: CityType;
  type: EmptyPageType;
}

export const EmptyMainPage: FC<EmptyMainPageProps> = ({city, type}) => {
  const message = type === 'empty'
    ? `We could not find any property available at the moment in ${city}`
    : 'Error occurred while loading offers';

  return (
    <div className='page page--gray page--main'>
      <MainHeader/>

      <main className='page__main page__main--index page__main--index-empty'>
        <h1 className='visually-hidden'>Cities</h1>
        <Cities/>

        <div className='cities'>
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>
                  {message}
                </p>
              </div>
            </section>
            <div className='cities__right-section'></div>
          </div>
        </div>
      </main>
    </div>
  );
};

