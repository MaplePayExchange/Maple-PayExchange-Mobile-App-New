/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as Clipboard from 'expo-clipboard';
import { Toast } from 'toastify-react-native';
import { Alert, ToastAndroid, Platform } from 'react-native';

/**
|--------------------------------------------------
| Utils calss
|--------------------------------------------------
*/
class Utils {
	async copyToClipboard(text: string | number) {
		/**
        |--------------------------------------------------
        | Converting to string to ensure the value is a string
        |--------------------------------------------------
        */
		text = text.toString();
		try {
			await Clipboard.setStringAsync(text);

			/**
            |--------------------------------------------------
            | Provide feedback based on platform
            |--------------------------------------------------
            */
			if (Platform.OS === 'android') {
				ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
			} else {
				Alert.alert('Copied to clipboard!');
			}
		} catch (err: any) {
			console.log(err);
			/**
            |--------------------------------------------------
            | Error feedback based on platform
            |--------------------------------------------------
            */
			if (Platform.OS === 'android') {
				ToastAndroid.show('Failed to copy', ToastAndroid.SHORT);
			} else {
				Alert.alert('Failed to copy');
			}
		}
	}

	/**
	|--------------------------------------------------
	| Error handler
	|--------------------------------------------------
	*/
	errorHandler = (error: any, message?: string) => {
		console.log(error, 'main.error');
		console.log('Failed to login user:', error?.response?.data?.error);

		const errorMessage = error?.response?.data?.error || error.response?.data?.message;
		console.log(errorMessage, 'error.message');

		/**
		|--------------------------------------------------
		| Error notification
		|--------------------------------------------------
		*/
		Toast.show({
			text1: 'Error!',
			type: 'error',
			closeIconSize: 20,
			iconColor: '#FFFFFF',
			visibilityTime: 5000,
			textColor: '#FFFFFF',
			backgroundColor: '#fc3f35',
			text2: errorMessage || message,
		});
	};

	/**
	|--------------------------------------------------
	| Success handler
	|--------------------------------------------------
	*/
	successNotificationHanlder = (title: string, message: string) => {
		Toast.show({
			text1: title,
			text2: message,
			type: 'success',
			closeIconSize: 20,
			iconColor: '#FFFFFF',
			textColor: '#FFFFFF',
			backgroundColor: '#E2F9D2',
		});
	};
}

export default new Utils();
