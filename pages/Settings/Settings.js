import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    FlatList,
    View,
    Button
} from 'react-native';
import { connect } from "react-redux";
import { logOut } from '../../redux/actions/index';
import common from '../styles/common.style';

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
            <ScrollView style={common.page}>
                    <Text style={common.h1_primary}>Welcome, Timofey</Text>

                    <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('Profile')}>Profile</Text>
                    <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('BankAccounts')}>Bank Accounts</Text>
                    <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('Notifications')}>Notications</Text>
                    <Button style={common.h1_primary} onPress={() => this.props.logOut()} title='Logout'/>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

function mapDispatchToProps() {
    return {
        logOut,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Settings);
