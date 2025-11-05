/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import { useUserStore } from '@zustand/userStore';

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
	const { isLoggedIn } = useUserStore();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
					{isLoggedIn ? (
						<Stack.Screen
							layout={({ children }) => {
								return <View className="flex-1 bg-white">{children}</View>;
							}}
							name="TabNavigation"
							component={TabNavigation}
						/>
					) : (
						<Stack.Screen name="AuthNavigation" component={AuthNavigation} />
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
