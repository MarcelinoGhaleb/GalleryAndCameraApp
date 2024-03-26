import React from 'react';
import {View, Text, Button} from 'react-native';
import GetCurrentLocation from '../../components/atoms/getCurrentLocation';
import MapView from 'react-native-maps';
import ScreenStyles from './styles';

const HomeScreen = ({navigation}) => {
  const openCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={ScreenStyles.mapContainer}>
      <View style={ScreenStyles.sectionContainer}>
        <Text style={ScreenStyles.sectionTitle}>
          Welcome to Your Camera App
        </Text>
        <Button title="Start Taking Photos" onPress={openCamera} />
      </View>
      <GetCurrentLocation />
      <View style={ScreenStyles.mapContainer}>
        <MapView
          style={ScreenStyles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
