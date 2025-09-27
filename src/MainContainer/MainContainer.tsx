import type {FC} from 'react';
import {MainPage} from '../Pages/MainPage/MainPage.tsx';
// import {FavoritesPage} from '../Pages/FavoritesPage/FavoritesPage.tsx';
// import {LoginPage} from '../Pages/LoginPage/LoginPage.tsx';
// import {OfferPage} from '../Pages/OfferPage/OfferPage.tsx';

interface MainContainerProps {
  offersCount: number;
}

export const MainContainer: FC<MainContainerProps> = ({offersCount}) => (
  <MainPage offersCount={offersCount}></MainPage>
);
