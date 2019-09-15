
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    AsyncStorage
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { signUp, logIn, logOut } from "../../../redux/actions/index";
import common from '../../styles/common.style';
import styles from '../styles/forms.js';
import { placeholder } from '../../styles/variables';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// ----------------------------------------------------------------------------------
// Enter Component Class
// ----------------------------------------------------------------------------------
const Enter = (props) => {
    console.log('in Enter');
    const [error, setError] = useState({...props.error});
    // const [user, setUser] = useState(props.user);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
    const [signupShow, setSignupShow] = useState(true);
    const [showError, setShowError] = useState(false);
    const [loginPressed, setLoginPressed] = useState(false);
    const [signupPressed, setSignupPressed] = useState(false);

    useEffect(() => {
        if (!props.user == false) {       
            return props.navigation.navigate('App')
        }
    }, []);

    React.useEffect(() => {
        setError(props.error);
    }, [props.error])
    
    // useEffect(() => {  
    //     setUser(props.user)
    // }, [props.user]);

    handleSubmit = async (type) => {
        if (type === 'signup') {
            if (!signupPressed) {
                setSignupPressed(true);
                // Step 1: Notifications permissions.
                const { status: existingStatus } = await Permissions.getAsync(
                    Permissions.NOTIFICATIONS
                );
                let finalStatus = existingStatus;
                
                // only ask if permissions have not already been determined, because
                // iOS won't necessarily prompt the user a second time.
                if (existingStatus !== 'granted') {
                    // Android remote notification permissions are granted during the app
                    // install, so this will only ask on iOS
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
                }
                
                // Stop here if the user did not grant permissions
                if (finalStatus !== 'granted') {
                    return;
                }
                
                // Get the token that uniquely identifies this device
                let notificationToken = await Notifications.getExpoPushTokenAsync();
                // Step 2 signup api call
                await props.signUp({name, email, username, password}, notificationToken);
                let stateData = await AsyncStorage.getItem('CREDIT_SWAG_STATE');  
                stateData = JSON.parse(stateData);
                setSignupPressed(false);
                stateData.error == true
                    ?
                        setShowError(true)
                    :
                        props.navigation.navigate('Connect')
            }
        } else if (type === 'login') {
            if (!loginPressed) {
                setLoginPressed(true);
                await props.logIn({email, password});
                let stateData = await AsyncStorage.getItem('CREDIT_SWAG_STATE');  
                stateData = JSON.parse(stateData);
                setLoginPressed(false);
                stateData.error == true
                    ?
                        setShowError(true)
                    :
                        props.navigation.navigate('App')
            };
        };
    };

    changeFormView = (txtPressed) => {
        if (txtPressed === 'signupPressed') {
            setLoginShow(false)
            setSignupShow(true)
            setSignupPressed(false)
        } else {
            setLoginShow(true)
            setSignupShow(false)
            setLoginPressed(false)
        }
    }
   
    return (
        
        <ScrollView
            style={common.page}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.wrapper}
        >
            <KeyboardAvoidingView enabled>
                {/* This View allows the user to toggle the login and logout tabs to show different forms. */}
                <View style={common.centerVerticalElements}>
                    <Text
                        onPress={() =>changeFormView('loginPressed')}                        
                        style={loginShow === true
                        ? common.titleActive : common.titleUnactive}>
                        Login
                    </Text>
                    <Text
                        onPress={() => changeFormView('signupPressed')}
                        style={signupShow === true  ?
                        common.titleActive : common.titleUnactive}>
                        Signup
                    </Text>
                </View>
                    {
                        (signupShow === true) ?
                            // Shows the signup form or login form based on the state that gets updated above or set by default.
                            <>
                                <View style={styles.form}>
                                    <TextInput
                                        onChangeText={(text) => setName(text)}
                                        value={name}
                                        style={nameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => setNameFocused(true) }
                                        onBlur={ () => setNameFocused(false) }
                                        placeholder='Full Name'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize='none'
                                    />
                                    <TextInput
                                        onChangeText={(text) => setUsername(text)}
                                        value={username}
                                        style={usernameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => setUsernameFocused(true) }
                                        onBlur={ () => setUsernameFocused(false) }
                                        placeholder='Username'
                                        autoCapitalize='none'
                                        placeholderTextColor={placeholder}
                                    />
                                    <TextInput
                                        onChangeText={(text) => setEmail(text)}
                                        value={email}
                                        style={emailFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => setEmailFocused(true) }
                                        onBlur={ () => setEmailFocused(false) }
                                        placeholder='Email Address'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                    />
                                    <TextInput
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                        style={passwordFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                        onFocus={ () => setPasswordFocused(true) }
                                        onBlur={ () => setPasswordFocused(false) }
                                        placeholder='Password'
                                        placeholderTextColor={placeholder}
                                        autoCapitalize = 'none'
                                        secureTextEntry={true}
                                    />
                                    {props.error === true ? <Text style={common.errorMsg}>Email or password is wrong</Text> : null }
                                    <TouchableOpacity style={common.iconBtn} onPress={() => handleSubmit('signup')}>
                                        <FontAwesomeIcon
                                            style={common.icon}
                                            size={24}
                                            icon={ faArrowRight } 
                                        />
                                    </TouchableOpacity>
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
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    style={emailFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                    onFocus={ () => setEmailFocused(true) }
                                    onBlur={ () => setEmailFocused(false) }
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    placeholderTextColor={placeholder}
                                />
                                <TextInput
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    style={passwordFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                    onFocus={ () => setPasswordFocused(true) }
                                    onBlur={ () => setPasswordFocused(false) }
                                    placeholder='Password'
                                    placeholderTextColor={placeholder}
                                    autoCapitalize = 'none'
                                    secureTextEntry={true}
                                />
                                {props.error === true && <Text style={common.errorMsg}>Something went wrong</Text> }
                                <TouchableOpacity style={common.iconBtn} onPress={() => handleSubmit('login')}>
                                    <FontAwesomeIcon
                                        style={common.icon}
                                        size={24}
                                        icon={ faArrowRight }
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={[common.centerVerticalElements, common.mw]}>
                                <Text style={[common.text_sm, common.graytxt]}>
                                Forgot Password.
                                </Text>
                            </View> */}
                        </>
                    }
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

Enter.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        user: state.user,
        error: state.error
    };
};

function mapDispatchToProps() {
    return {
        signUp,
        logIn,
        logOut
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Enter);
