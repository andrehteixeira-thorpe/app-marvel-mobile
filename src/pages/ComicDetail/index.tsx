import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export default function Character(){
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>Marvel</Text>
      <Text>Comic Details!!</Text>
    </View>
  );
}