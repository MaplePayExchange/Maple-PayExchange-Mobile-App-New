/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as Linking from 'expo-linking';
import { Toast } from 'toastify-react-native';
import * as WebBrowser from 'expo-web-browser';
import { useUserStore } from '@/zustand/userStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import axiosInstance from '@/lib/axiosInstance';
import { User } from '@/interfaces/user.interface';
import { Wallet } from '@/interfaces/wallet.interface';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { TransactionInterface } from '@/interfaces/transaction.interface';

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

interface CreateUser {
	email: string;
	phone: string;
	country: string;
	deviceId: string;
	password: string;
	lastName: string;
	firstName: string;
	birthDate: string;
	sessionId: string;
	middleName?: string;
	occupation?: string;
	referralCode?: string;
	usagePurpose?: string;
	primarySourceOfFunds?: string;
	isPolliticallyExposed?: boolean;
	countryUserMostlySendsMoneyTo?: string;
}

type CurrentStep = 'phone' | 'email' | 'create account' | 'bvn' | 'veriff';

/**
|--------------------------------------------------
| Error handler
|--------------------------------------------------
*/
const errorHandler = (error: any, message?: string) => {
	console.log(error, 'main.error');
	console.log('Failed to login user:', error?.response?.data?.error);

	const errorMessage = error?.response?.data?.error || error.response?.data?.message;
	console.log(errorMessage, 'error.message');

	/**
	|--------------------------------------------------
	| Error notification
	|--------------------------------------------------
	*/
	Toast.show({
		text1: 'Error!',
		type: 'error',
		closeIconSize: 20,
		iconColor: '#FFFFFF',
		visibilityTime: 5000,
		textColor: '#FFFFFF',
		backgroundColor: '#fc3f35',
		text2: errorMessage || message,
	});
};

/**
|--------------------------------------------------
| Success handler
|--------------------------------------------------
*/
const successNotificationHanlder = (title: string, message: string) => {
	Toast.show({
		text1: title,
		text2: message,
		type: 'success',
		closeIconSize: 20,
		iconColor: '#FFFFFF',
		textColor: '#FFFFFF',
		backgroundColor: '#E2F9D2',
	});
};

/**
|--------------------------------------------------
| For requesting otps
|--------------------------------------------------
*/
export const useRequestOtp = (step: CurrentStep) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
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
			console.log(data, 'data.record');
			console.log(step);
			/**
            |--------------------------------------------------
            | Show notification
            |--------------------------------------------------
            */
			successNotificationHanlder('Otp!', 'Otp has been sent to your provided contact');

			/**
			|--------------------------------------------------
			| Updating the user store
			|--------------------------------------------------
			*/
			useUserStore.setState((state) => ({
				verificationData: {
					...state.verificationData,
					email: data?.email || data?.record?.email,
					sessionId: data?.sessionId || data?.record?.sessionId,
					phoneNumber: data?.phoneNumber || data?.record?.phoneNumber,
				},
			}));

			if (data.record?.isPhoneVerified === true && step === 'phone') {
				navigation.navigate(ROUTE_NAMES.EMAIL_VERIFICATION);
				return;
			}

			if (data.record?.isEmailVerified === true && step === 'email') {
				navigation.navigate(ROUTE_NAMES.CREATE_USER);
				return;
			}

			/**
			|--------------------------------------------------
			| Navigation based on the step
			|--------------------------------------------------
			*/
			if (step === 'email') navigation.navigate(ROUTE_NAMES.VERIFY_EMAIL);
			if (step === 'phone') navigation.navigate(ROUTE_NAMES.VERIFY_PHONE);
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error sending otp');
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
			useUserStore.setState((state) => ({
				verificationData: {
					...state.verificationData,
					currentStep: step,
					email: data?.email,
					sessionId: data?.sessionId,
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
			errorHandler(error, 'Encountered an error sending otp');
		},
	});
};

/**
|--------------------------------------------------
| Create user service
|--------------------------------------------------
*/
export const useCreateUser = () => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return useMutation<any, Error, CreateUser>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			console.log(payload);
			const response = await axiosInstance.post('/users/create', payload);
			return response.data;
		},

		/**
        |--------------------------------------------------
        | If api call is successful
        |--------------------------------------------------
        */
		onSuccess: (data) => {
			useUserStore.setState((state) => ({
				verificationData: { ...state.verificationData, currentStep: 'veriff' },
			}));

			/**
			|--------------------------------------------------
			| Navigates the user to the next steps screen
			|--------------------------------------------------
			*/
			navigation.navigate(ROUTE_NAMES.LOGIN, {});
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error creating user');
		},
	});
};

/**
|--------------------------------------------------
| Login
|--------------------------------------------------
*/
export const useLogin = () => {
	return useMutation<any, Error, { email: string; password: string; deviceId: string }>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			console.log(payload);
			const response = await axiosInstance.post('/auth/login', payload);
			return response.data;
		},

		/**
        |--------------------------------------------------
        | If api call is successful
        |--------------------------------------------------
        */
		onSuccess: (data) => {
			useUserStore.setState((state) => ({
				userData: {
					user: data?.user,
					token_type: data?.token_type,
					access_token: data?.access_token,
					refresh_token: data?.refresh_token,
				},

				isLoggedIn: true,
			}));
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error login in');
		},
	});
};

/**
|--------------------------------------------------
| Forgot password
|--------------------------------------------------
*/
export const useForgotPassword = (email: string) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { email: string }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/auth/forgot-password', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success handler
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data, 'Forgot password');
			navigation.navigate(ROUTE_NAMES.RESET_PASSWORD, { email: email });
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error sending otp');
		},
	});
};

/**
|--------------------------------------------------
| Forgot password
|--------------------------------------------------
*/
export const useResetPassword = (email: string) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { email: string; newPassword: string; token: string }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/auth/reset-password', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success handler
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data, 'reset password');
			navigation.navigate(ROUTE_NAMES.LOGIN, { email });
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error sending otp');
		},
	});
};

/**
|--------------------------------------------------
| Start veriff session
|--------------------------------------------------
*/
export const useStartVeriffSession = () => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { email: string }>({
		/**
		|--------------------------------------------------
		| Mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			console.log(payload);
			const response = await axiosInstance.post('/kyc/create-session', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success handler
		|--------------------------------------------------
		*/
		onSuccess: async (data) => {
			console.log(data);
			const kycUrl = data?.veriffUrl;
			const redirectUrl = Linking.createURL('maple://maple.server.com');

			const result = await WebBrowser.openAuthSessionAsync(kycUrl, redirectUrl);

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			if (result.type === 'success') {
				console.log('User returned from KYC:', result.url);
				navigation.navigate(ROUTE_NAMES.LOGIN, { email: undefined });
			} else {
				console.log('User cancelled or error');
			}
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error.response.data, 'error.veriff');
			errorHandler(error, 'Encountered an error starting kyc session');
		},
	});
};

/**
|--------------------------------------------------
| Bvn verification
|--------------------------------------------------
*/
export const useSetTransactionPin = () => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Query client
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { pin: string }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('users/create-transaction-pin', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data, 'verify bvn');
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			errorHandler(error, 'Encountered an error setting transaction pin');
		},
	});
};

/**
|--------------------------------------------------
| Get user data
|--------------------------------------------------
*/
export const useGetUserInformation = () => {
	return useQuery<
		any,
		Error,
		{ user: User; message: string; wallets: Wallet[]; transactions: TransactionInterface[] }
	>({
		/**
		|--------------------------------------------------
		| Query key
		|--------------------------------------------------
		*/
		queryKey: ['maple_user_data'],

		/**
		|--------------------------------------------------
		| Query function (api call)
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const [response, walletResponse, transactionResponse] = await Promise.all([
				axiosInstance.get('/users/profile'),
				axiosInstance.get('/wallet'),
				axiosInstance.get('/transactions'),
			]);

			/**
			|--------------------------------------------------
			| Storing the user information in the store
			|--------------------------------------------------
			*/
			useUserStore.setState((state) => ({ userData: { ...state.userData, user: response.data.user } as any }));
			console.log(response.data, walletResponse.data, transactionResponse.data, 'from auth.service');

			/**
			|--------------------------------------------------
			| Returns the data
			|--------------------------------------------------
			*/
			return {
				user: response.data?.user,
				wallets: walletResponse.data?.wallets,
				transactions: transactionResponse.data?.items,
			};
		},
	});
};

/**
|--------------------------------------------------
| Get user wallets
|--------------------------------------------------
*/
export const useGetUserWallets = () => {
	return useQuery<any, Error, { message: string; wallets: Wallet[] }>({
		/**
		|--------------------------------------------------
		| Query key
		|--------------------------------------------------
		*/
		queryKey: ['maple_user_wallets'],

		/**
		|--------------------------------------------------
		| Query function (api call)
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const [response] = await Promise.all([axiosInstance.get('/wallet')]);

			/**
			|--------------------------------------------------
			| Returns the data
			|--------------------------------------------------
			*/
			return {
				wallets: response.data?.wallets,
			};
		},
	});
};

/**
|--------------------------------------------------
| Get user transaction
|--------------------------------------------------
*/
export const useGetUserTransactions = () => {
	return useQuery<any, Error, { message: string; transactions: TransactionInterface[] }>({
		/**
		|--------------------------------------------------
		| Query key
		|--------------------------------------------------
		*/
		queryKey: ['maple_user_transactions'],

		/**
		|--------------------------------------------------
		| Query function (api call)
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const [response] = await Promise.all([axiosInstance.get('/transactions')]);

			/**
			|--------------------------------------------------
			| Returns the data
			|--------------------------------------------------
			*/
			return {
				transactions: response.data?.items,
			};
		},
	});
};
