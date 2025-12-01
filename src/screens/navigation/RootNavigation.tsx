/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import { useUserStore } from '@zustand/userStore';
import { ROUTE_NAMES } from '@constants/routes.conts';
import KysStepsScreen from '../stacks/KycStepsScreen';

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
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{isLoggedIn ? (
						<>
							<Stack.Screen
								name="TabNavigation"
								component={TabNavigation}
								layout={({ children }: { children: any }) => {
									return <View className="flex-1 bg-white">{children}</View>;
								}}
							/>
							<Stack.Screen
								component={KysStepsScreen}
								name={ROUTE_NAMES.KYC_STEPS}
								layout={({ children }: { children: any }) => {
									return <View className="flex-1 bg-white">{children}</View>;
								}}
							/>
						</>
					) : (
						<Stack.Screen name="AuthNavigation" component={AuthNavigation} />
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
