import { Attraction } from './types';

export const attractions: Attraction[] = [
  {
    id: 'attr1',
    name: 'Eiffel Tower',
    image: require('../../assets/firstLocation.png'),
    description: 'The iconic iron tower on the Champ de Mars, one of the world\'s most recognizable landmarks.',
    rating: 4.7,
    reviews: 1842,
    price: 25,
    currency: 'EUR',
    location: 'Paris, France',
    openingHours: '9:00 AM - 11:45 PM',
    tags: ['Landmark', 'Views', 'Historic'],
    isFeatured: true
  },
  {
    id: 'attr2',
    name: 'Uluwatu Temple',
    image: require('../../assets/lcoationLogo.png'),
    description: 'Ancient sea temple perched on a cliff with spectacular sunset views and traditional Kecak performances.',
    rating: 4.8,
    reviews: 754,
    price: 10,
    currency: 'USD',
    location: 'Bali, Indonesia',
    openingHours: '9:00 AM - 7:00 PM',
    tags: ['Temple', 'Sunset', 'Culture'],
    isFeatured: true
  },
  {
    id: 'attr3',
    name: 'Tokyo Skytree',
    image: require('../../assets/firstLocation.png'),
    description: 'The tallest tower in Japan offering panoramic views of Tokyo from its observation decks.',
    rating: 4.6,
    reviews: 967,
    price: 20,
    currency: 'USD',
    location: 'Tokyo, Japan',
    openingHours: '10:00 AM - 9:00 PM',
    tags: ['Tower', 'Views', 'Modern'],
    isFeatured: true
  },
  {
    id: 'attr4',
    name: 'Central Park',
    image: require('../../assets/lcoationLogo.png'),
    description: 'Vast urban park in the heart of Manhattan offering recreational activities and scenic beauty.',
    rating: 4.8,
    reviews: 1254,
    price: null,
    currency: 'USD',
    location: 'New York, USA',
    openingHours: '6:00 AM - 1:00 AM',
    tags: ['Park', 'Nature', 'Recreation'],
    isFeatured: false
  },
  {
    id: 'attr5',
    name: 'Oia Village',
    image: require('../../assets/firstLocation.png'),
    description: 'Famous for its stunning sunset views, white-washed buildings, and blue-domed churches.',
    rating: 4.9,
    reviews: 1065,
    price: null,
    currency: 'EUR',
    location: 'Santorini, Greece',
    openingHours: 'Open 24 hours',
    tags: ['Village', 'Scenic', 'Photography'],
    isFeatured: false
  }
];

export const featuredAttractions = attractions.filter(
  attraction => attraction.isFeatured
);
