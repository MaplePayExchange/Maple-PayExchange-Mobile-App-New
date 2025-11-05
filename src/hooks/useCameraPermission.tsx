/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

export const useCameraPermission = () => {
	/**
    |--------------------------------------------------
    | Function to ensure camera access
    |--------------------------------------------------
    */
	const ensureCameraAccess = async (): Promise<boolean> => {
		try {
			/**
            |--------------------------------------------------
            | For iOS: prompt user to open settings manually
            |--------------------------------------------------
            */
			if (Platform.OS === 'ios') {
				Alert.alert('Camera Access', 'Camera permission is required. Please enable it in Settings.', [
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Open Settings', onPress: () => Linking.openSettings() },
				]);
				return true;
			}

			/**
            |--------------------------------------------------
            | For Android: request camera permission
            |--------------------------------------------------
            */
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
				title: 'Camera Permission',
				message: 'This app needs access to your camera to take photos or scan items.',
				buttonPositive: 'OK',
				buttonNegative: 'Cancel',
			});

			/**
            |--------------------------------------------------
            | If permission is denied or never ask again
            |--------------------------------------------------
            */
			if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
				if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
					Alert.alert('Camera Permission Blocked', 'Please enable camera access in your device settings.', [
						{ text: 'Cancel', style: 'cancel' },
						{ text: 'Open Settings', onPress: () => Linking.openSettings() },
					]);
				} else {
					Alert.alert('Permission Needed', 'Camera access is required to continue. Please grant access.');
				}

				/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */
				return false;
			}

			/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */
			return true;
		} catch (err) {
			console.error('Camera permission error:', err);
			return false;
		}
	};

	return ensureCameraAccess;
};
