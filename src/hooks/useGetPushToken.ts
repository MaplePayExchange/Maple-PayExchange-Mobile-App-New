/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function usePushNotifications() {
	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const [expoPushToken, setExpoPushToken] = React.useState<string | null>(null);

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
    | ...
    |--------------------------------------------------
    */
	React.useEffect(() => {
		async function registerForPushNotificationsAsync() {
			const { status } = await Notifications.requestPermissionsAsync();

			/**
            |--------------------------------------------------
            | Status
            |--------------------------------------------------
            */
			if (status !== 'granted') {
				alert('Failed to get push token');
				return;
			}

			const token = (await Notifications.getExpoPushTokenAsync()).data;
			setExpoPushToken(token);

			/**
            |--------------------------------------------------
            | If the platform is android
            |--------------------------------------------------
            */
			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
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
