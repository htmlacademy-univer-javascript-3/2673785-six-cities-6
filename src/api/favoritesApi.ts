import { api } from '../store/store.ts';
import { Offer } from '../types/offerTypes/offer.ts';

export const favoritesApi = {
  async getFavorites(): Promise<Offer[]> {
    const response = await api.get<Offer[]>('/favorite');
    return response.data;
  },

  async addToFavorites(offerId: string): Promise<Offer> {
    const response = await api.post<Offer>(`/favorite/${offerId}/1`);
    return response.data;
  },

  async removeFromFavorites(offerId: string): Promise<Offer> {
    const response = await api.post<Offer>(`/favorite/${offerId}/0`);
    return response.data;
  },

  async toggleFavorite(offerId: string, isFavorite: boolean): Promise<Offer> {
    const status = isFavorite ? 0 : 1;
    const response = await api.post<Offer>(`/favorite/${offerId}/${status}`);
    return response.data;
  }
};
