import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

type Message = {
  text: string;
}

export default function Message(porps:Message) {
  return(
    <View style={styles.viewMsg}>
      <Text style={styles.txtMsg}>{porps.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMsg: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 16,
  },
  txtMsg: {
    textAlign: 'center',
    color: theme.colors.black
  },
})