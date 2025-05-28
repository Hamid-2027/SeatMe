import * as React from 'react';
import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Pressable,
  Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Northern Pakistan Cities
const northernCities = [
  { id: '1', name: 'Islamabad' },
  { id: '2', name: 'Rawalpindi' },
  { id: '3', name: 'Murree' },
  { id: '4', name: 'Abbottabad' },
  { id: '5', name: 'Mansehra' },
  { id: '6', name: 'Naran' },
  { id: '7', name: 'Kaghan' },
  { id: '8', name: 'Gilgit' },
  { id: '9', name: 'Skardu' },
  { id: '10', name: 'Hunza' },
  { id: '11', name: 'Chitral' },
  { id: '12', name: 'Swat' },
];

const SearchTicket = () => {
  const navigation = useNavigation();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (fromCity && toCity) {
      navigation.navigate('searchBusScreen', {
        source: fromCity,
        destination: toCity,
      });
    }
  };

  const filteredCities = northernCities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Find Your Seat</Text>
        
        <View style={styles.locationInputsRow}>
          {/* From Field */}
          <Pressable 
            style={styles.inputContainerHalf}
            onPress={() => setShowFromDropdown(true)}
          >
            <MaterialIcons name="location-on" size={20} color="#3B82F6" />
            <Text style={[styles.input, !fromCity && styles.placeholderText]}>
              {fromCity || "From"}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#9CA3AF" />
          </Pressable>

          {/* Divider */}
          <View style={styles.verticalDivider} />
          
          {/* To Field */}
          <Pressable 
            style={styles.inputContainerHalf}
            onPress={() => setShowToDropdown(true)}
          >
            <MaterialIcons name="location-on" size={20} color="#3B82F6" />
            <Text style={[styles.input, !toCity && styles.placeholderText]}>
              {toCity || "To"}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#9CA3AF" />
          </Pressable>

          {/* From City Dropdown Modal */}
          <Modal
            visible={showFromDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowFromDropdown(false)}
          >
            <Pressable 
              style={styles.modalOverlay}
              onPress={() => {
                setShowFromDropdown(false);
                setSearchQuery('');
              }}
            >
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownTitle}>Select Departure City</Text>
                <View style={styles.searchBarContainer}>
                  <MaterialIcons name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <FlatList
                  data={filteredCities}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.cityItem}
                      onPress={() => {
                        setFromCity(item.name);
                        setShowFromDropdown(false);
                        setSearchQuery('');
                      }}
                    >
                      <Text style={styles.cityName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Pressable>
          </Modal>

          {/* To City Dropdown Modal */}
          <Modal
            visible={showToDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowToDropdown(false)}
          >
            <Pressable 
              style={styles.modalOverlay}
              onPress={() => {
                setShowToDropdown(false);
                setSearchQuery('');
              }}
            >
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownTitle}>Select Destination City</Text>
                <View style={styles.searchBarContainer}>
                  <MaterialIcons name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <FlatList
                  data={filteredCities}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.cityItem}
                      onPress={() => {
                        setToCity(item.name);
                        setShowToDropdown(false);
                        setSearchQuery('');
                      }}
                    >
                      <Text style={styles.cityName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Pressable>
          </Modal>
        </View>
        
        <View style={styles.dateTimeInputs}>
          <TouchableOpacity style={styles.dateContainer}>
            <MaterialIcons name="calendar-today" size={18} color="#3B82F6" />
            <Text style={styles.dateText}>15 May 2025</Text>
            <MaterialIcons name="arrow-drop-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.timeContainer}>
            <MaterialIcons name="access-time" size={18} color="#3B82F6" />
            <Text style={styles.timeText}>Any Time</Text>
            <MaterialIcons name="arrow-drop-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
          activeOpacity={0.9}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  locationInputsRow: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    height: 45,
  },
  inputContainerHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '85%',
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  cityItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cityName: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  dateTimeInputs: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 38,
  },
  dateText: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
    color: '#1F2937',
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 38,
  },
  timeText: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
    color: '#1F2937',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1F2937',
  },
});

export default SearchTicket;
