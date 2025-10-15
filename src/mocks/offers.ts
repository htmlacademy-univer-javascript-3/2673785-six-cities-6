import {Offer} from '../types/offerTypes/offer.ts';

export const mockOffers: Offer[] = [
  {
    id: 1,
    isPremium: true,
    title: 'Beautiful apartment in city center',
    price: 120,
    rating: 4,
    isFavorite: true,
    shortDescription: 'Modern apartment with great view',
    description: 'This beautiful apartment is located in the heart of the city, just steps away from main attractions. Recently renovated with modern furniture and all necessary amenities.',
    type: 'Apartment',
    bedrooms: 2,
    maxGuests: 4,
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Cabel TV', 'Washing machine'],
    host: {
      id: 101,
      name: 'John Smith',
      avatar: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'apartment-01.jpg',
    ],
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    reviewIds: [1001, 1002],
  },
  {
    id: 2,
    isPremium: false,
    title: 'Cozy room near central station',
    price: 65,
    rating: 3,
    isFavorite: false,
    shortDescription: 'Comfortable room in shared apartment',
    description: 'A cozy private room in a shared apartment located just 5 minutes walk from central station. Perfect for solo travelers or couples.',
    type: 'Room',
    bedrooms: 1,
    maxGuests: 2,
    amenities: ['Wi-Fi', 'Kitchen', 'Cabel TV', 'Heating'],
    host: {
      id: 102,
      name: 'Maria Garcia',
      avatar: 'img/avatar-max.jpg',
      isPro: false
    },
    images: [
      'room.jpg',
    ],
    city: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    },
    reviewIds: [1003]
  },
  {
    id: 3,
    isPremium: true,
    title: 'Luxury hotel with pool',
    price: 200,
    rating: 5,
    isFavorite: true,
    shortDescription: '5-star hotel experience',
    description: 'Experience luxury in our 5-star hotel featuring a swimming pool, gym, and premium services. Perfect for business trips and romantic getaways.',
    type: 'Hotel',
    bedrooms: 1,
    maxGuests: 2,
    amenities: ['Wi-Fi', 'Air conditioning', 'Cabel TV', 'Pool', 'Gym'],
    host: {
      id: 103,
      name: 'Hotel Grand',
      avatar: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'apartment-02.jpg'
    ],
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    reviewIds: [1004, 1005],
  },
  {
    id: 4,
    isPremium: false,
    title: 'Spacious family house with garden',
    price: 180,
    rating: 4,
    isFavorite: false,
    shortDescription: 'Perfect for family vacations',
    description: 'A spacious family house with private garden, located in a quiet neighborhood. Ideal for families or groups looking for comfort and privacy.',
    type: 'House',
    bedrooms: 3,
    maxGuests: 6,
    amenities: ['Wi-Fi', 'Kitchen', 'Cabel TV', 'Washing machine', 'Heating'],
    host: {
      id: 104,
      name: 'Robert Taylor',
      avatar: 'img/avatar-max.jpg',
      isPro: true
    },
    images: [
      'apartment-03.jpg'
    ],
    city: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    reviewIds: [1006],
  }
];
