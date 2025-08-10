/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React, { Component } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import LoginScreen from '../auth/LoginScreen';
import SplashScreen from '../auth/SplashScreen';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import CreateUserScreen from '../auth/CreateUserScreen';
import OnboardingScreen from '../auth/OnboardingScreen';
import BVNVerificationScreen from '../auth/BVNVerificationScreen';
import PhoneVerificationScreen from '../auth/PhoneVerificationScreen';
import EmailVerificationScreen from '../auth/EmailVerificationScreen';
import VerifyPhoneNumberScreen from '../auth/VerifyPhoneNumberScreen';
import VerifyEmailScreen from '../auth/VerifyEmailScreen';

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
		name: ROUTE_NAMES.SPLASH,
		component: SplashScreen,
	},
	{
		name: ROUTE_NAMES.LOGIN,
		component: LoginScreen,
	},
	{
		name: ROUTE_NAMES.ONBOARDING,
		component: OnboardingScreen,
	},
	{
		name: ROUTE_NAMES.CREATE_USER,
		component: CreateUserScreen,
	},
	{
		name: ROUTE_NAMES.BVN_VERIFICATION,
		component: BVNVerificationScreen,
	},
	{
		name: ROUTE_NAMES.EMAIL_VERIFICATION,
		component: EmailVerificationScreen,
	},
	{
		name: ROUTE_NAMES.PHONE_VERIFICATION,
		component: PhoneVerificationScreen,
	},
	{
		name: ROUTE_NAMES.VERIFY_PHONE,
		component: VerifyPhoneNumberScreen,
	},
	{
		name: ROUTE_NAMES.VERIFY_EMAIL,
		component: VerifyEmailScreen,
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
