import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_LAUNCH_KEY = 'SEATME_FIRST_LAUNCH';

/**
 * Checks if this is the first time the app has been launched
 * @returns Promise<boolean> - true if this is the first launch, false otherwise
 */
export const isFirstLaunch = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
    if (value === null) {
      // First time opening the app
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error checking first launch status:', error);
    return false;
  }
};

/**
 * Reset the first launch status (for testing purposes)
 */
export const resetFirstLaunchStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FIRST_LAUNCH_KEY);
  } catch (error) {
    console.log('Error resetting first launch status:', error);
  }
};
