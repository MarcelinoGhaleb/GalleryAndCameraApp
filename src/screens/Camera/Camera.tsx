import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, PhotoFile } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import camStyles from './styles';
import CamFlip from '../../assets/CameraFlipSvg.svg';
import Close from '../../assets/CloseSvg.svg';
import CameraSvg from '../../assets/CameraSvg.svg';
import SaveSvg from '../../assets/SaveSvg.svg';
import Discard from '../../assets/DiscardSvg.svg';

const CameraScreen = ({ navigation }: any) => {
  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice);
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile>();
  const [location, setLocation] = useState({});
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const toggleCameraDevice = () => {
    const newDevice = cameraDevice === 'back' ? 'front' : 'back';
    setCameraDevice(newDevice);
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setIsCameraVisible(true);
    } else {
      Alert.alert(
        'Permission required',
        'Open settings to grant camera permission',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open settings',
            style: 'default',
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ],
      );
    }
  };

  const closeCamera = () => setIsCameraVisible(false);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: { message: any }) => {
        console.error('Error getting location:', error.message);
      },
      { enableHighAccuracy: true },
    );
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();

    if (photo && photo.path) {
      setCapturedImage(`file://${photo.path}`);
      setPhoto(photo);
      closeCamera();
    } else {
      console.error('Failed to capture photo');
    }
  };

  const savePhotoToStorage = async (photo: PhotoFile) => {
    try {
      await AsyncStorage.setItem('capturedPhoto', JSON.stringify(photo));
      console.log('Photo saved to AsyncStorage:', photo);
    } catch (error) {
      console.error('Error saving photo to AsyncStorage:', error);
    }
  };

  const saveImage = async () => {
    try {
      setLoading(true); 

      if (!photo) {
        throw new Error('No photo to send');
      }

 
      await savePhotoToStorage(photo);

    
      const data = {
        url: photo.path,
        location: location,
      };

     
      const response = await axios.post(
        'https://660411a42393662c31d0895c.mockapi.io/pics',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Data posted successfully:', response.data);

  
      await CameraRoll.saveAsset(photo.path);

      navigation.navigate('Gallery');
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (device === null) {
    return (
      <View style={camStyles.mainView}>
        <Text style={camStyles.errorText}>Camera feature not supported</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={camStyles.mainView}>
      {loading ? 
        <View style={camStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      : capturedImage ? (
        <>
          <View style={camStyles.capturedImageContainer}>
            <Image
              source={{ uri: capturedImage }}
              style={camStyles.capturedImage}
            />
          </View>
          <View style={camStyles.capturedButtonsContainer}>
            <Pressable
              onPress={() => {
                setCapturedImage(null);
                openCamera();
              }}>
              <Discard width={30} height={30} />
            </Pressable>
            <Pressable onPress={saveImage}>
              <SaveSvg width={30} height={30} />
            </Pressable>
          </View>
        </>
      ) : (
        <Pressable onPress={openCamera} style={camStyles.openCameraButton}>
          <CameraSvg width={40} height={40} />
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <View style={camStyles.openCameraButton}>
            <Pressable onPress={closeCamera}>
              <Close width={30} height={30} />
            </Pressable>
            <Pressable onPress={toggleCameraDevice}>
              <CamFlip width={30} height={30} />
            </Pressable>
          </View>

          <Camera
            photo
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device!}
            isActive={true}
            resizeMode="contain"
          />
          <View style={camStyles.capturedButtonsContainer}>
            <Pressable onPress={takePhoto}>
              <View style={camStyles.captureButton} />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;

