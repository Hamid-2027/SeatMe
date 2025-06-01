import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { 
  Platform, 
  TouchableOpacity, 
  Pressable, 
  GestureResponderEvent 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/home';
import SearchScreen from '../screens/search';
import ProfileScreen from '../screens/profile-screen';

const Tab = createBottomTabNavigator();

interface TabBarButtonProps {
  onPress?: ((e: GestureResponderEvent) => void);
  children: React.ReactNode;
  style?: any;
  accessibilityState?: { selected?: boolean };
  accessibilityLabel?: string;
  testID?: string;
}

function TabBarButton(props: TabBarButtonProps) {
  // Use Pressable on Android with ripple disabled, TouchableOpacity on iOS
  return Platform.OS === 'android' ? (
    <Pressable
      {...props}
      android_ripple={{ borderless: true, radius: 0 }}
      android_disableSound={false}
      style={props.style}
    />
  ) : (
    <TouchableOpacity {...props} activeOpacity={1} />
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 + insets.bottom : 60,
          paddingBottom: Platform.OS === 'android' ? insets.bottom : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
        },
        headerShown: false, // Hide all tab headers
        tabBarShowLabel: true,
        // This disables the ripple effect on Android
        tabBarButton: (props: TabBarButtonProps) => {
          return (
            <TabBarButton {...props} />
          );
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            </View>
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
            </View>
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            </View>
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
} 

const styles = StyleSheet.create({
  iconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21
  },
  activeIconContainer: {
    backgroundColor: '#007AFF15',
  },
});