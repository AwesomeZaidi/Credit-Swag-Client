import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './SettingsStyles';

class Settings extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
           headerTintColor: '#fff',
           headerStyle: {
            backgroundColor: '#373745',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
           }
        }
    }
     
    render() {
        return (
            <View style={[common.page, styles.settingsPage]}>
                <Text style={common.h1_primary}>Welcome, {this.props.user.name}</Text>

                <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('Profile')}>Profile</Text>
                {/* <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('BankAccounts')}>Bank Accounts</Text> */}
                <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('Notifications')}>Notications</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};



export default connect(mapStateToProps, null)(Settings);
