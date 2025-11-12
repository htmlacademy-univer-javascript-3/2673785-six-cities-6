import {Offer} from '../types/offerTypes/offer.ts';
import {createAction} from '@reduxjs/toolkit';

export const setCity = createAction<string>('SET_CITY');

export const setOffers = createAction<Offer[]>('SET_OFFERS');
