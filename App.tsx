/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import ToastManager from 'toastify-react-native';
import { StyleSheet, StatusBar, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import './global.css';
import CustomToast from './src/components/CustomToast';
import usePushNotification from '@src/hooks/useGetPushNotification';
import RootNavigation from './src/screens/navigation/RootNavigation';

/**
|--------------------------------------------------
| Create query client
|--------------------------------------------------
*/
const queryClient = new QueryClient();

export default function App() {
	/**
	|--------------------------------------------------
	| Toast notification config
	|--------------------------------------------------
	*/
	const toastConfig = {
		custom: (props: any) => <CustomToast {...props} />,
	};

	/**
	|--------------------------------------------------
	| Destructure push notification methods
	|--------------------------------------------------
	*/
	const { requestUserPermission, listenToBackgroundNotifications, listenToForegroundNotifications } =
		usePushNotification();

	/**
	|--------------------------------------------------
	| Initialize push notification permissions and listeners
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		(async () => {
			const permissionGranted = await requestUserPermission();

			if (permissionGranted) {
				await listenToForegroundNotifications();
				await listenToBackgroundNotifications();
			}
		})();
	}, []);

	/**
	|--------------------------------------------------
	| Deep link handler
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		const subscription = Linking.addEventListener('url', ({ url }) => {
			console.log('App opened with URL:', url);
		});

		return () => {
			subscription.remove();
		};
	}, []);

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
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />

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
