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
    text,
    inputText
  } from './variables';

export default StyleSheet.create({
    centerVerticalElements: {
        // textAlign: 'center'
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'center',
        // marginLeft: 20,
        // marginRight: 20
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
        fontSize: 14,
        textAlign: 'center',
    },
    graytxt: {
        color: labelText
    },
    //#TODO: refactor this
    titleActive: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        fontSize: 28,
        // display: 'inline-block',
        color: text
    },

    titleUnactive: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        fontSize: 28,
        // display: 'inline-block',
        color: labelText
    },

    h1_primary: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 28,
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

    circleBtn: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: primary,
        width: 80,
        borderRadius: 50
      },
      iconBtn: {
        backgroundColor: primary,
        padding: 18,
        borderRadius: 50,
        position: 'relative',
        bottom: -28,
        // hack...
        marginTop: -8
      },
      icon: {
          backgroundColor: primary,
          color: text,
      },

    //   HACKED STYLES TO LATER REFACTORAND GETRID OF!
    mw: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});