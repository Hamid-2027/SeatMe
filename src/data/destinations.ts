import { Destination } from './types';

// Using bus company images from Pakistan for the destinations
export const destinations: Destination[] = [
  {
    id: 'dest1',
    name: 'Daewoo Express',
    image: require('../../assets/Buses/Daewoo-Express.jpg'),
    description: 'Premier bus service in Pakistan with luxury coaches, WiFi, and refreshments.',
    rating: 4.8,
    reviews: 1243,
    location: 'Lahore',
    price: 2500,
    currency: 'PKR',
    tags: ['Luxury', 'WiFi', 'Air Conditioned'],
    isFeatured: true,
    distance: '375 km'
  },
  {
    id: 'dest2',
    name: 'Faisal Movers',
    image: require('../../assets/Buses/Yutong-Master-Nova.jpg'),
    description: 'One of Pakistan\'s largest transport network with premium bus services and comfortable seating.',
    rating: 4.7,
    reviews: 2189,
    location: 'Islamabad',
    price: 2200,
    currency: 'PKR',
    tags: ['Premium', 'Entertainment', 'Snacks'],
    isFeatured: true,
    distance: '180 km'
  },
  {
    id: 'dest3',
    name: 'NATCO Express',
    image: require('../../assets/Buses/1.jpg'),
    description: 'Government-operated bus service known for international routes including Pakistan to China service.',
    rating: 4.5,
    reviews: 1276,
    location: 'Gilgit',
    price: 3200,
    currency: 'PKR',
    tags: ['International', 'Mountain Routes', 'Scenic'],
    isFeatured: true,
    distance: '520 km'
  },
  {
    id: 'dest4',
    name: 'Bilal Travels',
    image: require('../../assets/Buses/1.jpg'),
    description: 'Reliable bus service connecting major cities in Pakistan with comfortable seating and amenities.',
    rating: 4.3,
    reviews: 982,
    location: 'Karachi',
    price: 2800,
    currency: 'PKR',
    tags: ['Economical', 'Fast', 'City Connections'],
    isFeatured: true,
    distance: '1,200 km'
  },
  {
    id: 'dest5',
    name: 'Skyways',
    image: require('../../assets/Buses/images.jpeg'),
    description: 'Modern fleet of buses with excellent customer service and punctual departures across Pakistan.',
    rating: 4.4,
    reviews: 1567,
    location: 'Multan',
    price: 1800,
    currency: 'PKR',
    tags: ['On-time', 'Clean', 'Comfortable'],
    isFeatured: true,
    distance: '350 km'
  }
];

export const featuredDestinations = destinations.filter(
  destination => destination.isFeatured
);
