import React from 'react';
import { useFonts } from 'expo-font';
import { Marvel_400Regular, Marvel_700Bold } from '@expo-google-fonts/marvel';
import AppLoading from 'expo-app-loading';

import TabRoutes from './src/routes/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Marvel_400Regular, 
    Marvel_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <TabRoutes />
  );
}
