import { StyleSheet } from 'react-native';

const camStyles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F4F5FB',
  },
  openCameraButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#91a3ff',
    borderRadius: 100 / 2,
    position: 'absolute',
    bottom: 100,
    borderWidth: 3,
    borderColor: '#66D9FF',
  },
  captureButton: {
    backgroundColor: '#91a3ff',
    borderRadius: 100 / 2,
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: '#66D9FF', 
  },
  capturedImageContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  capturedButtonsContainer: {
    flexDirection: 'row-reverse',
    width: '65%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default camStyles;
