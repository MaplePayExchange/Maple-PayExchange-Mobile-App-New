/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
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
            | IOS: Request camera permission
            |--------------------------------------------------
            */
			if (Platform.OS === 'ios') {
				/**
                |--------------------------------------------------
                | Check & request iOS camera access
                |--------------------------------------------------
                */
				const result = await request(PERMISSIONS.IOS.CAMERA);

				/**
                |--------------------------------------------------
                | If permission is already granted
                |--------------------------------------------------
                */
				if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
					return true;
				}

				/**
                |--------------------------------------------------
                | If permission is blocked (user must go to settings)
                |--------------------------------------------------
                */
				if (result === RESULTS.BLOCKED) {
					Alert.alert(
						'Camera Access Blocked',
						'Camera permission is blocked. Please enable it in your device settings.',
						[
							{ text: 'Cancel', style: 'cancel' },
							{ text: 'Open Settings', onPress: () => Linking.openSettings() },
						]
					);
					return false;
				}

				/**
                |--------------------------------------------------
                | If permission is denied or not granted
                |--------------------------------------------------
                */
				Alert.alert(
					'Camera Permission Needed',
					'Camera access is required to continue. Please grant permission in Settings.'
				);

				return false;
			}

			/**
            |--------------------------------------------------
            | ANDROID: Request camera permission
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
            | Handle Android permission denial
            |--------------------------------------------------
            */
			if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
				/**
                |--------------------------------------------------
                | Handle "never ask again"
                |--------------------------------------------------
                */
				if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
					Alert.alert('Camera Permission Blocked', 'Please enable camera access in your device settings.', [
						{ text: 'Cancel', style: 'cancel' },
						{ text: 'Open Settings', onPress: () => Linking.openSettings() },
					]);
				} else {
					Alert.alert('Permission Needed', 'Camera access is required to continue. Please grant access.');
				}

				return false;
			}

			/**
            |--------------------------------------------------
            | If permission is granted
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
