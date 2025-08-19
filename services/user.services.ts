/**
 |--------------------------------------------------
 | Npm imports
 |--------------------------------------------------
 */
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import utils from '@/lib/utils';
import axiosInstance from '@/lib/axiosInstance';
import { ROUTE_NAMES } from '@/constants/routes.conts';

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
