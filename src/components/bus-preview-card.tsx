import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts } from '../constants/fonts';

interface BusPreviewCardProps {
  bus: any;
  onPress?: () => void;
}

const BusPreviewCard = ({ bus, onPress }: BusPreviewCardProps) => {
  const { tripDetails, facilities, rewards } = bus;
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.93} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.busOperator}>{tripDetails.busOperator}</Text>
        <Text style={styles.busType}>{tripDetails.busType}</Text>
      </View>
      <View style={styles.routeRow}>
        <Text style={styles.cityCode}>{tripDetails.departureCityCode}</Text>
        <MaterialIcons name="arrow-forward" size={22} color="#3B82F6" style={{ marginHorizontal: 8 }} />
        <Text style={styles.cityCode}>{tripDetails.arrivalCityCode}</Text>
        <Text style={styles.time}>{tripDetails.departureTime}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.seatType}>{facilities.seatType}</Text>
        {facilities.airConditioning && (
          <MaterialIcons name="ac-unit" size={16} color="#3B82F6" style={{ marginLeft: 6 }} />
        )}
        <Text style={styles.seatsLeft}>{tripDetails.availableSeats} Seats Left</Text>
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.earnPoints}>Earn up to <Text style={styles.points}>{rewards.pointsEarnable}</Text></Text>
        <Text style={styles.priceLabel}>Rs <Text style={styles.price}>{tripDetails.ticketPrice.amount.toLocaleString()}</Text></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  busOperator: {
    fontFamily: Fonts.montserratBold,
    fontSize: 15,
    color: '#1F2937',
  },
  busType: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
    color: '#6B7280',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cityCode: {
    fontFamily: Fonts.montserratBold,
    fontSize: 16,
    color: '#3B82F6',
  },
  time: {
    marginLeft: 'auto',
    fontFamily: Fonts.montserratMedium,
    fontSize: 14,
    color: '#1F2937',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  seatType: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
    color: '#6B7280',
  },
  seatsLeft: {
    marginLeft: 'auto',
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
    color: '#3B82F6',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  earnPoints: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
    color: '#F59E42',
  },
  points: {
    fontFamily: Fonts.montserratBold,
    color: '#F59E42',
  },
  priceLabel: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 15,
    color: '#1F2937',
  },
  price: {
    fontFamily: Fonts.montserratBold,
    fontSize: 18,
    color: '#3B82F6',
  },
});

export default BusPreviewCard; 