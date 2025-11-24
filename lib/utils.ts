/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Toast } from 'toastify-react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert, ToastAndroid, Platform, Linking } from 'react-native';

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
| Utils class
|--------------------------------------------------
*/
class Utils {
	/**
	|--------------------------------------------------
	| Copy to clipboard
	|--------------------------------------------------
	*/
	async copyToClipboard(text: string | number) {
		try {
			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			Clipboard.setString(text.toString());

			/**
			|--------------------------------------------------
			| ...
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
			| Error
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
		/**
		|--------------------------------------------------
		| Error message
		|--------------------------------------------------
		*/
		let errorMessage = error?.response?.data?.error || error?.response?.data?.message || message;

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		if (Array.isArray(errorMessage)) {
			errorMessage = errorMessage
				.slice(0, 1)
				.map((err: any) => err?.message || String(err))
				.join('\n');
		} else if (typeof errorMessage === 'object') {
			errorMessage = errorMessage?.message || JSON.stringify(errorMessage);
		}

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
			text1: title || 'Success!',
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
			const brand = DeviceInfo.getBrand();
			const modelName = DeviceInfo.getModel();
			const osName = DeviceInfo.getSystemName();
			const uniqueId = DeviceInfo.getUniqueId();
			const osVersion = DeviceInfo.getSystemVersion();
			const ipAddress = await DeviceInfo.getIpAddress();
			const deviceName = await DeviceInfo.getDeviceName();
			const deviceType = await DeviceInfo.getDeviceType();

			const networkState = await NetInfo.fetch();

			return {
				brand,
				osName,
				uniqueId,
				modelName,
				osVersion,
				ipAddress,
				deviceName,
				deviceType,
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
			| ...
			|--------------------------------------------------
			*/
			const response = await axiosInstance.get('/versions');
			const versions = response.data as Versioning;

			let latestVersion: string = '';

			/**
			|--------------------------------------------------
			| Platform specific checks
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
			| ...
			|--------------------------------------------------
			*/
			const currentVersion = VersionCheck.getCurrentVersion();
			const needUpdate = await VersionCheck.needUpdate({
				currentVersion,
				latestVersion,
			});

			/**
			|--------------------------------------------------
			| If an update is needed
			|--------------------------------------------------
			*/
			if (needUpdate?.isNeeded) {
				updateResponse.updateRequired = true;
			}
		} catch (err) {
			console.log('Version check failed:', err);
		}

		/**
		|--------------------------------------------------
		| Response
		|--------------------------------------------------
		*/
		return updateResponse;
	}

	/**
	|--------------------------------------------------
	| Handle open whatsApp
	|--------------------------------------------------
	*/
	handleOpenWhatsApp = (number?: string, msg?: string) => {
		/**
		|--------------------------------------------------
		| Phone to initiate chat with
		|--------------------------------------------------
		*/
		const phone = number || '+16475760680';

		/**
		|--------------------------------------------------
		| Message to prompt with
		|--------------------------------------------------
		*/
		const message = msg || 'Hello, I need support with my:';

		/**
		|--------------------------------------------------
		| WhatsApp url
		|--------------------------------------------------
		*/
		const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

		Linking.openURL(url).catch(() => {
			/**
			|--------------------------------------------------
			| If WhatsApp is not installed, fall back to web
			| WhatsApp
			|--------------------------------------------------
			*/
			Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
		});
	};
}

export default new Utils();
