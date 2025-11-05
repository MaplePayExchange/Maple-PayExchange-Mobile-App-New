/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { FIREBASE_CONFIG, initializeApp } from '@services/firebase.services';

/**
|--------------------------------------------------
| Method was called to get FCM token for notification
|--------------------------------------------------
*/
export const getFcmToken = async () => {
	/**
	|--------------------------------------------------
	| Initialize token to null
	|--------------------------------------------------
	*/
	let token = null;

	/**
	|--------------------------------------------------
	| Check and request notification permissions
	|--------------------------------------------------
	*/
	await checkApplicationNotificationPermission();

	/**
	|--------------------------------------------------
	| Register the app with Firebase Cloud Messaging (FCM)
	|--------------------------------------------------
	*/
	await registerAppWithFCM();

	try {
		/**
		|--------------------------------------------------
		| Get the FCM token
		|--------------------------------------------------
		*/
		token = await messaging().getToken();
		console.log('getFcmToken-->', token);
	} catch (error) {
		/**
		|--------------------------------------------------
		| Log any errors that occur while retrieving the token
		|--------------------------------------------------
		*/
		console.log('getFcmToken Device Token error ', error);
	}

	/**
	|--------------------------------------------------
	| Dispatch the token to the Redux store
	|--------------------------------------------------
	*/
	// store.dispatch(setPushToken(token as string));

	/**
	|--------------------------------------------------
	| Return the token
	|--------------------------------------------------
	*/
	return token;
};

/**
|--------------------------------------------------
| Method was called to register the app with Firebase
| Cloud Messaging (FCM) for receiving notifications
|--------------------------------------------------
*/
export async function registerAppWithFCM() {
	console.log('registerAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

	/**
	|--------------------------------------------------
	| Check if the app is already registered for remote messages
	|--------------------------------------------------
	*/
	if (!messaging().isDeviceRegisteredForRemoteMessages) {
		/**
		|--------------------------------------------------
		| Register the app for remote messages
		|--------------------------------------------------
		*/
		await messaging()
			.registerDeviceForRemoteMessages()
			.then((status) => {
				/**
				|--------------------------------------------------
				| Log the registration status
				|--------------------------------------------------
				*/
				console.log('registerDeviceForRemoteMessages status', status);
			})
			.catch((error) => {
				/**
				|--------------------------------------------------
				| Log any errors that occur during registration
				|--------------------------------------------------
				*/
				console.log('registerDeviceForRemoteMessages error ', error);
			});
	}
}

/**
|--------------------------------------------------
| Method was called to unregister the app from Firebase
| Cloud Messaging (FCM) and stop receiving notifications
|--------------------------------------------------
*/
export async function unRegisterAppWithFCM() {
	console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

	/**
	|--------------------------------------------------
	| Check if the app is currently registered for remote messages
	|--------------------------------------------------
	*/
	if (messaging().isDeviceRegisteredForRemoteMessages) {
		/**
		|--------------------------------------------------
		| Unregister the app from remote messages
		|--------------------------------------------------
		*/
		await messaging()
			.unregisterDeviceForRemoteMessages()
			.then((status) => {
				/**
				|--------------------------------------------------
				| Log the unregistration status
				|--------------------------------------------------
				*/
				console.log('unregisterDeviceForRemoteMessages status', status);
			})
			.catch((error) => {
				/**
				|--------------------------------------------------
				| Log any errors that occur during unregistration
				|--------------------------------------------------
				*/
				console.log('unregisterDeviceForRemoteMessages error ', error);
			});
	}

	/**
	|--------------------------------------------------
	| Delete the FCM token
	|--------------------------------------------------
	*/
	await messaging().deleteToken();

	/**
	|--------------------------------------------------
	| Log the current registration status after deletion
	|--------------------------------------------------
	*/
	console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
}

/**
|--------------------------------------------------
| Method to check and request notification permissions
|--------------------------------------------------
*/
export const checkApplicationNotificationPermission = async () => {
	/**
	|--------------------------------------------------
	| Request notification permission from the user
	|--------------------------------------------------
	*/
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		/**
		|--------------------------------------------------
		| Log the authorization status if permission is granted
		|--------------------------------------------------
		*/
		console.log('Authorization status:', authStatus);
	}

	/**
	|--------------------------------------------------
	| Request POST_NOTIFICATIONS permission for Android devices
	|--------------------------------------------------
	*/
	request((PERMISSIONS as any).ANDROID.POST_NOTIFICATIONS)
		.then((result) => {
			/**
			|--------------------------------------------------
			| Log the status of the POST_NOTIFICATIONS permission
			|--------------------------------------------------
			*/
			console.log('POST_NOTIFICATIONS status:', result);
		})
		.catch((error) => {
			/**
			|--------------------------------------------------
			| Log any errors that occur while requesting permission
			|--------------------------------------------------
			*/
			console.log('POST_NOTIFICATIONS error ', error);
		});
};

/**
|--------------------------------------------------
| Method was called to listen to events from Firebase
| for notification triggers
|--------------------------------------------------
*/
export function registerListenerWithFCM() {
	initializeApp(FIREBASE_CONFIG);
	
	/**
	|--------------------------------------------------
	| Set up an event listener for receiving messages
	| while the app is in the foreground
	|--------------------------------------------------
	*/
	const unsubscribe = messaging().onMessage(async (remoteMessage) => {
		console.log('onMessage Received : ', JSON.stringify(remoteMessage));

		/**
		|--------------------------------------------------
		| Check if the message contains a notification with
		| a title and body
		|--------------------------------------------------
		*/
		if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
			/**
			|--------------------------------------------------
			| Display the notification
			|--------------------------------------------------
			*/
			onDisplayNotification(
				remoteMessage.notification?.title,
				remoteMessage.notification?.body,
				remoteMessage?.data
			);
		}
	});

	/**
	|--------------------------------------------------
	| Set up a listener for notification events while
	| the app is in the foreground
	|--------------------------------------------------
	*/
	notifee.onForegroundEvent(({ type, detail }) => {
		switch (type) {
			case EventType.DISMISSED:
				/**
				|--------------------------------------------------
				| Log when the user dismisses a notification
				|--------------------------------------------------
				*/
				console.log('User dismissed notification', detail.notification);
				break;
			case EventType.PRESS:
				/**
				|--------------------------------------------------
				| Log when the user presses a notification
				|--------------------------------------------------
				*/
				console.log('User pressed notification', detail.notification);
				// If there is a click action, handle it (commented out)
				// if (detail?.notification?.data?.clickAction) {
				//   onNotificationClickActionHandling(
				//     detail.notification.data.clickAction
				//   );
				// }
				break;
		}
	});

	/**
	|--------------------------------------------------
	| Listen for when the app is opened by tapping
	| on a notification
	|--------------------------------------------------
	*/
	messaging().onNotificationOpenedApp(async (remoteMessage) => {
		console.log('onNotificationOpenedApp Received', JSON.stringify(remoteMessage));
		// If there is a click action, handle it (commented out)
		// if (remoteMessage?.data?.clickAction) {
		//   onNotificationClickActionHandling(remoteMessage.data.clickAction);
		// }
	});

	/**
	|--------------------------------------------------
	| Check whether an initial notification caused
	| the app to open
	|--------------------------------------------------
	*/
	messaging()
		.getInitialNotification()
		.then((remoteMessage) => {
			if (remoteMessage) {
				/**
				|--------------------------------------------------
				| Log the notification that caused the app to open
				| from a quit state
				|--------------------------------------------------
				*/
				console.log('Notification caused app to open from quit state:', remoteMessage.notification);
			}
		});

	/**
	|--------------------------------------------------
	| Return the unsubscribe function to clean up the listener
	|--------------------------------------------------
	*/
	return unsubscribe;
}

/**
|--------------------------------------------------
| Method was called to display notification
|--------------------------------------------------
*/
async function onDisplayNotification(title: string, body: string, data: any) {
	/**
	|--------------------------------------------------
	| Log the data of the notification to be displayed
	|--------------------------------------------------
	*/
	console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

	/**
	|--------------------------------------------------
	| Request notification permissions (required for iOS)
	|--------------------------------------------------
	*/
	await notifee.requestPermission();

	/**
	|--------------------------------------------------
	| Create a notification channel (required for Android)
	|--------------------------------------------------
	*/
	const channelId = await notifee.createChannel({
		id: 'default',
		name: 'Default Channel',
	});

	/**
	|--------------------------------------------------
	| Display the notification with the provided title,
	| body, and data
	|--------------------------------------------------
	*/
	await notifee.displayNotification({
		title: title,
		body: body,
		data: data,
		android: {
			channelId,
			// pressAction is needed if you want the notification to open the app when pressed
			pressAction: {
				id: 'default',
			},
		},
	});
}
