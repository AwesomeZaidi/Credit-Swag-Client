
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { signUp } from "../../../redux/actions/index";
import { Button } from 'react-native-elements';

import common from '../../styles/common.style';
import styles from '../styles/forms.js';
import { placeholder } from '../../styles/variables';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faArrowRight } from '@fortawesome/free-solid-svg-icons'

// ----------------------------------------------------------------------------------
// Enter Component Class
// ----------------------------------------------------------------------------------
class Enter extends Component {    
    
    // ------------------------------------------
    // State
    // ------------------------------------------
    
    state = {
        name:'',
        username: '',
        email: '',
        password: '',
        emailFocused: false,
        usernameFocused: false,
        passwordFocused: false,

        loginShow: false,
        signupShow: true
    };

    // ------------------------------------------
    // Navigation Options: title
    // ------------------------------------------
    
    // static navigationOptions = {
    //     title: 'Sign Up',
    // };
    static navigationOptions = {
        header: null,
    };

    // ------------------------------------------
    // Update state on text change
    // ------------------------------------------
    
    onChangeText = (text, feildName) => {
        this.setState({
            [feildName]: text
        });
    };
    
    // ------------------------------------------
    // Input action functions
    // ------------------------------------------ 
    
    onFocus = (type) => {
        // change this given type's state data to true
        this.setState({
            [type]: true
        });
    };

    onBlur = (feildName, type) => {
        // if the input field is empty, change its focus state to false.
        !this.state[feildName] ?
            this.setState({
                [type]: false
            })
        :
        null
    };

    // --------------------------------------------------------
    // signUp redux action handler function attached to props. 
    // --------------------------------------------------------
    handleSubmit = async () => {
        await this.props.signUp(this.state);
        !this.props.error === true ?
            this.props.navigation.navigate('App')
        :
            this.setState({
                showError: true
            })
    };

    // On Signup or Login Tab button presses, update state to
    // swap active style and swag form comp.
    changeFormView = (txtPressed) => {
        if (txtPressed === 'signupPressed') {
            this.setState({
                loginShow: false,
                signupShow: true
            })
        } else {
            this.setState({
                loginShow: true,
                signupShow: false
            })   
        }
    }

    render() {
        return (
            <ScrollView
                style={styles.landingPage}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.wrapper}
            >
                <View style={common.centerVerticalElements}>
                    <Text
                        onPress={() =>this.changeFormView('loginPressed')}                        
                        style={this.state.loginShow === true
                        ? common.titleActive : common.titleUnactive}>
                        Login
                    </Text>
                    <Text
                        onPress={() => this.changeFormView('signupPressed')}
                        style={this.state.signupShow === true  ?
                        common.titleActive : common.titleUnactive}>
                        Signup
                    </Text>
                </View>

                    {
                        (this.state.signupShow === true) ?
                            <>
                                <View style={styles.form}>
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text, 'name')}
                                        value={this.state.name}
                                        style={this.state.nameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => this.onFocus('nameFocused') }
                                        onBlur={ () => this.onBlur('name', 'nameFocused') }
                                        placeholder='Full Name'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize='none'
                                    />
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text, 'username')}
                                        value={this.state.username}
                                        style={this.state.usernameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => this.onFocus('usernameFocused') }
                                        onBlur={ () => this.onBlur('username', 'usernameFocused') }
                                        placeholder='Username'
                                        autoCapitalize='none'
                                        placeholderTextColor={placeholder}
                                    />
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text, 'email')}
                                        value={this.state.email}
                                        style={this.state.emailFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => this.onFocus('emailFocused') }
                                        onBlur={ () => this.onBlur('email', 'emailFocused') }
                                        placeholder='Email Address'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                    />
                                    <TextInput
                                        onChangeText={(text) => this.onChangeText(text, 'password')}
                                        value={this.state.password}
                                        style={this.state.passwordFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => this.onFocus('passwordFocused') }
                                        onBlur={ () => this.onBlur('password', 'passwordFocused') }
                                        placeholder='Password'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize = 'none'
                                        secureTextEntry={true}
                                    />
                                    {this.state.showError === true ? <Text style={common.errorMsg}>Something went wrong</Text> : null }
                                    <View style={common.iconBtn}>
                                        <FontAwesomeIcon
                                            style={common.icon}
                                            size={24}
                                            icon={ faArrowRight } 
                                            onPress={this.handleSubmit}
                                        />
                                    </View>
                                </View>
                                <View style={[common.centerVerticalElements, common.mw]}>
                                    <Text style={[common.text_sm, common.graytxt]}>
                                    By Signing Up, you Agree to the Terms and Conditions of the app.
                                    </Text>
                                </View>
                            </>
                        :
                        <>
                        <View style={styles.form}>
                            <TextInput
                                onChangeText={(text) => this.onChangeText(text, 'username')}
                                value={this.state.username}
                                style={this.state.usernameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                onFocus={ () => this.onFocus('usernameFocused') }
                                onBlur={ () => this.onBlur('username', 'usernameFocused') }
                                placeholder='Username'
                                autoCapitalize='none'
                                placeholderTextColor={placeholder}
                            />
                            <TextInput
                                onChangeText={(text) => this.onChangeText(text, 'password')}
                                value={this.state.password}
                                style={this.state.passwordFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                onFocus={ () => this.onFocus('passwordFocused') }
                                onBlur={ () => this.onBlur('password', 'passwordFocused') }
                                placeholder='Password'
                                placeholderTextColor={placeholder}
                                autoCapitalize = 'none'
                                secureTextEntry={true}
                            />
                            {this.state.showError === true ? <Text style={common.errorMsg}>Something went wrong</Text> : null }
                            <View style={common.iconBtn}>
                                <FontAwesomeIcon
                                    style={common.icon}
                                    size={24}
                                    icon={ faArrowRight } 
                                    onPress={this.handleSubmit}
                                />
                            </View>
                        </View>
                        <View style={[common.centerVerticalElements, common.mw]}>
                            <Text style={[common.text_sm, common.graytxt]}>
                            Forgot Password.
                            </Text>
                        </View>
                    </>
                    }

            </ScrollView>
        );
    };
};

const mapStateToProps = state => {
    return {
        user: state.user,
        error: state.error
    };
};

function mapDispatchToProps() {
    return {
        signUp
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Enter);
