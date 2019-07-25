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
import ConnectScreen from './pages/Connect/';
import DashboardScreen from './pages/Dashboard/';
import EnterScreen from  './pages/AuthScreens/Enter/';
import AuthLoadingScreen from './pages/AuthScreens/AuthLoading';

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// createMaterialBottomTabNavigator(
// 	// RouteConfigs,
// 	MaterialBottomTabNavigatorConfig
//   );

const AuthStack = createStackNavigator({ 
	Enter: EnterScreen
});

const ConnectStack = createStackNavigator({ 
	Connect: ConnectScreen,
});

const AppStack = createStackNavigator({
	Tabs: createMaterialBottomTabNavigator({
		Dashboard: { screen: DashboardScreen },
		Settings: { screen: DashboardScreen }, // how to create like a page list here
		// Create page here just like i do above ^ DashBoardScreen is a page component
		// I import at the top so you need to create a component and then import it like so.
	  }, {
		initialRouteName: 'Dashboard',
		activeColor: '#f0edf6',
		inactiveColor: '#3e2465',
		barStyle: { backgroundColor: '#694fad' },
	  }),
});


const MainNavigator = createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Auth: AuthStack,
		Connect: ConnectStack
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
