/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Modal, Platform } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import MPButton from '../MPButton';
import HeaderWrapper from '../Header';
import ScreenWrapper from '../Wrapper';
import { SendPreviewIcon } from '@assets/svgs';
import DataRepresentation from '../DataRepresentation';

interface Props {
	amount: string;
	visible: boolean;
	beneficiary: string;
	onConfirm?: () => void;
	receivedAmount: string;
	currencySymbol?: string;
	transactionType: 'SWAP' | 'SEND';
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TransactionConfirmationModal({
	amount,
	visible,
	onConfirm,
	setVisible,
	beneficiary,
	currencySymbol,
	receivedAmount,
	transactionType,
}: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={visible} animationType="slide">
			{Platform.OS === 'ios' && <View className="mt-[70px]" />}
			<ScreenWrapper>
				<HeaderWrapper onlClick={() => setVisible(false)} center useNavigation title="Transaction Summary" />

				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<View className="mt-[20px]">
					<View className="z-20 h-[88px] w-[88px] translate-y-[20px] items-center justify-center self-center rounded-full border-[10px] border-white bg-[#0E314C]">
						<SendPreviewIcon />
					</View>

					{/**
                    |--------------------------------------------------
                    | Content
                    |--------------------------------------------------
                    */}
					<View className="gap-6 rounded-3xl bg-[#F7F7F7] px-4 py-5">
						<DataRepresentation label="Currency" value={currencySymbol === '₦' ? 'NGN' : 'CAD'} />
						<DataRepresentation label="Amount" value={`${currencySymbol}${amount}`} />

						{/**
						|--------------------------------------------------
						| If the transaction type is a swap
						|--------------------------------------------------
						*/}
						{transactionType === 'SWAP' && (
							<DataRepresentation label="Amount to receive" value={receivedAmount} />
						)}

						<DataRepresentation label="Beneficiary" value={beneficiary} />

						{/**
                        |--------------------------------------------------
                        | Confirm transaction button
                        |--------------------------------------------------
                        */}
						<MPButton onPress={onConfirm} useGradientBg className="h-[40px] w-[167px] self-center">
							<MPText weight="semibold" className="text-[15px] text-white">
								Confirm transaction
							</MPText>
						</MPButton>
					</View>
				</View>
			</ScreenWrapper>
		</Modal>
	);
}
