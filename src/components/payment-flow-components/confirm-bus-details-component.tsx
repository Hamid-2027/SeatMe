import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DestinationRoutingComponent from './destination-routing-component';


const ConfirmBusDetailsComponent = () => {
  

  return (
    <View>
      {/* Bus Details */}
      <View style={styles.busDetailsContainer}>
        <Image source={{ uri: 'placeholder' }} style={styles.busLogo} />
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>MTN</Text>
          <Text style={styles.routeArrow}>→</Text>
          <Text style={styles.routeText}>ISB</Text>
        </View>
        <Text style={styles.timeText}>10:00 PM</Text>
      </View>

      {/* Points */}
      <View style={styles.pointsContainer}>
        <Text>Earn up to ✨ 175 points per seat</Text>
      </View>

      {/* Variable Pricing */}
      <View style={styles.variablePricingContainer}>
        <Ionicons name="trending-up" size={24} color="#007BFF" />
        <View style={styles.variablePricingText}>
          <Text style={styles.variablePricingTitle}>Variable Pricing</Text>
          <Text>Seat price may vary depending on how soon tickets are bought. The earlier you buy, the more discount you get.</Text>
        </View>
      </View>

      {/* Seat Info */}
      <View style={styles.seatInfoContainer}>
        <Text>Luxury 49</Text>
        <Text>|</Text>
        <Text>20 Seats Left</Text>
        <Text>⭐ 5.0</Text>
      </View>

      {/* Route Details */}
      {/* <View style={styles.routeDetailsContainer}>
        <View style={styles.routeStop}>
          <Text style={styles.routeTime}>10:00 PM</Text>
          <View style={styles.routeTimeline}>
            <View style={styles.timelineDot}></View>
            <View style={styles.timelineLine}></View>
          </View>
          <View style={styles.routeLocation}>
            <Text style={styles.locationTitle}>Multan</Text>
            <Text>New AC terminal stand number 10 general Bus Stand Multan</Text>
            <View style={styles.durationContainer}>
               <Ionicons name="time-outline" size={16} color="#000" />
               <Text style={styles.durationText}>07h 00m</Text>
            </View>
          </View>
          <TouchableOpacity>
             <Ionicons name="location-sharp" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.routeStop}>
          <Text style={styles.routeTime}>05:00 AM</Text>
          <View style={styles.routeTimeline}>
             <View style={styles.timelineDot}></View>
          </View>
          <View style={styles.routeLocation}>
            <Text style={styles.locationTitle}>Islamabad</Text>
            <Text>Raja Travel Faizabad near faizabad metro station I J principal road I-8/ 4, Islamabad</Text>
          </View>
          <TouchableOpacity>
             <Ionicons name="location-sharp" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View> */}
       <DestinationRoutingComponent />

      {/* Onboard Facilities */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.facilitiesTitle}>Onboard Facilities</Text>
        <Text>What your selected bus has to offer.</Text>
        <View style={styles.facilityIcons}>
          <View style={styles.facilityItem}>
            <Ionicons name="wifi" size={24} color="#000" />
            <Text>WIFI</Text>
          </View>
          <View style={styles.facilityItem}>
            <MaterialCommunityIcons name="seat-recline-normal" size={24} color="#000" />
            <Text>Regular seat</Text>
          </View>
          <View style={styles.facilityItem}>
            <MaterialCommunityIcons name="snowflake" size={24} color="#000" />
            <Text>AC</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  busDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 5,
    borderBottomColor: '#f0f0f0',
  },
  busLogo: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
    backgroundColor:'blue',
    marginRight: 16,
    borderRadius:12,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeArrow: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsContainer: {
    padding: 16,
    backgroundColor: '#FFFFE0',
  },
  variablePricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
  },
  variablePricingText: {
    marginLeft: 10,
    flex: 1,
  },
  variablePricingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  seatInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  routeDetailsContainer: {
    padding: 16,
    borderBottomWidth: 5,
    borderBottomColor: '#f0f0f0',
  },
  routeStop: {
    flexDirection: 'row',
    marginBottom: 8,

  },
  routeTimeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#007BFF',
  },
  routeTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 16,
  },
  routeLocation: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  durationContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
   },
   durationText:{
    marginLeft: 4,
   },
  facilitiesContainer: {
    padding: 16,
  },
  facilitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  facilityIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  facilityItem:{
    alignItems: 'center',
  },
});

export default ConfirmBusDetailsComponent; 