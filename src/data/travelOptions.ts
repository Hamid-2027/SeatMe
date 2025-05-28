import { TravelOption } from './types';

export const travelOptions: TravelOption[] = [
  {
    id: 'travel1',
    from: 'Jakarta',
    to: 'Bali',
    date: '2025-06-15',
    time: '08:00',
    price: 45,
    currency: 'USD',
    type: 'bus',
    company: 'Indonesia Express',
    duration: '12h 30m',
    availableSeats: 23,
    rating: 4.6
  },
  {
    id: 'travel2',
    from: 'Bangkok',
    to: 'Chiang Mai',
    date: '2025-06-16',
    time: '09:30',
    price: 35,
    currency: 'USD',
    type: 'bus',
    company: 'Thai Tourist',
    duration: '10h 15m',
    availableSeats: 15,
    rating: 4.7
  },
  {
    id: 'travel3',
    from: 'Athens',
    to: 'Santorini',
    date: '2025-06-20',
    time: '07:45',
    price: 65,
    currency: 'USD',
    type: 'ferry',
    company: 'Greek Seas',
    duration: '5h 30m',
    availableSeats: 42,
    rating: 4.8
  },
  {
    id: 'travel4',
    from: 'Tokyo',
    to: 'Kyoto',
    date: '2025-06-25',
    time: '10:15',
    price: 110,
    currency: 'USD',
    type: 'train',
    company: 'Japan Rail',
    duration: '2h 15m',
    availableSeats: 64,
    rating: 4.9
  },
  {
    id: 'travel5',
    from: 'Paris',
    to: 'Nice',
    date: '2025-07-01',
    time: '08:30',
    price: 85,
    currency: 'USD',
    type: 'train',
    company: 'French Railways',
    duration: '5h 45m',
    availableSeats: 37,
    rating: 4.5
  }
];

export const recentSearches: TravelOption[] = [
  travelOptions[0],
  travelOptions[3]
];
