import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmBusDetailsComponent from '../../components/payment-flow-components/confirm-bus-details-component';
import { useNavigation } from '@react-navigation/native';
import SeatSelectionComponent from '../../components/payment-flow-components/seat-selection-component';
import AddPassengerDetailsComponent from '../../components/payment-flow-components/add-passenger-details-component';
import ReviewBookingDetailsComponent from '../../components/payment-flow-components/review-booking-details-component';
import { Seat } from '../../components/payment-flow-components/seat-selection-component'; // Import Seat type

interface ComingSoonStepProps {
  step: number;
}

// Placeholder for other steps
const ComingSoonStep: React.FC<ComingSoonStepProps> = ({ step }) => (
  <View style={styles.comingSoonContainer}>
    <Text style={styles.comingSoonText}>Step {step} Coming Soon</Text>
  </View>
);
const HEADER_HEIGHT = 60;


const PaymentFlowMainScreen = () => {
  const [currentStep, setCurrentStep] = useState(2); // Initialize to step 2
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeatCount, setSelectedSeatCount] = useState(0); // State to track selected seats
  const totalSteps = 5; // Define total steps
  const navigation = useNavigation();
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : 44;

  const renderStepContent = () => {
    switch (currentStep) {
      case 2:
        return <ConfirmBusDetailsComponent />;
      case 3:
        return <SeatSelectionComponent 
          onSeatsSelectedChange={setSelectedSeatCount} 
          onBookmePress={handleBookmePress} 
        />;
      case 4:
        return <AddPassengerDetailsComponent />;
      case 5:
        return <ReviewBookingDetailsComponent />;
      case 1:
        return <ComingSoonStep step={currentStep} />;
      default:
        return null; 
    }
  };

  const renderProgressBar = () => {
    const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
      <View style={styles.progressBarContainer}>
        {stepsArray.map((step) => (
          <View
            key={step}
            style={[
              styles.progressBarSegment,
              step < currentStep ? styles.progressBarSegmentFilled : null,
              step === currentStep ? styles.progressBarSegmentActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  const handleBookmePress = () => {
    if (currentStep < totalSteps) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(prev => prev + 1);
      }, 1000); // Simulate async work
    } else {
      // Final step reached, navigate to payment screen
      navigation.navigate('PaymentScreen' as never);
    }
  };

  // Disable bookme button if no seats are selected on step 3
  const isBookmeButtonDisabled = currentStep === 3 && selectedSeatCount === 0;

  // Ref for the bottom sheet
  // Bottom sheet snap points
  // Callback to handle presenting the bottom sheet
  const handlePresentModalPress = useCallback((seat: Seat) => {
    // This function is no longer needed here as the bottom sheet logic is moved to SeatSelectionComponent
  }, []);

  // Callback to handle dismissing the bottom sheet

  // Effect to show/hide bottom sheet based on current step
  useEffect(() => {
    if (currentStep === 3) {
      // console.log('Attempting to present bottom sheet'); // Removed console log
      // Bottom sheet will be triggered by SeatSelectionComponent when a seat is pressed
    } else {
      // console.log('Attempting to dismiss bottom sheet'); // Removed console log
      // handleDismissModalPress is no longer needed
    }
  }, [currentStep]); // Removed handleDismissModalPress from dependencies

  return (
    <View style={[styles.container,{ backgroundColor: '#007BFF', paddingTop: topPadding || 0, height: HEADER_HEIGHT + (topPadding || 0) }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => {
              if (currentStep > 2) {
                setCurrentStep(prev => prev - 1);
                return true; 
              } else {
                navigation.goBack(); 
                return true;
              }
            }}
            disabled={isLoading}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>
              {currentStep === 2 ? 'Bus Detail' : currentStep === 3 ? 'Seat Selection' : currentStep === 4 ? 'Passenger Details' : currentStep === 5 ? 'Review Booking' : 'Payment Flow'}
            </Text>
            <Text style={styles.headerSubtitle}>21 May | All Bus Services | One Way</Text>
          </View>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step {currentStep} {currentStep === 2 ? 'Confirm Bus Detail' : currentStep === 3 ? 'Select Your Seat for Multan to Islamabad' : currentStep === 4 ? 'ADD PASSENGER DETAILS' : currentStep === 5 ? 'REVIEW BOOKING DETAILS' : 'Coming Soon'}</Text>
          {renderProgressBar()}
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderStepContent()}
            </ScrollView>

            {/* Book Button */}
            {currentStep !== 3 && (
              <View style={styles.bookButtonContainer}>
                <TouchableOpacity 
                  style={[styles.bookButton, (isLoading || isBookmeButtonDisabled) && styles.bookButtonDisabled]}
                  onPress={handleBookmePress}
                  disabled={isLoading || isBookmeButtonDisabled}
                >
                  <Text style={styles.bookButtonText}>Bookme</Text>
                  <Text style={styles.bookButtonPrice}>Rs 1,750</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007BFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
   headerSubtitle:{
    fontSize: 14,
    color: '#fff',
    marginLeft: 16,
    marginTop: 4,
   },
  stepIndicator: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
   stepText:{
    fontSize: 16,
    marginBottom: 8,
   },
   progressBarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
   },
    progressBarSegment:{
    flex: 1,
    height: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
    borderRadius: 2,
   },
   progressBarSegmentFilled:{
    backgroundColor: '#007BFF',
   },
   progressBarSegmentActive: {
    backgroundColor: '#7dc9ff', // Light blue color for active step
   },
   comingSoonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
   },
    comingSoonText:{
    fontSize: 18,
    color: '#666',
   },
  bookButtonContainer: {
    paddingBottom: 30,
    paddingTop:14,
    paddingHorizontal:20,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonDisabled: {
    opacity: 0.7,
  },
  bottomSheetContentContainer: { // Style for the bottom sheet content
    padding: 16,
    alignItems: 'center',
  },
  bottomSheetText: { // Style for text inside bottom sheet
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  bottomSheetTitle: { // Style for the bottom sheet title
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  seatNumberContainer: { // Style for the selected seat number container
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  seatNumberText: { // Style for the selected seat number text
    fontSize: 14,
    color: '#333',
  },
  seatTypeOptionsContainer: { // Style for the male/female selection options
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  seatTypeOption: { // Style for each seat type option
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  seatTypeColor: { // Style for the color box in seat type option
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  maleSeatColor: { // Male color
    backgroundColor: '#00294D',
  },
  femaleSeatColor: { // Female color
    backgroundColor: '#FF40B4',
  },
  bottomSheetBackground: { // Style for the bottom sheet background
    backgroundColor: '#f0f0f0',
  },
  seatTypeLabel: { // Added style for seat type labels
    fontSize: 16,
    color: '#333',
  },
});

export default PaymentFlowMainScreen; 