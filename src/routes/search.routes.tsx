import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogoTitle from '../components/LogoHeader';

import Search from '../pages/Search';

import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export default function CharacterRoutes() {
  return(
    <Navigator 
      screenOptions={{
        headerStyle:{
          backgroundColor: theme.colors.header
        },
        headerTintColor: theme.colors.white,
      }}
    >
      <Screen
        name="Search"
        component={Search}
        options={{ 
          headerTitle: (props:any) => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      />
    </Navigator>
  );
}