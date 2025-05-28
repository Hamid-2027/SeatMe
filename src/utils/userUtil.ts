import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'SEATME_USER_DATA';

// Types for user data
export type UserData = {
  isLoggedIn: boolean;
  username?: string;
};

// Default user state (guest mode)
const defaultUserData: UserData = {
  isLoggedIn: false,
};

/**
 * Get user data from storage
 * @returns Promise<UserData> - User data or default guest state
 */
export const getUserData = async (): Promise<UserData> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    if (userData) {
      return JSON.parse(userData) as UserData;
    }
    return defaultUserData;
  } catch (error) {
    console.log('Error fetching user data:', error);
    return defaultUserData;
  }
};

/**
 * Save user data to storage
 * @param userData - User data to save
 */
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.log('Error saving user data:', error);
  }
};

/**
 * Clear user data (logout)
 */
export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log('Error clearing user data:', error);
  }
};

// For demo purposes - simulate login (normally this would connect to an API)
export const mockLogin = async (username: string): Promise<void> => {
  await saveUserData({
    isLoggedIn: true,
    username,
  });
};

// For testing: provide some example usernames
export const exampleUsers = [
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey',
  'Riley', 'Jamie', 'Avery', 'Quinn', 'Dakota', 'Reese'
];
