import {FC, memo} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {MainHeaderUserPart} from './MainHeaderUserPart.tsx';

export const MainHeaderComponent: FC = () => (
  <header className='header'>
    <div className='container'>
      <div className='header__wrapper'>
        <div className='header__left'>
          <Link to={PageRoutes.MAIN} className='header__logo-link header__logo-link--active'>
            <img className='header__logo' src='../../../markup/img/logo.svg' alt='6 cities logo' width='81' height='41'/>
          </Link>
        </div>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <MainHeaderUserPart />
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export const MainHeader = memo(MainHeaderComponent);
