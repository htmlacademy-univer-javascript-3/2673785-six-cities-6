import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App/App.tsx';
import {mockOffers} from './mocks/offers.ts';
import {mockFavorites} from './mocks/favorites.ts';
import {mockReviews} from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={''}>
      <App offers={mockOffers} favorites={mockFavorites} reviews={mockReviews}/>
    </BrowserRouter>
  </React.StrictMode>
);
