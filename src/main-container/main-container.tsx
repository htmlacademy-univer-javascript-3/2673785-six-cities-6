import type {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import {MainPage} from '../pages/main-page/main-page.tsx';
import {FavoritesPage} from '../pages/favorites-page/favorites-page.tsx';
import {LoginPage} from '../pages/login-page/login-page.tsx';
import {OfferPage} from '../pages/offer-page/offer-page.tsx';
import {ErrorPage} from '../pages/error-page/error-page.tsx';
import {PrivateRoute} from '../components/private-route/private-route.tsx';
import {PageRoutes} from '../constants/page-routes/page-routes.ts';

export const MainContainer: FC = () => (
  <Routes>
    <Route path={PageRoutes.MAIN} element={<MainPage/>}/>
    <Route path={PageRoutes.LOGIN} element={<LoginPage />}/>
    <Route
      path={PageRoutes.FAVORITES}
      element={
        <PrivateRoute redirectPath={PageRoutes.LOGIN}>
          <FavoritesPage />
        </PrivateRoute>
      }
    />
    <Route path={`${PageRoutes.OFFER}/:id`} element={<OfferPage />}/>
    <Route path={PageRoutes.NOT_FOUND} element={<ErrorPage/>}/>
  </Routes>
);
