import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ImageBackground, 
  TouchableOpacity,
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { Destination } from '../data/types';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
// Fixed dimensions for card - using exact pixel values instead of percentages
const ITEM_WIDTH = Math.floor(width * 0.85);
const ITEM_HEIGHT = 200;
// Ensure exact spacing calculation
const ITEM_SIDE_SPACE = Math.floor((width - ITEM_WIDTH) / 2);
const FULL_SIZE = ITEM_WIDTH;

interface Props {
  data: Destination[];
  onPress: (item: Destination) => void;
}

const DestinationCarousel = ({ data, onPress }: Props) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Initialize the carousel to start from the middle
  useEffect(() => {
    if (data.length > 0 && flatListRef.current) {
      // Start from the middle of the array
      const initialIndex = Math.floor(data.length / 2);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: initialIndex,
        });
        setCurrentIndex(initialIndex);
      }, 100);
    }
  }, []);
  
  // Auto-scroll functionality
  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      if (data.length > 0 && flatListRef.current) {
        const nextIndex = (currentIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(autoScrollTimer);
  }, [currentIndex, data.length]);
  
  // Handle scroll events to update current index
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );
  
  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const renderItem = ({ item }: { item: Destination }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => onPress(item)}
        style={styles.itemContainer}
      >
        <ImageBackground 
          source={item.image} 
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.gradient}
          >
            <View style={styles.contentContainer}>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color="#fff" />
                <Text style={styles.locationText}>{item.location}</Text>
                
                {/* Tags displayed as pills */}
                <View style={styles.tagsContainer}>
                  {item.tags.length > 0 && (
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
                  <Text style={styles.price}>
                    {item.currency === 'PKR' ? '₨' : item.currency === 'USD' ? '$' : '€'}{item.price.toLocaleString()}
                  </Text>
                  <Text style={styles.priceSubtext}>starting fare</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderItemWithAnimation = ({ item, index }: { item: Destination; index: number }) => {
    const inputRange = [
      (index - 1) * FULL_SIZE,
      index * FULL_SIZE,
      (index + 1) * FULL_SIZE
    ];
    
    // Scale animation - current item appears normal size, others smaller
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp'
    });
    
    // Translate Y animation - current item appears higher
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -8, 0],
      extrapolate: 'clamp'
    });
    
    // Opacity animation - non-current items appear significantly faded
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={{
        transform: [{ scale }, { translateY }],
        opacity,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginBottom: 5,
        alignSelf: 'center',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: currentIndex === index ? 0.3 : 0.1,
            shadowRadius: currentIndex === index ? 8 : 4,
          },
          android: {
            elevation: currentIndex === index ? 8 : 0,
          }
        })
      }}>
        {renderItem({ item, index } as any)}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{ 
          paddingLeft: ITEM_SIDE_SPACE,
          paddingRight: ITEM_SIDE_SPACE,
          paddingVertical: 10,
          alignItems: 'center'
        }}
        getItemLayout={(_, index) => ({
          length: FULL_SIZE,
          offset: FULL_SIZE * index,
          index,
        })}
        renderItem={renderItemWithAnimation}
      />
      
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp'
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp'
          });
          
          const width = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp'
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { 
                  opacity,
                  width,
                  transform: [{ scale }],
                  backgroundColor: currentIndex === index ? '#3B82F6' : '#D1D5DB'
                }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    height: 240, 
    alignItems: 'center',
       borderWidth:1,
    borderColor:'red'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center',
 
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 15,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 15,
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
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 5,
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
    fontWeight: '500',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
});

export default DestinationCarousel;
