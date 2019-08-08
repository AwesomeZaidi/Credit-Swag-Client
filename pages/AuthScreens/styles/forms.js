import { StyleSheet } from 'react-native';
import common from '../../styles/common.style';
import {
  bg, secondaryBg,
  primary, secondary,
  danger, placeholder,
  light, purple,
  third, text,
  inputbg,
  labelText,
  inputText
} from '../../styles/variables';
import { Dimensions } from "react-native";

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 120,
    backgroundColor: secondaryBg,
    paddingTop: 20,
    borderRadius: 20,
    color: 'blue',
    display: 'flex',
    justifyContent:  'center',
    alignItems: 'center',
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto'
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
  loginForm: {
    marginTop: 20,
    fontSize: 18,
    padding: 24,
    paddingBottom: 12,
  },
  otherAuthOption: {
    display: 'flex',
    flexDirection: 'row'
  },
  otherAuthOptionBtn: {
    color: 'blue',
  },
  anotherStyle: {
    backgroundColor: 'black',
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
    // color: red,
    marginBottom: 12,
  },
  ctaBtn: {
    // backgroundColor: green,
    marginTop: 0,
    padding: 12,
    marginLeft: 36,
    marginRight: 36,
  },
  otherOption: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherOptionText: {
    fontSize: 16,
    // color: grey,
  },
  otherBtn: {
    fontSize: 16,
    padding: 0,
    marginLeft: 12,
    // color: green,
  }
});

export default styles;