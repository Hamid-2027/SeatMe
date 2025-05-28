import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  RefreshControl,
  Platform
} from 'react-native';
import { Fonts } from '../constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import SimplerCarousel from '../components/custom-carousel';
import TourCard from '../components/tour-card';
import CategoryButton from '../components/category-button';
import DealCard from '../components/deal-card';
import SearchTicket from '../components/search-ticket';

// Data
import { featuredDestinations } from '../data/destinations';
import { featuredTours, tours } from '../data/tours';
import { categories } from '../data/categories';
import { deals } from '../data/deals';
import { travelOptions } from '../data/travelOptions';
import { Destination, Tour, Category, Deal, TravelOption } from '../data/types';
import CustomCarousel from '../components/custom-carousel';
import { getFormattedGreeting } from '../utils/greetingsUtil';
import { getUserData, UserData, mockLogin, exampleUsers } from '../utils/userUtil';

export default function HomeScreen() {
  // Debug fonts
  console.log('Montserrat Bold Font:', Fonts.montserratBold);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState<UserData>({ isLoggedIn: false });
  const [greeting, setGreeting] = useState('');
  
  // Fetch user data and update greeting
  const loadUserDataAndGreeting = useCallback(async () => {
    try {
      const userInfo = await getUserData();
      setUserData(userInfo);
      setGreeting(getFormattedGreeting(userInfo));
    } catch (error) {
      console.log('Error loading user data:', error);
      setGreeting(getFormattedGreeting()); // Fallback to guest greeting
    }
  }, []);

  // Update greeting when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserDataAndGreeting();
      return () => {};
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Update greeting on pull-to-refresh
    loadUserDataAndGreeting();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  // For demo purposes - simulate login with a random user
  const simulateLogin = async () => {
    if (!userData.isLoggedIn) {
      // Pick a random username from our example list
      const randomName = exampleUsers[Math.floor(Math.random() * exampleUsers.length)];
      await mockLogin(randomName);
      await loadUserDataAndGreeting();
    }
  };

  const handleDestinationPress = (destination: Destination) => {
    console.log('Destination pressed:', destination.name);
    // Navigate to destination details
  };

  const handleTourPress = (tour: Tour) => {
    console.log('Tour pressed:', tour.name);
    // Navigate to tour details
  };

  const handleCategoryPress = (category: Category) => {
    console.log('Category pressed:', category.name);
    // Navigate to category list
  };

  const handleDealPress = (deal: Deal) => {
    console.log('Deal pressed:', deal.title);
    // Navigate to deal details
  };

  const handleSearch = () => {
    console.log('Search pressed');
    // Navigate to search results
  };

  const handleViewAll = (section: string) => {
    console.log('View all pressed for', section);
    // Navigate to section list
  };

  const renderTourItem = ({ item }: { item: Tour }) => (
    <TourCard tour={item} onPress={handleTourPress} />
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <CategoryButton category={item} onPress={handleCategoryPress} />
  );

  const renderDealItem = ({ item }: { item: Deal }) => (
    <DealCard deal={item} onPress={handleDealPress} />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.subtitle}>
              {userData.isLoggedIn ? 'Find your perfect journey' : 'Sign in for personalized options'}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.profileButton, userData.isLoggedIn ? styles.loggedInButton : {}]} 
            onPress={simulateLogin}
          >
            <MaterialIcons 
              name="person" 
              size={24} 
              color={userData.isLoggedIn ? "#fff" : "#3B82F6"} 
            />
          </TouchableOpacity>
        </View>

        {/* Search Ticket Section */}
        <SearchTicket />

        {/* Premium Bus Services Carousel */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle]}>Top Travel Agencies</Text>
            <TouchableOpacity onPress={() => handleViewAll('destinations')}>
              <Text style={[styles.viewAllText, { fontFamily: 'Montserrat-Medium' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <CustomCarousel 
            data={featuredDestinations} 
            onPress={handleDestinationPress}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Special Deals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Deals</Text>
            <TouchableOpacity onPress={() => handleViewAll('deals')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={deals}
            renderItem={renderDealItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsList}
          />
        </View>

        {/* Trending Tours */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Tours</Text>
            <TouchableOpacity onPress={() => handleViewAll('tours')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredTours}
            renderItem={renderTourItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toursList}
          />
        </View>

        {/* App Promotion Banner */}
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={['#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoBanner}
          >
            <View>
              <Text style={styles.promoTitle}>Visit our website</Text>
              <Text style={styles.promoSubtitle}>Get 15% off on your first booking</Text>
            </View>
            <View style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Check Now</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer space */}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 25, // Adding top padding for more space
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20, // Increased vertical padding
    marginTop: 10, // Added top margin
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInButton: {
    backgroundColor: '#3B82F6',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: Fonts.montserratBold,
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: 7,
    paddingVertical: 10,
  },
  toursList: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 10,
  },
  dealsList: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 10,
  },
  promoBanner: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: '#3B82F6',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footer: {
    height: 50,
  },
}); 