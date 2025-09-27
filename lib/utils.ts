/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as Device from 'expo-device';
import * as Network from 'expo-network';
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

	async getDeviceInfo() {
		try {
			/**
			|--------------------------------------------------
			| Device type mapping
			|--------------------------------------------------
			*/
			const deviceTypeMap: Record<number, string> = {
				[Device.DeviceType.UNKNOWN]: 'Unknown',
				[Device.DeviceType.PHONE]: 'Phone',
				[Device.DeviceType.TABLET]: 'Tablet',
				[Device.DeviceType.DESKTOP]: 'Desktop',
				[Device.DeviceType.TV]: 'TV',
			};

			/**
			|--------------------------------------------------
			| Get device details
			|--------------------------------------------------
			*/
			const brand = Device.brand ?? 'Unknown';
			const osName = Device.osName ?? 'Unknown';
			const modelName = Device.modelName ?? 'Unknown';
			const osVersion = Device.osVersion ?? 'Unknown';
			const deviceName = Device.deviceName ?? 'Unknown';
			const deviceType = deviceTypeMap[Device.deviceType ?? Device.DeviceType.UNKNOWN];

			const browser = undefined;

			/**
			|--------------------------------------------------
			| Network info
			|--------------------------------------------------
			*/
			const ipAddress = await Network.getIpAddressAsync();
			const networkState = await Network.getNetworkStateAsync();

			const location = {
				country: undefined,
				city: undefined,
			};

			/**
			|--------------------------------------------------
			| Returned response
			|--------------------------------------------------
			*/
			return {
				brand,
				osName,
				browser,
				location,
				modelName,
				ipAddress,
				osVersion,
				deviceType,
				deviceName,
				networkState,
			};
		} catch (error) {
			console.error('Error fetching device info:', error);
			return null;
		}
	}
}

export default new Utils();
