/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { View } from 'react-native';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import InputField from '@src/components/InputField';
import ScreenWrapper from '@src/components/Wrapper';
import { fontSizes } from '@constants/app.constant';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useRequestOtp } from '@services/auth.services';

export const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export default function EmailVerificationScreen() {
	const navigation = useNavigation();
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { verificationData } = useUserStore();
	const { mutate, isPending } = useRequestOtp('email');

	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		defaultValues: { email: '' },
	});

	/**
	|--------------------------------------------------
	| Handles submitting the form
	|--------------------------------------------------
	*/
	const onSubmit = async (data: { email: string }) => {
		mutate({
			verificationType: 'email',
			email: data.email.trim().toLowerCase(),
			sessionId: verificationData?.sessionId,
		});
	};

	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<ScreenWrapper useBottomInset>
			{/**
			|--------------------------------------------------
			| Header
			|--------------------------------------------------
			*/}
			<HeaderWrapper
				useNavigation={false}
				titleFontSize="FONT24"
				subTitleFontSize="FONT14"
				title="Create Your Account"
				subtitle="To protect your account, we’ll need to verify your email so you can recover your account should you need to."
			/>

			<View style={{ marginTop: 32 }} />

			{/**
			|--------------------------------------------------
			| Form
			|--------------------------------------------------
			*/}
			<InputField
				type="email"
				name="email"
				label="Email"
				control={control}
				placeholder="Enter your email address"
				rules={{
					required: {
						value: true,
						message: 'Email is required',
					},
					pattern: {
						value: emailPattern,
						message: 'Enter a valid email address',
					},
				}}
			/>

			{/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/}
			<MPText style={{ fontSize: fontSizes.FONT12 }} className="mt-1">
				Make sure to check your inbox and spam folders
			</MPText>

			{/**
			|--------------------------------------------------
			| Button
			|--------------------------------------------------
			*/}
			<MPButton
				className="mt-auto"
				isLoading={isPending}
				useGradientBg={isValid}
				onPress={handleSubmit(onSubmit)}
				disabled={!isValid || isPending}
			>
				<MPText weight="semibold" className={clsx(isValid ? 'text-white' : 'text-[15px] text-[#D1D1D1]')}>
					Continue
				</MPText>
			</MPButton>

			{/**
			|--------------------------------------------------
			| Already have an account
			|--------------------------------------------------
			*/}
			<MPText className="mt-4 text-center text-[15px]">
				<MPText className="text-[15px] text-[#484848]">Already have an account? </MPText>
				<MPText
					weight="semibold"
					className="text-[15px] text-[#FF6A00]"
					onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN as never)}
				>
					Log in
				</MPText>
			</MPText>
		</ScreenWrapper>
	);
}
