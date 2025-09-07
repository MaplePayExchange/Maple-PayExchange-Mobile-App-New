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
import axiosInstance from '@/lib/axiosInstance';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import {
	BankAccount,
	BankTransferRequest,
	ExchangePayload,
	FundSwapTransaction,
	INotification,
	InteracTransactionRequest,
} from '@/interfaces/transaction.interface';
import { RootStackParamList } from '@/types/route.params';

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
			if (data.success) {
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
			console.log(payload, ':send.payload');
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
					fullName: `${payload.firstName} ${payload.lastName}`,
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
			console.log(data);
			navigation.navigate(ROUTE_NAMES.SEND_FUNDS_FEEDBACK);
			queryClient.invalidateQueries({ queryKey: ['user_beneficiaries', 'maple_user_data'] });
			utils.successNotificationHanlder('Interac!', 'Transaction request completed successfully');
		},

		/**
		|--------------------------------------------------
		| Error
		|--------------------------------------------------
		*/
		onError: (error: any) => {
			onError?.();
			console.log(error.response.data);
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
	return useQuery<any, Error, { items: BankAccount[] }>({
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

		staleTime: 100_000_000_000_000,
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
