import { StyleSheet } from 'react-native';
import {
    bg, primary, secondary, danger, placeholder, light,
    purple, third
  } from './variables';

export default StyleSheet.create({
    centerVerticalElements: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'center'
    },
    text_sm: {
        fontSize: 16,
        textAlign: 'center',
        color: secondary
    },
    errorMsg: {
        color: danger,
        fontSize: 18,
        textAlign: 'center'
    }
});