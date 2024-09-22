import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, TouchableOpacity, Image, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};
//     .................... Handle  case if permission denied.

const PostScreen: React.FC<Props> = ({ navigation }) => {
const [imageData, setImageData]= useState(null)
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'This app needs access to your gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can access the gallery');
          return true;
        } else {
          console.log('Gallery permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

const OpenCamera =async()=>{
    requestCameraPermission()
        const result = await launchCamera({mediaType:'photo'});
        console.log("result>>>",result)
        setImageData(result);
}
const OpenGallery =async()=>{
    // const hasPermission = await
     requestGalleryPermission();
        // if (hasPermission) {
            const result = await launchImageLibrary({
              mediaType: 'photo', // or 'video' for video picking
              includeBase64: false, // You can set it to true if you want base64 string of the image
              maxHeight: 200, // Set max height for the image if needed
              maxWidth: 200,  // Set max width for the image if needed
            });
            console.log("result>>>",result)
            setImageData(result);
        // }
}
const UploadImage = async() =>{
    console.log("HHHHHHHHHHHHHHH",imageData)
    const reference = storage().ref(imageData.assets[0].fileName)
    const pathToFile =imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL(); // to gernerate the image url
    console.log("image url >>>>>", url);
}
async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  
  return (
    <View style={styles.container}>
      <Text style={{color:'white', backgroundColor:'grey', margin:12, padding:5,}}>Upload you post </Text>
      {!imageData===null && <Image source={{uri:imageData.assets[0].uri}} style={{width:200, height:200}} />}
      <TouchableOpacity style={{ backgroundColor:'grey', padding:12, borderRadius:22,}} onPress={() => OpenCamera()}>
        <Text style={{color:'white'}}>select image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor:'grey', padding:12, borderRadius:22,}} onPress={() => OpenGallery()}>
        <Text style={{color:'white'}}>select image from gallary</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor:'grey', padding:12, borderRadius:22,}} onPress={() => UploadImage()}>
        <Text style={{color:'white'}}>Upload image</Text>
      </TouchableOpacity>
    </View>
  );




};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostScreen;
