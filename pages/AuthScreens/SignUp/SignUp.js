
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

import piggybank from '../../../assets/piggybank.png';

// ----------------------------------------------------------------------------------
// SignUp Component Class
// ----------------------------------------------------------------------------------
class SignUp extends Component {    
    
    // ------------------------------------------
    // State
    // ------------------------------------------
    
    state = {
        email: '',
        username: '',
        password: '',
        emailFocused: false,
        usernameFocused: false,
        passwordFocused: false,
        showError: false // doing this here so when app refresh happens, it goes away.
    };

    // ------------------------------------------
    // Navigation Options: title
    // ------------------------------------------
    
    static navigationOptions = {
        title: 'Sign Up',
    };
    // static navigationOptions = {
    //     header: null,
    // };

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
        console.log(this.props.error);
        
        this.props.error === true ?
            this.setState({
                showError: true
            })
        :
            this.props.navigation.navigate('App');
    };

    render() {
        return (
          <ScrollView
            style={styles.form}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.wrapper}
          >

            <Text style={common.h1_primary}>Credit Swag</Text>
            <Image
                source={piggybank}
                style={[common.sm_img, common.center]}
            />
            <TextInput
                onChangeText={(text) => this.onChangeText(text, 'email')}
                value={this.state.email}
                style={this.state.emailFocused ? styles.inputFieldFocus : styles.inputFieldBlur}
                onFocus={ () => this.onFocus('emailFocused') }
                onBlur={ () => this.onBlur('email', 'emailFocused') }
                placeholder='Email Adress'
                placeholderTextColor={placeholder}
                autoCapitalize='none'
                keyboardType='email-address'
            />
            <TextInput
                onChangeText={(text) => this.onChangeText(text, 'username')}
                value={this.state.username}
                style={this.state.usernameFocused ? styles.inputFieldFocus : styles.inputFieldBlur}
                onFocus={ () => this.onFocus('usernameFocused') }
                onBlur={ () => this.onBlur('username', 'usernameFocused') }
                placeholder='Username'
                autoCapitalize='none'
                placeholderTextColor={placeholder}
            />
            <TextInput
                onChangeText={(text) => this.onChangeText(text, 'password')}
                value={this.state.password}
                style={this.state.passwordFocused ? styles.inputFieldFocus : styles.inputFieldBlur}
                onFocus={ () => this.onFocus('passwordFocused') }
                onBlur={ () => this.onBlur('password', 'passwordFocused') }
                placeholder='Password'
                placeholderTextColor={placeholder}
                autoCapitalize = 'none'
                secureTextEntry={true}
            />
            {this.state.showError === true ? <Text style={common.errorMsg}>Something went wrong</Text> : null }
            <Button
                title="Signup"
                titleStyle={common.labelText_primary}
                buttonStyle={[common.btn_primary, common.center]}
                onPress={this.handleSubmit}
            />
            <View style={common.centerVerticalElements}>
                <Text style={common.text_sm}>Already have an account? </Text>
                <Text style={[styles.text_bold_read]}>Login</Text>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps())(SignUp);
