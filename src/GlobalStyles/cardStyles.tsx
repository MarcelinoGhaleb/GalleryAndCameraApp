import { StyleSheet } from 'react-native';

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#66D9FF',
    width: '50%',
  },
  name: {
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4F5FB',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#66D9FF',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
});

export default cardStyles;
