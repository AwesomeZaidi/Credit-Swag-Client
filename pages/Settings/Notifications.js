import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Switch,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './ProfileStyles';
import { Button } from 'react-native-elements';

class Notifications extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
           headerTintColor: '#fff',
           headerStyle: {
            backgroundColor: '#24232E',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
           }
        }
     }

    render() {
        return (
            <View style={styles.topDownCenterPage}>
                <Text style={[common.h1_primary, styles.profileTitle]}>Notifications</Text>

                <Switch/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(Notifications);

