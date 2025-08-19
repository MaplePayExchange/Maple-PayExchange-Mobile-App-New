/**
 |--------------------------------------------------
 | Npm imports
 |--------------------------------------------------
 */
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import utils from '@/lib/utils';
import axiosInstance from '@/lib/axiosInstance';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { BankTransferRequest, InteracTransactionRequest } from '@/interfaces/transaction.interface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/route.params';

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
| Send fund to interac
|--------------------------------------------------
*/
export const useSendFundsToInterac = (onError: () => void) => {
	return useMutation<any, Error, InteracTransactionRequest>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			console.log(payload, ':send.payload');
			const response = await axiosInstance.post('/wallet/wallet-to-interac', payload);
			return response.data;
		},

		/**
		|--------------------------------------------------
		| Success
		|--------------------------------------------------
		*/
		onSuccess: (data) => {
			console.log(data);
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

	return useMutation<any, Error, BankTransferRequest>({
		/**
		|--------------------------------------------------
		| mutation
		|--------------------------------------------------
		*/
		mutationFn: async (payload) => {
			console.log(payload, ':send.payload');
			const response = await axiosInstance.post('/wallet/wallet-to-bank', payload);
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
