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
import styles from './pages/styles/variables'

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
		Home: DashboardScreen,
		Settings: DashboardScreen,
		},
		{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
			const { routeName } = navigation.state;
			let IconComponent = Ionicons;
			let iconName;
			if (routeName === 'Home') {
				iconName = `ios-information-circle${focused ? '' : '-outline'}`;
			} else if (routeName === 'Settings') {
				iconName = `ios-options`;
			}
			// You can return any component that you like here!
			return <IconComponent name={iconName} size={25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
	})
});
	// 	Dashboard: { screen: DashboardScreen },
	// 	Settings: { screen: DashboardScreen }, // how to create like a page list here
	// 	// Create page here just like i do above ^ DashBoardScreen is a page component
	// 	// I import at the top so you need to create a component and then import it like so.
	//   }, {
	// 	initialRouteName: 'Dashboard',
	// 	activeColor: '#373645',
	// 	inactiveColor: '#f4f4f4',
	// 	barStyle: { backgroundColor: '#373645' },
	//   },
	  

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
