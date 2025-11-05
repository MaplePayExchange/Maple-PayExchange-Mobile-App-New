/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { ROUTE_NAMES } from '@constants/routes.conts';
import { RootStackParamList } from '@types/route.params';
import { useForgotPassword } from '@services/auth.services';

const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type ForgotPasswordScreen = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
export default function ForgotPasswordScreen() {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation<ForgotPasswordScreen>();

	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [email, setEmail] = React.useState<string>('');
	const { mutate, isPending } = useForgotPassword(email);

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
    | Sumbit handler
    |--------------------------------------------------
    */
	const onSubmit = (data: any) => {
		setEmail(data.email);
		mutate({ email: data.email.trim().toLowerCase() });
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper title="Forgot Password" />
			<MPText weight="semibold" className="text-base">
				Reset password
			</MPText>
			<MPText weight="medium" className="text-[#484848] text-sm leading-5">
				Enter the email address you registered with.
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
                            | Email
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								name="email"
								label="Email"
								control={control}
								placeholder="Email address"
								rules={{
									required: { value: true, message: 'Email is required' },
									pattern: {
										value: emailPattern,
										message: 'Please enter a valid email address',
									},
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
								Reset password
							</MPText>
						</MPButton>

						{/**
                        |--------------------------------------------------
                        | Already have an account
                        |--------------------------------------------------
                        */}
						<MPText className="text-sm text-center mt-4">
							<MPText weight="medium" className="text-[#484848] text-sm">
								Remembered your password?{' '}
							</MPText>
							<MPText
								weight="semibold"
								className="text-[#FF6A00] text-sm"
								onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN, {})}
							>
								Login
							</MPText>
						</MPText>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
