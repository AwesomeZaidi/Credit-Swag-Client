import { StyleSheet } from 'react-native';
import common from '../styles/common.style';
import {
  bg, secondaryBg,
  primary, secondary,
  danger, placeholder,
  light, purple,
  third, text,
  inputbg, green,
  labelText,
  inputText
} from '../styles/variables';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  savingPage: {
    backgroundColor: bg,
      paddingLeft: 20,
      paddingRight: 20,
      color: '#fff'
  },
  form: {
    marginTop: 30,
    marginBottom: 120,
    backgroundColor: secondaryBg,
    paddingTop: 20,
    borderRadius: 20,
    color: 'blue',
    display: 'flex',
    // alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  top: {
    // marginTop: -20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdown: {
    color: 'white',
    width: '90%',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  addContainerCenter: {
    // width: wp('100%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text_bold_read: {
    ...common.text_sm,
    fontWeight: 'bold',
  },
  appTitle: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 28,
  },
  input: {
    width: '90%',
    fontSize: 16,
    padding: 14,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 30,
    borderWidth: 2,
    paddingLeft: 25,
    color: inputText,
  },
  dateText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  inputFieldBlur: {
    fontSize: 16,
    backgroundColor: inputbg,
    borderColor: third,
  },
  inputFieldFocus: {
    backgroundColor: inputbg,
    borderColor: primary,
  },
  enterBtn: {
    backgroundColor: primary,
    color: text,
  },
  helperText: {
    marginLeft: 36,
    marginRight: 36,
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#5a5a72',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
  },
  itemCat: {
      color: text,
      fontSize: 16
  },
  itemDate: {
      color:  '#74747F',
      fontSize: 12,
  },
  leftPast: {
      display: 'flex',
      flexDirection:  'row'
  },
  red: {
      fontSize: 15,
      color: danger
  },
  green: {
      fontSize: 18,
      color: green,
      right: 0
  },
  header: {
    textAlign: 'left'
  },
});

export default styles;