import { StyleSheet } from 'react-native';
import {
    bg,
    primary,
    secondary,
    danger,
    placeholder,
    light,
    purple,
    third,
    labelText,
    text
  } from './variables';

export default StyleSheet.create({
    centerVerticalElements: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'center'
    },
    errorMsg: {
        color: danger,
        fontSize: 18,
        textAlign: 'center'
    },
    // ------------------------------------------
    // SHARED CLASSES
    // ------------------------------------------

    center: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    // ------------------------------------------
    // IMAGES
    // ------------------------------------------

    sm_img: {
        width: 120,
        height: 120,
    },

    // ------------------------------------------
    // TEXT
    // ------------------------------------------
    text_sm: {
        fontSize: 16,
        textAlign: 'center',
        color: secondary
    },
    h1_primary: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primary
    },
    labelText_primary: {
        color: labelText,
        fontWeight: 'bold',
    },

    // ------------------------------------------
    // BUTTON
    // ------------------------------------------

    btn_primary: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: primary,
        width: 200
      },

});