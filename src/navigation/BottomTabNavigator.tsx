import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { 
  Platform, 
  TouchableOpacity, 
  Pressable, 
  GestureResponderEvent 
} from 'react-native';

// Screens
import HomeScreen from '../screens/home';
import SearchScreen from '../screens/search';
import ProfileScreen from '../screens/profile';

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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 0, 
          shadowOpacity: 0, 
          borderTopWidth: 1,
          borderTopColor: '#f4f4f4',
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 