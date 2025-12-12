/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, Pressable, ScrollView, Image } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */

import { CloseIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useGetUserInformation } from '@services/auth.services';
import { MONEY_PAD, clampFontSize, KYC_VERIFICATION, BVN_VERIFICATION, TRANSACTION_PIN } from '@constants/app.constant';

export default function VerificationStepsScreen() {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | Data
    |--------------------------------------------------
    */
	const { data, isLoading } = useGetUserInformation();

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const isVerified = data?.user?.isVerified;
	const isBvnVerified = data?.user?.isBvnVerified;
	const isVerificationStepsComplete = isBvnVerified && isVerified && typeof data?.user?.transactionPin === 'string';

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
			<Pressable className={clsx('flex-1 bg-white', isLoading ? 'pointer-events-none opacity-60' : '')}>
				<View className="mt-[10%] w-full items-center justify-center p-3 px-6 py-5">
					<View className="h-[100%]">
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
							<Pressable className="absolute left-0 top-0" onPress={() => navigation.goBack()}>
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
							This is a legal requirement, and verification protects you from fraud and identity theft;
							this information is not shared with anyone.
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
								onClick={async () => {
									await new Promise((resolve) => setTimeout(resolve, 50));

									/**
									|--------------------------------------------------
									| ...
									|--------------------------------------------------
									*/
									navigation.dispatch(
										CommonActions.reset({
											index: 0,
											routes: [
												{
													name: ROUTE_NAMES.KYC_STEPS,
													params: {
														email: data?.user?.mail.email,
														isLastStep:
															isBvnVerified &&
															typeof data?.user?.transactionPin === 'string',
													},
												},
											],
										})
									);
								}}
							/>
							<KYCSteps
								icon={BVN_VERIFICATION}
								label="BVN Verification"
								subtext="Complete your BVN verification"
								status={isBvnVerified ? 'completed' : 'pending'}
								onClick={async () => {
									await new Promise((resolve) => setTimeout(resolve, 50));
									navigation.dispatch(
										CommonActions.reset({
											index: 0,
											routes: [
												{
													name: ROUTE_NAMES.BVN_VERIFICATION,
													params: {
														isLastStep:
															typeof data?.user?.transactionPin === 'string' &&
															isVerified,
													},
												},
											],
										})
									);
								}}
							/>
							<KYCSteps
								icon={TRANSACTION_PIN}
								label="Set Transaction Pin"
								subtext="Set your transaction pin"
								onClick={async () => {
									await new Promise((resolve) => setTimeout(resolve, 50));
									navigation.dispatch(
										CommonActions.reset({
											index: 0,
											routes: [
												{
													name: ROUTE_NAMES.SET_TRANSACTION_PIN,
													params: { isLastStep: isBvnVerified && isVerified },
												},
											],
										})
									);
								}}
								status={typeof data?.user?.transactionPin === 'string' ? 'completed' : 'pending'}
							/>
						</View>

						{/**
                        |--------------------------------------------------
                        | Action buttons
                        |--------------------------------------------------
                        */}
						<View className="mt-auto justify-end">
							{/**
                            |--------------------------------------------------
                            | Starts the veriff process
                            |--------------------------------------------------
                            */}
							<MPButton useGradientBg onPress={() => navigation.navigate('TabNavigation')}>
								<MPText fontSize="FONT14" weight="semibold" className="text-[15px] text-white">
									{isVerificationStepsComplete ? 'Dashboard' : 'I’ll do this later'}
								</MPText>
							</MPButton>
						</View>
					</View>
				</View>
			</Pressable>
		</ScrollView>
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
