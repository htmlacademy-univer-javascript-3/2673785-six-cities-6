import type {FC} from 'react';
import {MainPage} from '../Pages/MainPage/MainPage.tsx';
import {FavoritesPage} from '../Pages/FavoritesPage/FavoritesPage.tsx';
import {LoginPage} from '../Pages/LoginPage/LoginPage.tsx';
import {OfferPage} from '../Pages/OfferPage/OfferPage.tsx';
import {Routes, Route} from 'react-router-dom';
import {ErrorPage} from '../Pages/ErrorPage/ErrorPage.tsx';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute.tsx';
import {PageRoutes} from '../constants/PageRoutes/PageRoutes.ts';

interface MainContainerProps {
  offersCount: number;
  isAuthorized: boolean;
}

export const MainContainer: FC<MainContainerProps> = ({offersCount, isAuthorized}) => (
  <Routes>
    <Route path={PageRoutes.MAIN} element={<MainPage offersCount={offersCount}/>}/>
    <Route path={PageRoutes.LOGIN} element={<LoginPage/>}/>
    <Route
      path={PageRoutes.FAVORITES}
      element={
        <PrivateRoute isAuthorized={isAuthorized} redirectPath={PageRoutes.LOGIN}>
          <FavoritesPage/>
        </PrivateRoute>
      }
    />
    <Route path={PageRoutes.OFFER} element={<OfferPage/>}/>
    <Route path={PageRoutes.DEFAULT} element={<ErrorPage/>}/>
  </Routes>
);
