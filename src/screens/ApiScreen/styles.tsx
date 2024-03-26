import { StyleSheet } from 'react-native';

const apiStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#91a3ff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginHorizontal: 10,
    columnGap: 10,
  },
  descriptionContainer: {
    backgroundColor: '#c2d8ff',
    padding: 10,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default apiStyles;
