import { Offer } from '../../types/offer-types/offer.ts';

export type SortType = 'priceLowToHigh' | 'priceHighToLow' | 'topRatedFirst' | 'popular';

export const SortTypeToTitle: Record<SortType, string> = {
  priceHighToLow: 'Price: high to low',
  priceLowToHigh: 'Price: low to high',
  topRatedFirst: 'Top rated first',
  popular: 'Popular',
};

export const getSortedOffers = (sortType: SortType, offers: Offer[]) => {
  const offersCopy = [...offers];

  switch (sortType) {
    case 'priceLowToHigh':
      return offersCopy.sort((a, b) => a.price - b.price);

    case 'priceHighToLow':
      return offersCopy.sort((a, b) => b.price - a.price);

    case 'topRatedFirst':
      return offersCopy.sort((a, b) => b.rating - a.rating);

    case 'popular':
      return offersCopy;

    default:
      return offersCopy;
  }
};
