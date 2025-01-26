import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import SliderComponent from '../components/slider-component';

const { width } = Dimensions.get('window');

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
];

const SliderScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % DATA.length;
        // Check if flatListRef is defined before calling scrollToIndex
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 2000); // Change the interval as needed

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <>
   <FlatList
      ref={flatListRef}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width} 
      decelerationRate="fast"
      onScrollToIndexFailed={() => {}}
    />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 233,
    height:133,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default SliderScreen;
