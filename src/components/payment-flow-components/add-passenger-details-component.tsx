import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface AccountOption {
  id: string;
  label: string;
}

const AddPassengerDetailsComponent: React.FC = () => {
  // State for form fields and UI controls
  const [selectedDocType, setSelectedDocType] = useState<'cnic' | 'passport'>('cnic');
  const [saveDetails, setSaveDetails] = useState(true);
  
  // Sample account options
  const accountOptions: AccountOption[] = [
    { id: '1', label: 'nznzkkkkk' },
    { id: '2', label: 'nznz' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Main Passenger</Text>
            <Text style={styles.subtitle}>
              These details will be used to verify your identity at the bus station
            </Text>
          </View>

          {/* Account Options */}
          <View style={styles.accountOptionsContainer}>
            {accountOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.accountOptionPill}
              >
                <Text style={styles.accountOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={styles.manageButton}>
              <Ionicons name="settings-outline" size={16} color="#007BFF" style={styles.settingsIcon} />
              <Text style={styles.manageButtonText}>Manage favourite</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Document Type Selection */}
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setSelectedDocType('cnic')}
              >
                <View
                  style={[
                    styles.radioButton,
                    selectedDocType === 'cnic' && styles.radioButtonSelected,
                  ]}
                >
                  {selectedDocType === 'cnic' && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.radioLabel}>CNIC/Form B</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setSelectedDocType('passport')}
              >
                <View
                  style={[
                    styles.radioButton,
                    selectedDocType === 'passport' && styles.radioButtonSelected,
                  ]}
                >
                  {selectedDocType === 'passport' && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.radioLabel}>Passport</Text>
              </TouchableOpacity>
            </View>

            {/* CNIC Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={selectedDocType === 'cnic' ? 'CNIC' : 'Passport Number'}
                placeholderTextColor="#999"
              />
            </View>

            {/* Phone Number Field */}
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeContainer}>
                <View style={styles.flagContainer}>
                  <FontAwesome name="flag" size={16} color="#006600" />
                </View>
              </View>
              <TextInput
                style={styles.phoneInput}
                value="+923485959152"
                editable={false}
              />
            </View>

            {/* Email Field */}
            <View style={styles.emailSection}>
              <Text style={styles.emailLabel}>Email</Text>
              <View style={styles.emailInputContainer}>
                <TextInput
                  style={styles.emailInput}
                  value="hamidhussain93017@gmail.com"
                  editable={false}
                />
              </View>
              <Text style={styles.emailSubtext}>
                Your booking details will be sent to this email address
              </Text>
            </View>

            {/* Save Details Toggle */}
            <View style={styles.saveDetailsContainer}>
              <Text style={styles.saveDetailsText}>Save Details for future use</Text>
              <Switch
                value={saveDetails}
                onValueChange={(value) => setSaveDetails(value)}
                trackColor={{ false: '#d9d9d9', true: '#007BFF' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="#d9d9d9"
              />
            </View>

            {/* Nickname Field */}
            {saveDetails && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Nickname"
                  placeholderTextColor="#999"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  accountOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  accountOptionPill: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  accountOptionText: {
    color: '#333',
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  manageButtonText: {
    color: '#007BFF',
  },
  settingsIcon: {
    marginRight: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    borderColor: '#007BFF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  countryCodeContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  flagContainer: {
    backgroundColor: '#00A000',
    borderRadius: 2,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  emailSection: {
    marginBottom: 15,
  },
  emailLabel: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 5,
  },
  emailInputContainer: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  emailInput: {
    padding: 12,
    fontSize: 16,
  },
  emailSubtext: {
    fontSize: 14,
    color: '#999',
  },
  saveDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  saveDetailsText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddPassengerDetailsComponent;
