/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import * as Notifications from 'expo-notifications';
import { Alert, Linking, Platform } from 'react-native';

export default function usePushNotifications() {
	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const [expoPushToken, setExpoPushToken] = React.useState<string | null>(null);

	/**
	|--------------------------------------------------
	| Notifications handler
	|--------------------------------------------------
	*/
	Notifications.setNotificationHandler({
		handleNotification: async () =>
			({
				shouldPlaySound: false,
				shouldShowAlert: true,
				shouldSetBadge: false,
			}) as any,
	});

	/**
	|--------------------------------------------------
	| Effect to call the notification
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		async function registerForPushNotificationsAsync() {
			await new Promise((resolve) => setTimeout(resolve, 400));
			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			const settings = await Notifications.getPermissionsAsync();
			let finalStatus = settings.status;

			console.log(finalStatus, "finalStatus.before");

			/**
			|--------------------------------------------------
			| If not yet granted or denied, ask the user
			|--------------------------------------------------
			*/
			if (finalStatus !== 'granted') {
				const request = await Notifications.requestPermissionsAsync();
				finalStatus = request.status;
				console.log(finalStatus, 'request.finalStatus.after');
			}

			/**
			|--------------------------------------------------
			| If blocked or denied
			|--------------------------------------------------
			*/
			if (finalStatus !== 'granted') {
				Alert.alert(
					'Notifications Disabled',
					'You’ve blocked notifications. Please enable them in your settings to stay updated.',
					[
						{
							text: 'Open Settings',
							onPress: () => {
								if (Platform.OS === 'ios') {
									Linking.openURL('app-settings:');
								} else {
									Linking.openSettings();
								}
							},
						},
						{ text: 'Cancel', style: 'cancel' },
					]
				);
				return;
			}

			/**
			|--------------------------------------------------
			| Otherwise, get the token
			|--------------------------------------------------
			*/
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			setExpoPushToken(token);

			/**
			|--------------------------------------------------
			| Android notification channel setup
			|--------------------------------------------------
			*/
			if (Platform.OS === 'android') {
				await Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					vibrationPattern: [0, 250, 250, 250],
					importance: Notifications.AndroidImportance.MAX,
				});
			}
		}

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		registerForPushNotificationsAsync();
	}, []);

	return expoPushToken;
}
