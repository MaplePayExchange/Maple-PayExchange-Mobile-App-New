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
import utils from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import { useLogin } from '@/services/auth.services';
import InputField from '@/src/components/InputField';
import ScreenWrapper from '@/src/components/Wrapper';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { useBiometricAuth } from '@/hooks/useBiometrics';
import { RootStackParamList } from '@/types/route.params';
import { getDeviceHardwareId } from '@/hooks/getDeviceHardwareId';
import usePushNotifications from '@/src/hooks/useGetPushToken';

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
	const pustToken = usePushNotifications();
	const { authenticate } = useBiometricAuth();
	const { setBiometricsInfo, biometricsInfo } = useUserStore();

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
		const response = await utils.getDeviceInfo();
		mutate({
			email: data.email,
			os: response?.osName,
			brand: response?.brand,
			password: data.password,
			osName: response?.osName,
			pushToken: pustToken as any,
			deviceId: deviceId as string,
			osVersion: response?.osVersion,
			deviceType: response?.deviceType,
			deviceName: response?.deviceName,
		});
		setBiometricsInfo({ ...biometricsInfo, password: data.password, email: data.email });
	};

	/**
	|--------------------------------------------------
	| Using biometrics
	|--------------------------------------------------
	*/
	const handleUserBiometrics = async () => {
		/**
		|--------------------------------------------------
		| authenticate
		|--------------------------------------------------
		*/
		const auth = await authenticate();

		/**
		|--------------------------------------------------
		| If error
		|--------------------------------------------------
		*/
		if (auth.error) {
			utils.errorHandler(undefined, 'Device authentication failed!');
			return;
		}

		const deviceId = await getDeviceHardwareId();
		const response = await utils.getDeviceInfo();

		mutate({
			os: response?.osName,
			brand: response?.brand,
			osName: response?.osName,
			pushToken: pustToken as any,
			deviceId: deviceId as string,
			osVersion: response?.osVersion,
			deviceType: response?.deviceType,
			deviceName: response?.deviceName,
			email: biometricsInfo?.email as string,
			password: biometricsInfo?.password as string,
		});
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper useNavigation={false} title="Welcome Back!" subtitle="Login to your account" />

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
						<Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')} className="mt-2">
							<MPText weight="semibold" className="text-[#FF6A00] text-sm">
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
							<MPText weight="semibold" className="text-[#484848] text-sm">
								Are you a new user?{' '}
							</MPText>
							<MPText
								weight="semibold"
								className="text-[#FF6A00] text-sm"
								onPress={() => navigation.navigate(ROUTE_NAMES.PHONE_VERIFICATION)}
							>
								{' '}
								Create an account
							</MPText>
						</MPText>

						{biometricsInfo?.isTurnedOn && biometricsInfo.email && biometricsInfo.password && (
							<Pressable onPress={handleUserBiometrics} className="self-center mt-10">
								<Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
									<Rect width="56" height="56" rx="28" fill="#F5F5F5" />
									<Path
										d="M24.658 16.9165C21.5474 16.9874 19.7305 17.2835 18.4891 18.5206C17.4026 19.6033 17.0394 21.1253 16.918 23.5665M31.3446 16.9165C34.4552 16.9874 36.2721 17.2835 37.5136 18.5206C38.6 19.6033 38.9632 21.1253 39.0846 23.5665M31.3446 39.0832C34.4552 39.0123 36.2721 38.7162 37.5136 37.4791C38.6 36.3964 38.9632 34.8743 39.0846 32.4332M24.658 39.0832C21.5474 39.0123 19.7305 38.7162 18.4891 37.4791C17.4026 36.3964 17.0394 34.8743 16.918 32.4332"
										stroke="url(#paint0_linear_1461_9842)"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<Path
										d="M23.333 33.8333C25.4779 30.8054 30.4715 30.6401 32.6663 33.8333M30.9163 25.0833C30.9163 26.6941 29.6105 28 27.9997 28C26.3888 28 25.083 26.6941 25.083 25.0833C25.083 23.4725 26.3888 22.1666 27.9997 22.1666C29.6105 22.1666 30.9163 23.4725 30.9163 25.0833Z"
										stroke="url(#paint1_linear_1461_9842)"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
									<Defs>
										<LinearGradient
											id="paint0_linear_1461_9842"
											x1="28.0013"
											y1="16.9165"
											x2="28.0013"
											y2="39.0832"
											gradientUnits="userSpaceOnUse"
										>
											<Stop stopColor="#EE0979" />
											<Stop offset="1" stopColor="#FF6A00" />
										</LinearGradient>
										<LinearGradient
											id="paint1_linear_1461_9842"
											x1="27.9997"
											y1="22.1666"
											x2="27.9997"
											y2="33.8333"
											gradientUnits="userSpaceOnUse"
										>
											<Stop stopColor="#EE0979" />
											<Stop offset="1" stopColor="#FF6A00" />
										</LinearGradient>
									</Defs>
								</Svg>
							</Pressable>
						)}
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
