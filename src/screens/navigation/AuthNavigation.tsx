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
import KYCTermsScreen from '../stacks/KYCTermsScreen';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import CreateUserScreen from '../auth/CreateUserScreen';
import OnboardingScreen from '../auth/OnboardingScreen';
import VerifyEmailScreen from '../auth/VerifyEmailScreen';
import ResetPasswordScreen from '../auth/ResetPasswordScreen';
import ForgotPasswordScreen from '../auth/ForgotPasswordScreen';
import PrivacyPolicyScreen from '../stacks/PrivacyPolicyScreen';
import PhoneVerificationScreen from '../auth/PhoneVerificationScreen';
import EmailVerificationScreen from '../auth/EmailVerificationScreen';
import VerifyPhoneNumberScreen from '../auth/VerifyPhoneNumberScreen';
import TermsAndCondtionsScreen from '../stacks/TermsAndCondtionsScreen';
import TailorYourExperienceScreen from '../auth/TailorYourExperienceScreen';

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
		name: ROUTE_NAMES.CREATE_USER,
		component: CreateUserScreen,
	},
	{
		name: ROUTE_NAMES.ONBOARDING,
		component: OnboardingScreen,
	},
	{
		name: ROUTE_NAMES.RESET_PASSWORD,
		component: ResetPasswordScreen,
	},
	{
		name: ROUTE_NAMES.FORGOT_PASSWORD,
		component: ForgotPasswordScreen,
	},
	{
		name: ROUTE_NAMES.VERIFY_PHONE,
		component: VerifyPhoneNumberScreen,
	},
	{
		name: ROUTE_NAMES.VERIFY_EMAIL,
		component: VerifyEmailScreen,
	},
	{
		name: ROUTE_NAMES.EMAIL_VERIFICATION,
		component: EmailVerificationScreen,
	},

	{
		name: ROUTE_NAMES.TAILOR_YOUR_EXPERIENCE,
		component: TailorYourExperienceScreen,
	},
	{
		name: ROUTE_NAMES.TERMS_AND_CONDITIONS,
		component: TermsAndCondtionsScreen,
	},
	{
		name: ROUTE_NAMES.PHONE_VERIFICATION,
		component: PhoneVerificationScreen,
	},
	{
		name: ROUTE_NAMES.PRIVACY_POLICY,
		component: PrivacyPolicyScreen,
	},
	{
		name: ROUTE_NAMES.KYC_TERMS,
		component: KYCTermsScreen,
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
