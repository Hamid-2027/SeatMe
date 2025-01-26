import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
];

const SliderComponent = () => {
  const flatListRef1 = useRef(null);
  const flatListRef2 = useRef(null);
  
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  
  const [direction1, setDirection1] = useState(1);  // 1 for forward, -1 for reverse
  const [direction2, setDirection2] = useState(1);  // 1 for forward, -1 for reverse

  // Function to handle direction change when the end is reached
  const handleDirectionChange1 = () => {
    if (currentIndex1 === DATA.length - 1) {
      setDirection1(-1);  // Reverse the direction when reaching the last item
    } else if (currentIndex1 === 0) {
      setDirection1(1);  // Forward direction when reaching the first item
    }
  };

  const handleDirectionChange2 = () => {
    if (currentIndex2 === DATA.length - 1) {
      setDirection2(-1);  // Reverse the direction when reaching the last item
    } else if (currentIndex2 === 0) {
      setDirection2(1);  // Forward direction when reaching the first item
    }
  };

  // Loop logic for the first FlatList (right to left)
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentIndex1((prevIndex) => {
        let nextIndex = prevIndex + direction1;
        
        // Ensure the index stays within bounds
        if (nextIndex >= DATA.length) nextIndex = DATA.length - 1;
        if (nextIndex < 0) nextIndex = 0;
        
        handleDirectionChange1();  // Handle direction change for the first list
        if (flatListRef1.current) {
          flatListRef1.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 2000); // Change the interval as needed

    return () => clearInterval(interval1);
  }, [direction1, currentIndex1]);

  // Loop logic for the second FlatList (left to right)
  useEffect(() => {
    const interval2 = setInterval(() => {
      setCurrentIndex2((prevIndex) => {
        let nextIndex = prevIndex + direction2;

        // Ensure the index stays within bounds
        if (nextIndex >= DATA.length) nextIndex = DATA.length - 1;
        if (nextIndex < 0) nextIndex = 0;

        handleDirectionChange2();  // Handle direction change for the second list
        if (flatListRef2.current) {
          flatListRef2.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 2000); // Change the interval as needed

    return () => clearInterval(interval2);
  }, [direction2, currentIndex2]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View>
      {/* First FlatList: Right to Left scrolling */}
      <FlatList
        ref={flatListRef1}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
      />

      {/* Second FlatList: Left to Right scrolling */}
      <FlatList
        ref={flatListRef2}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        inverted // Moves items from left to right
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
        style={styles.secondFlatList} // Add spacing between the lists
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: width - 40, // Adjust the item width based on the screen width
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  secondFlatList: {
    marginTop: 20, // Add spacing between the two FlatLists
  },
});

export default SliderComponent;
