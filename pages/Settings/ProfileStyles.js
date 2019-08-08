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

export default StyleSheet.create({
    topDownCenterPage: {
        // paddingTop: '10%',
        backgroundColor: '#24232E',
        // height: Dimensions.get('window').height,
        flex: 1, 
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        // position: 'relative',
        // justifyContent:
    },
    profileTitle: {
        paddingTop: 30,
    },
    topName: {
        paddingBottom: 20,
    },
    profilePic: {
        marginTop: 16,
        marginBottom: 16,
        paddingBottom: 16,
        width: 150,
        height: 150,
        // borderRadius: 24
    },
    top: {
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    bottom: {
        flex: 3, 
        bottom: 0,
        // position: 'absolute',
        backgroundColor: '#383747',
        width: Dimensions.get('window').width,
        // height: 260,
        paddingTop: 50,

    },
    formGroup: {
        textAlign: 'left',
        marginLeft: 40,
    },
    label: {
        width: 100,
        fontWeight: '700',
        color: '#a4a4ad'
    },
    text: {
        fontSize: 20,
        marginTop: 6,
        marginBottom: 24,
        color: '#fff'
    },
})
