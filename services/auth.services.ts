/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Toast } from 'toastify-react-native';
import { useUserStore } from '@/zustand/userStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import axiosInstance from '@/lib/axiosInstance';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';

interface RequestOtp {
	bvn?: string;
	email?: string;
	sessionId?: string;
	phoneNumber?: string;
	verificationType: 'email' | 'bvn' | 'phone' | 'deviceId';
}

interface VerifyOtp {
	otp: string;
	email?: string;
	deviceId?: string;
	sessionId?: string;
	phoneNumber?: string;
	role?: 'user' | 'admin';
	verificationType: 'email' | 'bvn' | 'phone' | 'deviceId';
}

type CurrentStep = 'phone' | 'email' | 'create account' | 'bvn' | 'veriff';

/**
|--------------------------------------------------
| For requesting otps
|--------------------------------------------------
*/
export const useRequestOtp = (step: CurrentStep) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return useMutation<any, Error, RequestOtp>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/verifications/request-otp', payload);
			return response.data;
		},

		/**
        |--------------------------------------------------
        | If api call is successful
        |--------------------------------------------------
        */
		onSuccess: (data) => {
			/**
            |--------------------------------------------------
            | Show notification
            |--------------------------------------------------
            */
			Toast.show({
				text1: 'Otp!',
				type: 'success',
				closeIconSize: 20,
				iconColor: '#FFFFFF',
				textColor: '#FFFFFF',
				backgroundColor: '#33BB77',
				text2: 'Otp has been sent to your provided contact',
			});

			console.log('✅ User created:', data);
			useUserStore.setState((state) => ({
				verificationData: {
					...state.verificationData,
					email: data?.email,
					sessionId: data?.sessionId,
					phoneNumber: data?.phoneNumber,
				},
			}));

			if (step === 'email') navigation.navigate(ROUTE_NAMES.VERIFY_EMAIL);
			if (step === 'phone') navigation.navigate(ROUTE_NAMES.VERIFY_PHONE);
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			console.log(error, 'main.error');
			console.log('Failed to create user:', error?.response?.data?.error);

			const errorMessage = error?.response?.data?.error.includes('E11000 duplicate')
				? 'Encountered a duplicate data'
				: error?.response?.data?.error;

			/**
            |--------------------------------------------------
            | Error notification
            |--------------------------------------------------
            */
			Toast.show({
				text1: 'Otp!',
				type: 'error',
				closeIconSize: 20,
				iconColor: '#FFFFFF',
				textColor: '#FFFFFF',
				backgroundColor: '#fc3f35',
				text2: errorMessage || 'Encountered an error sending otp',
			});
		},
	});
};

/**
|--------------------------------------------------
| Verifies the otp
|--------------------------------------------------
*/
export const useVerifyOtp = (step: CurrentStep) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return useMutation<any, Error, VerifyOtp>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			console.log(payload);
			const response = await axiosInstance.post('/verifications/verify-otp', payload);
			return response.data;
		},

		/**
        |--------------------------------------------------
        | If api call is successful
        |--------------------------------------------------
        */
		onSuccess: (data) => {
			console.log('✅ User created:', data);
			useUserStore.setState((state) => ({
				verificationData: {
					...state.verificationData,
					currentStep: step,
					email: data?.email,
					sessionId: data?.sessionId,
					phoneNumber: data?.phoneNumber,
				},
			}));

			if (step === 'email') navigation.navigate(ROUTE_NAMES.CREATE_USER);
			if (step === 'phone') navigation.navigate(ROUTE_NAMES.EMAIL_VERIFICATION);
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			console.log(error, 'main.error');
			console.log('Failed to create user:', error?.response?.data?.error);

			const errorMessage = error?.response?.data?.error.includes('E11000 duplicate')
				? 'Encountered a duplicate data'
				: error?.response?.data?.error;

			/**
            |--------------------------------------------------
            | Error notification
            |--------------------------------------------------
            */
			Toast.show({
				text1: 'Otp!',
				type: 'error',
				closeIconSize: 20,
				iconColor: '#FFFFFF',
				textColor: '#FFFFFF',
				backgroundColor: '#fc3f35',
				text2: errorMessage || 'Encountered an error sending otp',
			});
		},
	});
};
