import { StyleSheet } from 'react-native';

const HomeScreen = StyleSheet.create({
  newImage: {
    marginTop: 20,
    width: '100%',
    height: 200,
  },
  photoAlbum: {
    width: 100,
    height: 100,
    margin: 5,
  },
  sectionContainer: {
    backgroundColor: '#91a3ff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#F4F5FB',
    fontSize: 18,
    marginBottom: 10,
  },
  sectionTitleMap: {
    color: '#F4F5FB',
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center',
  },
  captureText: {
    color: '#F4F5FB',
    marginVertical: 20,
    alignSelf: 'center',
  },
  mapContainer: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  viewMoreText: {
    color: '#F4F5FB',
  },
  viewMoreTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    margin: 5,
    backgroundColor: '#66D9FF',
  },
  welcomeText: {
    color: '#F4F5FB',
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#66D9FF',
    padding: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#F4F5FB',
    fontSize: 18,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
