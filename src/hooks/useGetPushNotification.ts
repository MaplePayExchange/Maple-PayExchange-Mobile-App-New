/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { FIREBASE_CONFIG, initializeApp } from '@services/firebase.services';

/**
|--------------------------------------------------
| Custom hook for managing push notifications
|--------------------------------------------------
*/
const usePushNotification = () => {
	initializeApp(FIREBASE_CONFIG);

	/**
	|--------------------------------------------------
	| Property was declared to store last processed message ID
	| to prevent duplicate notifications
	|--------------------------------------------------
	*/
	let lastMessageId: string | null = null;

	/**
	|--------------------------------------------------
	| Method was called to create the default notification channel
	|--------------------------------------------------
	*/
	const createDefaultChannel = async () => {
		await notifee.createChannel({
			id: 'default',
			name: 'Default Channel',
			importance: AndroidImportance.HIGH,
		});
	};

	/**
	|--------------------------------------------------
	| Method was called to request user permission
	| for receiving push notifications
	|--------------------------------------------------
	*/
	const requestUserPermission = async () => {
		await createDefaultChannel();

		/**
		|--------------------------------------------------
		| Request notification permission from the user
		|--------------------------------------------------
		*/
		const authStatus = await messaging().requestPermission();

		/**
		|--------------------------------------------------
		| Check if permission is granted or provisional
		|--------------------------------------------------
		*/
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		/**
		|--------------------------------------------------
		| Return whether permission is enabled or not
		|--------------------------------------------------
		*/
		return enabled;
	};

	/**
	|--------------------------------------------------
	| Method was called to retrieve the push notification token
	|--------------------------------------------------
	*/
	const getPushToken = async () => {
		/**
		|--------------------------------------------------
		| Get the push notification token from Firebase
		|--------------------------------------------------
		*/
		const token = await messaging().getToken();

		/**
		|--------------------------------------------------
		| Return the token if it exists, otherwise return null
		|--------------------------------------------------
		*/
		if (token) {
			return token;
		} else {
			return null;
		}
	};

	/**
	|--------------------------------------------------
	| Method was called to display a local notification
	|--------------------------------------------------
	*/
	const displayNotification = async (remoteMessage: any) => {
		const title = remoteMessage?.notification?.title || remoteMessage?.data?.title || 'Notification';
		const body = remoteMessage?.notification?.body || remoteMessage?.data?.body || 'You have a new message';
		await notifee.displayNotification({
			title,
			body,
			android: {
				channelId: 'default',
			},
		});
	};

	/**
	|--------------------------------------------------
	| Method was called to listen to foreground notifications
	|--------------------------------------------------
	*/
	const listenToForegroundNotifications = async () => {
		/**
		|--------------------------------------------------
		| Set up an event listener for receiving messages
		| while the app is in the foreground
		|--------------------------------------------------
		*/
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			/**
			|--------------------------------------------------
			| Prevent duplicate notifications using messageId
			|--------------------------------------------------
			*/
			if (remoteMessage?.messageId === lastMessageId) return;
			lastMessageId = remoteMessage?.messageId || null;

			await displayNotification(remoteMessage);
		});

		/**
		|--------------------------------------------------
		| Return the unsubscribe function to clean up the listener
		|--------------------------------------------------
		*/
		return unsubscribe;
	};

	/**
	|--------------------------------------------------
	| Method was called to listen to background notifications
	|--------------------------------------------------
	*/
	const listenToBackgroundNotifications = async () => {
		/**
		|--------------------------------------------------
		| Set up a background message handler for receiving messages
		| while the app is in the background
		|--------------------------------------------------
		*/
		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
			/**
			|--------------------------------------------------
			| Prevent duplicate notifications using messageId
			|--------------------------------------------------
			*/
			if (remoteMessage?.messageId === lastMessageId) return;
			lastMessageId = remoteMessage?.messageId || null;

			await displayNotification(remoteMessage);
		});
	};

	/**
	|--------------------------------------------------
	| Method was called to handle notifications when
	| the app is opened from the background by tapping a notification
	|--------------------------------------------------
	*/
	const onNotificationOpenedAppFromBackground = async () => {
		/**
		|--------------------------------------------------
		| Set up a listener for notifications that open the app
		| from the background
		|--------------------------------------------------
		*/
		const unsubscribe = messaging().onNotificationOpenedApp(async (remoteMessage) => {
			await displayNotification(remoteMessage);
		});

		/**
		|--------------------------------------------------
		| Return the unsubscribe function to clean up the listener
		|--------------------------------------------------
		*/
		return unsubscribe;
	};

	/**
	|--------------------------------------------------
	| Method was called to handle notifications when
	| the app is opened from a quit state by tapping a notification
	|--------------------------------------------------
	*/
	const onNotificationOpenedAppFromQuit = async () => {
		/**
		|--------------------------------------------------
		| Get the initial notification that caused the app to open
		|--------------------------------------------------
		*/
		const message = await messaging().getInitialNotification();

		/**
		|--------------------------------------------------
		| Display the notification if it exists
		|--------------------------------------------------
		*/
		if (message) {
			await displayNotification(message);
		}
	};

	/**
	|--------------------------------------------------
	| Return all the functions for managing push notifications
	|--------------------------------------------------
	*/
	return {
		getPushToken,
		requestUserPermission,
		listenToForegroundNotifications,
		listenToBackgroundNotifications,
		onNotificationOpenedAppFromQuit,
		onNotificationOpenedAppFromBackground,
	};
};

/**
|--------------------------------------------------
| Export the custom hook for use in other components
|--------------------------------------------------
*/
export default usePushNotification;
