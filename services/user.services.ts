/**
 |--------------------------------------------------
 | Npm imports
 |--------------------------------------------------
 */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, InfiniteData } from '@tanstack/react-query';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import utils from '@/lib/utils';
import {
	BankAccount,
	INotification,
	ExchangePayload,
	BankTransferRequest,
	FundSwapTransaction,
	InteracTransactionRequest,
} from '@/interfaces/transaction.interface';
import axiosInstance from '@/lib/axiosInstance';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { useUserStore } from '@/zustand/userStore';

interface NotificationResponse {
	notifications: INotification[];
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}

/**
|--------------------------------------------------
| Referral history item
|--------------------------------------------------
*/
export interface IReferralHistoryItem {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	referrerId: {
		email: string;
		lastName: string;
		firstName: string;
	};
	referralCode: string;
	referralValue: number;
	redeemedAt?: Date | null;
	referredUserId?: string | null;
	status: 'pending' | 'completed' | 'expired';
}

interface ReferralHistoryResponse {
	history: IReferralHistoryItem[];
	message: string;
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	metrics: {
		activeUsers: number;
		totalEarnings: number;
		noOfReferrals: number;
	};
}

interface IUniqueDeviceHistory {
	_id: string;
	brand: string;
	userId: string;
	osName: string;
	createdAt: Date;
	updatedAt: Date;
	osVersion: string;
	lastLoginAt: Date;
	deviceName: string;
	deviceType: string;
	isCurrent: boolean;
	__v: number;
}

/**
|--------------------------------------------------
| Verify interac transfer
|--------------------------------------------------
*/
export const useVerifyInteracTransfer = (onError?: () => void) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation();
	const queryClient = useQueryClient();

	return useMutation<any, Error, { startDate: string }>({
		/**
        |--------------------------------------------------
        | Api call
        |--------------------------------------------------
        */
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/wallet/verify-transaction', payload);
			return response.data;
		},

		/**
        |--------------------------------------------------
        | On success
        |--------------------------------------------------
        */
		onSuccess: (data) => {
			if (data.status) {
				navigation.navigate(ROUTE_NAMES.SEND_FUNDS_FEEDBACK as never);
				queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
				utils.successNotificationHanlder('Interac!', 'Your transfer has been verified');
			}
		},

		/**
		|--------------------------------------------------
		| On error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			navigation.navigate(ROUTE_NAMES.SEND_FUNDS_ERROR_FEEDBACK as never);
			utils.errorHandler(error, 'Error verifying your transaction');
		},
	});
};

/**
|--------------------------------------------------
| Gets the security questions
|--------------------------------------------------
*/
export const useGetSecurityQuestions = () => {
	return useQuery<any, Error, { securityQuestions: { _id: string; text: string }[] }>({
		/**
		|--------------------------------------------------
		| Key
		|--------------------------------------------------
		*/
		queryKey: ['maple_security_questions'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/wallet/security-questions');
			return response.data;
		},

		staleTime: 100_000_000_000_000,
	});
};

/**
|--------------------------------------------------
| Gets the security questions
|--------------------------------------------------
*/
export const useGetBanksList = () => {
	return useQuery<any, Error, { banks: { code: number; name: string; id: number; _id: string }[] }>({
		/**
		|--------------------------------------------------
		| Key
		|--------------------------------------------------
		*/
		queryKey: ['maple_banks_list'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/wallet/banks-list');
			return response.data;
		},

		staleTime: 100_000_000_000_000,
	});
};

/**
|--------------------------------------------------
| Gets the security questions
|--------------------------------------------------
*/
export const useGetRates = () => {
	return useQuery<any, Error, { items: { rate: number; exchange: string; createdDate: Date; updatedDate: Date }[] }>({
		/**
		|--------------------------------------------------
		| Key
		|--------------------------------------------------
		*/
		queryKey: ['maple_rates'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/rates');
			return response.data;
		},

		// staleTime: 100_000_000_000_000,
	});
};

/**
|--------------------------------------------------
| Send fund to interac
|--------------------------------------------------
*/
export const useSendFundsToInterac = (onError: () => void) => {
	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ExchangeFundsFeedbackScreen'>>();

	return useMutation<any, Error, InteracTransactionRequest>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/wallet/wallet-to-interac', payload);

			/**
			|--------------------------------------------------
			| Saves the beneficiary
			|--------------------------------------------------
			*/
			if (payload.saveBeneficiary) {
				await axiosInstance.post('/beneficiaries/create-beneficiary', {
					type: 'Interac',
					interacEmail: payload.email,
					description: payload?.description,
					securityQuestion: payload.securityQuestion,
					fullName: `${payload.firstName} ${payload.lastName}`,
					securityQuestionAnswer: payload.securityQuestionAnswer,
				});
			}

			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			navigation.navigate(ROUTE_NAMES.SEND_FUNDS_FEEDBACK);
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
			queryClient.invalidateQueries({ queryKey: ['user_beneficiaries'] });
			utils.successNotificationHanlder('Interac!', 'Transaction request completed successfully');
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			utils.errorHandler(error, 'Error sending CAD!');
		},
	});
};

/**
|--------------------------------------------------
| Send fund to interac
|--------------------------------------------------
*/
export const useSendWalletToBank = (onError: () => void) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	return useMutation<any, Error, BankTransferRequest>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			console.log(payload, ':send.payload');
			const response = await axiosInstance.post('/wallet/wallet-to-bank', payload);

			/**
			|--------------------------------------------------
			| Saves the beneficiary
			|--------------------------------------------------
			*/
			if (payload.saveBeneficiary) {
				await axiosInstance.post('/beneficiaries/create-beneficiary', {
					type: 'Bank',
					bankCode: payload.bank.code,
					bankName: payload.bank.name,
					accountName: payload.accountName,
					fullName: `${payload.accountName}`,
					accountNumber: payload.accountNumber,
				});
			}

			/**
			|--------------------------------------------------
			| Returns the data
			|--------------------------------------------------
			*/
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
			onError?.();
			navigation.navigate(ROUTE_NAMES.SEND_FUNDS_FEEDBACK);
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
			queryClient.invalidateQueries({ queryKey: ['user_beneficiaries'] });
			utils.successNotificationHanlder('Fiat!', 'Transaction request completed successfully');
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			console.log(error.response.data);
			utils.errorHandler(error, 'Error sending NGN!');
		},
	});
};

/**
|--------------------------------------------------
| Send fund to interac
|--------------------------------------------------
*/
export const useExchangeCurrency = (onError: () => void) => {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ExchangeFundsFeedbackScreen'>>();

	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	return useMutation<{ transaction: FundSwapTransaction }, Error, ExchangePayload>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			console.log(payload, ':send.payload');
			const response = await axiosInstance.post('/wallet/currency-conversion', payload);

			/**
			|--------------------------------------------------
			| Returns the data
			|--------------------------------------------------
			*/
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
			onError?.();
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
			navigation.navigate(ROUTE_NAMES.EXCHANGE_FUNDS_FEEDBACK, data.transaction);
			utils.successNotificationHanlder('Exchange!', 'Transaction request completed successfully');
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			console.log(error.response.data);
			utils.errorHandler(error, 'Error sending NGN!');
		},
	});
};

/**
|--------------------------------------------------
| Bvn verification
|--------------------------------------------------
*/
export const useVerifyBankAccount = () => {
	/**
	|--------------------------------------------------
	| Mutation
	|--------------------------------------------------
	*/
	return useMutation<any, Error, { accountNumber: string; bank: { code: number; name: string } }>({
		/**
		|--------------------------------------------------
		| Api call
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const response = await axiosInstance.post('/wallet/verifyAccount', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data, 'wallet.verify.account');
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
| Gets the users beneficiaries
|--------------------------------------------------
*/
export const useGetBeneficiaries = () => {
	/**
	|--------------------------------------------------
	| Query client
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	return useQuery<any, Error, { items: BankAccount[] }>({
		/**
		|--------------------------------------------------
		| Query key
		|--------------------------------------------------
		*/
		queryKey: ['user_beneficiaries'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/beneficiaries');
			return response.data;
		},

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		initialData: () => {
			return queryClient.getQueryData(['user_beneficiaries']);
		},
	});
};

/**
|--------------------------------------------------
| Gets the users beneficiaries
|--------------------------------------------------
*/
export const useGetTransactionLimits = () => {
	return useQuery<
		any,
		Error,
		{
			message: string;
			metrics: {
				dailyNGN: number;
				dailyCAD: number;
				weeklyNGN: number;
				weeklyCAD: number;
				monthlyNGN: number;
				monthlyCAD: number;
			};
		}
	>({
		queryKey: ['user_transaction_limits'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/users/transaction-limits');
			console.log(response.data);
			return response.data;
		},
	});
};

/**
|--------------------------------------------------
| Gets the users beneficiaries
|--------------------------------------------------
*/
export const useGetDeviceLoginHistory = () => {
	return useQuery<any, Error, { message: string; history: IUniqueDeviceHistory[] }>({
		queryKey: ['user_device_history'],

		/**
		|--------------------------------------------------
		| Query function
		|--------------------------------------------------
		*/
		queryFn: async () => {
			const response = await axiosInstance.get('/users/device-history');
			console.log(response.data);
			return response.data;
		},
	});
};

/**
|--------------------------------------------------
| Gets the users beneficiaries
|--------------------------------------------------
*/
export const useGetNotifications = (filters?: { limit: number }) => {
	return useInfiniteQuery<NotificationResponse, Error, InfiniteData<NotificationResponse>>({
		/**
		|--------------------------------------------------
		| Cache key
		|--------------------------------------------------
		*/
		queryKey: ['user_notifications', filters],

		/**
		|--------------------------------------------------
		| Initial page is always 1
		|--------------------------------------------------
		*/
		initialPageParam: 1,

		/**
		|--------------------------------------------------
		| Fetch function
		|--------------------------------------------------
		*/
		queryFn: async ({ pageParam }): Promise<NotificationResponse> => {
			const response = await axiosInstance.get('/notifications', {
				params: { ...filters, page: pageParam },
			});
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Find next page
		|--------------------------------------------------
		*/
		getNextPageParam: (lastPage) => {
			const { page, limit, total } = lastPage.meta;
			const maxPage = Math.ceil(total / limit);
			return page < maxPage ? page + 1 : undefined;
		},
	});
};

/**
|--------------------------------------------------
| Get referral history
|--------------------------------------------------
*/
export const useGetReferralHistory = (filters?: { limit: number }) => {
	return useInfiniteQuery<ReferralHistoryResponse, Error, InfiniteData<ReferralHistoryResponse>>({
		/**
		|--------------------------------------------------
		| Cache key
		|--------------------------------------------------
		*/
		queryKey: ['user_referral_history', filters],

		/**
		|--------------------------------------------------
		| Initial page is always 1
		|--------------------------------------------------
		*/
		initialPageParam: 1,

		/**
		|--------------------------------------------------
		| Fetch function
		|--------------------------------------------------
		*/
		queryFn: async ({ pageParam }): Promise<ReferralHistoryResponse> => {
			const response = await axiosInstance.get('/referrals/history', {
				params: { ...filters, page: pageParam },
			});

			return response.data;
		},

		/**
		|--------------------------------------------------
		| Find next page
		|--------------------------------------------------
		*/
		getNextPageParam: (lastPage) => {
			const { page, limit, total } = lastPage.meta;
			const maxPage = Math.ceil(total / limit);
			return page < maxPage ? page + 1 : undefined;
		},
	});
};

/**
|--------------------------------------------------
| Upload profile image
|--------------------------------------------------
*/
export const useUploadProfileImage = (onError?: () => void) => {
	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	return useMutation<{ message: string; profileImageUrl: string }, Error, { imageUri: string }>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			const formData = new FormData();

			/**
			|--------------------------------------------------
			| Attach file
			|--------------------------------------------------
			*/
			formData.append('profileImage', {
				type: 'image/jpeg',
				name: 'profile.jpg',
				uri: payload.imageUri,
			} as any);

			/**
			|--------------------------------------------------
			| Send request
			|--------------------------------------------------
			*/
			const response = await axiosInstance.post('users/upload-profile', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
			onError?.();
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
			utils.successNotificationHanlder('Profile!', 'Profile image uploaded successfully');
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			console.log(error.response.data);
			utils.errorHandler(error, 'Error uploading profile image');
		},
	});
};

/**
|--------------------------------------------------
| Upload profile image
|--------------------------------------------------
*/
export const useMarkNotificationAsRead = () => {
	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, { id?: string }>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			/**
			|--------------------------------------------------
			| Send request
			|--------------------------------------------------
			*/
			const url = '/notifications/mark-as-read';
			const response = await axiosInstance.post(url, { notificationId: payload.id });
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({ queryKey: ['user_notifications'] });
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error.response.data);
		},
	});
};

/**
|--------------------------------------------------
| Upload profile image
|--------------------------------------------------
*/
export const useUpdateProfile = () => {
	/**
	|--------------------------------------------------
	| Query client from Tanstack
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();

	return useMutation<
		{ message: string; data: any },
		Error,
		{
			rateAlerts: boolean;
			loginAlerts: boolean;
			promotionAlerts: boolean;
			transactionAlerts: boolean;
			inAppNotifications: boolean;
		}
	>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			/**
			|--------------------------------------------------
			| Send request
			|--------------------------------------------------
			*/
			const url = '/users/profile';
			const response = await axiosInstance.patch(url, payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
			useUserStore.getState().setNotificationSettings(data?.data as any);
			queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			console.log(error.response.data);
		},
	});
};
