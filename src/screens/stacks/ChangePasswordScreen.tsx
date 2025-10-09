/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import List from '@/src/components/List';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import Container from '@/src/components/Container';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import InputField from '@/src/components/InputField';
import { FormWrapper } from '@/src/components/FormWrapper';
import { useChangePassword } from '@/services/auth.services';

export default function ChangePasswordScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { mutate, isPending } = useChangePassword();
	const { control, handleSubmit, watch } = useForm({
		defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
	});

	/**
    |--------------------------------------------------
    | Is password match
    |--------------------------------------------------
    */
	const isMatchPassword = watch('newPassword').length > 7 && watch('oldPassword') !== '';

	/**
    |--------------------------------------------------
    | Handles submission
    |--------------------------------------------------
    */
	const onSubmit = (data: any) => {
		mutate({ newPassword: data.newPassword, oldPassword: data.oldPassword });
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<ScreenWrapper usePadding={false}>
				<View className="px-4">
					<HeaderWrapper title="Change Password" center />
				</View>

				{/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/}
				<View className="bg-[#f0f0f0] flex-1">
					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<View className="p-4 pb-0">
						<MPText className="" weight="semibold">
							Change Password
						</MPText>
						<MPText className="text-[#767676] text-xs">Input a new password here</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| Form
					|--------------------------------------------------
					*/}
					<FormWrapper>
						<Container className="gap-5">
							{/**
							|--------------------------------------------------
							| Old password
							|--------------------------------------------------
							*/}
							<InputField
								type="password"
								name="oldPassword"
								label="Old password"
								control={control}
								rules={{
									required: 'Old password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
								}}
							/>

							{/**
							|--------------------------------------------------
							| New password
							|--------------------------------------------------
							*/}
							<InputField
								type="password"
								name="newPassword"
								label="New password"
								control={control}
								rules={{
									required: 'New password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
									validate: (value: string, formValues: Record<string, string>) =>
										value !== formValues.oldPassword ||
										'New password cannot be the same as the old password',
								}}
							/>
							<List
								gap=""
								type="unordered"
								textClassName="text-xs text-[#767676]"
								items={[
									'Min 8 characters',
									'At least 1 uppercase',
									'At least 1 special character (e.g &%$#*)',
									'At least 1 number',
								]}
							/>

							{/**
							|--------------------------------------------------
							| Confirm password
							|--------------------------------------------------
							*/}
							<InputField
								type="password"
								control={control}
								name="confirmPassword"
								label="Confirm new password"
								rules={{
									required: 'Please confirm your new password',
									validate: (value: string, formValues: Record<string, string>) =>
										value === formValues.newPassword || 'Passwords do not match',
								}}
							/>

							{/**
							|--------------------------------------------------
							| Submit
							|--------------------------------------------------
							*/}
							<MPButton
								isLoading={isPending}
								disabled={!isMatchPassword}
								useGradientBg={isMatchPassword}
								onPress={handleSubmit(onSubmit)}
								className="max-w-[152px] mx-auto mt-6"
							>
								<MPText
									weight="semibold"
									className={clsx('text-sm', isMatchPassword ? 'text-white' : 'text-gray-400')}
								>
									Change password
								</MPText>
							</MPButton>
						</Container>
					</FormWrapper>
				</View>
			</ScreenWrapper>
		</KeyboardAvoidingView>
	);
}
