import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        onPress={handleGoogleSignIn}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  statusMessage: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default GoogleSignIn;
