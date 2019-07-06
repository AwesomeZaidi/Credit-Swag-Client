//import styleSheet for creating a css abstraction.
import { StyleSheet } from 'react-native';
import {
    bg, primary, secondary, danger, placeholder, light,
    purple, third
  } from './variables';

const styles = StyleSheet.create({
    listItemContainer: {
        borderStyle: 'solid',
        borderColor: secondary,
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    pokeItemHeader: {  
        color: secondary,
        fontSize: 24,
    },
    pokeImage: {
        backgroundColor: 'black',
        height: 50,
        width: 50
    }
})

export default styles;