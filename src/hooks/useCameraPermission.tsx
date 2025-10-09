/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Alert, Linking } from 'react-native';
import { PermissionStatus, useCameraPermissions } from 'expo-camera';

export const useCameraPermission = () => {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [status, requestPermission] = useCameraPermissions();

	const ensureCameraAccess = async () => {
		try {
			/**
            |--------------------------------------------------
            | If permission isn't granted, explicitly request
            |--------------------------------------------------
            */
			if (!status || status.status !== PermissionStatus.GRANTED) {
				const { granted, canAskAgain } = await requestPermission();

				/**
                |--------------------------------------------------
                | If the permission has not been granted
                |--------------------------------------------------
                */
				if (!granted) {
					if (canAskAgain) {
						Alert.alert(
							'Permission Needed',
							'Camera access is required. Please allow access when prompted.'
						);
					} else {
						Alert.alert(
							'Camera Permission Blocked',
							'Please enable camera access in system settings to continue.',
							[
								{ text: 'Cancel', style: 'cancel' },
								{ text: 'Open Settings', onPress: () => Linking.openSettings() },
							]
						);
					}

					/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */
					return false;
				}
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
