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
import ProfileScreen from '../../stacks/ProfileScreen';
import ResetPinScreen from '../../stacks/ResetPinScreen';
import ProfileSettingsScreen from '../../stacks/ProfileSettings';
import ReferAndEarnScreen from '../../stacks/ReferAndEarnScreen';
import ExchangeRatesScreen from '../../stacks/ExchangeRatesScreen';
import ChangePasswordScreen from '../../stacks/ChangePasswordScreen';
import TransactionLimitScreen from '../../stacks/TransactionLimitScreen';
import SendFundsBeneficiaryScreen from '../../stacks/SendFundBeneficiaryScreen';
import NotificationsSettingsScreen from '../../stacks/NotificationsSettingsScreen';
import ReferralTermsAndConditionsScreen from '../../stacks/ReferralTermsAndConditionsScreen';
import DeviceAndSessionScreen from '../../stacks/DeviceAndSessionScreen';

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
	{ name: ROUTE_NAMES.PROFILE, component: ProfileScreen },
	{ name: ROUTE_NAMES.RESET_PIN, component: ResetPinScreen },
	{ name: ROUTE_NAMES.REFER_AND_EARN, component: ReferAndEarnScreen },
	{ name: ROUTE_NAMES.EXCHANGE_RATE, component: ExchangeRatesScreen },
	{ name: ROUTE_NAMES.CHANGE_PASSWORD, component: ChangePasswordScreen },
	{ name: ROUTE_NAMES.PROFILE_SETTINGS, component: ProfileSettingsScreen },
	{ name: ROUTE_NAMES.TRANSACTION_LIMIT, component: TransactionLimitScreen },
	{ name: ROUTE_NAMES.DEVICES_AND_SESSIONS, component: DeviceAndSessionScreen },
	{ name: ROUTE_NAMES.SEND_FUNDS_BENEFICIARY, component: SendFundsBeneficiaryScreen },
	{ name: ROUTE_NAMES.NOTIFICATIONS_SETTINGS, component: NotificationsSettingsScreen },
	{ name: ROUTE_NAMES.REFERRAL_TERMS_AND_CONDITIONS, component: ReferralTermsAndConditionsScreen },
];

export default function ProfileNavigation() {
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
