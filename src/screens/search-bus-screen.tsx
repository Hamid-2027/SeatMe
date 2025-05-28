import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { busDetails } from '../data/busDetails';
import BusPreviewCard from '../components/bus-preview-card';
import { Fonts } from '../constants/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import CustomBottomSheet from '../components/bottom-sheets/bottom-sheet';
import DummyBusCard from '../components/dummy-bus-card';
import { RootStackNavigationProp } from '../navigation/MainAppStack';
import { StatusBar } from 'expo-status-bar';

type Bus = typeof busDetails[0];
type SearchBusScreenRouteParams = {
  source: string;
  destination: string;
};

const filterTags = [
  { key: 'date', label: '30 May', icon: 'calendar-today' },
  { key: 'sort', label: 'Sort', icon: 'sort' },
  { key: 'busType', label: 'Bus Type', icon: 'directions-bus' },
];

const sortOptions = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'priceLowHigh', label: 'Price (low to high)' },
  { key: 'priceHighLow', label: 'Price (high to low)' },
  { key: 'earliest', label: 'Earliest' },
];

const SearchBusScreen = () => {
  const route = useRoute<RouteProp<Record<string, SearchBusScreenRouteParams>, string>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { source, destination } = (route.params || {}) as SearchBusScreenRouteParams;
  const [search, setSearch] = useState('');
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const { width } = Dimensions.get('window');

  useEffect(() => {
    filterBuses(search);
  }, [search, source, destination]);

  const filterBuses = (query: string) => {
    let results = busDetails.filter(bus => {
      const fromMatch = !source || bus.tripDetails.departureCity.toLowerCase().includes(source.toLowerCase());
      const toMatch = !destination || bus.tripDetails.arrivalCity.toLowerCase().includes(destination.toLowerCase());
      const searchMatch = !query || (
        bus.tripDetails.busOperator.toLowerCase().includes(query.toLowerCase()) ||
        bus.tripDetails.busType.toLowerCase().includes(query.toLowerCase())
      );
      return fromMatch && toMatch && searchMatch;
    });
    setFilteredBuses(results);
  };

  const handleDummyCardPress = () => {
    console.log('Dummy card pressed');
    navigation.navigate('PaymentFlowMainScreen');
  };

  return (
    <View style={{ flex: 1, borderWidth:1, }}>
        <StatusBar style="light" />
      <View style={{ backgroundColor: '#2563EB', height: 120, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <View style={{ height: 60 }} />
      </View>
      {/* White card for route and filters, overlapping header */}
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 18,
        marginHorizontal: 16,
        marginTop: -60,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{ fontFamily: Fonts.montserratBold, fontSize: 22, color: '#1C1C1E', marginBottom: 2 }}>Available Buses</Text>
        <Text style={{ fontFamily: Fonts.montserratMedium, fontSize: 15, color: '#2563EB', marginBottom: 12 }}>{source} → {destination}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          {filterTags.map(tag => (
            <TouchableOpacity
              key={tag.key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F6F8FB',
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 7,
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
              activeOpacity={0.8}
              onPress={tag.key === 'sort' ? () => setShowSortSheet(true) : undefined}
            >
              <MaterialIcons name={tag.icon as any} size={18} color="#2563EB" style={{ marginRight: 4 }} />
              <Text style={{ fontFamily: Fonts.montserratMedium, fontSize: 14, color: '#2563EB' }}>{tag.label}</Text>
              {tag.key === 'busType' && (
                <MaterialIcons name="arrow-drop-down" size={18} color="#9CA3AF" style={{ marginLeft: 2 }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Search bar */}
      <View style={{ paddingHorizontal: 18, paddingVertical: 10, backgroundColor: 'transparent' }}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by operator or type..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {/* Dummy static bus card always at the top */}
      <View style={{ paddingHorizontal: 18, marginTop: 8 }}>
        <DummyBusCard onPress={handleDummyCardPress} />
      </View>
      <FlatList
        data={filteredBuses}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <BusPreviewCard bus={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.noResults}>No buses found.</Text>}
      />
      {showSortSheet && (
        <CustomBottomSheet
          snapPoints={['49%']}
          index={0}
          onChange={(index: number) => { if (index === -1) setShowSortSheet(false); }}
        >
          <View style={styles.sheetContent}>
            <TouchableOpacity
              style={styles.sheetCloseButton}
              onPress={() => setShowSortSheet(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="close" size={23} color="#000" />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>Sort</Text>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                style={styles.sortOptionRow}
                onPress={() => setSelectedSort(option.key)}
                activeOpacity={0.7}
              >
                <View style={styles.radioCircle}>
                  {selectedSort === option.key && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.sortOptionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.sheetActionsRow}>
              <TouchableOpacity style={styles.resetButton} onPress={() => setSelectedSort('recommended')}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => setShowSortSheet(false)}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomBottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? 55 : 0,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: Fonts.montserratBold,
    fontSize: 20,
    color: '#1F2937',
  },
  subtitle: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  filterTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 2,
    backgroundColor: '#F9FAFB',
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTagText: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 14,
    color: '#1F2937',
  },
  searchBarContainer: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    color: '#1F2937',
    fontFamily: Fonts.montserratMedium,
  },
  listContent: {
    padding: 18,
  },
  noResults: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontFamily: Fonts.montserratMedium,
    marginTop: 40,
    fontSize: 16,
  },
  sheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  sheetTitle: {
    fontFamily: Fonts.montserratBold,
    fontSize: 18,
    marginBottom: 18,
    color: '#1F2937',
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  sortOptionLabel: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 16,
    color: '#1F2937',
  },
  sheetActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  resetButtonText: {
    color: '#2563EB',
    fontFamily: Fonts.montserratBold,
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: Fonts.montserratBold,
    fontSize: 16,
  },
  sheetCloseButton: {
    position: 'absolute',
    top: 0,
    backgroundColor:'lightgrey',
    borderRadius:40,
    right: 9,
    zIndex: 10,
    padding: 4,
  },
});

export default SearchBusScreen; 