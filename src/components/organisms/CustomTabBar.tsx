import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TabesStyles from './TabBArsStyle'; 

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={TabesStyles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={TabesStyles.tabButton}>
            <Text style={TabesStyles.tabText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar