import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, RefreshControl, Animated, Button} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import GalleryStyles from './styles';

interface Photo {
  id: number;
  url: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const translateY = new Animated.Value(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://660411a42393662c31d0895c.mockapi.io/pics',
      );
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleImagePress = (latitude: number, longitude: number) => {
    setSelectedLocation({latitude, longitude});
  };

  const handleCloseMap = () => {
    Animated.timing(translateY, {
      toValue: -700,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedLocation(null);
      translateY.setValue(0);
    });
  };

  return (
    <View style={GalleryStyles.container}>
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <View style={GalleryStyles.rowContainer}>
            <View style={GalleryStyles.viewContainer}>
              <Image
                source={{uri: `file://${item.url}`}}
                style={GalleryStyles.image}
              />
              <Button
                title="View Location"
                onPress={() =>
                  handleImagePress(item.location.latitude, item.location.longitude)
                }
                color="#91a3ff"
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {selectedLocation && (
        <>
          <Animated.View style={[GalleryStyles.mapContainer, {transform: [{translateY}]}]}>
            <MapView
              style={GalleryStyles.map}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
              />
            </MapView>
            <Button title="Close Map" onPress={handleCloseMap} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default Gallery;
