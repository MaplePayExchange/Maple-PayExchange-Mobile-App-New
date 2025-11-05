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
import LoginScreen from '../../auth/LoginScreen';
import { ROUTE_NAMES } from '@constants/routes.conts';
import SupportScreen from '../../stacks/SupportScreen';
import SupportDetailsScreen from '../../stacks/SupportDetailsScreen';

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
	{ name: ROUTE_NAMES.SUPPORT, component: SupportScreen },
	{ name: ROUTE_NAMES.LOGIN, component: LoginScreen },
	{ name: ROUTE_NAMES.SUPPORT_DETAILS_SCREEN, component: SupportDetailsScreen },
];

export default function SupportNavigation() {
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
