import type {FC} from 'react';
import {MainPage} from '../Pages/MainPage/MainPage.tsx';
import {FavoritesPage} from '../Pages/FavoritesPage/FavoritesPage.tsx';
import {LoginPage} from '../Pages/LoginPage/LoginPage.tsx';
import {OfferPage} from '../Pages/OfferPage/OfferPage.tsx';
import {Routes, Route} from 'react-router-dom';
import {ErrorPage} from '../Pages/ErrorPage/ErrorPage.tsx';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute.tsx';
import {PageRoutes} from '../constants/PageRoutes/PageRoutes.ts';
import {Review} from '../types/offerTypes/review.ts';

interface MainContainerProps {
  reviews: Review[];
}

export const MainContainer: FC<MainContainerProps> = ({reviews}) => (
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
    <Route path={`${PageRoutes.OFFER}/:id`} element={<OfferPage reviews={reviews}/>}/>
    <Route path={PageRoutes.NOT_FOUND} element={<ErrorPage/>}/>
  </Routes>
);
