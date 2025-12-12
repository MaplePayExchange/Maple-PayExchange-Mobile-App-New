/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Modal, Pressable, ScrollView, Image } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import MPButton from '../MPButton';
import { CloseIcon } from '@assets/svgs';
import { MONEY_PAD, clampFontSize } from '@constants/app.constant';
import { ROUTE_NAMES } from '@constants/routes.conts';

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
interface Props {
	showBvnModal: boolean;
	isBvnVerified: boolean;
	setShowBvnModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BVNVerificationModal({ showBvnModal, isBvnVerified, setShowBvnModal }: Props) {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={showBvnModal} animationType="slide" transparent>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
				<Pressable className="flex-1 justify-end bg-black/10" onPress={() => setShowBvnModal(false)}>
					<View className="w-full items-center justify-center">
						<View className="mt-auto min-h-[391px] rounded-t-3xl bg-white px-6 pb-12">
							<View className="relative mt-6 items-center">
								<Image
									width={195}
									height={197}
									source={MONEY_PAD}
									style={{
										width: clampFontSize(195, 90, 380),
										height: clampFontSize(197, 93, 387),
									}}
								/>

								{/**
                                |--------------------------------------------------
                                | Close icon
                                |--------------------------------------------------
                                */}
								<Pressable className="absolute left-0 top-0" onPress={() => setShowBvnModal(false)}>
									<CloseIcon />
								</Pressable>
							</View>

							{/**
                            |--------------------------------------------------
                            | Heading text
                            |--------------------------------------------------
                            */}
							<MPText
								fontSize="FONT24"
								weight="semibold"
								style={{ lineHeight: 32 }}
								className="mt-5 text-center text-[24px] text-[#1A1A1A]"
							>
								Verify Account with BVN
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Subtext
                            |--------------------------------------------------
                            */}
							<MPText
								weight="medium"
								fontSize="FONT14"
								style={{ lineHeight: 20 }}
								className="mt-2 text-center leading-5 text-[#767676]"
							>
								Please ensure that your account is verified to obtain a virtual account to receive funds
								into your MaplePay wallet.
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Action buttons
                            |--------------------------------------------------
                            */}
							<View className="mt-6 justify-end">
								{/**
                                |--------------------------------------------------
                                | Starts the veriff process
                                |--------------------------------------------------
                                */}
								<MPButton
									useGradientBg
									onPress={() => {
										setShowBvnModal(false);
										navigation.navigate(ROUTE_NAMES.BVN_VERIFICATION as any);
									}}
								>
									<MPText fontSize="FONT14" weight="semibold" className="text-[15px] text-white">
										Verify BVN
									</MPText>
								</MPButton>
							</View>
						</View>
					</View>
				</Pressable>
			</ScrollView>
		</Modal>
	);
}
