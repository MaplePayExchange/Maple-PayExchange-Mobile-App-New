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
import { User } from '@interfaces/user.interface';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { MONEY_PAD, clampFontSize, KYC_VERIFICATION, BVN_VERIFICATION, TRANSACTION_PIN } from '@constants/app.constant';

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
					<View className="mt-[10%] w-full items-center justify-center p-3 px-6 py-5">
						<View className="">
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
								className="mt-8 text-[24px] text-[#1A1A1A]"
							>
								Almost there!
							</MPText>
							<MPText
								fontSize="FONT24"
								weight="semibold"
								style={{ lineHeight: 32 }}
								className="text-[24px] text-[#1A1A1A]"
							>
								Complete your verification to start using MPExchange
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Subtext
                            |--------------------------------------------------
                            */}
							<MPText
								weight="medium"
								fontSize="FONT14"
								style={{ lineHeight: 24 }}
								className="mt-4 leading-5 text-[#767676]"
							>
								This is a legal requirement, and verification protects you from fraud and identity
								theft; this information is not shared with anyone.
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Identities
                            |--------------------------------------------------
                            */}
							<View className={clsx('mb-12 mt-[40px] gap-6')}>
								<KYCSteps
									icon={KYC_VERIFICATION}
									label="KYC Verification"
									subtext="Complete KYC verification"
									status={isVerified ? 'completed' : 'pending'}
									onClick={() => {
										setShowBvnModal(false);
										navigation.navigate(
											...([ROUTE_NAMES.KYC_STEPS, { email: userData?.mail.email }] as any)
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
							<View className="mb-[20px] mt-auto justify-end">
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
											...([ROUTE_NAMES.KYC_STEPS, { email: userData?.mail.email }] as any)
										);
									}}
								>
									<MPText fontSize="FONT14" weight="semibold" className="text-[15px] text-white">
										Start
									</MPText>
								</MPButton>

								{/**
                                |--------------------------------------------------
                                | Takes the user to the login screen
                                |--------------------------------------------------
                                */}
								<MPButton onPress={() => setShowBvnModal(false)}>
									<MPText fontSize="FONT14" weight="semibold" className="text-[15px] text-[#EE0979]">
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
			className="flex-row items-center gap-4"
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
				<MPText fontSize="FONT14" weight="medium" className="text-[15px]">
					{label}
				</MPText>
				<MPText fontSize="FONT12" weight="medium" className="text-[13px] text-[#767676]">
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
					'pointer-events-none ml-auto h-[28px] w-max flex-row items-center rounded-[40px] px-4',
					status === 'pending' ? 'bg-[#FFFCF0]' : 'bg-[#E4FFF0]'
				)}
			>
				{isLoading ? (
					<MPText fontSize="FONT12" weight="medium" className="text-[13px] text-[#C59F07]">
						Please wait ...
					</MPText>
				) : (
					<MPText
						weight="medium"
						fontSize="FONT12"
						className={clsx('text-[13px]', status === 'pending' ? 'text-[#C59F07]' : 'text-[#15803D]')}
					>
						{status === 'pending' ? 'Pending' : 'Completed'}
					</MPText>
				)}
			</Pressable>
		</Pressable>
	);
};
