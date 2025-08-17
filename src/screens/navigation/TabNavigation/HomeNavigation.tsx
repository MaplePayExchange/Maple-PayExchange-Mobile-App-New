/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { ROUTE_NAMES } from '@/constants/routes.conts';
import DashboardScreen from '../../stacks/DashboardScreen';
import VerifyBvnScreen from '../../stacks/VerifyBvnScreen';
import SetTransactionPinScreen from '../../stacks/SetTransactionPinScreen';

/**
|--------------------------------------------------
| Stack creation
|--------------------------------------------------
*/
const Stack = createStackNavigator();

/**
|--------------------------------------------------
| Routes
|--------------------------------------------------
*/
const _ROUTES = [
	{ name: 'DashboardScreen', component: DashboardScreen },
	{ name: ROUTE_NAMES.BVN_VERIFICATION, component: VerifyBvnScreen },
	{ name: ROUTE_NAMES.SET_TRANSACTION_PIN, component: SetTransactionPinScreen },
];

export default function HomeNavigation() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
				gestureDirection: 'horizontal',
			}}
		>
			{/**
            |--------------------------------------------------
            | Mapping through the routes
            |--------------------------------------------------
            */}
			{_ROUTES.map((route) => (
				<Stack.Screen key={route.name} {...route} />
			))}
		</Stack.Navigator>
	);
}
