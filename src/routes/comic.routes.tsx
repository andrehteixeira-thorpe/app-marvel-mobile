import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogoTitle from '../components/LogoHeader';

import Comics from '../pages/Comics';
import ComicDetail from '../pages/ComicDetail';

import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export default function ComicRoutes() {
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
        name="Comics"
        component={Comics}
        options={{ 
          headerTitle: (props:any) => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      />
      <Screen
        name="ComicDetail"
        component={ComicDetail}
      />
    </Navigator>
  );
}