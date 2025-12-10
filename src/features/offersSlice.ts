import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offerTypes/offer.ts';
import { fetchOffers } from './offersThunks';

interface OffersState {
  city: string;
  offers: Offer[];
  selectedOffer: Offer | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  selectedOffer: null,
  isLoading: false,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setOffer: (state, action: PayloadAction<Offer>) => {
      state.selectedOffer = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const offerId = action.payload;
      const offer = state.offers.find((off) => off.id === offerId);

      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch offers';
      });
  },
});

export const { setCity, setOffers, setOffer, toggleFavorite, clearError } = offersSlice.actions;
export default offersSlice.reducer;
