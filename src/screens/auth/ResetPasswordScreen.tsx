/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Keyboard, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import InputField from '@/src/components/InputField';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';
import { useResetPassword } from '@/services/auth.services';

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

	const newPassword = watch('newPassword');

	/**
    |--------------------------------------------------
    | Sumbit handler
    |--------------------------------------------------
    */
	const onSubmit = (data: any) => {
		mutate({
			token: data?.token,
			email: params?.email,
			newPassword: data?.newPassword,
			confirmPassword: data?.confirmNewPassword,
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
			<MPText weight="medium" className="text-[#484848] text-sm leading-5">
				Reset password to login to your account
			</MPText>

			{/**
            |--------------------------------------------------
            | Forms state
            |--------------------------------------------------
            */}
			<KeyboardAvoidingView
				className="flex-1 mt-8"
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
									validate: (value: string) => value === newPassword || 'Passwords do not match',
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
							useGradientBg={isValid}
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isPending}
						>
							<MPText
								weight="semibold"
								className={clsx(isValid ? 'text-white' : 'text-[#D1D1D1] text-sm')}
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
