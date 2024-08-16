import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { onGoogleButtonPress } from './googleSignInConfig';

function GoogleSignIn() {
  const [statusMessage, setStatusMessage] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await onGoogleButtonPress();
      setStatusMessage('Signed in with Google successfully!');
    } catch (error) {
      setStatusMessage(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <View>
      <Button
        title="Google Sign-In"
        onPress={handleGoogleSignIn}
      />
      {statusMessage ? <Text>{statusMessage}</Text> : null}
    </View>
  );
}

export default GoogleSignIn;
