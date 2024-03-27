import {StyleSheet} from 'react-native';

const GalleryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#408EC6',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#91a3ff',
    borderStartColor: '#91a3ff', 
    borderEndWidth: 1,
    borderEndColor: '#91a3ff', 
  },
  viewContainer: {
    marginVertical: 8,
    marginLeft: 55,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    alignSelf: 'center', 
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default GalleryStyles;
