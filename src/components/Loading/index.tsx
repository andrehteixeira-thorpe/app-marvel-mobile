import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export default function Loading() {
  return(
    <View style={styles.loadingView}>
      <ActivityIndicator color={theme.colors.blackLight}/>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 16
  }
})