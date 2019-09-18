
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import { Button } from 'react-native-elements';

import PlaidAuthenticator from 'react-native-plaid-link';
import { logOut, connectBank } from '../../redux/actions/index';
// import { connectBank } from '../../redux/actions/index';
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
        header: null,
    }; 

    _signOutAsync = async () => {
        this.props.logOut();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <>  
                <Button onPress={() => this._signOutAsync()} title='Logout'/>
                <PlaidAuthenticator
                    onMessage={this._onMessage}
                    publicKey="f04faf8b95bc5d5e0357791a52b40c"
                    env="development"
                    product="auth,transactions"
                    clientName="Credit Swag"
                    selectAccount={false}
                />
            </>
        )
    }

    _onMessage = async (data) => {    
        if (data && data.metadata && 'public_token' in data.metadata) {
            await this.props.connectBank(this.props.user._id, data.metadata.public_token);
            this.props.navigation.navigate('App');
        }
    }
} 

const mapStateToProps = state => {
    return {
        user: state.user,
        error: state.error
    };
};

function mapDispatchToProps() {
    return {
        connectBank,
        logOut,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Connect);
