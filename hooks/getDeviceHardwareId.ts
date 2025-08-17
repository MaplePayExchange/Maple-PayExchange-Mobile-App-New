/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Platform } from 'react-native';
import * as Application from 'expo-application';

export async function getDeviceHardwareId(): Promise<string | null> {
	let deviceId: string | null = null;

	/**
  |--------------------------------------------------
  | For ios device id
  |--------------------------------------------------
  */
	if (Platform.OS === 'ios') {
		deviceId = await Application.getIosIdForVendorAsync();
	} else if (Platform.OS === 'android') {
		/**
    |--------------------------------------------------
    | For android device id
    |--------------------------------------------------
    */
		deviceId = Application.getAndroidId();
	}

	return deviceId;
}
