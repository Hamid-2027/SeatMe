import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts } from '../constants/fonts';

interface DummyBusCardProps {
  onPress?: () => void;
}

const DummyBusCard: React.FC<DummyBusCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.9}>
      {/* Top Row: Logo, Route, Time */}
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/Buses/images.jpeg')}
          style={styles.logoImg}
          resizeMode="contain"
        />
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <Text style={styles.cityCode}>MTN</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#1C1C1E" style={{ marginHorizontal: 6 }} />
            <Text style={styles.cityCode}>ISB</Text>
          </View>
          <View style={styles.amenitiesRow}>
            <MaterialIcons name="wifi" size={18} color="#2563EB" style={{ marginRight: 8 }} />
            <MaterialIcons name="event-seat" size={18} color="#2563EB" style={{ marginRight: 8 }} />
            <MaterialIcons name="ac-unit" size={18} color="#2563EB" />
          </View>
        </View>
        {/* Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>10:00 PM</Text>
        </View>
      </View>
      {/* Reward Row */}
      <View style={styles.rewardRow}>
        <View style={styles.earnRow}>
          <MaterialIcons name="emoji-events" size={18} color="#F25F4C" style={{ marginRight: 3 }} />
          <Text style={styles.earnText}>Earn up to </Text>
          <Text style={styles.earnCoin}>175</Text>
        </View>
        <Text style={styles.femaleTag}>Female</Text>
      </View>
      {/* Bus Type & Seats */}
      <View style={styles.busTypeRow}>
        <Text style={styles.busType}>Luxury 49</Text>
        <Text style={styles.seatsLeft}>20 Seats Left</Text>
      </View>
      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.oldPrice}>Rs 2,000</Text>
        <Text style={styles.newPrice}>Rs 1,750</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImg: {
    width: 48,
    height: 32,
    marginRight: 14,
    borderRadius:5,
  },
  routeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cityCode: {
    fontFamily: Fonts.montserratBold,
    fontSize: 18,
    color: '#1C1C1E',
  },
  amenitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  timeText: {
    fontFamily: Fonts.montserratBold,
    fontSize: 17,
    color: '#1C1C1E',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  earnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earnText: {
    color: '#8E8E93',
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
  },
  earnCoin: {
    color: '#F25F4C',
    fontFamily: Fonts.montserratBold,
    fontSize: 14,
    marginLeft: 2,
  },
  femaleTag: {
    color: '#7C3AED',
    fontFamily: Fonts.montserratBold,
    fontSize: 13,
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  busTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  busType: {
    color: '#8E8E93',
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
    marginRight: 10,
  },
  seatsLeft: {
    color: '#8E8E93',
    fontFamily: Fonts.montserratMedium,
    fontSize: 13,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  oldPrice: {
    color: '#8E8E93',
    fontFamily: Fonts.montserratMedium,
    fontSize: 15,
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  newPrice: {
    color: '#1C1C1E',
    fontFamily: Fonts.montserratBold,
    fontSize: 20,
  },
});

export default DummyBusCard; 