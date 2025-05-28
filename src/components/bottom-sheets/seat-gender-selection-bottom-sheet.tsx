import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';

interface SeatGenderSelectionBottomSheetProps {
  visible: boolean;
  seatNumber: number;
  onGenderSelect: (gender: 'male' | 'female') => void;
  onSheetClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SeatGenderSelectionBottomSheet: React.FC<SeatGenderSelectionBottomSheetProps> = ({
  visible,
  seatNumber,
  onGenderSelect,
  onSheetClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);
  
  // Handle backdrop press
  const renderBackdrop = useRef((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={() => onSheetClose()}
    />
  )).current;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['30%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.indicator}
      onClose={onSheetClose}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Select Seat Type</Text>
        <Text style={styles.seatLabel}>Seat no {seatNumber}</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionButton, styles.maleButton]} 
            onPress={() => onGenderSelect('male')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name="male" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionButton, styles.femaleButton]} 
            onPress={() => onGenderSelect('female')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name="female" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#DDDDDD',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  seatLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  maleButton: {
    backgroundColor: '#00294D',
  },
  femaleButton: {
    backgroundColor: '#FF40B4',
  },
  iconContainer: {
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SeatGenderSelectionBottomSheet;
