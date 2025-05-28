import { Deal } from './types';

export const deals: Deal[] = [
  {
    id: 'deal1',
    title: 'Lahore to Islamabad: Special Offer',
    description: 'Book your Lahore to Islamabad journey and get 20% off on premium seats.',
    image: require('../../assets/Buses/Daewoo-Express.jpg'),
    discount: '20%',
    expiry: '2025-08-31',
    code: 'LHR2ISB20'
  },
  {
    id: 'deal2',
    title: 'Karachi Express: Early Booking',
    description: 'Book your Karachi trip 14 days in advance and save 15% on all seats.',
    image: require('../../assets/Buses/Yutong-Master-Nova.jpg'),
    discount: '15%',
    expiry: '2025-12-31',
    code: 'KHIBOOKEARLY'
  },
  {
    id: 'deal3',
    title: 'Family Travel Package',
    description: 'Book for 4 or more people and children under 12 travel free.',
    image: require('../../assets/Buses/1.jpg'),
    discount: 'Kids Free',
    expiry: '2025-09-30',
    code: 'FAMILYPK'
  },
  {
    id: 'deal4',
    title: 'Last Minute: Multan to Islamabad',
    description: '25% off all tickets from Multan to Islamabad for next-day travel.',
    image: require('../../assets/Buses/Pakistan-to-China-Bus-Service-by-NATCO-Express.webp'),
    discount: '25%',
    expiry: '2025-07-15',
    code: 'MTNISB25'
  }
];
