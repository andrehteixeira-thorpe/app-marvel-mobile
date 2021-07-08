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
  },
  title: {
    padding: 8,
    paddingTop: 22,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtBtSeeAllCcharacteres: {
    color: theme.colors.primary
  },
});