/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricResult {
	error?: string;
	success: boolean;
}

export function useBiometricAuth() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	/**
    |--------------------------------------------------
    | Authentication function
    |--------------------------------------------------
    */
	const authenticate = React.useCallback(async (): Promise<BiometricResult> => {
		try {
			/**
            |--------------------------------------------------
            | Loading state
            |--------------------------------------------------
            */
			setIsAuthenticating(true);

			/**
            |--------------------------------------------------
            | Checking if the device supports biometrics
            |--------------------------------------------------
            */
			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			if (!hasHardware) {
				return { success: false, error: 'Biometric hardware not available.' };
			}

			/**
            |--------------------------------------------------
            | Checking if the device has enrolled for biometrics
            |--------------------------------------------------
            */
			const isEnrolled = await LocalAuthentication.isEnrolledAsync();
			if (!isEnrolled) {
				return { success: false, error: 'No biometric credentials enrolled.' };
			}

			/**
            |--------------------------------------------------
            | Authenticating uer
            |--------------------------------------------------
            */
			const result = await LocalAuthentication.authenticateAsync({
				promptMessage: 'Authenticate to continue',
				fallbackLabel: 'Use Passcode',
				cancelLabel: 'Cancel',
			});

			setIsAuthenticated(result.success);
			return { success: result.success, error: result.success ? undefined : 'Authentication failed' };
		} catch (err: any) {
			return { success: false, error: err.message || 'Unknown error occurred' };
		} finally {
			setIsAuthenticating(false);
		}
	}, []);

	return {
		isAuthenticating,
		isAuthenticated,
		authenticate,
	};
}
