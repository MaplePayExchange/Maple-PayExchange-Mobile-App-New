/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

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
			| Create biometrics instance
			|--------------------------------------------------
			*/
			const rnBiometrics = new ReactNativeBiometrics();

			/**
			|--------------------------------------------------
			| Check hardware availability
			|--------------------------------------------------
			*/
			const { available, biometryType } = await rnBiometrics.isSensorAvailable();
			if (!available || !biometryType) {
				return { success: false, error: 'Biometric hardware not available.' };
			}

			/**
			|--------------------------------------------------
			| Perform authentication
			|--------------------------------------------------
			*/
			const { success } = await rnBiometrics.simplePrompt({
				promptMessage: 'Authenticate to continue',
				cancelButtonText: 'Cancel',
			});

			setIsAuthenticated(success);
			return { success, error: success ? undefined : 'Authentication failed' };
		} catch (err: any) {
			return { success: false, error: err.message || 'Unknown error occurred' };
		} finally {
			setIsAuthenticating(false);
		}
	}, []);

	/**
	|--------------------------------------------------
	| Returned states
	|--------------------------------------------------
	*/
	return {
		isAuthenticating,
		isAuthenticated,
		authenticate,
	};
}
