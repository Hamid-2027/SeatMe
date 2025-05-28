import { UserData } from './userUtil';

/**
 * Utility for generating random greetings with emojis
 */

type Greeting = {
  text: string;
  emoji: string;
  guest?: string; // Alternative text for guest mode
};

// Collection of greetings with different emojis
const greetings: Greeting[] = [
  { text: "Hello", guest: "Hello, Traveler", emoji: "👋" },
  { text: "Welcome back", guest: "Welcome to SeatMe", emoji: "🚀" },
  { text: "Good to see you", guest: "Glad you're here", emoji: "😊" },
  { text: "Ready to travel", guest: "Ready for your journey", emoji: "✈️" },
  { text: "Let's find your seat", guest: "Let's find your perfect seat", emoji: "💺" },
  { text: "Going somewhere", guest: "Where to today", emoji: "🧳" },
  { text: "Adventure awaits", guest: "Adventure is calling", emoji: "🗺️" },
  { text: "Time to explore", guest: "Discover new places", emoji: "🔍" },
  { text: "Welcome aboard", guest: "Hop on board", emoji: "🚌" },
  { text: "Your journey awaits", guest: "Time to plan your trip", emoji: "📝" },
  { text: "Travel in comfort", guest: "Experience comfort travel", emoji: "🛋️" },
  { text: "Great deals for you", guest: "Amazing deals today", emoji: "🎯" },
];

// Time-based greetings
const getTimeBasedGreeting = (): string => {
  const hours = new Date().getHours();
  
  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

/**
 * Get a random greeting with emoji
 * @returns {Greeting} A random greeting object containing text and emoji
 */
export const getRandomGreeting = (): Greeting => {
  // Get a random greeting from the collection
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

/**
 * Get a time-appropriate greeting with random emoji
 * @param {UserData} userData - The user data object
 * @returns {string} A formatted greeting string with emoji
 */
export const getTimeGreeting = (userData?: UserData): string => {
  const timeGreeting = getTimeBasedGreeting();
  const randomEmoji = greetings[Math.floor(Math.random() * greetings.length)].emoji;
  
  if (userData?.isLoggedIn && userData?.username) {
    return `${timeGreeting}, ${userData.username} ${randomEmoji}`;
  } else {
    return `${timeGreeting} ${randomEmoji}`;
  }
};

/**
 * Get a fully formatted greeting string
 * @param {UserData} userData - The user data object
 * @returns {string} A complete greeting with emoji
 */
export const getFormattedGreeting = (userData?: UserData): string => {
  // 50% chance to use time-based greeting vs random greeting
  if (Math.random() > 0.5) {
    const greeting = getRandomGreeting();
    if (userData?.isLoggedIn && userData?.username) {
      // User is logged in, use their name
      return `${greeting.text}, ${userData.username}! ${greeting.emoji}`;
    } else {
      // User is in guest mode
      return `${greeting.guest || greeting.text}! ${greeting.emoji}`;
    }
  } else {
    return getTimeGreeting(userData);
  }
};
