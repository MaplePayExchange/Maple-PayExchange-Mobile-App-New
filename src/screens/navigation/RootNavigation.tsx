/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';

/**
|--------------------------------------------------
| Creating a Stack
|--------------------------------------------------
*/
const Stack = createStackNavigator();

export default function RootNavigation() {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [session, setSession] = React.useState<boolean>(false);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
				{session ? (
					<Stack.Screen name="TabNavigation" component={TabNavigation}></Stack.Screen>
				) : (
					<Stack.Screen name="AuthNavigation" component={AuthNavigation}></Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
