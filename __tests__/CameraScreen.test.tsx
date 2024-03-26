// Import necessary dependencies and the component
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll'; // Mock CameraRoll
import {PermissionsAndroid, Alert, Linking} from 'react-native'; // Mock PermissionsAndroid and Alert
import CameraScreen from '../src/screens/Camera/Camera';

// Mock PermissionsAndroid request method
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  PermissionsAndroid: {
    request: jest.fn().mockResolvedValueOnce('granted'), // Mock permission granted
  },
  Linking: {
    openSettings: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));

// Mock CameraRoll saveAsset method
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  saveAsset: jest.fn().mockResolvedValueOnce('savedImage'), // Mock saved image
}));

describe('<CameraScreen />', () => {
  test('renders camera button correctly', () => {
    const {getByTestId} = render(<CameraScreen navigation={undefined} />);
    const cameraButton = getByTestId('camera-button');
    expect(cameraButton).toBeTruthy();
  });

  test('opens camera when camera button is pressed', async () => {
    const {getByTestId} = render(<CameraScreen navigation={undefined} />);
    const cameraButton = getByTestId('camera-button');
    fireEvent.press(cameraButton);
    await waitFor(() => expect(PermissionsAndroid.request).toHaveBeenCalled());
  });

  test('takes photo when take photo button is pressed', async () => {
    const {getByTestId} = render(<CameraScreen navigation={undefined} />);
    const cameraButton = getByTestId('camera-button');
    fireEvent.press(cameraButton);
    await waitFor(() => expect(PermissionsAndroid.request).toHaveBeenCalled());

    const takePhotoButton = getByTestId('take-photo-button');
    fireEvent.press(takePhotoButton);
    await waitFor(() => expect(CameraRoll.saveAsset).toHaveBeenCalled());
  });

  test('saves image when save button is pressed after taking photo', async () => {
    const {getByTestId} = render(<CameraScreen navigation={undefined} />);
    const cameraButton = getByTestId('camera-button');
    fireEvent.press(cameraButton);
    await waitFor(() => expect(PermissionsAndroid.request).toHaveBeenCalled());

    const takePhotoButton = getByTestId('take-photo-button');
    fireEvent.press(takePhotoButton);
    await waitFor(() => expect(CameraRoll.saveAsset).toHaveBeenCalled());

    const saveButton = getByTestId('save-button');
    fireEvent.press(saveButton);
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Photo saved successfully',
      ),
    );
  });
});
