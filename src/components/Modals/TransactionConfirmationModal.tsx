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
import { SendPreviewIcon } from '@/assets/svgs';
import DataRepresentation from '../DataRepresentation';

interface Props {
	amount: string;
	visible: boolean;
	beneficiary: string;
	onConfirm?: () => void;
	receivedAmount: string;
	currency: 'CAD' | 'NGN';
	transactionType: 'SWAP' | 'SEND';
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TransactionConfirmationModal({
	amount,
	visible,
	currency,
	onConfirm,
	setVisible,
	beneficiary,
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
					<View className="h-[88px] w-[88px] translate-y-[20px] z-20 border-[10px] border-white bg-[#0E314C] self-center rounded-full justify-center items-center">
						<SendPreviewIcon />
					</View>

					{/**
                    |--------------------------------------------------
                    | Content
                    |--------------------------------------------------
                    */}
					<View className="bg-[#F7F7F7] rounded-3xl py-5 px-4 gap-6">
						<DataRepresentation label="Currency" value={currency} />
						<DataRepresentation label="Amount" value={`${currency === 'CAD' ? '$' : '₦'}${amount}`} />

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
						<MPButton onPress={onConfirm} useGradientBg className="w-[167px] h-[40px] self-center">
							<MPText weight="semibold" className="text-sm text-white">
								Confirm transaction
							</MPText>
						</MPButton>
					</View>
				</View>
			</ScreenWrapper>
		</Modal>
	);
}
