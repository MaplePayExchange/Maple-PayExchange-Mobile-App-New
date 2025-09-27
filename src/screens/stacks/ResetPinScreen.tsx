/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import InputField from '@/src/components/InputField';
import { FormWrapper } from '@/src/components/FormWrapper';
import { useResetTransactionPin } from '@/services/auth.services';

export default function ResetPinScreen() {
	/**
    |--------------------------------------------------
    | API
    |--------------------------------------------------
    */
	const { mutate, isPending } = useResetTransactionPin();

	/**
    |--------------------------------------------------
    | Form handler
    |--------------------------------------------------
    */
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm({ defaultValues: { pin: '', password: '' } });

	/**
    |--------------------------------------------------
    | Sumbit handler
    |--------------------------------------------------
    */
	const onSubmit = async (data: any) => {
		mutate(data);
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper center title="Reset PIN" />

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			<FormWrapper>
				{/**
                |--------------------------------------------------
                | Password
                |--------------------------------------------------
                */}
				<InputField
					name="pin"
					type="text"
					maxLength={4}
					label="New PIN"
					control={control}
					placeholder="PIN"
					keyboardType="number-pad"
					rules={{
						required: { value: true, message: 'PIN is required' },
						minLength: { value: 4, message: 'PIN cannot be less than 4 digits long.' },
						maxLength: { value: 4, message: 'PIN cannot be more than 4 digits long.' },
					}}
				/>

				<View className="my-2" />

				{/**
                |--------------------------------------------------
                | Password
                |--------------------------------------------------
                */}
				<InputField
					type="password"
					name="password"
					label="Password"
					control={control}
					placeholder="Password"
					rules={{
						required: { value: true, message: 'Password is required' },
						minLength: { value: 8, message: 'Password cannot be less than 8 characters long.' },
					}}
				/>

				{/**
                |--------------------------------------------------
                | Button
                |--------------------------------------------------
                */}
				<MPButton
					isLoading={isPending}
					useGradientBg={isValid}
					onPress={handleSubmit(onSubmit)}
					disabled={!isValid || isPending}
					className="mt-10 max-w-[150px] mx-auto"
				>
					<MPText weight="semibold" className={clsx(isValid ? 'text-white' : 'text-[#D1D1D1] text-sm')}>
						Reset PIN
					</MPText>
				</MPButton>
			</FormWrapper>
		</ScreenWrapper>
	);
}
