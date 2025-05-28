export interface Destination {
  id: string;
  name: string;
  image: any;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  currency: string;
  tags: string[];
  isFeatured?: boolean;
  distance?: string;
}

export interface Tour {
  id: string;
  name: string;
  image: any;
  description: string;
  duration: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  location: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface Attraction {
  id: string;
  name: string;
  image: any;
  description: string;
  rating: number;
  reviews: number;
  price: number | null;
  currency: string;
  location: string;
  openingHours: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: any;
  discount: string;
  expiry: string;
  code: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface TravelOption {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  type: 'bus' | 'train' | 'ferry';
  company: string;
  duration: string;
  availableSeats: number;
  rating: number;
}

export interface RecentSearch {
  id: string;
  from: string;
  to: string;
  date: string;
}
