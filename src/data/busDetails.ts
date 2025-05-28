export const busDetails = [
  {
    tripDetails: {
      departureCity: "Rawalpindi",
      departureCityCode: "RWP",
      arrivalCity: "Skardu",
      arrivalCityCode: "SKD",
      departureTime: "02:00 PM",
      arrivalTime: "01:40 AM",
      duration: "11h 40m",
      dateOfTravel: "30 May",
      busOperator: "NATCO",
      busType: "Youtong Natco",
      availableSeats: 22,
      rating: 4.6,
      ticketPrice: {
        amount: 4874,
        currency: "PKR"
      }
    },
    boardingPoint: {
      location: "Natco Office, Main Peer Wadhai General Bus Stand, Stand #26, Rawalpindi"
    },
    droppingPoint: {
      location: "General Bus Stand 411, Skardu"
    },
    facilities: {
      seatType: "Regular seat",
      airConditioning: true
    },
    rewards: {
      pointsEarnable: 487
    },
    pricingModel: "Variable Pricing with discounts for early bookings",
    busTransporterOverview: {
      staffRating: "Good",
      recommendation: "100%",
      insightsUpdated: "Last 10 days"
    }
  },
  // Add a few more sample buses for demo
  {
    tripDetails: {
      departureCity: "Islamabad",
      departureCityCode: "ISB",
      arrivalCity: "Skardu",
      arrivalCityCode: "SKD",
      departureTime: "03:00 PM",
      arrivalTime: "02:30 AM",
      duration: "11h 30m",
      dateOfTravel: "30 May",
      busOperator: "Skyways",
      busType: "Luxury",
      availableSeats: 15,
      rating: 4.2,
      ticketPrice: {
        amount: 5200,
        currency: "PKR"
      }
    },
    boardingPoint: {
      location: "Skyways Terminal, Islamabad"
    },
    droppingPoint: {
      location: "Skardu Main Bus Stand"
    },
    facilities: {
      seatType: "Luxury seat",
      airConditioning: true
    },
    rewards: {
      pointsEarnable: 520
    },
    pricingModel: "Fixed Pricing",
    busTransporterOverview: {
      staffRating: "Very Good",
      recommendation: "98%",
      insightsUpdated: "Last 7 days"
    }
  },
  {
    tripDetails: {
      departureCity: "Rawalpindi",
      departureCityCode: "RWP",
      arrivalCity: "Gilgit",
      arrivalCityCode: "GIL",
      departureTime: "01:00 PM",
      arrivalTime: "12:00 AM",
      duration: "11h 0m",
      dateOfTravel: "30 May",
      busOperator: "NATCO",
      busType: "Standard",
      availableSeats: 10,
      rating: 4.0,
      ticketPrice: {
        amount: 4000,
        currency: "PKR"
      }
    },
    boardingPoint: {
      location: "Natco Office, Rawalpindi"
    },
    droppingPoint: {
      location: "Gilgit Bus Stand"
    },
    facilities: {
      seatType: "Standard seat",
      airConditioning: false
    },
    rewards: {
      pointsEarnable: 400
    },
    pricingModel: "Variable Pricing",
    busTransporterOverview: {
      staffRating: "Good",
      recommendation: "95%",
      insightsUpdated: "Last 5 days"
    }
  }
];

export const rawalpindiToPeshawarBuses = [
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Abtabad',
      arrivalCityCode: 'ABT',
      departureTime: '08:00 AM',
      arrivalTime: '12:00 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Daewoo Express',
      busType: 'Luxury',
      availableSeats: 18,
      rating: 4.5,
      ticketPrice: { amount: 1800, currency: 'PKR' },
    },
    boardingPoint: { location: 'Daewoo Terminal, Rawalpindi' },
    droppingPoint: { location: 'Abtabad Bus Stand' },
    facilities: { seatType: 'Luxury seat', airConditioning: true },
    rewards: { pointsEarnable: 120 },
    pricingModel: 'Fixed Pricing',
    busTransporterOverview: {
      staffRating: 'Very Good',
      recommendation: '98%',
      insightsUpdated: 'Last 7 days',
    },
    logo: require('../../assets/Buses/Daewoo-Express.jpg'),
    femaleOnly: false,
  },
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Peshawar',
      arrivalCityCode: 'PEW',
      departureTime: '09:30 AM',
      arrivalTime: '01:30 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Skyways',
      busType: 'Business',
      availableSeats: 22,
      rating: 4.3,
      ticketPrice: { amount: 1700, currency: 'PKR' },
    },
    boardingPoint: { location: 'Skyways Terminal, Rawalpindi' },
    droppingPoint: { location: 'Peshawar Main Bus Stand' },
    facilities: { seatType: 'Business seat', airConditioning: true },
    rewards: { pointsEarnable: 110 },
    pricingModel: 'Fixed Pricing',
    busTransporterOverview: {
      staffRating: 'Good',
      recommendation: '95%',
      insightsUpdated: 'Last 10 days',
    },
    logo: require('../../assets/Buses/images.jpeg'),
    femaleOnly: true,
  },
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Peshawar',
      arrivalCityCode: 'PEW',
      departureTime: '11:00 AM',
      arrivalTime: '03:00 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Faisal Movers',
      busType: 'Executive',
      availableSeats: 15,
      rating: 4.4,
      ticketPrice: { amount: 1850, currency: 'PKR' },
    },
    boardingPoint: { location: 'Faisal Movers Terminal, Rawalpindi' },
    droppingPoint: { location: 'Peshawar Main Bus Stand' },
    facilities: { seatType: 'Executive seat', airConditioning: true },
    rewards: { pointsEarnable: 130 },
    pricingModel: 'Variable Pricing',
    busTransporterOverview: {
      staffRating: 'Excellent',
      recommendation: '99%',
      insightsUpdated: 'Last 5 days',
    },
    logo: require('../../assets/Buses/1.jpg'),
    femaleOnly: false,
  },
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Peshawar',
      arrivalCityCode: 'PEW',
      departureTime: '01:00 PM',
      arrivalTime: '05:00 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Niazi Express',
      busType: 'Standard',
      availableSeats: 20,
      rating: 4.1,
      ticketPrice: { amount: 1600, currency: 'PKR' },
    },
    boardingPoint: { location: 'Niazi Terminal, Rawalpindi' },
    droppingPoint: { location: 'Peshawar Main Bus Stand' },
    facilities: { seatType: 'Standard seat', airConditioning: false },
    rewards: { pointsEarnable: 100 },
    pricingModel: 'Fixed Pricing',
    busTransporterOverview: {
      staffRating: 'Good',
      recommendation: '92%',
      insightsUpdated: 'Last 8 days',
    },
    logo: require('../../assets/Buses/Pakistan-to-China-Bus-Service-by-NATCO-Express.webp'),
    femaleOnly: false,
  },
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Peshawar',
      arrivalCityCode: 'PEW',
      departureTime: '03:00 PM',
      arrivalTime: '07:00 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Kainat Travels',
      busType: 'Luxury',
      availableSeats: 12,
      rating: 4.2,
      ticketPrice: { amount: 1900, currency: 'PKR' },
    },
    boardingPoint: { location: 'Kainat Terminal, Rawalpindi' },
    droppingPoint: { location: 'Peshawar Main Bus Stand' },
    facilities: { seatType: 'Luxury seat', airConditioning: true },
    rewards: { pointsEarnable: 140 },
    pricingModel: 'Variable Pricing',
    busTransporterOverview: {
      staffRating: 'Very Good',
      recommendation: '97%',
      insightsUpdated: 'Last 6 days',
    },
    logo: require('../../assets/Buses/Yutong-Master-Nova.jpg'),
    femaleOnly: true,
  },
  {
    tripDetails: {
      departureCity: 'Rawalpindi',
      departureCityCode: 'RWP',
      arrivalCity: 'Peshawar',
      arrivalCityCode: 'PEW',
      departureTime: '05:00 PM',
      arrivalTime: '09:00 PM',
      duration: '4h 0m',
      dateOfTravel: '30 May',
      busOperator: 'Bilal Travels',
      busType: 'Business',
      availableSeats: 10,
      rating: 4.0,
      ticketPrice: { amount: 1750, currency: 'PKR' },
    },
    boardingPoint: { location: 'Bilal Terminal, Rawalpindi' },
    droppingPoint: { location: 'Peshawar Main Bus Stand' },
    facilities: { seatType: 'Business seat', airConditioning: true },
    rewards: { pointsEarnable: 115 },
    pricingModel: 'Fixed Pricing',
    busTransporterOverview: {
      staffRating: 'Good',
      recommendation: '93%',
      insightsUpdated: 'Last 9 days',
    },
    logo: require('../../assets/Buses/images.jpeg'),
    femaleOnly: false,
  },
];
  