import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Character from '../pages/Character';
import CharacterDetail from '../pages/CharacterDetail';

const { Navigator, Screen } = createStackNavigator();

export function CharacterRoutes() {
  return(
    <Navigator>
      <Screen
        name="Character"
        component={Character}
      />
      <Screen
        name="CharacterDetail"
        component={CharacterDetail}
      />
    </Navigator>
  );
}