
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    Button,
    View
} from 'react-native';

import PlaidAuthenticator from 'react-native-plaid-link';
import { connectBank } from '../../redux/actions/index';
// import { logOut, connectBank } from '../../redux/actions/index';
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
        header: null,
    }; 

    // _signOutAsync = async () => {
    //     this.props.logOut();
    //     this.props.navigation.navigate('Auth');
    // };

    render() {
        return (
            <>  
                {/* <Text>Hello  logoutman</Text>
                <Text>Hello  logoutman</Text>
                <Text>Hello  logoutman</Text>
                <Text>Hello  logoutman</Text>
                <Text>Hello  logoutman</Text>
                <Button style={common.h1_primary} onPress={() => this._signOutAsync()} title='Logout'/> */}
                <PlaidAuthenticator
                    onMessage={this._onMessage}
                    publicKey="e7325291c9f6c0bdb72a3829865923"
                    env="sandbox"
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
        logOut,
        connectBank,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Connect);


// My hook attempt, got fucked.
// TODO: Refactor into a hook.
// const Connect = (props) => {

//     console.log('here in Connect');

//     console.log('props.error:', props.error);
    
//     const [error, setError] = useState(props.error);
    
//     useEffect(() => {
//         console.log('in effect, setting error error prop...', props.error);
//         setError(props.error)
//     }, []);
//     console.log('state error:',error);


//     _onMessage = async (data) => {   
//         console.log('in func');
         
//         if (data && data.metadata && 'public_token' in data.metadata) {
//             await props.connectBank(props.user._id, data.metadata.public_token);
//             console.log('hit connect');
//             console.log('new error:', error);
//             if (error) {
//                 console.log('in if error:', error);
                
//                 return (
//                     <>
//                         <Text style={common.errorMsg}>{error}</Text>
//                     </>
//                 )
//             } else {
//                 props.navigation.navigate('App');
//             }
//         }
//     }

//     if (error) {
//         return (
//             // Create Error Message component/page.
//             <Text style={common.errorMsg}>{error}</Text>
//         )
//     } else {
//         return (
//             <>  
//             <PlaidAuthenticator
//                 onMessage={() => _onMessage()}
//                 publicKey="e7325291c9f6c0bdb72a3829865923"
//                 env="sandbox"
//                 product="auth,transactions"
//                 clientName="Credit Swag"
//                 selectAccount={false}
//             />
//             </>
//         )
//     }
// };

// Connect.navigationOptions = {
//     header: null,
// };