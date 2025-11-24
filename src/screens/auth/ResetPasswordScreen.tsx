/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
//@ts-ignore
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Keyboard, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import InputField from '@src/components/InputField';
import ScreenWrapper from '@src/components/Wrapper';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';
import { useResetPassword } from '@services/auth.services';

type ResetPasswordScreenProps = RouteProp<RootStackParamList, 'ResetPasswordScreen'>;
export default function ResetPasswordScreen() {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const route = useRoute<ResetPasswordScreenProps>();
	const params = route?.params;

	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const { mutate, isPending } = useResetPassword('');

	/**
    |--------------------------------------------------
    | Form handler
    |--------------------------------------------------
    */
	const {
		watch,
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		defaultValues: {
			token: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	});

	const isMatchPassword = watch('newPassword').length > 7 && watch('confirmNewPassword').length > 7;

	/**
    |--------------------------------------------------
    | Sumbit handler
    |--------------------------------------------------
    */
	const onSubmit = (data: any) => {
		mutate({
			token: data?.token.trim(),
			newPassword: data?.newPassword.trim(),
			email: params?.email.trim().toLowerCase(),
			confirmPassword: data?.confirmNewPassword.trim(),
		});
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper title="Reset Password" />
			<MPText weight="semibold" className="text-base">
				Reset password
			</MPText>
			<MPText weight="medium" className="text-[15px] leading-5 text-[#484848]">
				Reset password to login to your account
			</MPText>

			{/**
            |--------------------------------------------------
            | Forms state
            |--------------------------------------------------
            */}
			<KeyboardAvoidingView
				className="mt-8 flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View className="gap-6">
							{/**
                            |--------------------------------------------------
                            | Password
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								name="token"
								maxLength={6}
								control={control}
								label="OTP Token"
								keyboardType="number-pad"
								placeholder="Enter otp token"
								rules={{
									minLength: {
										value: 6,
										message: 'OTP must be 6 characters',
									},
									maxLength: {
										value: 6,
										message: 'OTP must be 6 characters',
									},
									pattern: {
										value: /^\d+$/,
										message: 'Only numbers are allowed',
									},
									required: { value: true, message: 'OTP token is required' },
								}}
							/>

							{/**
                            |--------------------------------------------------
                            | Password
                            |--------------------------------------------------
                            */}
							<InputField
								type="password"
								control={control}
								name="newPassword"
								label="New password"
								placeholder="Enter new password"
								rules={{
									required: { value: true, message: 'Password is required' },
									minLength: {
										value: 8,
										message: 'Password must be atleast 8 characters',
									},
								}}
							/>

							{/**
                            |--------------------------------------------------
                            | Password
                            |--------------------------------------------------
                            */}
							<InputField
								type="password"
								control={control}
								name="confirmNewPassword"
								label="Confirm new password"
								placeholder="Confirm new password"
								rules={{
									required: { value: true, message: 'Password is required' },
									minLength: {
										value: 8,
										message: 'Password must be atleast 8 characters',
									},
									validate: (value: string, formValues: Record<string, string>) =>
										value === formValues.newPassword || 'Passwords do not match',
								}}
							/>
						</View>

						{/**
                        |--------------------------------------------------
                        | Button
                        |--------------------------------------------------
                        */}
						<MPButton
							className="mt-auto"
							isLoading={isPending}
							useGradientBg={isMatchPassword}
							onPress={handleSubmit(onSubmit)}
							disabled={!isMatchPassword || isPending}
						>
							<MPText
								weight="semibold"
								className={clsx(isMatchPassword ? 'text-white' : 'text-[15px] text-[#D1D1D1]')}
							>
								Save password
							</MPText>
						</MPButton>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
