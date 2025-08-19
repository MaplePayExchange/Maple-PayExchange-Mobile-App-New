/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Modal, Pressable, Image } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import { BENEFICIARY, fontSizes, SEND_FUNDS } from '@/constants/app.constant';
import { useNavigation } from '@react-navigation/native';

interface Props {
	visible: boolean;
	type: 'CAD' | 'NGN';
	onDismiss?: () => void;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SendFundsModal({ visible, setVisible, type, onDismiss }: Props) {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const details = {
		CAD: {
			title: 'Send funds to new Interac email',
			subtitle: 'Send funds to new recipient',
			onClickBeneficiary: () => console.log('object'),
			onClickNewReceipient: () => console.log('object'),
		},
		NGN: {
			title: 'Send Funds to bank account',
			subtitle: 'Send funds to new recipient',
			onClickBeneficiary: () => console.log('object'),
			onClickNewReceipient: () => console.log('object'),
		},
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal transparent visible={visible} animationType="slide" onDismiss={onDismiss}>
			<Pressable onPress={() => setVisible(false)} className="flex-1 bg-black/10">
				<View className="bg-white rounded-3xl p-5 py-[38px] gap-4 min-h-[202px] mt-auto">
					{/**
                    |--------------------------------------------------
                    | Sending to new beneficiary
                    |--------------------------------------------------
                    */}
					<Pressable className="h-[66px] gap-4 flex-row items-center w-full rounded-3xl border border-[#EEEEEE] py-3 px-4">
						<Image source={SEND_FUNDS} style={{ height: fontSizes.FONT40, width: fontSizes.FONT40 }} />

						{/**
                        |--------------------------------------------------
                        | Label
                        |--------------------------------------------------
                        */}
						<View>
							<MPText weight="medium" className="text-sm">
								{details?.[type]?.title}
							</MPText>
							<MPText style={{ lineHeight: 14 }} weight="medium" className="text-xs text-[#767676]">
								{details?.[type]?.subtitle}
							</MPText>
						</View>
					</Pressable>

					{/**
                    |--------------------------------------------------
                    | Beneficiary
                    |--------------------------------------------------
                    */}
					<Pressable className="h-[66px] gap-4 flex-row items-center w-full rounded-3xl border border-[#EEEEEE] py-3 px-4">
						<Image source={BENEFICIARY} style={{ height: fontSizes.FONT40, width: fontSizes.FONT40 }} />
						{/**
                        |--------------------------------------------------
                        | Label
                        |--------------------------------------------------
                        */}
						<View>
							<MPText weight="medium" className="text-sm">
								Send funds to beneficiary
							</MPText>
							<MPText style={{ lineHeight: 14 }} weight="medium" className="text-xs text-[#767676]">
								Send funds to saved beneficiary
							</MPText>
						</View>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}
