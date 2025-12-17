import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/page-routes/page-routes.ts';

export const LoginPageHeader: FC = () => (
  <header className='header'>
    <div className='container'>
      <div className='header__wrapper'>
        <div className='header__left'>
          <Link to={PageRoutes.MAIN} className='header__logo-link'>
            <img
              className='header__logo' src='../../../markup/img/logo.svg' alt='6 cities logo' width='81'
              height='41'
            />
          </Link>
        </div>
      </div>
    </div>
  </header>
);
