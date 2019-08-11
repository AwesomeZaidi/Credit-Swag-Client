import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from "react-redux";

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const stateData = await AsyncStorage.getItem('CREDIT_SWAG_STATE');  
      if (this.props.user === undefined) {
        this.props.navigation.navigate('Auth');
      } else {
        if (this.props.user.access_token) {      
          this.props.navigation.navigate('App');
        } else { 
          this.props.navigation.navigate('Connect');
        }
      }
    } catch(err) {  
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  };
};

const mapStateToProps = state => {
  return {
      user: state.user,
  };
};

export default connect(mapStateToProps, null)(AuthLoading);