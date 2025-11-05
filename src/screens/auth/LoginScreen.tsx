/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import {
	View,
	Modal,
	Keyboard,
	Platform,
	Pressable,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Image,
	Linking,
} from 'react-native';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//@ts-ignore
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import utils from '@lib/utils';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import { useLogin } from '@services/auth.services';
import InputField from '@src/components/InputField';
import ScreenWrapper from '@src/components/Wrapper';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useBiometricAuth } from '@hooks/useBiometrics';
import { VERSION_IMAGE } from '@constants/app.constant';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';
import { getDeviceHardwareId } from '@hooks/getDeviceHardwareId';
import usePushNotification from '@src/hooks/useGetPushNotification';

const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
type LoginProps = RouteProp<RootStackParamList, 'LoginScreen'>;
export default function LoginScreen() {
	const route = useRoute<LoginProps>();

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
	const { getPushToken } = usePushNotification();
	const [token, setPushToken] = React.useState<string | null>(null);
	const { authenticate } = useBiometricAuth();
	const [versionResponse, setVersionResponse] = React.useState<{
		version: string;
		updateType: string;
		iosUpdateUrl: string;
		updateRequired: boolean;
		androidUpdateUrl: string;
	} | null>(null);
	const { isRegistered, biometricsInfo, isLoggedIn, userData, isSessionExpired } = useUserStore();

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
			os: response?.osName,
			brand: response?.brand,
			pushToken: token as any,
			osName: response?.osName,
			deviceId: deviceId as string,
			password: data.password.trim(),
			osVersion: response?.osVersion,
			deviceType: response?.deviceType,
			deviceName: response?.deviceName,
			email: data.email.trim().toLowerCase(),
		});
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
			pushToken: token as any,
			osName: response?.osName,
			deviceId: deviceId as string,
			osVersion: response?.osVersion,
			deviceType: response?.deviceType,
			deviceName: response?.deviceName,
			password: biometricsInfo?.password?.trim() as string,
			email: biometricsInfo?.email?.trim().toLowerCase() as string,
		});
	};

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	navigation.addListener('focus', async () => {
		const token = await getPushToken();
		console.log(token, 'token');
		setPushToken(token);
		const response = await utils.checkAppStoreUpdate();
		setVersionResponse(response);

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		if (isSessionExpired === true && isRegistered === true && !userData && !isLoggedIn) {
			utils.errorHandler(undefined, 'Your session has expired, for security reasons, please sign in again.');
		}
	});

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
							<MPText weight="semibold" className="text-sm text-[#FF6A00]">
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
								className={clsx(isValid ? 'text-white' : 'text-sm text-[#D1D1D1]')}
							>
								Continue
							</MPText>
						</MPButton>

						{/**
						|--------------------------------------------------
						| Already have an account
						|--------------------------------------------------
						*/}
						<MPText className="mt-4 text-center text-sm">
							<MPText weight="semibold" className="text-sm text-[#484848]">
								Are you a new user?{' '}
							</MPText>
							<MPText
								weight="semibold"
								className="text-sm text-[#FF6A00]"
								onPress={() => navigation.navigate(ROUTE_NAMES.PHONE_VERIFICATION)}
							>
								{' '}
								Create an account
							</MPText>
						</MPText>

						{biometricsInfo?.isTurnedOn && biometricsInfo.email && biometricsInfo.password && (
							<Pressable onPress={handleUserBiometrics} className="mt-10 self-center">
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

			{/**
			|--------------------------------------------------
			| Modal for updating application
			|--------------------------------------------------
			*/}
			<Modal visible={versionResponse?.updateRequired || false} animationType="slide">
				<View className="relative mb-48 flex-1 bg-white p-4">
					<SafeAreaView>
						{/**
						|--------------------------------------------------
						| Close icon
						|--------------------------------------------------
						*/}
						{versionResponse?.updateType === 'OPTIONAL' && (
							<Pressable
								onPress={() => setVersionResponse(null)}
								className="size-8 items-center justify-center rounded-full bg-slate-50"
							>
								<Svg width={14} height={14} viewBox="0 0 24 24">
									<Path
										d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
										fill={'#000000'}
									/>
								</Svg>
							</Pressable>
						)}

						{/**
						|--------------------------------------------------
						| Badge
						|--------------------------------------------------
						*/}
						<Image
							width={179}
							height={201}
							source={VERSION_IMAGE}
							className="mt-[50%] h-[201px] w-[179px] self-center"
						/>

						{/**
						|--------------------------------------------------
						| Update text
						|--------------------------------------------------
						*/}
						<View className="mx-auto mt-[25%] max-w-[320px] items-center gap-2">
							<MPText weight="semibold" className="text-[18px] text-black">
								New update is available
							</MPText>

							<MPText className="text-center text-sm text-[#707070]" weight="medium">
								A new version of MPExchange is available. Please update to get the latest version
							</MPText>
						</View>

						{/**
						|--------------------------------------------------
						| Update button
						|--------------------------------------------------
						*/}
						<MPButton
							onPress={() => {
								Linking.openURL(
									Platform.OS === 'android'
										? versionResponse?.androidUpdateUrl || 'https://play.google.com/store/apps'
										: versionResponse?.iosUpdateUrl || 'https://www.apple.com/store'
								);
							}}
							useGradientBg
							className="mx-auto mt-8 max-w-[200px]"
						>
							<MPText weight="semibold" className="text-sm text-white">
								Update now
							</MPText>
						</MPButton>

						{/**
						|--------------------------------------------------
						| Version
						|--------------------------------------------------
						*/}
						<MPText weight="regular" className="mt-2 text-center text-xs text-[#707070]">
							Version {versionResponse?.version}
						</MPText>
					</SafeAreaView>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
