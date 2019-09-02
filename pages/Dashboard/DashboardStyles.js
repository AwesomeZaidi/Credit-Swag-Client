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
    top: {
        marginLeft: 20,
        marginRight: 20
    },
    balanceText: {
        fontSize: 38,
        color: text,
        marginTop: 10
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
    billModal: {
        backgroundColor: bg,
        height: hp('20%'),
        flex: 1,
        paddingLeft: 16
    },
    modalText: {
        marginTop: 4,
        marginBottom: 4,
        padding: 4,
        fontSize: 18,    
        color: text,
    }
})
