
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

class Connect extends Component {

    // ------------------------------------------
    // Navigation Options: title
    // ------------------------------------------
    constructor(props) {
        super(props);
        
        this.state = {
            public_token: undefined,
        }
    }

    static navigationOptions = {
		title: 'Connect Bank'
    };

    // logOut = async () => {
    //     this.props.logOut();
    //     this.props.navigation.navigate('Auth');
    // };

    render() {
        return (
            <>  
            <PlaidAuthenticator
                onMessage={this.onMessage}
                publicKey="e7325291c9f6c0bdb72a3829865923"
                env="sandbox"
                product="auth,transactions"
                clientName="Credit Swag"
                selectAccount={false}
            />
            </>
        )
    }

    onMessage = async (data) => {    
        if (data && data.metadata && 'public_token' in data.metadata) {
            await this.props.connectBank(this.props.user._id, data.metadata.public_token);
            this.props.navigation.navigate('App');
        }
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
        connectBank,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Connect);