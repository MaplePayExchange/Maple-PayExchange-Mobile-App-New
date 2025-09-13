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
				ToastAndroid.showWithGravity('Copied to clipboard!', ToastAndroid.SHORT, 3);
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
		const errorMessage = error?.response?.data?.error || error.response?.data?.message || message;

		/**
		|--------------------------------------------------
		| Error notification
		|--------------------------------------------------
		*/
		Toast.show({
			theme: 'dark',
			text1: 'Error!',
			text2: errorMessage,
			type: 'custom' as any,
		});
	};

	/**
	|--------------------------------------------------
	| Success handler
	|--------------------------------------------------
	*/
	successNotificationHanlder = (title: string, message: string) => {
		Toast.show({
			text2: message,
			theme: 'light',
			text1: 'Success!',
			type: 'custom' as any,
		});
	};

	/**
	|--------------------------------------------------
	| Generates a list of years
	|--------------------------------------------------
	*/
	generateYears() {
		const startYear = 1940;
		const endYear = new Date().getFullYear() - 15;
		const years = [];

		for (let year = startYear; year <= endYear; year++) {
			years.push(year);
		}

		return years;
	}
}

export default new Utils();
