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
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    // leftPast: {
    //     display: 'flex'
    // },
    red: {
        color: danger
    },
    green: {
        color: green,
        right: 0
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})
