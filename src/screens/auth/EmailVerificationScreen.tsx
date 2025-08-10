/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { View } from 'react-native';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import InputField from '@/src/components/InputField';
import ScreenWrapper from '@/src/components/Wrapper';
import { useRequestOtp } from '@/services/auth.services';

export const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export default function EmailVerificationScreen() {
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
		<ScreenWrapper>
			{/**
			|--------------------------------------------------
			| Header
			|--------------------------------------------------
			*/}
			<HeaderWrapper useNavigation={false} title="Create Your Account" subtitle="Verify your email" />

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
				<MPText weight="semibold" className={clsx(isValid ? 'text-white' : 'text-[#D1D1D1] text-sm')}>
					Continue
				</MPText>
			</MPButton>

			{/**
			|--------------------------------------------------
			| Already have an account
			|--------------------------------------------------
			*/}
			<MPText className="text-sm text-center mt-4">
				<MPText className="text-[#484848]">Already have an account? </MPText>
				<MPText className="text-[#FF6A00]">Log in</MPText>
			</MPText>
		</ScreenWrapper>
	);
}
