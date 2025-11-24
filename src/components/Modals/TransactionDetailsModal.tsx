/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import dayjs from 'dayjs';
import React from 'react';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { View, Modal, Pressable } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import clsx from 'clsx';
import MPText from '../MPText';
import Receipt from '../Receipt';
import MPButton from '../MPButton';
import { CloseIcon } from '@assets/svgs';
import DataRepresentation from '../DataRepresentation';
import { TransactionInterface } from '@interfaces/transaction.interface';
import utils from '@lib/utils';

interface Props {
	showModal: boolean;
	transaction: TransactionInterface;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransactionDetailsModal({ showModal, setShowModal, transaction }: Props) {
	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const viewShotRef = React.useRef<ViewShot>(null);

	/**
	|--------------------------------------------------
	| Function to handle the download
	|--------------------------------------------------
	*/
	const handleDownload = async () => {
		try {
			if (!viewShotRef.current) {
				console.warn('Receipt component not rendered yet');
				return;
			}

			/**
			|--------------------------------------------------
			| Capture the receipt component as PNG
			|--------------------------------------------------
			*/
			const uri = await viewShotRef.current.capture?.();
			if (!uri) return;

			/**
			|--------------------------------------------------
			| Save to filesystem using react-native-fs
			|--------------------------------------------------
			*/
			const fileName = `Receipt_${Date.now()}.png`;
			const path = `${RNFS.CachesDirectoryPath}/${fileName}`;
			await RNFS.copyFile(uri, path);

			/**
			|--------------------------------------------------
			| Share the actual PNG file
			|--------------------------------------------------
			*/
			await Share.open({
				url: 'file://' + path,
				type: 'image/png',
				title: 'Download Receipt',
				message: 'Here is your transaction receipt.',
				failOnCancel: false,
			});
		} catch (err) {
			console.error('Error generating receipt:', err);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={showModal} transparent animationType="slide">
			<View className="flex-1 justify-end bg-black/10" style={{}}>
				{/**
                |--------------------------------------------------
                | Content
                |--------------------------------------------------
                */}
				<View className="h-[450px] rounded-t-3xl bg-white p-5">
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
					<MPText fontSize="FONT18" weight="bold" className="text-center text-xl">
						Transaction details
					</MPText>

					<View className="mt-8 gap-6">
						{/**
                        |--------------------------------------------------
                        | Transaction date
                        |--------------------------------------------------
                        */}
						<DataRepresentation
							label="Transaction date"
							value={dayjs(transaction?.createdAt).format('DD MMM, YYYY, hh:mm A')}
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
										'h-[16px] flex-row items-center rounded-[8px] px-4',
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
											'text-[13px]',
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
						<ViewShot
							ref={viewShotRef}
							options={{ format: 'jpg', quality: 1 }}
							style={{ position: 'absolute', bottom: -99999 }}
						>
							<Receipt transaction={transaction} />
						</ViewShot>
						<MPButton onPress={handleDownload} useGradientBg className="mt-8">
							<MPText weight="semibold" className="text-white">
								Download receipt
							</MPText>
						</MPButton>

						{/**
                        |--------------------------------------------------
                        | Need help? Contact support
                        |--------------------------------------------------
                        */}
						<Pressable onPress={() => utils.handleOpenWhatsApp()}>
							<MPText weight="medium" className="text-center text-[15px]">
								Need help?{' '}
								<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
									Contact support
								</MPText>
							</MPText>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}
