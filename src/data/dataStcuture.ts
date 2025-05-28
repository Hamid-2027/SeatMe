
  // =============================================
  // BUS COMPANY PROFILES
  // =============================================
  export interface BusCompany {
    id: string;
    name: string;
    logo: string;
    description: string;
    foundedYear: number;
    headquarters: string;
    contactInfo: {
      email: string;
      phone: string;
      website: string;
      socialMedia?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
      };
    };
    services: string[];
    fleetSize: number;
    routesCovered: string[];
    ratings: {
      overall: number; // Out of 5
      comfort: number;
      punctuality: number;
      cleanliness: number;
      staffBehavior: number;
      reviewCount: number;
    };
    certifications: string[];
    busTypes: string[];
  }

  export const busCompanies: BusCompany[] = [
    {
      id: 'company1',
      name: 'Daewoo Pakistan',
      logo: 'assets/images/companies/daewoo.png',
      description: 'Daewoo Express is Pakistan\'s first and largest business class bus service operator. Since its inception in 1999, the company has been providing safe, comfortable, and reliable transportation services across Pakistan.',
      foundedYear: 1999,
      headquarters: 'Lahore, Pakistan',
      contactInfo: {
        email: 'info@daewoo.com.pk',
        phone: '+92-42-111-007-008',
        website: 'www.daewoo.com.pk',
        socialMedia: {
          facebook: 'facebook.com/DaewooExpressPakistan',
          twitter: 'twitter.com/DaewooExpress',
          instagram: 'instagram.com/daewooexpress_official'
        }
      },
      services: [
        'Premium Bus Service',
        'Business Class Service',
        'Cargo Service',
        'Online Booking',
        'Home Delivery of Tickets',
        'Terminal Lounges'
      ],
      fleetSize: 120,
      routesCovered: ['Lahore-Islamabad', 'Lahore-Karachi', 'Islamabad-Peshawar', 'Karachi-Hyderabad'],
      ratings: {
        overall: 4.7,
        comfort: 4.8,
        punctuality: 4.6,
        cleanliness: 4.9,
        staffBehavior: 4.5,
        reviewCount: 12500
      },
      certifications: ['ISO 9001:2015', 'Pakistan Tourism Development Corporation Approved'],
      busTypes: ['Premium', 'Business', 'Standard']
    },
    {
      id: 'company2',
      name: 'Faisal Movers',
      logo: 'assets/images/companies/faisal.png',
      description: 'Faisal Movers is one of the leading transport companies in Pakistan, providing quality bus services since 2003. The company focuses on passenger comfort and safety.',
      foundedYear: 2003,
      headquarters: 'Lahore, Pakistan',
      contactInfo: {
        email: 'info@faisalmovers.com',
        phone: '+92-42-111-365-365',
        website: 'www.faisalmovers.com',
        socialMedia: {
          facebook: 'facebook.com/FaisalMovers',
          twitter: 'twitter.com/FaisalMovers'
        }
      },
      services: [
        'Business Class Service',
        'Standard Bus Service',
        'Cargo Service',
        'Online Booking',
        'Home Delivery of Tickets'
      ],
      fleetSize: 85,
      routesCovered: ['Lahore-Islamabad', 'Lahore-Faisalabad', 'Islamabad-Peshawar'],
      ratings: {
        overall: 4.3,
        comfort: 4.2,
        punctuality: 4.5,
        cleanliness: 4.4,
        staffBehavior: 4.1,
        reviewCount: 8750
      },
      certifications: ['Pakistan Tourism Development Corporation Approved'],
      busTypes: ['Business', 'Standard']
    },
    {
      id: 'company3',
      name: 'Skyways',
      logo: 'assets/images/companies/skyways.png',
      description: 'Skyways is a growing bus service provider in Pakistan, known for its economical fares and reliable service on various routes across the country.',
      foundedYear: 2010,
      headquarters: 'Rawalpindi, Pakistan',
      contactInfo: {
        email: 'info@skyways.pk',
        phone: '+92-51-111-759-759',
        website: 'www.skyways.pk',
        socialMedia: {
          facebook: 'facebook.com/SkywaysPK'
        }
      },
      services: [
        'Standard Bus Service',
        'Online Booking',
        'Cargo Delivery'
      ],
      fleetSize: 45,
      routesCovered: ['Islamabad-Peshawar', 'Rawalpindi-Lahore', 'Islamabad-Murree'],
      ratings: {
        overall: 3.9,
        comfort: 3.7,
        punctuality: 4.1,
        cleanliness: 3.8,
        staffBehavior: 4.0,
        reviewCount: 3200
      },
      certifications: [],
      busTypes: ['Standard']
    },
    {
      id: 'company4',
      name: 'Bilal Travels',
      logo: 'assets/images/companies/bilal.png',
      description: 'Bilal Travels specializes in luxury bus services between major cities in Pakistan, with a focus on premium amenities and exceptional customer service.',
      foundedYear: 2008,
      headquarters: 'Karachi, Pakistan',
      contactInfo: {
        email: 'info@bilaltravels.com.pk',
        phone: '+92-21-111-245-245',
        website: 'www.bilaltravels.com.pk',
        socialMedia: {
          facebook: 'facebook.com/BilalTravelsPK',
          instagram: 'instagram.com/bilaltravels_official'
        }
      },
      services: [
        'Premium Bus Service',
        'VIP Lounge Access',
        'Online Booking',
        'Refreshment Service',
        'WiFi on Board'
      ],
      fleetSize: 30,
      routesCovered: ['Karachi-Hyderabad', 'Karachi-Lahore', 'Karachi-Islamabad'],
      ratings: {
        overall: 4.6,
        comfort: 4.8,
        punctuality: 4.3,
        cleanliness: 4.7,
        staffBehavior: 4.6,
        reviewCount: 5800
      },
      certifications: ['ISO 9001:2015'],
      busTypes: ['Premium']
    },
    {
      id: 'company5',
      name: 'Kohistan Express',
      logo: 'assets/images/companies/kohistan.png',
      description: 'Kohistan Express provides reliable bus services across Pakistan with a focus on business class travel and passenger comfort at affordable rates.',
      foundedYear: 2005,
      headquarters: 'Islamabad, Pakistan',
      contactInfo: {
        email: 'info@kohistanexpress.pk',
        phone: '+92-51-111-333-444',
        website: 'www.kohistanexpress.pk',
        socialMedia: {
          facebook: 'facebook.com/KohistanExpressPK'
        }
      },
      services: [
        'Business Class Service',
        'Standard Bus Service',
        'Online Booking',
        'Snack Service'
      ],
      fleetSize: 60,
      routesCovered: ['Islamabad-Lahore', 'Islamabad-Peshawar', 'Lahore-Faisalabad'],
      ratings: {
        overall: 4.1,
        comfort: 4.0,
        punctuality: 4.3,
        cleanliness: 4.1,
        staffBehavior: 4.0,
        reviewCount: 4500
      },
      certifications: [],
      busTypes: ['Business', 'Standard']
    }
  ];

  // =============================================
  // BUS ROUTES
  // =============================================
  export interface BusRoute {
    id: string;
    from: string;
    to: string;
    distance: string;
    estimatedDuration: string;
    availableBusTypes: string[];
    isPopular: boolean;
    companyIds: string[];
  }
  
  export const busRoutes: BusRoute[] = [
    {
      id: 'route1',
      from: 'Lahore',
      to: 'Islamabad',
      distance: '375 km',
      estimatedDuration: '4h 30m',
      availableBusTypes: ['Standard', 'Business', 'Premium'],
      isPopular: true,
      companyIds: ['company1', 'company2', 'company5']
    },
    {
      id: 'route2',
      from: 'Lahore',
      to: 'Karachi',
      distance: '1,210 km',
      estimatedDuration: '15h 20m',
      availableBusTypes: ['Business', 'Premium'],
      isPopular: true,
      companyIds: ['company1', 'company4']
    },
    {
      id: 'route3',
      from: 'Islamabad',
      to: 'Peshawar',
      distance: '190 km',
      estimatedDuration: '2h 30m',
      availableBusTypes: ['Standard', 'Business'],
      isPopular: false,
      companyIds: ['company1', 'company3', 'company5']
    },
    {
      id: 'route4',
      from: 'Karachi',
      to: 'Hyderabad',
      distance: '160 km',
      estimatedDuration: '2h 15m',
      availableBusTypes: ['Standard', 'Business', 'Premium'],
      isPopular: true,
      companyIds: ['company1', 'company4']
    },
    {
      id: 'route5',
      from: 'Lahore',
      to: 'Faisalabad',
      distance: '180 km',
      estimatedDuration: '2h 45m',
      availableBusTypes: ['Standard', 'Business'],
      isPopular: false,
      companyIds: ['company2', 'company5']
    }
  ];
  
  // =============================================
  // BUS SCHEDULES (STEP 1 & 2: ROUTE & DATE/TIME SELECTION)
  // =============================================
  export interface BusSchedule {
    id: string;
    routeId: string;
    busId: string;
    companyId: string;
    departureTime: string;
    arrivalTime: string;
    date: string;
    busType: string;
    availableSeats: number;
    totalSeats: number;
    fare: number;
    currency: string;
    boardingPoints: BoardingPoint[];
    droppingPoints: DroppingPoint[];
    features: string[];
    cancellationPolicy: string;
  }

  export interface BoardingPoint {
    id: string;
    name: string;
    address: string;
    time: string;
    landmark?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }

  export interface DroppingPoint {
    id: string;
    name: string;
    address: string;
    time: string;
    landmark?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }
  
  export const busSchedules: BusSchedule[] = [
    {
      id: 'schedule1',
      routeId: 'route1',
      busId: 'bus1',
      companyId: 'company1',
      departureTime: '08:00 AM',
      arrivalTime: '12:30 PM',
      date: '2025-05-27',
      busType: 'Premium',
      availableSeats: 24,
      totalSeats: 36,
      fare: 2500,
      currency: 'PKR',
      boardingPoints: [
        {
          id: 'bp1',
          name: 'Daewoo Terminal Lahore',
          address: 'Thokar Niaz Baig, Lahore',
          time: '07:30 AM',
          landmark: 'Near Thokar Niaz Baig Flyover',
          coordinates: {
            latitude: 31.4846,
            longitude: 74.2999
          }
        },
        {
          id: 'bp2',
          name: 'Daewoo Terminal Kalma Chowk',
          address: 'Kalma Chowk, Lahore',
          time: '07:45 AM',
          landmark: 'Near Kalma Chowk Flyover',
          coordinates: {
            latitude: 31.5102,
            longitude: 74.3282
          }
        }
      ],
      droppingPoints: [
        {
          id: 'dp1',
          name: 'Daewoo Terminal Islamabad',
          address: 'I-8 Markaz, Islamabad',
          time: '12:30 PM',
          landmark: 'Near Centaurus Mall',
          coordinates: {
            latitude: 33.6844,
            longitude: 73.0479
          }
        }
      ],
      features: ['WiFi', 'USB Charging', 'Air Conditioning', 'Refreshments', 'Reclining Seats'],
      cancellationPolicy: '100% refund if cancelled 24 hours before departure, 50% refund if cancelled 12 hours before departure, no refund otherwise.'
    },
    {
      id: 'schedule2',
      routeId: 'route1',
      busId: 'bus2',
      companyId: 'company2',
      departureTime: '10:30 AM',
      arrivalTime: '03:00 PM',
      date: '2025-05-27',
      busType: 'Business',
      availableSeats: 18,
      totalSeats: 30,
      fare: 1800,
      currency: 'PKR',
      boardingPoints: [
        {
          id: 'bp3',
          name: 'Faisal Movers Terminal',
          address: 'Ferozpur Road, Lahore',
          time: '10:00 AM',
          landmark: 'Near Qainchi Flyover',
          coordinates: {
            latitude: 31.4701,
            longitude: 74.2701
          }
        }
      ],
      droppingPoints: [
        {
          id: 'dp2',
          name: 'Faisal Movers Islamabad Terminal',
          address: 'Faizabad, Islamabad',
          time: '03:00 PM',
          landmark: 'Near Faizabad Metro Station',
          coordinates: {
            latitude: 33.6601,
            longitude: 73.0769
          }
        }
      ],
      features: ['WiFi', 'Air Conditioning', 'Snacks', 'Adjustable Seats'],
      cancellationPolicy: '75% refund if cancelled 24 hours before departure, 25% refund if cancelled 12 hours before departure, no refund otherwise.'
    },
    {
      id: 'schedule3',
      routeId: 'route1',
      busId: 'bus3',
      companyId: 'company3',
      departureTime: '02:00 PM',
      arrivalTime: '06:30 PM',
      date: '2025-05-27',
      busType: 'Standard',
      availableSeats: 35,
      totalSeats: 45,
      fare: 1200,
      currency: 'PKR',
      boardingPoints: [
        {
          id: 'bp4',
          name: 'Skyways Terminal',
          address: 'Multan Road, Lahore',
          time: '01:30 PM',
          landmark: 'Near Chauburji',
          coordinates: {
            latitude: 31.5582,
            longitude: 74.3088
          }
        }
      ],
      droppingPoints: [
        {
          id: 'dp3',
          name: 'Skyways Islamabad Terminal',
          address: 'Pirwadhai, Rawalpindi',
          time: '06:30 PM',
          landmark: 'Near Pirwadhai Mor',
          coordinates: {
            latitude: 33.6510,
            longitude: 73.0329
          }
        }
      ],
      features: ['Air Conditioning', 'Basic Refreshments'],
      cancellationPolicy: '50% refund if cancelled 24 hours before departure, no refund otherwise.'
    },
    {
      id: 'schedule4',
      routeId: 'route2',
      busId: 'bus4',
      companyId: 'company4',
      departureTime: '09:00 PM',
      arrivalTime: '12:20 PM',
      date: '2025-05-28',
      busType: 'Premium',
      availableSeats: 20,
      totalSeats: 36,
      fare: 5500,
      currency: 'PKR',
      boardingPoints: [
        {
          id: 'bp5',
          name: 'Bilal Travels Terminal',
          address: 'Shahrah-e-Faisal, Karachi',
          time: '08:30 PM',
          landmark: 'Near Star Gate',
          coordinates: {
            latitude: 24.8918,
            longitude: 67.1380
          }
        }
      ],
      droppingPoints: [
        {
          id: 'dp4',
          name: 'Bilal Travels Lahore Terminal',
          address: 'Badami Bagh, Lahore',
          time: '12:20 PM',
          landmark: 'Near Badami Bagh Bus Terminal',
          coordinates: {
            latitude: 31.5883,
            longitude: 74.3059
          }
        }
      ],
      features: ['WiFi', 'USB Charging', 'Air Conditioning', 'Premium Refreshments', 'Fully Reclining Seats', 'Personal Entertainment'],
      cancellationPolicy: '100% refund if cancelled 48 hours before departure, 75% refund if cancelled 24 hours before departure, 50% refund if cancelled 12 hours before departure, no refund otherwise.'
    },
    {
      id: 'schedule5',
      routeId: 'route2',
      busId: 'bus5',
      companyId: 'company5',
      departureTime: '10:00 PM',
      arrivalTime: '01:20 PM',
      date: '2025-05-28',
      busType: 'Business',
      availableSeats: 15,
      totalSeats: 30,
      fare: 4200,
      currency: 'PKR',
      boardingPoints: [
        {
          id: 'bp6',
          name: 'Kohistan Express Terminal',
          address: 'North Nazimabad, Karachi',
          time: '09:30 PM',
          landmark: 'Near Nagan Chowrangi',
          coordinates: {
            latitude: 24.9577,
            longitude: 67.0376
          }
        }
      ],
      droppingPoints: [
        {
          id: 'dp5',
          name: 'Kohistan Express Lahore Terminal',
          address: 'Thokar Niaz Baig, Lahore',
          time: '01:20 PM',
          landmark: 'Near Thokar Niaz Baig Flyover',
          coordinates: {
            latitude: 31.4846,
            longitude: 74.2999
          }
        }
      ],
      features: ['WiFi', 'USB Charging', 'Air Conditioning', 'Snack Service', 'Semi-Reclining Seats'],
      cancellationPolicy: '75% refund if cancelled 24 hours before departure, 25% refund if cancelled 12 hours before departure, no refund otherwise.'
    }
  ];
  
  // =============================================
  // BUS DETAILS AND SEAT CONFIGURATION (STEP 3: SEAT SELECTION)
  // =============================================
  export interface Bus {
    id: string;
    name: string;
    busType: string;
    registrationNumber: string;
    operator: string;
    companyId: string;
    amenities: string[];
    seatConfiguration: SeatConfiguration;
  }
  
  export interface SeatConfiguration {
    rows: number;
    columns: number;
    layout: string[][]; // 'seat', 'aisle', 'empty', 'driver', etc.
    seats: Seat[];
  }
  
  export interface Seat {
    id: string;
    seatNumber: string;
    row: number;
    column: number;
    type: string; // 'standard', 'business', 'premium'
    price: number;
    currency: string;
    isAvailable: boolean;
    isHandicapped: boolean;
    isReserved: boolean;
    genderPreference?: 'male' | 'female' | 'any'; // Seat preference for gender
    occupiedBy?: 'male' | 'female' | null; // Gender of the person who booked the seat
  }
  
  export const buses: Bus[] = [
    {
      id: 'bus1',
      name: 'Daewoo Express',
      busType: 'Premium',
      registrationNumber: 'LEW-5432',
      operator: 'Daewoo Pakistan',
      companyId: 'company1',
      amenities: ['WiFi', 'USB Charging', 'Air Conditioning', 'Refreshments', 'Reclining Seats', 'Entertainment System', 'Blankets'],
      seatConfiguration: {
        rows: 9,
        columns: 4,
        layout: [
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat']
        ],
        seats: [
          {
            id: 'seat1',
            seatNumber: '1A',
            row: 0,
            column: 0,
            type: 'premium',
            price: 2500,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false,
            genderPreference: 'any'
          },
          {
            id: 'seat2',
            seatNumber: '1B',
            row: 0,
            column: 1,
            type: 'premium',
            price: 2500,
            currency: 'PKR',
            isAvailable: false,
            isHandicapped: false,
            isReserved: true,
            genderPreference: 'male',
            occupiedBy: 'male'
          },
          {
            id: 'seat3',
            seatNumber: '1D',
            row: 0,
            column: 3,
            type: 'premium',
            price: 2500,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false,
            genderPreference: 'female'
          },
          {
            id: 'seat4',
            seatNumber: '1E',
            row: 0,
            column: 4,
            type: 'premium',
            price: 2500,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false,
            genderPreference: 'any'
          }
          // Additional seats would be defined here
        ]
      }
    },
    {
      id: 'bus2',
      name: 'Faisal Movers',
      busType: 'Business',
      registrationNumber: 'LZC-7890',
      operator: 'Faisal Movers Pakistan',
      amenities: ['WiFi', 'USB Charging', 'Air Conditioning', 'Snacks', 'Adjustable Seats', 'Reading Lights'],
      seatConfiguration: {
        rows: 10,
        columns: 4,
        layout: [
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat']
        ],
        seats: [
          {
            id: 'seat1-bus2',
            seatNumber: '1A',
            row: 0,
            column: 0,
            type: 'business',
            price: 1800,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat2-bus2',
            seatNumber: '1B',
            row: 0,
            column: 1,
            type: 'business',
            price: 1800,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat3-bus2',
            seatNumber: '1D',
            row: 0,
            column: 3,
            type: 'business',
            price: 1800,
            currency: 'PKR',
            isAvailable: false,
            isHandicapped: true,
            isReserved: false
          },
          {
            id: 'seat4-bus2',
            seatNumber: '1E',
            row: 0,
            column: 4,
            type: 'business',
            price: 1800,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          }
          // Additional seats would be defined here
        ]
      }
    },
    {
      id: 'bus3',
      name: 'Skyways',
      busType: 'Standard',
      registrationNumber: 'RWP-1234',
      operator: 'Skyways Pakistan',
      amenities: ['Air Conditioning', 'Basic Refreshments', 'Comfortable Seating'],
      seatConfiguration: {
        rows: 12,
        columns: 4,
        layout: [
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat']
        ],
        seats: [
          {
            id: 'seat1-bus3',
            seatNumber: '1A',
            row: 0,
            column: 0,
            type: 'standard',
            price: 1200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat2-bus3',
            seatNumber: '1B',
            row: 0,
            column: 1,
            type: 'standard',
            price: 1200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat3-bus3',
            seatNumber: '1D',
            row: 0,
            column: 3,
            type: 'standard',
            price: 1200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat4-bus3',
            seatNumber: '1E',
            row: 0,
            column: 4,
            type: 'standard',
            price: 1200,
            currency: 'PKR',
            isAvailable: false,
            isHandicapped: false,
            isReserved: true
          }
          // Additional seats would be defined here
        ]
      }
    },
    {
      id: 'bus4',
      name: 'Bilal Travels',
      busType: 'Premium',
      registrationNumber: 'KHI-9876',
      operator: 'Bilal Travels Pakistan',
      amenities: ['WiFi', 'USB Charging', 'Air Conditioning', 'Premium Refreshments', 'Fully Reclining Seats', 'Personal Entertainment', 'Blankets & Pillows', 'Onboard Attendant'],
      seatConfiguration: {
        rows: 8,
        columns: 3,
        layout: [
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat'],
          ['seat', 'aisle', 'seat', 'seat']
        ],
        seats: [
          {
            id: 'seat1-bus4',
            seatNumber: '1A',
            row: 0,
            column: 0,
            type: 'premium',
            price: 5500,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat2-bus4',
            seatNumber: '1C',
            row: 0,
            column: 2,
            type: 'premium',
            price: 5500,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat3-bus4',
            seatNumber: '1D',
            row: 0,
            column: 3,
            type: 'premium',
            price: 5500,
            currency: 'PKR',
            isAvailable: false,
            isHandicapped: false,
            isReserved: true
          }
          // Additional seats would be defined here
        ]
      }
    },
    {
      id: 'bus5',
      name: 'Kohistan Express',
      busType: 'Business',
      registrationNumber: 'ISB-5678',
      operator: 'Kohistan Express Pakistan',
      amenities: ['WiFi', 'USB Charging', 'Air Conditioning', 'Snack Service', 'Semi-Reclining Seats', 'Onboard Entertainment'],
      seatConfiguration: {
        rows: 10,
        columns: 4,
        layout: [
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat'],
          ['seat', 'seat', 'aisle', 'seat', 'seat']
        ],
        seats: [
          {
            id: 'seat1-bus5',
            seatNumber: '1A',
            row: 0,
            column: 0,
            type: 'business',
            price: 4200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat2-bus5',
            seatNumber: '1B',
            row: 0,
            column: 1,
            type: 'business',
            price: 4200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: false,
            isReserved: false
          },
          {
            id: 'seat3-bus5',
            seatNumber: '1D',
            row: 0,
            column: 3,
            type: 'business',
            price: 4200,
            currency: 'PKR',
            isAvailable: true,
            isHandicapped: true,
            isReserved: false
          },
          {
            id: 'seat4-bus5',
            seatNumber: '1E',
            row: 0,
            column: 4,
            type: 'business',
            price: 4200,
            currency: 'PKR',
            isAvailable: false,
            isHandicapped: false,
            isReserved: true
          }
          // Additional seats would be defined here
        ]
      }
    }
  ];
  
  // =============================================
  // PASSENGER DETAILS (STEP 4: ADD PASSENGER DETAILS)
  // =============================================
  export enum DocumentType {
    CNIC = 'CNIC/Form B',
    PASSPORT = 'Passport'
  }

  export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    // OTHER = 'Other',
    // PREFER_NOT_TO_SAY = 'Prefer not to say'
  }
  
  export interface PassengerDetail {
    id: string;
    name: string;
    gender: Gender;
    age?: number;
    documentType: DocumentType;
    documentNumber: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    emergencyContact?: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
    specialRequirements?: string;
    saveForFuture?: boolean;
  }
  
  export interface PassengerDetailsSubmission {
    bookingId: string;
    passengers: PassengerDetail[];
    bookedBy: {
      userId: string;
      name: string;
      gender: Gender;
      phoneNumber: string;
      email: string;
      relationship: string; // 'self', 'family', 'friend', 'colleague', 'other'
    };
  }
  
  export const samplePassengerDetails: PassengerDetailsSubmission = {
    bookingId: 'booking123',
    passengers: [
      {
        id: 'passenger1',
        name: 'Muhammad Ali',
        gender: Gender.MALE,
        age: 32,
        documentType: DocumentType.CNIC,
        documentNumber: '35202-1234567-8',
        phoneNumber: '+923001234567',
        email: 'muhammadali@example.com',
        address: '123 Main Street, Gulberg',
        city: 'Lahore',
        country: 'Pakistan',
        emergencyContact: {
          name: 'Aisha Ali',
          relationship: 'Spouse',
          phoneNumber: '+923001234568'
        },
        saveForFuture: true
      },
      {
        id: 'passenger2',
        name: 'Fatima Khan',
        gender: Gender.FEMALE,
        age: 28,
        documentType: DocumentType.CNIC,
        documentNumber: '35202-7654321-0',
        phoneNumber: '+923009876543',
        email: 'fatima@example.com',
        city: 'Lahore',
        country: 'Pakistan',
        saveForFuture: true
      }
    ],
    bookedBy: {
      userId: 'user456',
      name: 'Muhammad Ali',
      gender: Gender.MALE,
      phoneNumber: '+923001234567',
      email: 'muhammadali@example.com',
      relationship: 'self'
    }
  };
  
  // =============================================
  // BOOKING
  // =============================================
  export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
  }
  
  export enum PaymentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    PAID = 'paid',
    FAILED = 'failed',
    REFUNDED = 'refunded',
    PARTIALLY_REFUNDED = 'partially_refunded'
  }

  export interface Booking {
    id: string;
    userId: string;
    scheduleId: string;
    busId: string;
    routeId: string;
    companyId: string;
    selectedSeats: string[]; // Array of seat IDs
    passengerIds: string[]; // Array of passenger IDs
    totalFare: number;
    currency: string;
    bookingDate: string;
    travelDate: string;
    status: BookingStatus;
    paymentId?: string;
    promoCodeApplied?: boolean;
    promoCode?: string;
    promoDiscount?: number;
    bookmeBalanceUsed?: number;
    boardingPointId: string;
    droppingPointId: string;
  }
  
  export interface BookingDetails {
    booking: Booking;
    company: {
      id: string;
      name: string;
      logo: string;
      contactInfo: {
        email: string;
        phone: string;
        website: string;
      };
    };
    route: {
      from: string;
      to: string;
      distance: string;
      estimatedDuration: string;
    };
    schedule: {
      departureTime: string;
      arrivalTime: string;
      date: string;
      busType: string;
    };
    boardingPoint: {
      name: string;
      address: string;
      time: string;
      landmark?: string;
    };
    droppingPoint: {
      name: string;
      address: string;
      time: string;
      landmark?: string;
    };
    bus: {
      name: string;
      registrationNumber: string;
      operator: string;
      amenities: string[];
    };
    seats: {
      id: string;
      seatNumber: string;
      type: string;
      price: number;
      currency: string;
      genderPreference: string;
      occupiedBy: string;
    }[];
    passengers: {
      id: string;
      name: string;
      gender: string;
      age?: number;
      documentType: string;
      documentNumber: string;
      phoneNumber: string;
      email?: string;
      seatNumber: string;
    }[];
    payment: {
      totalAmount: number;
      discount: number;
      bookmeBalanceUsed: number;
      finalAmount: number;
      currency: string;
      paymentMethod?: string;
      paymentStatus: PaymentStatus;
      transactionId?: string;
      paymentDate?: string;
      receiptUrl?: string;
    };
    cancellationPolicy: string;
  }
  
  export const sampleBookingDetails: BookingDetails = {
    booking: {
      id: 'booking123',
      userId: 'user456',
      scheduleId: 'schedule1',
      busId: 'bus1',
      routeId: 'route1',
      companyId: 'company1',
      selectedSeats: ['seat1', 'seat3'],
      passengerIds: ['passenger1', 'passenger2'],
      totalFare: 5000,
      currency: 'PKR',
      bookingDate: '2025-05-26',
      travelDate: '2025-05-27',
      status: BookingStatus.CONFIRMED,
      paymentId: 'payment789',
      promoCodeApplied: true,
      promoCode: 'SUMMER25',
      promoDiscount: 500,
      bookmeBalanceUsed: 1000,
      boardingPointId: 'bp1',
      droppingPointId: 'dp1'
    },
    company: {
      id: 'company1',
      name: 'Daewoo Pakistan',
      logo: 'assets/images/companies/daewoo.png',
      contactInfo: {
        email: 'info@daewoo.com.pk',
        phone: '+92-42-111-007-008',
        website: 'www.daewoo.com.pk'
      }
    },
    route: {
      from: 'Lahore',
      to: 'Islamabad',
      distance: '375 km',
      estimatedDuration: '4h 30m'
    },
    schedule: {
      departureTime: '08:00 AM',
      arrivalTime: '12:30 PM',
      date: '2025-05-27',
      busType: 'Premium'
    },
    boardingPoint: {
      name: 'Daewoo Terminal Lahore',
      address: 'Thokar Niaz Baig, Lahore',
      time: '07:30 AM',
      landmark: 'Near Thokar Niaz Baig Flyover'
    },
    droppingPoint: {
      name: 'Daewoo Terminal Islamabad',
      address: 'I-8 Markaz, Islamabad',
      time: '12:30 PM',
      landmark: 'Near Centaurus Mall'
    },
    bus: {
      name: 'Daewoo Express',
      registrationNumber: 'LEW-5432',
      operator: 'Daewoo Pakistan',
      amenities: ['WiFi', 'USB Charging', 'Air Conditioning', 'Refreshments', 'Reclining Seats', 'Entertainment System', 'Blankets']
    },
    seats: [
      {
        id: 'seat1',
        seatNumber: '1A',
        type: 'premium',
        price: 2500,
        currency: 'PKR',
        genderPreference: 'male',
        occupiedBy: 'male'
      },
      {
        id: 'seat3',
        seatNumber: '1D',
        type: 'premium',
        price: 2500,
        currency: 'PKR',
        genderPreference: 'female',
        occupiedBy: 'female'
      }
    ],
    passengers: [
      {
        id: 'passenger1',
        name: 'Muhammad Ali',
        gender: 'Male',
        age: 32,
        documentType: 'CNIC/Form B',
        documentNumber: '35202-1234567-8',
        phoneNumber: '+923001234567',
        email: 'muhammadali@example.com',
        seatNumber: '1A'
      },
      {
        id: 'passenger2',
        name: 'Fatima Khan',
        gender: 'Female',
        age: 28,
        documentType: 'CNIC/Form B',
        documentNumber: '35202-7654321-0',
        phoneNumber: '+923009876543',
        email: 'fatima@example.com',
        seatNumber: '1D'
      }
    ],
    payment: {
      totalAmount: 5000,
      discount: 500,
      bookmeBalanceUsed: 1000,
      finalAmount: 3500,
      currency: 'PKR',
      paymentMethod: 'Credit Card',
      paymentStatus: PaymentStatus.PAID,
      transactionId: 'txn_123456789',
      paymentDate: '2025-05-26T14:30:00Z',
      receiptUrl: 'https://bookme.pk/receipts/booking123.pdf'
    },
    cancellationPolicy: '100% refund if cancelled 24 hours before departure, 50% refund if cancelled 12 hours before departure, no refund otherwise.'
  };
  
  // =============================================
  // PAYMENT METHODS
  // =============================================
  export interface PaymentMethod {
    id: string;
    type: 'credit_card' | 'debit_card' | 'easypaisa' | 'jazzcash' | 'bank_transfer';
    name: string;
    icon: any; // Image source
    isPopular: boolean;
    processingFee?: number;
    processingTime?: string;
  }
  
  export interface BookmeBalance {
    userId: string;
    balance: number;
    currency: string;
    lastUpdated: string;
    transactions?: {
      id: string;
      type: 'credit' | 'debit';
      amount: number;
      date: string;
      description: string;
      relatedBookingId?: string;
    }[];
  }
  
  export const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm1',
      type: 'credit_card',
      name: 'Credit/Debit Card',
      icon: require('../../assets/card-icon.png'),
      isPopular: true,
      processingFee: 2.5,
      processingTime: 'Instant'
    },
    {
      id: 'pm2',
      type: 'easypaisa',
      name: 'Easypaisa',
      icon: require('../../assets/easypaisa-icon.png'),
      isPopular: true,
      processingFee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'pm3',
      type: 'jazzcash',
      name: 'JazzCash',
      icon: require('../../assets/jazzcash-icon.png'),
      isPopular: false,
      processingFee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'pm4',
      type: 'bank_transfer',
      name: 'Bank Transfer',
      icon: require('../../assets/bank-icon.png'),
      isPopular: false,
      processingFee: 0,
      processingTime: '1-2 business days'
    }
  ];
  
  export const sampleBookmeBalance: BookmeBalance = {
    userId: 'user456',
    balance: 2500,
    currency: 'PKR',
    lastUpdated: '2025-05-26',
    transactions: [
      {
        id: 'txn1',
        type: 'credit',
        amount: 3000,
        date: '2025-05-20T10:30:00Z',
        description: 'Added via credit card'
      },
      {
        id: 'txn2',
        type: 'debit',
        amount: 500,
        date: '2025-05-26T14:30:00Z',
        description: 'Used for booking',
        relatedBookingId: 'booking123'
      }
    ]
  };
  
  // =============================================
  // USER PROFILES
  // =============================================
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    country?: string;
    profilePicture?: string;
    savedPassengers: PassengerDetail[];
    savedPaymentMethods: {
      id: string;
      type: string;
      lastFourDigits?: string;
      expiryDate?: string;
      cardHolderName?: string;
      isDefault: boolean;
    }[];
    bookmeBalance: BookmeBalance;
    bookingHistory: {
      id: string;
      from: string;
      to: string;
      date: string;
      status: BookingStatus;
      amount: number;
    }[];
    preferences: {
      seatPreference?: 'window' | 'aisle' | 'any';
      notificationPreferences: {
        email: boolean;
        sms: boolean;
        pushNotifications: boolean;
      };
      currency: string;
      language: string;
    };
    membershipStatus: 'regular' | 'silver' | 'gold' | 'platinum';
    membershipPoints: number;
    registrationDate: string;
    lastLoginDate: string;
  }
  
  export const sampleUserProfile: UserProfile = {
    id: 'user456',
    name: 'Muhammad Ali',
    email: 'muhammadali@example.com',
    phoneNumber: '+923001234567',
    gender: Gender.MALE,
    dateOfBirth: '1993-05-15',
    address: '123 Main Street, Gulberg',
    city: 'Lahore',
    country: 'Pakistan',
    profilePicture: 'assets/images/profiles/user456.jpg',
    savedPassengers: [
      {
        id: 'passenger1',
        name: 'Muhammad Ali',
        gender: Gender.MALE,
        age: 32,
        documentType: DocumentType.CNIC,
        documentNumber: '35202-1234567-8',
        phoneNumber: '+923001234567',
        email: 'muhammadali@example.com',
        address: '123 Main Street, Gulberg',
        city: 'Lahore',
        country: 'Pakistan',
        saveForFuture: true
      },
      {
        id: 'passenger2',
        name: 'Fatima Khan',
        gender: Gender.FEMALE,
        age: 28,
        documentType: DocumentType.CNIC,
        documentNumber: '35202-7654321-0',
        phoneNumber: '+923009876543',
        email: 'fatima@example.com',
        city: 'Lahore',
        country: 'Pakistan',
        saveForFuture: true
      }
    ],
    savedPaymentMethods: [
      {
        id: 'pm_user1',
        type: 'credit_card',
        lastFourDigits: '4242',
        expiryDate: '05/28',
        cardHolderName: 'Muhammad Ali',
        isDefault: true
      },
      {
        id: 'pm_user2',
        type: 'easypaisa',
        isDefault: false
      }
    ],
    bookmeBalance: {
      userId: 'user456',
      balance: 2500,
      currency: 'PKR',
      lastUpdated: '2025-05-26'
    },
    bookingHistory: [
      {
        id: 'booking123',
        from: 'Lahore',
        to: 'Islamabad',
        date: '2025-05-27',
        status: BookingStatus.CONFIRMED,
        amount: 5000
      },
      {
        id: 'booking101',
        from: 'Lahore',
        to: 'Karachi',
        date: '2025-04-15',
        status: BookingStatus.COMPLETED,
        amount: 8500
      }
    ],
    preferences: {
      seatPreference: 'window',
      notificationPreferences: {
        email: true,
        sms: true,
        pushNotifications: true
      },
      currency: 'PKR',
      language: 'en'
    },
    membershipStatus: 'gold',
    membershipPoints: 1250,
    registrationDate: '2024-01-15',
    lastLoginDate: '2025-05-26T10:15:00Z'
  };
  
  // API ENDPOINTS =============================================
  export const API_ENDPOINTS = {
    // Bus Routes
    GET_BUS_ROUTES: '/api/bus-routes',
    GET_POPULAR_ROUTES: '/api/bus-routes?popular=true',
    
    // Bus Schedules
    GET_BUS_SCHEDULES: '/api/bus-schedules',
    GET_SCHEDULES_BY_ROUTE: (routeId: string, date: string) => `/api/bus-schedules?routeId=${routeId}&date=${date}`,
    
    // Bus Details and Seats
    GET_BUS_DETAILS: (busId: string) => `/api/buses/${busId}`,
    GET_BUS_SEAT_AVAILABILITY: (busId: string, scheduleId: string) => `/api/buses/${busId}/seats?scheduleId=${scheduleId}`,
    
    // Passenger Details
    POST_PASSENGER_DETAILS: (bookingId: string) => `/api/bookings/${bookingId}/passengers`,
    GET_SAVED_PASSENGERS: (userId: string) => `/api/users/${userId}/saved-passengers`,
    
    // Bookings
    CREATE_BOOKING: '/api/bookings',
    GET_BOOKING_DETAILS: (bookingId: string) => `/api/bookings/${bookingId}`,
    UPDATE_BOOKING_STATUS: (bookingId: string) => `/api/bookings/${bookingId}/status`,
    
    // Promo Codes
    VALIDATE_PROMO_CODE: '/api/promocodes/validate',
    
    // Payment
    PROCESS_PAYMENT: '/api/payments',
    GET_PAYMENT_STATUS: (paymentId: string) => `/api/payments/${paymentId}`
  };