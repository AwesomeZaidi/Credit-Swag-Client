import React from 'react';
import { createRootNavigator,
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
	SwitchNavigator
} from 'react-navigation';
import { Provider } from "react-redux";
import store from "./redux/store";
// import axios from 'axios';
// axios.defaults.withCredentials = true  // enable axios post cookie, default false

// ----------------------------------------------------------------------------------
// Components Imports
// ----------------------------------------------------------------------------------
import HomeScreen from './pages/Home/'
import DetailScreen from './pages/Detail/'
// import SignUpScreen from './pages/AuthScreens/SignUp/'
// import SignInScreen from './pages/AuthScreens/SignIn/'
import EnterScreen from  './pages/AuthScreens/Enter/';
import AuthLoadingScreen from './pages/AuthScreens/AuthLoading';

const AppStack = createStackNavigator({
		Home: HomeScreen,
		Detail: DetailScreen
});

const AuthStack = createStackNavigator({ 
	Enter: EnterScreen
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
