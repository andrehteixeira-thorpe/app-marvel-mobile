import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  h1: {
    fontFamily: theme.fonts.marvelBold,
    fontSize: 40,
    marginBottom: 10
  },
  p: {
    color: theme.colors.black,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 5,
  },
  pBold: {
    color: theme.colors.black,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  info: {
    padding: 8,
  },
  subtitle: {
    padding: 8,
    fontSize: 20
  },
  subtitleNotFound: {
    padding: 8,
  }
});