import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// lottie file not working
// import LottieView from 'lottie-react-native';
// import loadingAnimation from '../../assets/loading.json';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const stateData = await AsyncStorage.getItem('CREDIT_SWAG_STATE');  
      this.props.navigation.navigate(stateData.user ? 'App' : 'Auth');
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

export default AuthLoading;