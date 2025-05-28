import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import SeatGenderSelectionBottomSheet from '../bottom-sheets/seat-gender-selection-bottom-sheet';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export interface Seat {
  id: number;
  number: number;
  status: 'available' | 'selected' | 'booked' | 'driver';
  gender: 'male' | 'female' | null;
}

interface SeatSelectionComponentProps {
  onSeatsSelectedChange: (selectedCount: number) => void;
  onBookmePress?: () => void;
}

const SeatSelectionComponent: React.FC<SeatSelectionComponentProps> = ({ onSeatsSelectedChange, onBookmePress }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [currentSeat, setCurrentSeat] = useState<Seat | null>(null);
  const [showGenderSheet, setShowGenderSheet] = useState(false);
  
  // Maximum number of seats that can be selected
  const MAX_SEATS = 5;

  // Static data for seats structured by rows with aisle representation
  const seatLayoutData = [
    // Row 1 (Seats 1-4)
    [{ id: 1, number: 1, status: 'available', gender: null }, { id: 2, number: 2, status: 'available', gender: null }, null, { id: 3, number: 3, status: 'available', gender: null }, { id: 4, number: 4, status: 'booked', gender: 'male' }],
    // Row 2 (Seats 5-8)
    [{ id: 5, number: 5, status: 'booked', gender: 'female' }, { id: 6, number: 6, status: 'available', gender: null }, null, { id: 7, number: 7, status: 'available', gender: null }, { id: 8, number: 8, status: 'available', gender: null }],
    // Row 3 (Seats 9-12)
    [{ id: 9, number: 9, status: 'available', gender: null }, { id: 10, number: 10, status: 'available', gender: null }, null, { id: 11, number: 11, status: 'available', gender: null }, { id: 12, number: 12, status: 'available', gender: null }],
    // Row 4 (Seats 13-16)
    [{ id: 13, number: 13, status: 'booked', gender: 'female' }, { id: 14, number: 14, status: 'available', gender: null }, null, { id: 15, number: 15, status: 'available', gender: null }, { id: 16, number: 16, status: 'available', gender: null }],
    // Row 5 (Seats 17-20)
    [{ id: 17, number: 17, status: 'booked', gender: 'female' }, { id: 18, number: 18, status: 'booked', gender: 'female' }, null, { id: 19, number: 19, status: 'available', gender: null }, { id: 20, number: 20, status: 'available', gender: null }],
    // Row 6 (Seats 21-24)
    [{ id: 21, number: 21, status: 'booked', gender: 'female' }, { id: 22, number: 22, status: 'available', gender: null }, null, { id: 23, number: 23, status: 'available', gender: null }, { id: 24, number: 24, status: 'available', gender: null }],
    // Row 7 (Seats 25-28)
    [{ id: 25, number: 25, status: 'available', gender: null }, { id: 26, number: 26, status: 'available', gender: null }, null, { id: 27, number: 27, status: 'available', gender: null }, { id: 28, number: 28, status: 'available', gender: null }],
    // Row 8 (Seats 29-32)
    [{ id: 29, number: 29, status: 'available', gender: null }, { id: 30, number: 30, status: 'available', gender: null }, null, { id: 31, number: 31, status: 'available', gender: null }, { id: 32, number: 32, status: 'available', gender: null }],
    // Row 9 (Seats 33-36)
    [{ id: 33, number: 33, status: 'available', gender: null }, { id: 34, number: 34, status: 'available', gender: null }, null, { id: 35, number: 35, status: 'available', gender: null }, { id: 36, number: 36, status: 'available', gender: null }],
    // Row 10 (Seats 37-40)
    [{ id: 37, number: 37, status: 'available', gender: null }, { id: 38, number: 38, status: 'available', gender: null }, null, { id: 39, number: 39, status: 'available', gender: null }, { id: 40, number: 40, status: 'available', gender: null }],
    // Row 11 (Seats 41-44)
    [{ id: 41, number: 41, status: 'available', gender: null }, { id: 42, number: 42, status: 'available', gender: null }, null, { id: 43, number: 43, status: 'available', gender: null }, { id: 44, number: 44, status: 'available', gender: null }],
    // Row 12 (Seats 45-48)
    [{ id: 45, number: 45, status: 'available', gender: null }, { id: 46, number: 46, status: 'available', gender: null }, null, { id: 47, number: 47, status: 'available', gender: null }, { id: 48, number: 48, status: 'available', gender: null }],
  
  ];

  // Dynamically create the last row to center seats
  const lastRowSeats = [
    { id: 49, number: 49, status: 'available', gender: null },
    { id: 50, number: 50, status: 'available', gender: null },
    { id: 51, number: 51, status: 'available', gender: null },
    // Add more seats here if needed, the centering logic will adjust
  ];

  const totalSeatsLastRow = lastRowSeats.length;
  const totalPossiblePositions = 5; // Assuming the widest row has 5 seat positions including aisles
  const emptySpacesNeeded = totalPossiblePositions - totalSeatsLastRow;
  const emptySpacesEachSide = Math.floor(emptySpacesNeeded / 2);

  const centeredLastRow = [
    ...Array(emptySpacesEachSide).fill(null),
    ...lastRowSeats,
    ...Array(emptySpacesNeeded - emptySpacesEachSide).fill(null),
  ];

  const fullSeatLayoutData = [...seatLayoutData, centeredLastRow];

  // Handle showing the bottom sheet to select gender when an available seat is pressed
  const handleSeatPress = (seat: Seat) => {
    // If the seat is already selected, deselect it
    if (selectedSeats.includes(seat.id)) {
      const newSelectedSeats = selectedSeats.filter(id => id !== seat.id);
      setSelectedSeats(newSelectedSeats);
      onSeatsSelectedChange(newSelectedSeats.length);
      return;
    }
    
    // Check if maximum seats limit is reached
    if (selectedSeats.length >= MAX_SEATS) {
      Alert.alert(
        'Maximum Seats Reached',
        `You can select a maximum of ${MAX_SEATS} seats.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Only proceed if the seat is available and gender is null
    if (seat.status === 'available' && seat.gender === null) {
      setCurrentSeat(seat);
      setShowGenderSheet(true); // Show the local bottom sheet
    }
  };
  
  // Handle gender selection from the bottom sheet
  const handleGenderSelect = (gender: 'male' | 'female') => {
    if (!currentSeat) return;
    
    // Add the seat to selected seats
    const newSelectedSeats = [...selectedSeats, currentSeat.id];
    setSelectedSeats(newSelectedSeats);
    onSeatsSelectedChange(newSelectedSeats.length);
    
    // Close the bottom sheet
    setShowGenderSheet(false);
    setCurrentSeat(null);
  };

  const renderSeat = (seat: Seat | null) => {
    if (!seat) {
      // Render an empty space for the aisle
      return <View key={Math.random()} style={styles.aisleSpace} />;
    }

    // Check if the current seat is selected
    const isSelected = selectedSeats.includes(seat.id);

    let seatStyle = styles.availableSeat;
    let textColor = '#000';
    let isDisabled = false;
    let seatIcon = null;

    if (isSelected) {
      seatStyle = styles.selectedSeat;
      textColor = '#FFFFFF';
    } else if (seat.status === 'driver') {
      return (
        <View key={seat.id} style={styles.driverSeatContainer}>
          <Text style={styles.driverText}>Driver</Text>
          <MaterialCommunityIcons name="steering" size={30} color="#666" style={styles.driverSeatIcon} />
        </View>
      );
    } else if (seat.gender === 'male') {
      seatStyle = styles.maleSeat;
      textColor = '#FFFFFF';
      isDisabled = true;
      seatIcon = <FontAwesome name="male" size={12} color="white" style={styles.seatIcon} />;
    } else if (seat.gender === 'female') {
      seatStyle = styles.femaleSeat;
      textColor = '#FFFFFF';
      isDisabled = true;
      seatIcon = <FontAwesome name="female" size={12} color="white" style={styles.seatIcon} />;
    }

    return (
      <TouchableOpacity
        key={seat.id}
        style={[styles.seat, seatStyle, isDisabled && styles.disabledSeat]}
        onPress={() => handleSeatPress(seat)}
        disabled={isDisabled || (seat.status !== 'available' && !isSelected)}
        activeOpacity={isDisabled ? 1 : 0.7}
      >
        <Text style={[styles.seatText, { color: textColor }]}>{seat.number}</Text>
        {seatIcon}
      </TouchableOpacity>
    );
  };

  const renderSeatRow = (seatsInRow: any[], index: number) => {
    return (
      <View style={styles.seatRow} key={index}>
        {seatsInRow.map(renderSeat)}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.mainContainer}>
          <View style={styles.scrollViewWrapper}>
            <ScrollView 
              style={{flex: 1}}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Legend */}
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColorBox, styles.availableSeatColor]} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColorBox, styles.selectedSeatColor]} />
                  <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColorBox, styles.maleSeatColor]} />
                  <Text style={styles.legendText}>Male</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColorBox, styles.femaleSeatColor]} />
                  <Text style={styles.legendText}>Female</Text>
                </View>
              </View>

              {/* Info Card */}
              <View style={styles.infoCardContainer}>
                <Text style={styles.infoCardText}>
                  Tap any available seat to select it. You can select a maximum of 5 seats.
                </Text>
              </View>

              {/* Driver's Seat */}
              <View style={styles.driverSeatContainer}>
                <MaterialCommunityIcons name="steering" size={40} color="#666" style={styles.driverSeatIcon} />
              </View>

              {/* Seat Layout */}
              <View style={styles.seatLayoutContainer}>
                {fullSeatLayoutData.map((row, index) => renderSeatRow(row, index))}
              </View>

              {/* Add bottom padding to ensure content is visible above the book button */}
              <View style={styles.bottomPadding} />
            </ScrollView>
          </View>

          {/* Book Button - Fixed at bottom */}
          <View style={styles.bookButtonContainer}>
            <TouchableOpacity 
              style={[styles.bookButton, selectedSeats.length === 0 && styles.bookButtonDisabled]}  
              onPress={() => {
                if (selectedSeats.length > 0 && onBookmePress) {
                  onBookmePress();
                } else if (selectedSeats.length === 0) {
                  Alert.alert('Bookme', 'Please select at least one seat.');
                }
              }}
              disabled={selectedSeats.length === 0}
            >
              <Text style={styles.bookButtonText}>Bookme</Text>
              <Text style={styles.bookButtonPrice}>Rs 1,750</Text>
            </TouchableOpacity>
          </View>

          {/* Gender Selection Bottom Sheet */}
          <SeatGenderSelectionBottomSheet
            visible={showGenderSheet}
            seatNumber={currentSeat?.number || 0}
            onGenderSelect={handleGenderSelect}
            onSheetClose={() => {
              setShowGenderSheet(false);
              setCurrentSeat(null);
            }}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1
  },
  scrollViewWrapper: {
    flex: 0.3,
  },
  scrollContainer: {
    borderWidth: 2,
    margin: 23,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#333',
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  availableSeatColor: {
    backgroundColor: '#FFFFFF',
  },
  selectedSeatColor: {
    backgroundColor: '#F6B400',
  },
  maleSeatColor: {
    backgroundColor: '#00294D',
  },
  femaleSeatColor: {
    backgroundColor: '#FF40B4',
  },
  driverSeatContainer: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  driverSeatIcon: {
    width: 40,
    height: 40,
  },
  driverText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  seatLayoutContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  seat: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  seatText: {
    fontSize: 14,
    fontWeight: '500',
  },
  seatIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  disabledSeat: {
    opacity: 0.9,
  },
  availableSeat: {
    backgroundColor: '#FFFFFF',
  },
  selectedSeat: {
    backgroundColor: '#F6B400',
    borderColor: '#F6B400',
  },
  maleSeat: {
    backgroundColor: '#00294D',
    borderColor: '#00294D',
  },
  femaleSeat: {
    backgroundColor: '#FF40B4',
    borderColor: '#FF40B4',
  },
  aisleSpace: {
    width: 20,
    height: 45,
    margin: 4,
  },
  infoCardContainer: {
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  infoCardText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#004d40',
  },
  bookButtonContainer: {
    paddingBottom: 30,
    paddingTop: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookButtonDisabled: {
    opacity: 0.7,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookButtonPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 20,
  },
});

export default SeatSelectionComponent;