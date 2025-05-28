import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Destination } from '../data/types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  data: Destination[];
  onPress: (item: Destination) => void;
}

export default function CustomCarousel({ data, onPress }: Props) {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => onPress(item)}
      style={styles.itemContainer}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.95)']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#fff" />
            <Text style={styles.locationText}>{item.location}</Text>
            
            {/* Tags displayed as pills */}
            <View style={styles.tagsContainer}>
              {item.tags && item.tags.length > 0 && (
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{item.tags[0]}</Text>
                </View>
              )}
            </View>
          </View>
          
          <Text style={styles.name}>{item.name}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviews})</Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price} {item.currency}</Text>
              <Text style={styles.priceSubtext}>per person</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const Pagination = () => (
    <View style={styles.pagination}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeSlide && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={200}
        data={data}
        renderItem={renderItem}
        onSnapToItem={setActiveSlide}
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
        }}
        testID="carousel"
        scrollAnimationDuration={600}
        autoPlay={true}
        autoPlayInterval={4000}
      />
      <Pagination />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    overflow: 'visible',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  itemContainer: {
    width: SCREEN_WIDTH - 17,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 6,
    opacity: 0.6,
  },
  activeDot: {
    backgroundColor: '#3B82F6',
    width: 20,
    height: 8,
    opacity: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  tagPill: {
    backgroundColor: 'rgba(59, 130, 246, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviews: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  priceSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
});
