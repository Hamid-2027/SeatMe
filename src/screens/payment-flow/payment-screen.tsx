import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { RootStackParamList, RootStackNavigationProp } from '../../navigation/MainAppStack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PaymentMethodBottomSheet from '../../components/bottom-sheets/payment-method-bottom-sheet';

const PaymentScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [countdown, setCountdown] = useState('00:29:56');
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : 44;
  
  // Bottom sheet state
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  
  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevTime => {
        const [minutes, seconds] = prevTime.split(':').map(Number);
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        
        if (newMinutes < 0) {
          clearInterval(timer);
          return '00:00';
        }
        
        return `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle presenting the bottom sheet
  const handlePresentModalPress = useCallback((paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setBottomSheetVisible(true);
  }, []);

  // Handle dismissing the bottom sheet
  const handleDismissModalPress = useCallback(() => {
    setBottomSheetVisible(false);
  }, []);

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    if (method === 'jazzcash' || method === 'easypaisa') {
      handlePresentModalPress(method);
    } else {
      setSelectedPaymentMethod(method);
    }
  };

  // Handle account selection
  const handleAccountSelect = (account: string) => {
    setSelectedAccount(account);
  };

  // Handle pay button press
  const handlePayPress = () => {
    // Implement payment processing logic here
    // navigation.goBack();
    navigation.navigate('TabHome');
  };

  // Handle different number press
  const handleDifferentNumberPress = useCallback(() => {
    // Implement navigation to a different number input screen
    console.log('Navigate to different number input');
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { paddingTop: topPadding || 0 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
          
          <View style={styles.content}>
            {/* Payment Details */}
            <View style={styles.paymentDetailRow}>
              <Text style={styles.paymentDetailLabel}>Amount to be paid</Text>
              <Text style={styles.paymentDetailValue}>Rs 3,514</Text>
            </View>
            
            <View style={styles.paymentDetailRow}>
              <Text style={styles.paymentDetailLabel}>Booking expires in</Text>
              <Text style={styles.paymentDetailValue}>{countdown}</Text>
            </View>
            
            {/* Payment Methods */}
            <View style={styles.paymentMethodsContainer}>
              {/* Credit/Debit Card Option */}
              <TouchableOpacity 
                style={styles.paymentMethodItem}
                onPress={() => handlePaymentMethodSelect('card')}
              >
                <View style={styles.paymentMethodLeft}>
                <Image 
                    source={require('../../../assets/icons/Stripe.png')} 
                    style={styles.paymentMethodIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.paymentMethodTextContainer}>
                    <Text style={styles.paymentMethodTitle}>Debit/Credit Card (Master and VISA Cards)</Text>
                    <Text style={styles.paymentMethodFee}>(+36 PKR)</Text>
                  </View>
                </View>
                <View style={styles.feeIndicator}>
                  <Ionicons name="information-circle-outline" size={18} color="#007BFF" />
                  <Text style={styles.feeIndicatorText}>+36 PKR</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </TouchableOpacity>
              
              {/* JazzCash Option */}
              <TouchableOpacity 
                style={styles.paymentMethodItem}
                onPress={() => handlePaymentMethodSelect('jazzcash')}
              >
                <View style={styles.paymentMethodLeft}>
                  <Image 
                    source={require('../../../assets/icons/Jazzcash.png')} 
                    style={styles.paymentMethodIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.paymentMethodTextContainer}>
                    <Text style={styles.paymentMethodTitle}>Jazzcash Mobile Wallet</Text>
                    <Text style={styles.paymentMethodFee}>(+18 PKR)</Text>
                  </View>
                </View>
                <View style={styles.feeIndicator}>
                  <Ionicons name="information-circle-outline" size={18} color="#007BFF" />
                  <Text style={styles.feeIndicatorText}>+18 PKR</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </TouchableOpacity>
              
              {/* EasyPaisa Option */}
              <TouchableOpacity 
                style={styles.paymentMethodItem}
                onPress={() => handlePaymentMethodSelect('easypaisa')}
              >
                <View style={styles.paymentMethodLeft}>
                  <Image 
                    source={require('../../../assets/icons/Easypaisa.png')} 
                    style={styles.paymentMethodIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.paymentMethodTextContainer}>
                    <Text style={styles.paymentMethodTitle}>Easypaisa Mobile Account</Text>
                    <Text style={styles.paymentMethodFee}>(+18 PKR)</Text>
                  </View>
                </View>
                <View style={styles.feeIndicator}>
                  <Ionicons name="information-circle-outline" size={18} color="#007BFF" />
                  <Text style={styles.feeIndicatorText}>+18 PKR</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </TouchableOpacity>
              
            </View>
          </View>
        </SafeAreaView>
        
        {/* Payment Method Bottom Sheet */}
        {bottomSheetVisible && selectedPaymentMethod && (selectedPaymentMethod === 'jazzcash' || selectedPaymentMethod === 'easypaisa') && (
          <PaymentMethodBottomSheet
            visible={bottomSheetVisible}
            paymentMethod={selectedPaymentMethod as 'jazzcash' | 'easypaisa'}
            phoneNumber="03485959152"
            selectedAccount={selectedAccount}
            onAccountSelect={handleAccountSelect}
            onDifferentNumberPress={handleDifferentNumberPress}
            onPayPress={handlePayPress}
            onSheetClose={handleDismissModalPress}
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    height: 60,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  paymentDetailLabel: {
    fontSize: 16,
    color: '#666',
  },
  paymentDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentMethodsContainer: {
    marginTop: 15,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  paymentMethodTextContainer: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  paymentMethodFee: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  feeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 10,
  },
  feeIndicatorText: {
    color: '#007BFF',
    fontSize: 12,
    marginLeft: 2,
  },
});

export default PaymentScreen;
