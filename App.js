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
// import { connect } from "react-redux";
// import { clearError } from './redux/actions/index';

import { YellowBox, Platform } from 'react-native';
// YellowBox.ignoreWarnings(['Remote debugger']);
if (__DEV__) {
	require('react-devtools');
}  
// import { AsyncStorage } from 'react-native';

// import axios from 'axios';
// axios.defaults.withCredentials = true  // enable axios post cookie, default false

// ----------------------------------------------------------------------------------
// Components Imports
// ----------------------------------------------------------------------------------
import ConnectScreen from './pages/Connect/';
import DashboardScreen from './pages/Dashboard/';
import GoalsScreen from './pages/Goals/';
import AddGoalScreen from './pages/Goals/AddGoal/';
import SavingGoalScreen from './pages/Goals/SavingGoal/';

import SettingsScreen from './pages/Settings/';
import NotificationsScreen from './pages/Settings/Notifications/';
import ProfileScreen from './pages/Settings/Profile';
import EnterScreen from  './pages/AuthScreens/Enter/';
import AddBillScreen from  './pages/Dashboard/AddBill/';
import AuthLoadingScreen from './pages/AuthScreens/AuthLoading/';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const AuthStack = createStackNavigator({ 
	Enter: EnterScreen
});

const ConnectStack = createStackNavigator({ 
	Connect: ConnectScreen,
});

const SettingsStack = createStackNavigator({ 
	Settings: SettingsScreen,
	Notifications: NotificationsScreen,
	Profile: ProfileScreen,
});

const DashboardStack = createStackNavigator({ 
	Dashboard: DashboardScreen,
	AddBill: AddBillScreen
})

const GoalStack = createStackNavigator({ 
	Goals: GoalsScreen,
	Goal: SavingGoalScreen,
	AddGoal: AddGoalScreen
})

const MainNavigator = createAppContainer(createSwitchNavigator(
	{
		App: createBottomTabNavigator({
				Dashboard: DashboardStack,
				Goals: GoalStack,
				Settings: SettingsStack,
			}, {
				defaultNavigationOptions: ({ navigation }) => ({
				  tabBarIcon: ({ focused, horizontal, tintColor }) => {
					const { routeName } = navigation.state;
					let IconComponent = Ionicons;
					let iconName;
					if (routeName === 'Dashboard') {
					  iconName = Platform.OS === "ios" ? "ios-home" : "md-home";
					} else if (routeName === 'Goals') {
						iconName = Platform.OS === "ios" ? "ios-cash" : "md-cash";
					} else if (routeName === 'Settings') {
						iconName = Platform.OS === "ios" ? "ios-menu" : "md-menu";
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
