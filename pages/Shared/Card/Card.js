import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';
import styles from '../../styles/cards';

const Card = ({name, navigation}) => {
    return (
        <TouchableOpacity style={{backgroundColor: 'transparent'}}>
            <View  style={styles.listItemContainer}>
                <Text style={styles.pokeItemHeader}>{name}</Text>
                <Image source={{uri: 'https://res.cloudinary.com/aa1997/image/upload/v1535930682/pokeball-image.jpg'}} 
                        style={styles.pokeImage}/>
            </View>
        </TouchableOpacity>
    )
}

export default Card;