import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const USER_KEY = '@user_data';

export const saveUserToStorage = async (user: FirebaseAuthTypes.User | null) => {
  try {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } else {
      await AsyncStorage.removeItem(USER_KEY);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const userDataString = await AsyncStorage.getItem(USER_KEY);
    console.log("getUserFromStorage", userDataString);
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const checkAuthState = async (): Promise<boolean> => {
  const user = auth().currentUser;
  const storedUser = await getUserFromStorage();
  
  if (user && storedUser && user.uid === storedUser.uid) {
    return true;
  }
  
  // Clear stored data if there's a mismatch
  if (storedUser) {
    await AsyncStorage.removeItem(USER_KEY);
  }
  
  return false;
};
