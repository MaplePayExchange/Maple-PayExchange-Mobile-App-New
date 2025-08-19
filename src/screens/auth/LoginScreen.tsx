/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import {
	View,
	Keyboard,
	Platform,
	Pressable,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import { useLogin } from '@/services/auth.services';
import InputField from '@/src/components/InputField';
import ScreenWrapper from '@/src/components/Wrapper';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { getDeviceHardwareId } from '@/hooks/getDeviceHardwareId';

const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
export default function LoginScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<LoginScreenProps>();

	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { mutate, isPending } = useLogin();

	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm();

	/**
	|--------------------------------------------------
	| Sumbit handler
	|--------------------------------------------------
	*/
	const onSubmit = async (data: any) => {
		const deviceId = await getDeviceHardwareId();
		mutate({ password: data.password, email: data.email, deviceId: deviceId as string });
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper title="Welcome Back!" subtitle="Login to your account" />

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
								placeholder="Enter password"
								rules={{
									required: { value: true, message: 'Email is required' },
									minLength: {
										value: 8,
										message: 'Password must be atleast 8 characters',
									},
								}}
							/>
						</View>
						<Pressable>
							<MPText weight="semibold" className="text-[#FF6A00]">
								Forgot password?
							</MPText>
						</Pressable>

						{/**
						|--------------------------------------------------
						| Button
						|--------------------------------------------------
						*/}
						<MPButton
							className="mt-6"
							isLoading={isPending}
							useGradientBg={isValid}
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isPending}
						>
							<MPText
								weight="semibold"
								className={clsx(isValid ? 'text-white' : 'text-[#D1D1D1] text-sm')}
							>
								Continue
							</MPText>
						</MPButton>

						{/**
						|--------------------------------------------------
						| Already have an account
						|--------------------------------------------------
						*/}
						<MPText className="text-sm text-center mt-4">
							<MPText weight="semibold" className="text-[#484848]">
								Are you a new user?{' '}
							</MPText>
							<MPText
								weight="semibold"
								className="text-[#FF6A00]"
								onPress={() => navigation.navigate(ROUTE_NAMES.PHONE_VERIFICATION)}
							>
								Create an account
							</MPText>
						</MPText>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
