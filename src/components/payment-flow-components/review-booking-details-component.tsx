import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ReviewBookingDetailsComponent: React.FC = () => {
  const [useBookmeBalance, setUseBookmeBalance] = useState(false);
  const [busDetailExpanded, setBusDetailExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Outbound Trip Section */}
          <View style={styles.card}>
            <View style={styles.outboundHeader}>
              <Text style={styles.outboundTitle}>Outbound</Text>
              <Text style={styles.outboundDate}>Wed, 21 May, 2025</Text>
            </View>
            
            <View style={styles.tripDetails}>
              <View style={styles.busCompanySection}>
                <Image 
                  source={require('../../../assets/Buses/Daewoo-Express.jpg')} 
                  style={styles.busCompanyLogo}
                  resizeMode="contain"
                />
              </View>
              
              <View style={styles.routeSection}>
                <View style={styles.routeRow}>
                  <Text style={styles.cityCode}>MTN</Text>
                  <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-forward" size={24} color="#666" />
                  </View>
                  <Text style={styles.cityCode}>ISB</Text>
                  <Text style={styles.departureTime}>10:00 PM</Text>
                </View>
                
                <View style={styles.amenitiesRow}>
                  <View style={styles.amenityItem}>
                    <Ionicons name="wifi" size={18} color="#007BFF" />
                  </View>
                  <View style={styles.amenityItem}>
                    <Ionicons name="bed-outline" size={18} color="#007BFF" />
                  </View>
                  <View style={styles.amenityItem}>
                    <Ionicons name="snow-outline" size={18} color="#007BFF" />
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Selected Seats Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Selected Seats</Text>
            <View style={styles.seatsContainer}>
              <View style={[styles.seatBadge, styles.pinkSeatBadge]}>
                <Text style={styles.seatNumber}>26</Text>
              </View>
              <View style={[styles.seatBadge, styles.blueSeatBadge]}>
                <Text style={styles.seatNumber}>25</Text>
              </View>
            </View>
          </View>
          
          {/* Bus Detail Section */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => setBusDetailExpanded(!busDetailExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.collapsibleHeader}>
              <View style={styles.collapsibleLeft}>
                <Image 
                  source={require('../../../assets/Buses/Daewoo-Express.jpg')} 
                  style={styles.smallBusLogo}
                  resizeMode="contain"
                />
                <Text style={styles.collapsibleTitle}>Bus Detail</Text>
              </View>
              <MaterialIcons 
                name={busDetailExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#999" 
              />
            </View>
            
            {busDetailExpanded && (
              <View style={styles.collapsedContent}>
                {/* Bus details go here when expanded */}
                <Text style={styles.detailText}>Bus Type: Premium</Text>
                <Text style={styles.detailText}>License Plate: ABC-123</Text>
              </View>
            )}
          </TouchableOpacity>
          
          {/* Passenger Details Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Passenger Details</Text>
            <View style={styles.passengerInfo}>
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>hh</Text>
              </View>
              <View style={styles.passengerTag}>
                <Text style={styles.passengerTagText}>Main</Text>
              </View>
            </View>
            <Text style={styles.passengerContact}>
              hamidhussain93017@gmail.com, 97676-6767686-7, 923485959152
            </Text>
          </View>
          
          {/* Add Voucher Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add a Voucher</Text>
            <TouchableOpacity style={styles.voucherButton}>
              <Text style={styles.voucherButtonText}>View available options</Text>
              <MaterialIcons name="chevron-right" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
          
          {/* Bookme Balance Section */}
          <View style={styles.card}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceTitle}>Use Bookme Balance</Text>
              <Switch
                value={useBookmeBalance}
                onValueChange={(value) => setUseBookmeBalance(value)}
                trackColor={{ false: '#d9d9d9', true: '#999' }}
                thumbColor={useBookmeBalance ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            <Text style={styles.balanceAmount}>Rs 0</Text>
          </View>
          
      
          {/* Payment Summary Section */}
          <View style={styles.card}>
            <Text style={styles.paymentTitle}>Payment</Text>
            <View style={styles.divider} />
            
            <Text style={styles.sectionLabel}>SubTotal</Text>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentItem}>Outbound</Text>
              <Text style={styles.paymentPrice}>Rs 3,500</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentItem}>Seat no. 25 (Discounted)</Text>
              <Text style={styles.paymentPrice}>Rs 1,750</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentItem}>Seat no. 26 (Discounted)</Text>
              <Text style={styles.paymentPrice}>Rs 1,750</Text>
            </View>
            
            <Text style={[styles.sectionLabel, styles.extraMarginTop]}>Extras</Text>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentItem}>Service Fee</Text>
              <Text style={styles.paymentPrice}>Rs 14</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentItem}>Tax</Text>
              <Text style={styles.paymentPrice}>Rs 0</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount to be paid</Text>
              <Text style={styles.totalPrice}>Rs 3,514</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  outboundHeader: {
    marginBottom: 15,
  },
  outboundTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  outboundDate: {
    fontSize: 16,
    color: '#999',
    marginTop: 3,
  },
  tripDetails: {
    flexDirection: 'column',
  },
  busCompanySection: {
    marginBottom: 10,
  },
  busCompanyLogo: {
    width: 100,
    height: 30,
  },
  routeSection: {
    marginTop: 5,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cityCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  arrowContainer: {
    marginHorizontal: 15,
  },
  departureTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 'auto',
  },
  amenitiesRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  amenityItem: {
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatBadge: {
    width: 50,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pinkSeatBadge: {
    backgroundColor: '#FF40B4',
  },
  blueSeatBadge: {
    backgroundColor: '#006699',
  },
  seatNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsibleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBusLogo: {
    width: 50,
    height: 20,
    marginRight: 10,
  },
  collapsibleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  collapsedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialsText: {
    fontSize: 16,
    color: '#333',
  },
  passengerTag: {
    backgroundColor: '#007BFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  passengerTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  passengerContact: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  voucherButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherButtonText: {
    fontSize: 16,
    color: '#007BFF',
    marginRight: 5,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceAmount: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
  },
  bookmebroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  bookmebroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookmebroPrice: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  paymentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  sectionLabel: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  extraMarginTop: {
    marginTop: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentItem: {
    fontSize: 16,
    color: '#666',
  },
  paymentPrice: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ReviewBookingDetailsComponent;
