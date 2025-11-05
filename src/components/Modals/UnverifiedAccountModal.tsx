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
import {
	MONEY_PAD,
	clampFontSize,
	KYC_VERIFICATION,
	BVN_VERIFICATION,
	TRANSACTION_PIN,
} from '@constants/app.constant';
import MPButton from '../MPButton';
import { CloseIcon } from '@assets/svgs';
import { User } from '@interfaces/user.interface';
import { ROUTE_NAMES } from '@constants/routes.conts';

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
interface Props {
	isVerified: boolean;
	showBvnModal: boolean;
	isBvnVerified: boolean;
	userData: User | undefined;
	setShowBvnModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UnverifiedAcountModal({
	userData,
	isVerified,
	showBvnModal,
	isBvnVerified,
	setShowBvnModal,
}: Props) {
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
		<Modal visible={showBvnModal} animationType="slide">
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
				<Pressable className="flex-1 bg-white" onPress={() => setShowBvnModal(false)}>
					<View className="mt-[10%] w-full p-3 justify-center items-center py-5 px-6">
						<View className="">
							<View className="items-center mt-6 relative">
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
								<Pressable className="absolute top-0 left-0" onPress={() => setShowBvnModal(false)}>
									<CloseIcon />
								</Pressable>
							</View>

							{/**
                            |--------------------------------------------------
                            | Heading text
                            |--------------------------------------------------
                            */}
							<MPText
								weight="semibold"
								style={{ fontSize: 24, lineHeight: 32 }}
								className="text-[24px] text-[#1A1A1A] mt-8"
							>
								Almost there!
							</MPText>
							<MPText
								weight="semibold"
								style={{ fontSize: 24, lineHeight: 32 }}
								className="text-[24px] text-[#1A1A1A]"
							>
								Complete your verification to start using MPExchange
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Subtext
                            |--------------------------------------------------
                            */}
							<MPText weight="medium" className="text-sm leading-5 mt-4 text-[#767676]">
								This is a legal requirement, and verification protects you from fraud and identity
								theft; this information is not shared with anyone.
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Identities
                            |--------------------------------------------------
                            */}
							<View className={clsx('mb-12 gap-6 mt-[40px]')}>
								<KYCSteps
									icon={KYC_VERIFICATION}
									label="KYC Verification"
									subtext="Complete KYC verification"
									status={isVerified ? 'completed' : 'pending'}
									onClick={() => {
										setShowBvnModal(false);
										navigation.navigate(
											...([ROUTE_NAMES.KYC_STEPS, { email: userData?.mail.email }] as never)
										);
									}}
								/>
								<KYCSteps
									icon={BVN_VERIFICATION}
									label="BVN Verification"
									subtext="Complete your BVN verification"
									status={isBvnVerified ? 'completed' : 'pending'}
									onClick={() => {
										setShowBvnModal(false);
										navigation.navigate(ROUTE_NAMES.BVN_VERIFICATION as never);
									}}
								/>
								<KYCSteps
									icon={TRANSACTION_PIN}
									label="Set Transaction Pin"
									subtext="Set your transaction pin"
									onClick={() => {
										setShowBvnModal(false);
										navigation.navigate(ROUTE_NAMES.SET_TRANSACTION_PIN as never);
									}}
									status={typeof userData?.transactionPin === 'string' ? 'completed' : 'pending'}
								/>
							</View>

							{/**
                            |--------------------------------------------------
                            | Action buttons
                            |--------------------------------------------------
                            */}
							<View className="mt-auto justify-end mb-[20px]">
								{/**
                                |--------------------------------------------------
                                | Starts the veriff process
                                |--------------------------------------------------
                                */}
								<MPButton
									useGradientBg
									onPress={() => {
										setShowBvnModal(false);
										navigation.navigate(
											...([ROUTE_NAMES.KYC_STEPS, { email: userData?.mail.email }] as never)
										);
									}}
								>
									<MPText weight="semibold" className="text-white text-sm">
										Start
									</MPText>
								</MPButton>

								{/**
                                |--------------------------------------------------
                                | Takes the user to the login screen
                                |--------------------------------------------------
                                */}
								<MPButton onPress={() => setShowBvnModal(false)}>
									<MPText weight="semibold" className="text-[#EE0979] text-sm">
										I’ll do this later
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

interface KYCStepsProps {
	icon: any;
	label: string;
	subtext: string;
	isLoading?: boolean;
	onClick?: () => void;
	status: 'pending' | 'completed';
}
const KYCSteps = ({ icon, label, subtext, onClick, status, isLoading }: KYCStepsProps) => {
	return (
		<Pressable
			className="flex-row gap-4 items-center"
			onPress={() => {
				if (status === 'completed') return;
				onClick?.();
			}}
		>
			{/**
			|--------------------------------------------------
			| Icon
			|--------------------------------------------------
			*/}
			<Image
				source={icon}
				style={{
					width: clampFontSize(40, 30, 70),
					height: clampFontSize(40, 30, 70),
				}}
			/>

			{/**
			|--------------------------------------------------
			| Text labels
			|--------------------------------------------------
			*/}
			<View className="">
				<MPText weight="medium" className="text-sm">
					{label}
				</MPText>
				<MPText weight="medium" className="text-xs text-[#767676]">
					{subtext}
				</MPText>
			</View>

			{/**
			|--------------------------------------------------
			| Status
			|--------------------------------------------------
			*/}
			<Pressable
				className={clsx(
					'pointer-events-none h-[28px] rounded-[40px] w-max ml-auto px-4 flex-row items-center',
					status === 'pending' ? 'bg-[#FFFCF0]' : 'bg-[#E4FFF0]'
				)}
			>
				{isLoading ? (
					<MPText weight="medium" className="text-xs text-[#C59F07]">
						Please wait ...
					</MPText>
				) : (
					<MPText
						weight="medium"
						className={clsx('text-xs', status === 'pending' ? 'text-[#C59F07]' : 'text-[#15803D]')}
					>
						{status === 'pending' ? 'Pending' : 'Completed'}
					</MPText>
				)}
			</Pressable>
		</Pressable>
	);
};
