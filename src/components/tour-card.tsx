import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { Tour } from '../data/types';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

interface Props {
  tour: Tour;
  onPress: (tour: Tour) => void;
}

const TourCard = ({ tour, onPress }: Props) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={() => onPress(tour)}
    >
      <Image source={tour.image} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={14} color="#6B7280" />
          <Text style={styles.location}>{tour.location}</Text>
        </View>

        <Text style={styles.name} numberOfLines={1}>{tour.name}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.durationContainer}>
            <MaterialIcons name="schedule" size={14} color="#6B7280" />
            <Text style={styles.duration}>{tour.duration}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{tour.rating}</Text>
            <Text style={styles.reviews}>({tour.reviews})</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {tour.currency === 'PKR' ? 'Rs ' : (tour.currency === 'USD' ? '$' : '€')}{tour.price.toLocaleString()}
          </Text>
          <Text style={styles.pricePer}>/ person</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  pricePer: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});

export default TourCard;
