/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
|--------------------------------------------------
| Get Device Hardware ID
|--------------------------------------------------
*/
export async function getDeviceHardwareId(): Promise<string | null> {
	let deviceId: string | null = null;

	/**
	|--------------------------------------------------
	| For iOS device ID
	|--------------------------------------------------
	*/
	if (Platform.OS === 'ios') {
		deviceId = await DeviceInfo.getUniqueId();
	} else if (Platform.OS === 'android') {
	/**
	|--------------------------------------------------
	| For Android device ID
	|--------------------------------------------------
	*/
		deviceId = await DeviceInfo.getAndroidId();
	}

	return deviceId;
}
