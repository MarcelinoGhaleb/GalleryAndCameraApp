import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CameraScreen from '../screens/Camera/Camera';
import ApiScreen from '../screens/ApiScreen';
import Gallery from '../screens/Gallery/Gallery';
import MyTabBar from '../components/organisms/CustomTabBar';

const MainStackNavigator = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator tabBar={props => <MyTabBar {...props} />}>
      <MainStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Camera"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Api"
        component={ApiScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Gallery"
        component={Gallery}
        options={{headerShown: false}}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
