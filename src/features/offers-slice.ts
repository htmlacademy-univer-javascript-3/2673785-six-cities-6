import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityType, Offer} from '../types/offer-types/offer.ts';
import {fetchOffers} from './offers-thunks.ts';
import {toggleFavorite as toggleFavoriteThunk} from './favorites-thunks.ts';

interface OffersState {
  city: CityType;
  offers: Offer[];
  selectedOffer: Offer | null;
  isLoading: boolean;
  error: string | null;
  favorites: Offer[];
  favoritesLoading: boolean;
  favoritesError: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  selectedOffer: null,
  isLoading: false,
  error: null,
  favorites: [],
  favoritesLoading: false,
  favoritesError: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityType>) => {
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
    setFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;

      state.offers.forEach((offer) => {
        offer.isFavorite = action.payload.some((fav) => fav.id === offer.id);
      });
    },
    updateOfferInFavorites: (state, action: PayloadAction<Offer>) => {
      const updatedOffer = action.payload;
      const index = state.favorites.findIndex((fav) => fav.id === updatedOffer.id);

      if (updatedOffer.isFavorite && index === -1) {
        state.favorites.push(updatedOffer);
      } else if (!updatedOffer.isFavorite && index !== -1) {
        state.favorites.splice(index, 1);
      } else if (index !== -1) {
        state.favorites[index] = updatedOffer;
      }

      const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
      }

      if (state.selectedOffer?.id === updatedOffer.id) {
        state.selectedOffer.isFavorite = updatedOffer.isFavorite;
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
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
      })
      .addCase(toggleFavoriteThunk.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        const {offerId, isFavorite, offer} = action.payload;

        const offerIndex = state.offers.findIndex((off) => off.id === offerId);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = isFavorite;
        }

        if (state.selectedOffer?.id === offerId) {
          state.selectedOffer.isFavorite = isFavorite;
        }

        const favIndex = state.favorites.findIndex((fav) => fav.id === offerId);
        if (isFavorite && favIndex === -1) {
          state.favorites.push(offer);
        } else if (!isFavorite && favIndex !== -1) {
          state.favorites.splice(favIndex, 1);
        } else if (favIndex !== -1) {
          state.favorites[favIndex] = offer;
        }
      })
      .addCase(toggleFavoriteThunk.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload || 'Failed to toggle favorite';
      });
  },
});

export const {
  setCity,
  setOffers,
  setOffer,
  toggleFavorite,
  setFavorites,
  updateOfferInFavorites,
  clearFavorites,
  clearError
} = offersSlice.actions;
export default offersSlice.reducer;
