import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
  } from 'react-native';
  

class SignIn extends Component {
    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
        };
    };

    onClickListener = (viewId) => { Alert.alert("Alert", "Button pressed " + viewId);}
 
    static navigationOptions = {
		title: 'Sign in'
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
                </View>
                
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                </View>
        
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
        
                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>
        
                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
});

export default SignIn;

// MY OLD CODE AND STYLE
{/* <View style={styles.container}>
<TextInput
    style={styles.input}
    placeholder='Username'
    autoCapitalize="none"
    placeholderTextColor='white'
    onChangeText={val => this.onChangeText('username', val)}
/>
<TextInput
    style={styles.input}
    placeholder='Password'
    secureTextEntry={true}
    autoCapitalize="none"
    placeholderTextColor='white'
    onChangeText={val => this.onChangeText('password', val)}
/>
<TextInput
    style={styles.input}
    placeholder='Email'
    autoCapitalize="none"
    placeholderTextColor='white'
    onChangeText={val => this.onChangeText('email', val)}
/>
<TextInput
    style={styles.input}
    placeholder='Phone Number'
    autoCapitalize="none"
    placeholderTextColor='white'
    onChangeText={val => this.onChangeText('phone_number', val)}
/>
<Button
    title='Sign Up'
    onPress={this.signUp}
/>
</View>

const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#42A5F5',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
}); */}
// onChangeText = (key, val) => { this.setState({ [key]: val }) }
// signUp = async () => {
//     const { username, password, email, phone_number } = this.state
//     try {
//       // here place signup logic
//       console.log('user successfully signed up!: ', success)
//     } catch (err) {
//       console.log('error signing up: ', err)
//     };
// };