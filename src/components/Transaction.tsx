/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import dayjs from 'dayjs';
import { Image, TouchableOpacity, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import TransactionDetailsModal from './Modals/TransactionDetailsModal';
import { TransactionInterface } from '@/interfaces/transaction.interface';
import { clampFontSize, EXCHANGE, INCOMING, OUTGOING } from '@/constants/app.constant';

interface Props {
	onClick?: () => void;
	transaction: TransactionInterface;
}

export default function Transaction({ onClick, transaction }: Props) {
	/**
	|--------------------------------------------------
	| Amount
	|--------------------------------------------------
	*/
	const amount = transaction.amountReceived || transaction.amountSent || 0;

	/**
	|--------------------------------------------------
	| Transaction date
	|--------------------------------------------------
	*/
	const transactionDate = dayjs(transaction.createdAt).format('DD MMM, YYYY');

	/**
	|--------------------------------------------------
	| Type
	|--------------------------------------------------
	*/
	const type =
		transaction.type === 'FundSwap'
			? 'fund_exchange'
			: transaction.type === 'Incoming' || transaction.type === 'Reward'
				? 'incoming_transaction'
				: 'outgoing_transaction';
	/**
	|--------------------------------------------------
	| Currency type
	|--------------------------------------------------
	*/
	const currencyType = (transaction.sourceCurrency || transaction.destinationCurrency) as 'CAD' | 'NGN';
	/**
	|--------------------------------------------------
	| Details
	|--------------------------------------------------
	*/
	const details =
		transaction.description?.slice(0, 10) || transaction.sourceCurrency + ' - ' + transaction.destinationCurrency;

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [showTransactionDetailsModal, setShowTransactionDetailsModal] = React.useState<boolean>(false);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<TouchableOpacity
			onPress={() => {
				onClick?.();
				setShowTransactionDetailsModal(true);
			}}
			activeOpacity={0.8}
			className="flex-row gap-4 items-start"
		>
			{/**
            |--------------------------------------------------
            | Icon
            |--------------------------------------------------
            */}
			<Image
				className="mt-1"
				style={{ width: clampFontSize(40, 30, 80), height: clampFontSize(40, 30, 80) }}
				source={type === 'fund_exchange' ? EXCHANGE : type === 'incoming_transaction' ? INCOMING : OUTGOING}
			/>

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			<View className="items-start">
				<MPText weight="medium" className="text-sm mb-1">
					{type === 'fund_exchange'
						? 'Fund exchange'
						: type === 'incoming_transaction'
							? 'Incoming Transaction'
							: 'Outgoing Transaction'}
				</MPText>
				<MPText style={{ fontSize: 12 }} className="text-xs text-[#767676]">
					{details}
				</MPText>
			</View>

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			<View className="items-end ml-auto">
				<MPText weight="semibold" className="text-sm mb-1">
					{currencyType === 'CAD' ? '$' : '₦'}{' '}
					{amount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
				</MPText>
				<MPText style={{ fontSize: 12 }} className="text-xs text-[#767676]">
					{transactionDate}
				</MPText>
			</View>

			{/**
			|--------------------------------------------------
			| Transaction details
			|--------------------------------------------------
			*/}
			<TransactionDetailsModal
				transaction={transaction}
				showModal={showTransactionDetailsModal}
				setShowModal={setShowTransactionDetailsModal}
			/>
		</TouchableOpacity>
	);
}
