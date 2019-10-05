
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
import { Dimensions } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: wp('100%'),
        marginBottom: 60
    },
    goalContainer: {
        backgroundColor: '#5e5e73',
        height: 120,
        width: wp('90%'),
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        margin: 6,
        paddingLeft: 18
    },
    goalName: {
        marginTop: 16,
        color: 'gray',
        fontWeight: 'bold'
    },
    currentAmount: {
        color: green,
        fontSize: 18
    },
    green: {
        color: 'green',
        fontSize: 18
    },
    red: {
        color: 'red',
        fontSize: 18
    }
})
