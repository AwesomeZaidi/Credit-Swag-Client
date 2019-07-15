
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    Button,
} from 'react-native';

import PlaidAuthenticator from 'react-native-plaid-link';
import { logOut, connectBank } from '../../redux/actions/index';
import common from '../styles/common.style';

import { connect } from "react-redux";

class Dashboard extends Component {

    // ------------------------------------------
    // Navigation Options: title
    // ------------------------------------------
    state = {
        data: undefined
    }

    static navigationOptions = {
		title: 'Dashboard'
    };

    logOut = async () => {
        await this.props.logOut();
        this.props.navigation.navigate('Auth');
    };
    
    render() {
        console.log('data:', this.state.data);
        
        const { navigation } = this.props;
        return (
                <PlaidAuthenticator
                    onMessage={this.onMessage}
                    publicKey="d5df4201427a1cbec5de25ade9bf41"
                    env="sandbox"
                    product="auth,transactions"
                    clientName="Asim Zaidi"
                    selectAccount={false}
                />
        )
    }

    onMessage = (data) => {
        this.setState({data})
    }
} 

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

function mapDispatchToProps() {
    return {
        logOut,
        connectBank
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Dashboard);