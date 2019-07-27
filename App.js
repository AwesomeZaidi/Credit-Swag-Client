import React from 'react';
import { createRootNavigator,
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
	SwitchNavigator,
	createBottomTabNavigator,
} from 'react-navigation';
import { Provider } from "react-redux";
import store from "./redux/store";

import { YellowBox, Platform } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
// import axios from 'axios';
// axios.defaults.withCredentials = true  // enable axios post cookie, default false

// ----------------------------------------------------------------------------------
// Components Imports
// ----------------------------------------------------------------------------------
import ConnectScreen from './pages/Connect/';
import DashboardScreen from './pages/Dashboard/';
import EnterScreen from  './pages/AuthScreens/Enter/';
import AuthLoadingScreen from './pages/AuthScreens/AuthLoading';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

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

const MainNavigator = createAppContainer(createSwitchNavigator(
	{
		App: createBottomTabNavigator({
				Dashboard: DashboardScreen,
				Bills: DashboardScreen,
				Profile: DashboardScreen,
			}, {
				defaultNavigationOptions: ({ navigation }) => ({
				  tabBarIcon: ({ focused, horizontal, tintColor }) => {
					const { routeName } = navigation.state;
					let IconComponent = Ionicons;
					let iconName;
					if (routeName === 'Dashboard') {
					  iconName = Platform.OS === "ios" ? "ios-home" : "md-home";
					} else if (routeName === 'Bills') {
						iconName = Platform.OS === "ios" ? "ios-cash" : "md-cash";
					} else if (routeName === 'Profile') {
						iconName = Platform.OS === "ios" ? "ios-settings" : "md-settings";
					}
					// You can return any component that you like here!
					return <IconComponent name={iconName} size={25} color={tintColor} />;
				  },
				}),
				tabBarOptions: {
					inactiveTintColor: 'lightgray',
					tintColor: <LinearGradient colors={['#C35EBF', '#9861D9', '#7662EA']} />,
					activeTintColor: '#C85EBD',
					showLabel: false,
					showIcon: true,
					style: {backgroundColor: '#373645', height: 60, padding:0, margin:0}
				},
			  }
		),
		Connect: ConnectStack,
		AuthLoading: AuthLoadingScreen,
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
