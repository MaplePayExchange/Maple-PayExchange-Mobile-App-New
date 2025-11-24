/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Modal, Pressable, Image } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { BENEFICIARY, fontSizes, SEND_FUNDS } from '@constants/app.constant';

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
		/**
		|--------------------------------------------------
		| CAD Funds handler
		|--------------------------------------------------
		*/
		CAD: {
			title: 'Send funds to new Interac email',
			subtitle: 'Send funds to new recipient',
			onClickNewReceipient: () => navigation.navigate(ROUTE_NAMES.SEND_CAD_FUNDS as never),
			onClickBeneficiary: () =>
				navigation.navigate(...([ROUTE_NAMES.SEND_FUNDS_BENEFICIARY, { currency: 'CAD' }] as any)),
		},

		/**
		|--------------------------------------------------
		| NGN Funds handler
		|--------------------------------------------------
		*/
		NGN: {
			title: 'Send Funds to bank account',
			subtitle: 'Send funds to new recipient',
			onClickNewReceipient: () => navigation.navigate(ROUTE_NAMES.SEND_NGN_FUNDS as never),
			onClickBeneficiary: () =>
				navigation.navigate(...([ROUTE_NAMES.SEND_FUNDS_BENEFICIARY, { currency: 'NGN' }] as any)),
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
				<View className="mt-auto min-h-[202px] gap-4 rounded-3xl bg-white p-5 py-[38px]">
					{/**
                    |--------------------------------------------------
                    | Sending to new beneficiary
                    |--------------------------------------------------
                    */}
					<Pressable
						onPress={() => {
							details?.[type]?.onClickNewReceipient();
							setVisible(false);
						}}
						className="h-[66px] w-full flex-row items-center gap-4 rounded-3xl border border-[#EEEEEE] px-4 py-3"
					>
						<Image source={SEND_FUNDS} style={{ height: fontSizes.FONT40, width: fontSizes.FONT40 }} />

						{/**
                        |--------------------------------------------------
                        | Label
                        |--------------------------------------------------
                        */}
						<View className="gap-1">
							<MPText weight="medium" className="text-[15px]">
								{details?.[type]?.title}
							</MPText>
							<MPText
								weight="medium"
								className="text-[13px] text-[#767676]"
								style={{ lineHeight: 14, fontSize: 12 }}
							>
								{details?.[type]?.subtitle}
							</MPText>
						</View>
					</Pressable>

					{/**
                    |--------------------------------------------------
                    | Beneficiary
                    |--------------------------------------------------
                    */}
					<Pressable
						onPress={() => {
							details?.[type]?.onClickBeneficiary();
							setVisible(false);
						}}
						className="h-[66px] w-full flex-row items-center gap-4 rounded-3xl border border-[#EEEEEE] px-4 py-3"
					>
						<Image source={BENEFICIARY} style={{ height: fontSizes.FONT40, width: fontSizes.FONT40 }} />
						{/**
                        |--------------------------------------------------
                        | Label
                        |--------------------------------------------------
                        */}
						<View className="gap-1">
							<MPText weight="medium" className="text-[15px]">
								Send funds to beneficiary
							</MPText>
							<MPText
								weight="medium"
								className="text-[13px] text-[#767676]"
								style={{ lineHeight: 14, fontSize: 12 }}
							>
								Send funds to saved beneficiary
							</MPText>
						</View>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}
