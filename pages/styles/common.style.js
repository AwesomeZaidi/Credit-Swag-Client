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
  import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

    page: {
        paddingTop: '18%',
        backgroundColor: bg,
        height: hp('82%')
    },
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
    iconrow: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'stretch',
        // textAlign: 'center',    
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
        color: text
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
        fontSize: 28,
        // textAlign: 'center',
        color: text
    },

    labelText_primary: {
        color: labelText,
        fontWeight: 'bold',
    },

    // ------------------------------------------
    // BUTTON
    // ------------------------------------------

    btnPrimary: {
        backgroundColor: primary,
        marginTop: 15,
        marginBottom: 15,
        width: 200,
        height: 32,
    },
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44/2,
        backgroundColor: primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // hack...
        marginTop: 20
    },
    circleBtn: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: primary,
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
      bigIcon: {
        padding: 4,
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 12,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      addIcon: {
        width: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    // HACKED STYLES TO LATER REFACTORAND GET RID OF!
    mw: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    pushLeft: {
        marginLeft: 24
    },
    pushOffUp: {
        marginTop: 12
    },

    pushOffDown: {
        marginBottom: 12
    }, 
    hide: {
        zIndex: -1
    },
});