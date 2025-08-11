/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { v4 as uuidv4 } from 'uuid';
import { Platform } from 'react-native';
import * as Application from 'expo-application';

export async function getDeviceHardwareId(): Promise<string> {
	/**
  |--------------------------------------------------
  | Only used as a backup
  |--------------------------------------------------
  */
	const baseId = uuidv4();

	/**
  |--------------------------------------------------
  | For ios device id
  |--------------------------------------------------
  */
	if (Platform.OS === 'ios') {
		return (await Application.getIosIdForVendorAsync()) ?? baseId;
	} else if (Platform.OS === 'android') {
		/**
    |--------------------------------------------------
    | For android device id
    |--------------------------------------------------
    */
		return Application.getAndroidId() ?? baseId;
	}

	/**
  |--------------------------------------------------
  | If unable to get device ids, fallback is used
  |--------------------------------------------------
  */
	return baseId;
}
