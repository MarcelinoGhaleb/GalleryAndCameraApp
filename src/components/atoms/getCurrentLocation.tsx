import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const GetCurrentLocation = () => {
  const [position, setPosition] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (pos: { coords: { latitude: any; longitude: any; }; }) => {
          const { latitude, longitude } = pos.coords;
          setPosition(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error: any) =>
          Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        { enableHighAccuracy: true }
      );
    };

    getCurrentPosition();
  }, []);

  return (
    <View>
      <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

export default GetCurrentLocation;