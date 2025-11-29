/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import utils from '@lib/utils';
import axiosInstance from '@lib/axiosInstance';
import { User } from '@interfaces/user.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { ROUTE_NAMES } from '@constants/routes.conts';
//@ts-ignore
import { RootStackParamList } from '@constants/route.params';
import { Currency, TransactionInterface } from '@interfaces/transaction.interface';
import { useUserStore } from '@zustand/userStore';

export interface TransactionFilters {
	page?: number;
	limit?: number;
	endDate?: string;
	startDate?: string;
	currency?: Currency;
	type?: 'FundSwap' | 'Incoming' | 'Outgoing' | 'Reward';
	filter?: 'today' | 'lastWeek' | 'lastMonth' | 'lastYear';
}

interface TransactionResponse {
	transactions: TransactionInterface[];
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}

interface InfiniteData<T> {
	pages: T[];
	pageParams: unknown[];
}

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
	address?: string;
	lastName: string;
	firstName: string;
	birthDate: string;
	sessionId: string;
	middleName?: string;
	occupation?: string;
	referralCode?: string;
	usagePurpose?: string;
	maidenLastName?: string;
	primarySourceOfFunds?: string;
	isPolliticallyExposed?: boolean;
	countryUserMostlySendsMoneyTo?: string;
}

type CurrentStep = 'phone' | 'email' | 'create account' | 'bvn' | 'veriff';

/**
|--------------------------------------------------
| For requesting otps
|--------------------------------------------------
*/
export const useRequestOtp = (step: CurrentStep) => {
	const queryClient = useQueryClient();

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
			console.log(payload);
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
			if (step !== 'bvn') {
				utils.successNotificationHanlder('Otp!', 'Otp has been sent to your provided contact');
			}

			console.log(data);

			/**
			|--------------------------------------------------
			| Updating the user store
			|--------------------------------------------------
			*/

			const { email, sessionId, phoneNumber } = {
				email: data?.email ?? data?.record?.email,
				sessionId: data?.sessionId ?? data?.record?.sessionId,
				phoneNumber: data?.phoneNumber ?? data?.record?.phoneNumber,
			};

			useUserStore.setState((state) => ({
				...state,
				verificationData: {
					...state.verificationData,
					email,
					sessionId,
					phoneNumber,
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

			/**
			|--------------------------------------------------
			| If step is bvn
			|--------------------------------------------------
			*/
			if (step === 'bvn') queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			console.log(error.response.data);
			utils.errorHandler(error, 'Encountered an error processing your request.');
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
				...state,
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
			utils.errorHandler(error, 'Encountered an error sending otp');
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
			utils.errorHandler(error, 'Encountered an error creating user');
		},
	});
};

/**
|--------------------------------------------------
| Login
|--------------------------------------------------
*/
export const useLogin = () => {
	return useMutation<
		any,
		Error,
		{
			email: string;
			password: string;
			deviceId: string;
			pushToken?: string;
			os: string | undefined;
			brand: string | undefined;
			osName: string | undefined;
			osVersion: string | undefined;
			deviceName: string | undefined;
			deviceType: string | undefined;
		}
	>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			console.log(payload);
			if (payload.pushToken === null) delete payload.pushToken;
			const response = await axiosInstance.post('/auth/login', payload);

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			useUserStore.setState((state) => ({
				...state,
				biometricsInfo: { ...state.biometricsInfo, password: payload.password, email: payload.email },
			}));
			return response.data;
		},

		/**
        |--------------------------------------------------
        | If api call is successful
        |--------------------------------------------------
        */
		onSuccess: async (data) => {
			useUserStore.getState().setUserData({
				user: data?.user,
				token_type: data?.token_type,
				access_token: data?.access_token,
				refresh_token: data?.refresh_token,
			});
			useUserStore.getState().setIsRegistered(true);
			useUserStore.getState().setCompleteOnboarding(true);

			await AsyncStorage.setItem('lastBackgroundTime', Date.now().toString());
			useUserStore.getState().setIsLoggedIn(true);
			useUserStore.setState((state) => ({ ...state, isSessionExpired: false }));
		},

		/**
        |--------------------------------------------------
        | If error is encountered
        |--------------------------------------------------
        */
		onError: (error: any) => {
			utils.errorHandler(error, 'Encountered an error login in');
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
			utils.errorHandler(error, 'Encountered an error sending OTP');
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
	return useMutation<any, Error, { email: string; newPassword: string; token: string; confirmPassword: string }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/auth/reset-password', payload);

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			useUserStore.setState((state) => ({
				...state,
				biometricsInfo: { ...state.biometricsInfo, password: payload.newPassword },
			}));

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success handler
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			utils.successNotificationHanlder('Password Reset!', 'Password successfully reset, please log in');
			navigation.navigate(ROUTE_NAMES.LOGIN, {});
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error?.response?.data);
			utils?.errorHandler(error, 'Encountered an error sending OTP');
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
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error.response.data, 'error.veriff');
			utils.errorHandler(error, 'Encountered an error starting kyc session');
		},
	});
};

/**
|--------------------------------------------------
| Bvn verification
|--------------------------------------------------
*/
export const useResetTransactionPin = () => {
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
	return useMutation<any, Error, { pin: string; password: string }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('users/reset-transaction-pin', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			utils.successNotificationHanlder('PIN!', 'Transaction successfully updated');
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
		},

		/**
		|--------------------------------------------------
		| Error handler
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error.response.data);
			utils.errorHandler(error, 'Encountered an error resetting transaction pin');
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
			utils.errorHandler(error, 'Encountered an error setting transaction pin');
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
| Gets the users transactions
|--------------------------------------------------
*/
export const useGetUserTransactions = (filter?: TransactionFilters, isEnabled?: boolean) => {
	return useInfiniteQuery<TransactionResponse, Error, InfiniteData<TransactionResponse>>({
		/**
		|--------------------------------------------------
		| Unique key for caching
		|--------------------------------------------------
		*/
		queryKey: ['maple_user_transactions', filter],

		/**
		|--------------------------------------------------
		| Initial page parameter
		|--------------------------------------------------
		*/
		initialPageParam: 1,

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async ({ pageParam = 1 }): Promise<TransactionResponse> => {
			const response = await axiosInstance.get('/transactions', {
				params: { ...filter, page: pageParam },
			});

			return {
				meta: response.data?.meta,
				transactions: response.data?.items,
			};
		},

		/**
		|--------------------------------------------------
		| Tell React Query how to find the next page
		|--------------------------------------------------
		*/
		getNextPageParam: (lastPage) => {
			const { page, limit, total } = lastPage.meta;
			const maxPage = Math.ceil(total / limit);
			return page < maxPage ? page + 1 : undefined;
		},

		enabled: isEnabled ?? true,
	});
};

/**
|--------------------------------------------------
| Changes the users password
|--------------------------------------------------
*/
export const useChangePassword = () => {
	const navigation = useNavigation();

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { oldPassword: string; newPassword: string }>({
		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/users/change-password', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| On success
		|--------------------------------------------------
		*/
		onSuccess: async () => {
			useUserStore.getState().setIsLoggedIn(false);

			await new Promise((resolve) => setTimeout(resolve, 300));
			navigation.navigate(...([ROUTE_NAMES.LOGIN, {}] as any));
			utils.successNotificationHanlder('Change Password!', 'Your password has been changed successfully');
		},

		/**
		|--------------------------------------------------
		| On Error
		|--------------------------------------------------
		*/
		onError: (err: any) => {
			console.log(err.response.data);
			utils.errorHandler(err, 'Unable to change your password at the moment!');
		},
	});
};
