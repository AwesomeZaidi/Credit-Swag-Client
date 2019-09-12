import { StyleSheet } from 'react-native';
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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    page: {
        flex: 1,
        height: hp('100%'),
        paddingLeft: 18,
        paddingRight: 18,
        backgroundColor: bg,
        paddingTop: 30
    },
    settingTitle: {
        marginTop: 30,
    },
    centerText: {
        textAlign: 'center'
    },
    pushOffDown: {
        marginBottom: 18
    },
    pushOffDownXl: {
        marginBottom: 24
    },
    icon: {
        backgroundColor: 'transparent',
        color: labelText,
    },
})
