/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import LoginScreen from '../auth/LoginScreen';
import SplashScreen from '../auth/SplashScreen';
import CreateUserScreen from '../auth/CreateUserScreen';
import BVNVerificationScreen from '../auth/BVNVerificationScreen';
import PhoneVerificationScreen from '../auth/PhoneVerificationScreen';
import EmailVerificationScreen from '../auth/EmailVerificationScreen';

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
	{
		name: 'SplashScreen',
		component: SplashScreen,
	},
	{
		name: 'PhoneVerificationScreen',
		component: PhoneVerificationScreen,
	},
	{
		name: 'EmailVerificationScreen',
		component: EmailVerificationScreen,
	},
	{
		name: 'CreateUserScreen',
		component: CreateUserScreen,
	},
	{
		name: 'BVNVerificationScreen',
		component: BVNVerificationScreen,
	},
	{
		name: 'LoginScreen',
		component: LoginScreen,
	},
];

export default function AuthNavigation() {
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
