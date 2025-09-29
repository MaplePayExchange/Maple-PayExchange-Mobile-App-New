/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import {
	useFonts,
	Manrope_700Bold,
	Manrope_500Medium,
	Manrope_400Regular,
	Manrope_600SemiBold,
	Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ToastManager from 'toastify-react-native';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import './global.css';
import CustomToast from './src/components/CustomToast';
import RootNavigation from './src/screens/navigation/RootNavigation';

const queryClient = new QueryClient();

export default function App() {
	/**
	|--------------------------------------------------
	| Tell Expo how to handle incoming notifications
	| when the app is foregrounded
	|--------------------------------------------------
	*/
	Notifications.setNotificationHandler({
		handleNotification: async () =>
			({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: false,
			}) as any,
	});

	/**
    |--------------------------------------------------
    | Fonts
    |--------------------------------------------------
    */
	const [fontsLoaded] = useFonts({
		Manrope_700Bold,
		Manrope_500Medium,
		Manrope_400Regular,
		Manrope_600SemiBold,
		Manrope_800ExtraBold,
	});

	const toastConfig = {
		custom: (props: any) => <CustomToast {...props} />,
	};

	React.useEffect(() => {
		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		const subscription = Linking.addEventListener('url', ({ url }) => {
			console.log('App opened with URL:', url);
		});

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		const subscriptionReceived = Notifications.addNotificationReceivedListener((notification) => {
			console.log('Notification received:', notification);
		});

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		const subscriptionResponse = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log('Notification clicked:', response);
		});

		return () => {
			subscription.remove();
			subscriptionReceived.remove();
			subscriptionResponse.remove();
		};
	}, []);

	/**
    |--------------------------------------------------
    | Returns nothing if the fonts aren't loaded yet
    |--------------------------------------------------
    */
	if (!fontsLoaded) return null;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<SafeAreaProvider style={[styles.container]}>
			{/**
            |--------------------------------------------------
            | Status bar theme
            |--------------------------------------------------
            */}
			<StatusBar style="auto" />

			{/**
            |--------------------------------------------------
            | Root navigation
            |--------------------------------------------------
            */}
			<QueryClientProvider client={queryClient}>
				<RootNavigation />
			</QueryClientProvider>

			{/**
			|--------------------------------------------------
			| Toast manager
			|--------------------------------------------------
			*/}
			<ToastManager animationStyle="fade" config={toastConfig} />
		</SafeAreaProvider>
	);
}

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
	/**
    |--------------------------------------------------
    | Container
    |--------------------------------------------------
    */
	container: { flex: 1 },
});
