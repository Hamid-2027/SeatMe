import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons'; // Or use react-native-vector-icons

const DestinationRoutingComponent = () => {
  const data = {
    departure: {
      time: '10:00 PM',
      city: 'Multan',
      address: 'New AC terminal stand number 10\nGeneral Bus Stand Multan',
    },
    arrival: {
      time: '05:00 AM',
      city: 'Islamabad',
      address: 'Raja Travel Faizabad near faizabad\nmetro station I J principal road I-8/4, Islamabad',
    },
    duration: '07h 00m',
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{data.departure.time}</Text>
        <View style={styles.timeGap} />
        <Text style={styles.timeText}>{data.arrival.time}</Text>
      </View>

      <View style={styles.timeline}>
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.circle} />
      </View>

      <View style={styles.infoColumn}>
        <View style={styles.citySection}>
          <Text style={styles.cityText}>{data.departure.city}</Text>
          <Text style={styles.addressText}>{data.departure.address}</Text>
          <View style={styles.durationBox}>
            <Feather name="clock" size={16} color="#999" />
            <Text style={styles.durationText}>{data.duration}</Text>
          </View>
        </View>

        <View style={styles.citySection}>
          <Text style={styles.cityText}>{data.arrival.city}</Text>
          <Text style={styles.addressText}>{data.arrival.address}</Text>
        </View>
      </View>

      <View style={styles.mapColumn}>
        <View style={styles.mapCircle}>
          <MaterialIcons name="location-pin" size={20} color="white" />
        </View>
        <View style={styles.mapGap} />
        <View style={styles.mapCircle}>
          <MaterialIcons name="location-pin" size={20} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  timeColumn: {
    width: 60,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  timeGap: {
    flex: 1,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0060D6',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#ccc',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  citySection: {
    marginBottom: 12,
  },
  cityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  mapColumn: {
    alignItems: 'center',
    marginLeft: 10,
  },
  mapCircle: {
    backgroundColor: '#003E9C',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGap: {
    flex: 1,
  },
});

export default DestinationRoutingComponent;
