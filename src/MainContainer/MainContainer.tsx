import type {FC} from 'react';
import {MainPage} from '../Pages/MainPage/MainPage.tsx';
import {FavoritesPage} from '../Pages/FavoritesPage/FavoritesPage.tsx';
import {LoginPage} from '../Pages/LoginPage/LoginPage.tsx';
import {OfferPage} from '../Pages/OfferPage/OfferPage.tsx';
import {Routes, Route} from 'react-router-dom';
import {ErrorPage} from '../Pages/ErrorPage/ErrorPage.tsx';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute.tsx';

interface MainContainerProps {
  offersCount: number;
  isAuthorized: boolean;
}

export const MainContainer: FC<MainContainerProps> = ({offersCount, isAuthorized}) => (
  <Routes>
    <Route path='/' element={<MainPage offersCount={offersCount}/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route
      path='/favorites'
      element={
        <PrivateRoute isAuthorized={isAuthorized} redirectPath={'/login'}>
          <FavoritesPage/>
        </PrivateRoute>
      }
    />
    <Route path='/offer/:id' element={<OfferPage/>}/>
    <Route path='*' element={<ErrorPage/>}/>
  </Routes>
);
