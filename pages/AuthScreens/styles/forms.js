import { StyleSheet } from 'react-native';
import common from '../../styles/common.style';
import {
  bg, primary, secondary, danger, placeholder, light,
  purple, third
} from '../../styles/variables';

const styles = StyleSheet.create({
  form: {
    backgroundColor: bg
  },
  // TEXT STYLES
  h1_primary: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primary
  },
  text_bold_read: {
    ...common.text_sm,
    fontWeight: 'bold',
  },
  appTitle: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 36,
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
  inputFieldBlur: {
    fontSize: 16,
    backgroundColor: bg,
    padding: 18,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    borderColor: third,
    borderRadius: 20,
    borderWidth: 2
  },
  inputFieldFocus: {
    fontSize: 16,
    backgroundColor: third,
    padding: 18,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    borderColor: primary,
    borderRadius: 20,
    borderWidth: 2
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