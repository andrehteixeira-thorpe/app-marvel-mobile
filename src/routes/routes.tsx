import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../global/styles/theme'

import CharacterRoute from './character.routes';
import ComicRoute from './comic.routes';
import SearchRoute from './search.routes';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:any;

            if (route.name === 'Characters') {
              iconName = focused
                ? 'person'
                : 'person-outline';
            } else if (route.name === 'Comics') {
              iconName = focused 
                ? 'book' 
                : 'book-outline';
            } else if (route.name === 'Search') {
              iconName = focused 
                ? 'ios-search' 
                : 'ios-search-outline';
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
          name="Characters" 
          component={CharacterRoute} 
        />
        <Tab.Screen 
          name="Comics" 
          component={ComicRoute} 
        />
        <Tab.Screen 
          name="Search" 
          component={SearchRoute} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}