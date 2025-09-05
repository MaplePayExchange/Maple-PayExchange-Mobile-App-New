/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import dayjs from 'dayjs';
import React from 'react';
import { View, Modal, Pressable } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import clsx from 'clsx';
import MPText from '../MPText';
import MPButton from '../MPButton';
import { CloseIcon } from '@/assets/svgs';
import DataRepresentation from '../DataRepresentation';
import { TransactionInterface } from '@/interfaces/transaction.interface';

interface Props {
	showModal: boolean;
	transaction: TransactionInterface;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TransactionDetailsModal({ showModal, setShowModal, transaction }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={showModal} transparent animationType="slide">
			<View className="flex-1 bg-black/10 justify-end">
				{/**
                |--------------------------------------------------
                | Content
                |--------------------------------------------------
                */}
				<View className="bg-white rounded-t-3xl h-[450px] p-5">
					{/**
                    |--------------------------------------------------
                    | Close icon
                    |--------------------------------------------------
                    */}
					<Pressable className="ml-auto" onPress={() => setShowModal(false)}>
						<CloseIcon />
					</Pressable>

					{/**
                    |--------------------------------------------------
                    | Title
                    |--------------------------------------------------
                    */}
					<MPText weight="bold" className="text-xl text-center">
						Transaction details
					</MPText>

					<View className="gap-6 mt-8">
						{/**
                        |--------------------------------------------------
                        | Transaction date
                        |--------------------------------------------------
                        */}
						<DataRepresentation
							label="Transaction date"
							value={dayjs(transaction?.createdAt).format('DD MMM, YYYY, HH:MM')}
						/>
						{/**
                        |--------------------------------------------------
                        | Transaction type
                        |--------------------------------------------------
                        */}
						<DataRepresentation label="Transaction type" value={transaction?.type} />
						{/**
                        |--------------------------------------------------
                        | If transaction type is a fundswap
                        |--------------------------------------------------
                        */}
						{transaction?.type === 'FundSwap' && (
							<DataRepresentation
								label="Amount exchanged"
								value={`${transaction.sourceCurrency}${transaction.sourceAmount}`}
							/>
						)}

						{/**
                        |--------------------------------------------------
                        | Amount received
                        |--------------------------------------------------
                        */}
						{transaction.type === 'Incoming' && (
							<DataRepresentation
								label="Amount received"
								value={`${transaction.sourceCurrency === 'NGN' ? '₦' : '$'}${(transaction?.amountReceived ?? 0)?.toLocaleString()}`}
							/>
						)}

						{/**
                        |--------------------------------------------------
                        | Amount sent
                        |--------------------------------------------------
                        */}
						{transaction.type === 'Outgoing' && (
							<DataRepresentation
								label="Amount sent"
								value={`${transaction.sourceCurrency === 'NGN' ? '₦' : '$'}${(transaction?.amountSent ?? 0)?.toLocaleString()}`}
							/>
						)}

						{/**
                        |--------------------------------------------------
                        | Reference
                        |--------------------------------------------------
                        */}
						<DataRepresentation
							label="Transaction ID"
							value={`${transaction?.reference?.slice(0, 10)}...`}
						/>
						{/**
                        |--------------------------------------------------
                        | Transaction status
                        |--------------------------------------------------
                        */}
						<DataRepresentation
							label="Status"
							value={
								<View
									className={clsx(
										'h-[16px] px-4 rounded-[8px] flex-row items-center',
										transaction?.status === 'pending'
											? 'bg-[#FFFCF0]'
											: transaction?.status === 'failed'
												? 'bg-[#FCD9D7]'
												: 'bg-[#DEFFEA]'
									)}
								>
									<MPText
										weight="medium"
										style={{ fontSize: 8, lineHeight: 10 }}
										className={clsx(
											'text-xs',
											transaction?.status === 'pending'
												? 'text-[#C59F07]'
												: transaction?.status === 'failed'
													? 'text-[#B45309]'
													: 'text-[#15803D]'
										)}
									>
										{transaction?.status === 'pending'
											? 'Pending'
											: transaction?.status === 'failed'
												? 'Failed'
												: 'Completed'}
									</MPText>
								</View>
							}
						/>

						{/**
                        |--------------------------------------------------
                        | Action buttons
                        |--------------------------------------------------
                        */}
						<MPButton useGradientBg className="mt-8">
							<MPText weight="semibold" className="text-white">
								Download receipt
							</MPText>
						</MPButton>

						{/**
                        |--------------------------------------------------
                        | Need help? Contact support
                        |--------------------------------------------------
                        */}
						<MPText weight="medium" className="text-sm text-center">
							Need help?{' '}
							<MPText weight="semibold" className="text-sm text-[#FF6A00]">
								Contact support
							</MPText>
						</MPText>
					</View>
				</View>
			</View>
		</Modal>
	);
}
