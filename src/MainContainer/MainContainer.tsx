import type {FC} from 'react';
import {MainPage} from '../Pages/MainPage/MainPage.tsx';
import {FavoritesPage} from '../Pages/FavoritesPage/FavoritesPage.tsx';
import {LoginPage} from '../Pages/LoginPage/LoginPage.tsx';
import {OfferPage} from '../Pages/OfferPage/OfferPage.tsx';
import {Routes, Route} from 'react-router-dom';
import {ErrorPage} from '../Pages/ErrorPage/ErrorPage.tsx';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute.tsx';
import {PageRoutes} from '../constants/PageRoutes/PageRoutes.ts';
import {Offer} from '../types/offerTypes/offer.ts';
import {Review} from '../types/offerTypes/review.ts';

interface MainContainerProps {
  offersCount: number;
  isAuthorized: boolean;
  favorites: number[];
  offers: Offer[];
  setIsAuthorized: (isAuthorized: boolean) => void;
  reviews: Review[];
}

export const MainContainer: FC<MainContainerProps> = ({offersCount, isAuthorized, setIsAuthorized, offers, favorites, reviews}) => (
  <Routes>
    <Route path={PageRoutes.MAIN} element={
      <MainPage
        offersCount={offersCount}
        offers={offers}
        isAuthorized={isAuthorized}
        favoritesCount={favorites.length}
        setIsAuthorized={setIsAuthorized}
      />
    }
    />
    <Route path={PageRoutes.LOGIN} element={<LoginPage setIsAuthorized={setIsAuthorized}/>}/>
    <Route
      path={PageRoutes.FAVORITES}
      element={
        <PrivateRoute isAuthorized={isAuthorized} redirectPath={PageRoutes.LOGIN}>
          <FavoritesPage offers={offers} favorites={favorites} setIsAuthorized={setIsAuthorized} isAuthorized={isAuthorized}/>
        </PrivateRoute>
      }
    />
    <Route path={PageRoutes.OFFER} element={<OfferPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} offer={offers[0]} reviews={reviews}/>}/>
    <Route path={PageRoutes.NOT_FOUND} element={<ErrorPage/>}/>
  </Routes>
);
