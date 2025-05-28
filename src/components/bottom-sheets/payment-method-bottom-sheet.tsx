import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

interface PaymentMethodBottomSheetProps {
  visible: boolean;
  paymentMethod: 'jazzcash' | 'easypaisa';
  phoneNumber: string;
  onAccountSelect: (phoneNumber: string) => void;
  onDifferentNumberPress: () => void;
  onPayPress: () => void;
  onSheetClose: () => void;
  selectedAccount: string | null;
}

/**
 * Specialized bottom sheet for payment method account selection
 * Used for JazzCash and EasyPaisa payment methods
 */
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PaymentMethodBottomSheet: React.FC<PaymentMethodBottomSheetProps> = ({
  visible,
  paymentMethod,
  phoneNumber,
  onAccountSelect,
  onDifferentNumberPress,
  onPayPress,
  onSheetClose,
  selectedAccount
}) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber);
  const [showInput, setShowInput] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Handle keyboard appearance
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        // Expand bottom sheet when keyboard appears
        bottomSheetRef.current?.snapToIndex(1);
      }
    );
    
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        // Return to normal size when keyboard disappears
        if (showInput) {
          bottomSheetRef.current?.snapToIndex(0);
        }
      }
    );
    
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [showInput]);
  
  useEffect(() => {
    // Reset input when bottom sheet is opened
    if (visible) {
      setInputPhoneNumber(phoneNumber);
      setShowInput(false);
    }
  }, [visible, phoneNumber]);
  
  const handleNumberInput = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setInputPhoneNumber(numericText);
  };
  
  const handleConfirm = () => {
    if (inputPhoneNumber.length >= 10) {
      // Update the phone number state and select it
      onAccountSelect(inputPhoneNumber);
      // Update the displayed phone number
      setShowInput(false);
      Keyboard.dismiss();
    }
  };
  
  const handleCancel = () => {
    setShowInput(false);
    setInputPhoneNumber(phoneNumber);
    Keyboard.dismiss();
  };
  
  if (!visible) return null;
  
  const isJazzCash = paymentMethod === 'jazzcash';
  const logoSource = isJazzCash 
    ? require('../../../assets/icons/Jazzcash.png')
    : require('../../../assets/icons/Easypaisa.png');

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  // Determine snap points based on input mode and keyboard visibility
  const snapPoints = useCallback(
    () => [showInput && keyboardVisible ? '75%' : '40%', '75%'],
    [showInput, keyboardVisible]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints()}
      index={0}
      enablePanDownToClose={!showInput}
      onChange={(index) => {
        if (index === -1) {
          onSheetClose();
        }
      }}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleStyle={{ display: 'none' }}
    >
      <BottomSheetView style={styles.contentContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerLine} />
        </View>
        <Text style={styles.title}>Select an Account</Text>
        
        {!showInput ? (
          <View style={styles.accountOption}>
            <TouchableOpacity 
              style={styles.accountRow}
              onPress={() => onAccountSelect(selectedAccount || phoneNumber)}
            >
              <View style={styles.radioButton}>
                {selectedAccount !== null && <View style={styles.radioButtonInner} />}
              </View>
              <Image 
                source={logoSource} 
                style={styles.accountLogo}
                resizeMode="contain"
              />
              <Text style={styles.accountNumber}>{selectedAccount || phoneNumber}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}
              >
                <MaterialIcons name="close" size={22} color="#999" />
              </TouchableOpacity>
              <Text style={styles.inputTitle}>Enter Phone Number</Text>
            </View>
            
            <View style={styles.phoneInputRow}>
              <Image 
                source={logoSource} 
                style={styles.accountLogo}
                resizeMode="contain"
              />
              <TextInput
                style={styles.phoneInput}
                value={inputPhoneNumber}
                onChangeText={handleNumberInput}
                placeholder="03XX-XXXXXXX"
                keyboardType="phone-pad"
                maxLength={11}
                autoFocus
              />
            </View>
            
            {inputPhoneNumber.length > 0 && (
              <View style={styles.inputValidation}>
                <Text style={[styles.validationText, 
                  inputPhoneNumber.length >= 10 ? styles.validText : styles.invalidText
                ]}>
                  {inputPhoneNumber.length >= 10 
                    ? "Valid phone number" 
                    : `Phone number must be at least 10 digits (${inputPhoneNumber.length}/10)`}
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={[styles.confirmButton, 
                inputPhoneNumber.length >= 10 ? styles.confirmButtonActive : {}]}
              onPress={handleConfirm}
              disabled={inputPhoneNumber.length < 10}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {!showInput && (
          <TouchableOpacity 
            style={styles.differentNumberButton}
            onPress={() => {
              setShowInput(true);
              // Allow a moment for the UI to update before focusing the input
              setTimeout(() => {
                bottomSheetRef.current?.snapToIndex(0);
              }, 100);
            }}
          >
            <Text style={styles.differentNumberText}>Use a different number</Text>
            <Ionicons name="chevron-forward" size={20} color="#007BFF" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.payButton, selectedAccount ? styles.payButtonActive : null]}
          onPress={onPayPress}
          disabled={!selectedAccount}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: -15,
  },
  headerLine: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  accountOption: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  accountLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  accountNumber: {
    fontSize: 16,
    color: '#333',
  },
  differentNumberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 20,
  },
  differentNumberText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
    zIndex: 1,
  },
  inputTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  phoneInput: {
    flex: 1,
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
    paddingVertical: 8,
  },
  inputValidation: {
    marginBottom: 15,
  },
  validationText: {
    fontSize: 13,
  },
  validText: {
    color: '#4CAF50',
  },
  invalidText: {
    color: '#FF9800',
  },
  confirmButton: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonActive: {
    backgroundColor: '#007BFF',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonActive: {
    backgroundColor: '#007BFF',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default PaymentMethodBottomSheet;
