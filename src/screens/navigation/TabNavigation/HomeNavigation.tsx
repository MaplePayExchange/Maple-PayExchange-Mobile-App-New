/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import LoginScreen from '../../auth/LoginScreen';
import AmountScreen from '../../stacks/AmountScreen';
import SendNGNScreen from '../../stacks/SendNGNScreen';
import { ROUTE_NAMES } from '@constants/routes.conts';
import SendCADScreen from '../../stacks/SendCADScreen';
import DashboardScreen from '../../stacks/DashboardScreen';
import VerifyBvnScreen from '../../stacks/VerifyBvnScreen';
import NotificationScreen from '../../stacks/NotificationScreen';
import ExchangeRatesScreen from '../../stacks/ExchangeRatesScreen';
import SetTransactionPinScreen from '../../stacks/SetTransactionPinScreen';
import SendFundsFeedbackScreen from '../../stacks/SendFundsFeedbackScreen';
import TailorYourExperienceScreen from '../../stacks/TailorYourExperience';
import SendFundsBeneficiaryScreen from '../../stacks/SendFundBeneficiaryScreen';
import ExchangeFundsFeedbackScreen from '../../stacks/ExchangeFundsFeedbackScreen';
import SendFundsErrorFeedbackScreen from '../../stacks/SendFundsErrorFeedbackScreen';

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
	{ name: ROUTE_NAMES.LOGIN, component: LoginScreen },
	{ name: ROUTE_NAMES.AMOUNT_SCREEN, component: AmountScreen },
	{ name: ROUTE_NAMES.SEND_CAD_FUNDS, component: SendCADScreen },
	{ name: ROUTE_NAMES.SEND_NGN_FUNDS, component: SendNGNScreen },
	{ name: ROUTE_NAMES.BVN_VERIFICATION, component: VerifyBvnScreen },
	{ name: ROUTE_NAMES.EXCHANGE_RATE, component: ExchangeRatesScreen },
	{ name: ROUTE_NAMES.NOTIFICATION_SCREEN, component: NotificationScreen },
	{ name: ROUTE_NAMES.SEND_FUNDS_FEEDBACK, component: SendFundsFeedbackScreen },
	{ name: ROUTE_NAMES.SET_TRANSACTION_PIN, component: SetTransactionPinScreen },
	{ name: ROUTE_NAMES.SEND_FUNDS_BENEFICIARY, component: SendFundsBeneficiaryScreen },
	{ name: ROUTE_NAMES.TAILOR_YOUR_EXPERIENCE, component: TailorYourExperienceScreen },
	{ name: ROUTE_NAMES.EXCHANGE_FUNDS_FEEDBACK, component: ExchangeFundsFeedbackScreen },
	{ name: ROUTE_NAMES.SEND_FUNDS_ERROR_FEEDBACK, component: SendFundsErrorFeedbackScreen },
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
