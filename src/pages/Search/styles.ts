import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: 8,
    height: 54,
  },
  input: {
      flex: 1,
      fontSize: 18,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      backgroundColor: theme.colors.white,
      color: theme.colors.black,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  btFilter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: theme.colors.blackDark
  },
  txtBtFilter: {
    color: theme.colors.whiteLight,
  },
  btFilterActive: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: theme.colors.black
  },
  txtBtFilterActive: {
    color: theme.colors.white,
  },
  clearButton: {
    color: theme.colors.gray,
    marginRight: 12,
  }
});