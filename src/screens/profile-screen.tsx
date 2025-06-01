import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../navigation/MainAppStack';
import { saveUserToStorage, checkAuthState, getUserFromStorage } from '../utils/auth';

export default function ProfileScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const isAuth = await checkAuthState();
        if (!isMounted) return;

        if (isAuth) {
          const storedUser = await getUserFromStorage();
          if (!isMounted) return;

          if (storedUser) {
            setUserData(storedUser);
            setIsAuthenticated(true);
          } else {
            const currentUser = auth().currentUser;
            if (currentUser) {
              const newUserData = {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              };
              if (!isMounted) return;
              setUserData(newUserData);
              setIsAuthenticated(true);
              await saveUserToStorage(currentUser);
            }
          }
        } else {
          if (!isMounted) return;
          setUserData(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        if (isMounted) {
          setUserData(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.signOut();
      await auth().signOut();
      await saveUserToStorage(null);
      setUserData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!isAuthenticated || !userData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.welcomeText}>Welcome to SeatMe</Text>
        <Text style={styles.subText}>Sign in to access your profile</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={userData.photoURL ? { uri: userData.photoURL } : require('../../assets/default-avatar.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.displayName || 'User'}</Text>
        <Text style={styles.email}>{userData.email || 'No email'}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email verified</Text>
          <Text style={[styles.value, { color: '#4CAF50' }]}>
            {userData.email ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Account created</Text>
          <Text style={styles.value}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  label: {
    fontSize: 16,
    color: '#666666',
  },
  value: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: '#DC3545',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
