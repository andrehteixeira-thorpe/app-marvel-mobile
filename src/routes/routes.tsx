import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../global/styles/theme'

import Character from '../pages/Character';
import Comic from '../pages/Comic';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:any;

            if (route.name === 'Character') {
              iconName = focused
                ? 'person'
                : 'person-outline';
            } else if (route.name === 'Comic') {
              iconName = focused 
              ? 'book' 
              : 'book-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: theme.colors.black
          },
          activeTintColor: theme.colors.white,
          inactiveTintColor: theme.colors.blackLight,
        }}
      >
        <Tab.Screen 
          name="Character" 
          component={Character} 
        />
        <Tab.Screen 
          name="Comic" 
          component={Comic} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}