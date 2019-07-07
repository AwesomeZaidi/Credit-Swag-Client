import React from 'react';
import { createRootNavigator,
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
	SwitchNavigator
} from 'react-navigation';
import { Provider } from "react-redux";
import store from "./redux/store";

// ----------------------------------------------------------------------------------
// Components Imports
// ----------------------------------------------------------------------------------
import HomeScreen from './pages/Home/'
import DetailScreen from './pages/Detail/'
import SignUpScreen from './pages/AuthScreens/SignUp/'
import SignInScreen from './pages/AuthScreens/SignIn/'
import AuthLoadingScreen from './pages/AuthScreens/AuthLoading';

const AppStack = createStackNavigator({
		Home: HomeScreen,
		Detail: DetailScreen
});

const AuthStack = createStackNavigator({ 
	SignUp: SignUpScreen,
	SignIn: SignInScreen
});

const MainNavigator = createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
));

class App extends React.Component {
	render() {
	  return (
		<Provider store={store}>
		  <MainNavigator />
		</Provider>
	  );
	};
};

export default App;
