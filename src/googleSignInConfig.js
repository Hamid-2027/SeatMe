// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// export async function onGoogleButtonPress() {
//   try {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     // Get the user's ID token
//     const { idToken } = await GoogleSignin.signIn();configure

//     configureGoogleSignIn
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   } catch (error) {
//     console.error('Google Sign-In error:', error);
//   }
// }
