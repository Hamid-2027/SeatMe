import React, { useState } from 'react';
import { Button, View, Text, StyleSheet,TouchableOpacity , ActivityIndicator } from 'react-native';
import { onGoogleButtonPress } from './googleSignInConfig';

function GoogleSignIn() {
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await onGoogleButtonPress();
      setStatusMessage('Signed in with Google successfully!');
    } catch (error) {
      setStatusMessage(`Google Sign-In failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <View style={styles.container}>
    //   <Button
    //     title="Sign in with Google"
    //     onPress={handleGoogleSignIn}
    //     disabled={loading}
    //   />
    //   {loading && <ActivityIndicator size="small" color="#0000ff" />}
    //   {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}
    // </View>
    <View style={styles.container}>
    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
      {/* <MaterialCommunityIcons name="google" size={24} color="#fff" /> */}
      <Text style={styles.buttonText}>Login with Google</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default GoogleSignIn;
