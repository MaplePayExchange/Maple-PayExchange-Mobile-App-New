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
import AmountScreen from '../../stacks/AmountScreen';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import SendCADScreen from '../../stacks/SendCADScreen';
import DashboardScreen from '../../stacks/DashboardScreen';
import VerifyBvnScreen from '../../stacks/VerifyBvnScreen';
import SetTransactionPinScreen from '../../stacks/SetTransactionPinScreen';
import SendFundsFeedbackScreen from '../../stacks/SendFundsFeedbackScreen';
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
	{ name: ROUTE_NAMES.AMOUNT_SCREEN, component: AmountScreen },
	{ name: ROUTE_NAMES.SEND_CAD_FUNDS, component: SendCADScreen },
	{ name: ROUTE_NAMES.BVN_VERIFICATION, component: VerifyBvnScreen },
	{ name: ROUTE_NAMES.SEND_FUNDS_FEEDBACK, component: SendFundsFeedbackScreen },
	{ name: ROUTE_NAMES.SET_TRANSACTION_PIN, component: SetTransactionPinScreen },
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
