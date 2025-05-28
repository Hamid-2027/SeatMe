import { Tour } from './types';

export const tours: Tour[] = [
  {
    id: 'tour1',
    name: 'Bali Cultural Tour',
    image: require('../../assets/Buses/1.jpg'),
    description: 'Explore the rich cultural heritage of Bali with visits to ancient temples and traditional villages.',
    duration: '1 day',
    rating: 4.7,
    reviews: 328,
    price: 21000,
    currency: 'PKR',
    location: 'Bali, Indonesia',
    tags: ['Culture', 'Temples', 'Local Experience'],
    isFeatured: true
  },
  {
    id: 'tour2',
    name: 'Paris City Highlights',
    image: require('../../assets/Buses/Daewoo-Express.jpg'),
    description: 'See the best of Paris in one day, including the Eiffel Tower, Louvre Museum, and Notre Dame.',
    duration: '8 hours',
    rating: 4.8,
    reviews: 542,
    price: 25200,
    currency: 'PKR',
    location: 'Paris, France',
    tags: ['City', 'Landmarks', 'Art'],
    isFeatured: true
  },
  {
    id: 'tour3',
    name: 'Santorini Sunset Cruise',
    image: require('../../assets/Buses/Yutong-Master-Nova.jpg'),
    description: 'Sail around Santorini on a luxury catamaran and enjoy the world-famous sunset from the water.',
    duration: '5 hours',
    rating: 4.9,
    reviews: 217,
    price: 30800,
    currency: 'PKR',
    location: 'Santorini, Greece',
    tags: ['Cruise', 'Sunset', 'Luxury'],
    isFeatured: true
  },
  {
    id: 'tour4',
    name: 'Tokyo Food Tour',
    image: require('../../assets/Buses/Pakistan-to-China-Bus-Service-by-NATCO-Express.webp'),
    description: 'Sample the best of Tokyo\'s cuisine with a local guide, from street food to fine dining.',
    duration: '4 hours',
    rating: 4.8,
    reviews: 189,
    price: 23800,
    currency: 'PKR',
    location: 'Tokyo, Japan',
    tags: ['Food', 'Local Experience', 'Walking'],
    isFeatured: false
  },
  {
    id: 'tour5',
    name: 'New York Broadway Experience',
    image: require('../../assets/Buses/images.jpeg'),
    description: 'Enjoy a Broadway show and behind-the-scenes tour of New York\'s theater district.',
    duration: '6 hours',
    rating: 4.6,
    reviews: 312,
    price: 42000,
    currency: 'PKR',
    location: 'New York, USA',
    tags: ['Entertainment', 'Arts', 'City'],
    isFeatured: false
  }
];

export const featuredTours = tours.filter(
  tour => tour.isFeatured
);
