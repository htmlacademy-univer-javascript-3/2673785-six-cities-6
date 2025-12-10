import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {MainHeader} from '../../components/MainHeader/MainHeader.tsx';
import {FavoritesByCity} from './FavoritesByCity.tsx';

export const FavoritesPage: FC = () => (
  <div className='page'>
    <MainHeader/>

    <FavoritesByCity/>

    <footer className='footer container'>
      <Link to={PageRoutes.MAIN} className='footer__logo-link'>
        <img className='footer__logo' src='../../../markup/img/logo.svg' alt='6 cities logo' width='64' height='33'/>
      </Link>
    </footer>
  </div>
);
