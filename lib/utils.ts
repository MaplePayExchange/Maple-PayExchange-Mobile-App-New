/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as Device from 'expo-device';
import * as Network from 'expo-network';
import * as Clipboard from 'expo-clipboard';
import { Toast } from 'toastify-react-native';
//@ts-ignore
import VersionCheck from 'react-native-version-check-expo';
import { Alert, ToastAndroid, Platform } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import axiosInstance from './axiosInstance';

export interface Versioning {
	iosVersion: string;
	iosUpdateUrl: string;
	androidVersion: string;
	androidUpdateUrl: string;
	minSupportedIosVersion?: string;
	minSupportedAndroidVersion?: string;
	iosUpdateType: 'OPTIONAL' | 'MANDATORY';
	androidUpdateType: 'OPTIONAL' | 'MANDATORY';
}

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
		let errorMessage = error?.response?.data?.error || error?.response?.data?.message || message;

		/**
		|--------------------------------------------------
		| Handle array of errors
		|--------------------------------------------------
		*/
		if (Array.isArray(errorMessage)) {
			errorMessage = errorMessage
				?.slice(0, 1)
				.map((err: any) => err?.message || String(err))
				.join('\n');
		} else if (typeof errorMessage === 'object') {
			errorMessage = errorMessage?.message || JSON.stringify(errorMessage);
		}

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

	/**
	|--------------------------------------------------
	| Gets device information
	|--------------------------------------------------
	*/
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

	/**
	|--------------------------------------------------
	| Version check information
	|--------------------------------------------------
	*/
	async checkAppStoreUpdate() {
		let updateResponse: {
			version: string;
			updateType: string;
			iosUpdateUrl: string;
			updateRequired: boolean;
			androidUpdateUrl: string;
		} = {
			version: '',
			iosUpdateUrl: '',
			androidUpdateUrl: '',
			updateType: 'OPTIONAL',
			updateRequired: false,
		};

		try {
			/**
			|--------------------------------------------------
			| Checks the latest version
			|--------------------------------------------------
			*/
			const response = await axiosInstance.get('/versions');
			const versions = response.data as Versioning;

			let latestVersion: string = '';

			/**
			|--------------------------------------------------
			| Update response for either ios or android
			|--------------------------------------------------
			*/
			if (Platform.OS === 'ios') {
				latestVersion = versions.iosVersion;
				updateResponse = {
					...updateResponse,
					version: versions.iosVersion,
					updateType: versions.iosUpdateType,
					iosUpdateUrl: versions.iosUpdateUrl,
				};
			} else {
				latestVersion = versions.androidVersion;
				updateResponse = {
					...updateResponse,
					version: versions.androidVersion,
					updateType: versions.androidUpdateType,
					androidUpdateUrl: versions.androidUpdateUrl,
				};
			}

			/**
			|--------------------------------------------------
			| Gets the current version
			|--------------------------------------------------
			*/
			const currentVersion = VersionCheck.getCurrentVersion();

			/**
			|--------------------------------------------------
			| Checks if an update is needed
			|--------------------------------------------------
			*/
			if (VersionCheck.needUpdate({ currentVersion, latestVersion })['_j']['_j']['isNeeded']) {
				updateResponse = {
					...updateResponse,
					updateRequired: true,
				};
			}
		} catch (err) {
			console.log('Version check failed:', err);
		}

		return updateResponse;
	}
}

export default new Utils();
