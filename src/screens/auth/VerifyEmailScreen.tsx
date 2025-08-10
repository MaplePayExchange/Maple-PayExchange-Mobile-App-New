/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Image, Modal, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import OTPInput from '@/src/components/OtpInput';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';
import { clampFontSize, LOADER } from '@/constants/app.constant';
import { useRequestOtp, useVerifyOtp } from '@/services/auth.services';

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type VerifyEmailScreenProps = NativeStackNavigationProp<RootStackParamList, 'VerifyPhoneNumberScreen'>;
export default function VerifyEmailScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<VerifyEmailScreenProps>();

	const rotation = useSharedValue(0);
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { verificationData } = useUserStore();
	const { mutate, isPending } = useVerifyOtp('email');
	const [countDown, setCountDown] = React.useState<number>(30);
	const { mutate: mutateRequestOtp, isPending: isPendingOtp } = useRequestOtp('email');

	/**
	|--------------------------------------------------
	|
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);

		/**
		|--------------------------------------------------
		| Interval
		|--------------------------------------------------
		*/
		const interval = setInterval(() => {
			setCountDown(countDown - 1);
		}, 1000);

		/**
		|--------------------------------------------------
		| Clean up
		|--------------------------------------------------
		*/
		return () => clearInterval(interval);
	}, []);

	/**
	|--------------------------------------------------
	| Convert rotation to style
	|--------------------------------------------------
	*/
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper useNavigation title="Verify Your Email" />
			{/**
			|--------------------------------------------------
			| Subtext
			|--------------------------------------------------
			*/}
			<MPText weight="semibold" className="text-[16px] leading-6">
				Enter confirmation code
			</MPText>

			{/**
			|--------------------------------------------------
			| Text
			|--------------------------------------------------
			*/}
			<MPText className="text-[#767676]">
				<MPText weight="medium" className="text-sm leading-6">
					We sent a 6-digit code to {verificationData?.email}.{' '}
				</MPText>
				<MPText onPress={() => navigation.goBack()} weight="medium" className="text-sm text-[#FF6A00]">
					Change
				</MPText>
			</MPText>

			{/**
			|--------------------------------------------------
			| Otp field
			|--------------------------------------------------
			*/}
			<OTPInput
				length={6}
				className="my-6"
				onComplete={(value) => {
					mutate({ otp: value, verificationType: 'email', email: verificationData?.email });
				}}
			/>

			{/**
			|--------------------------------------------------
			| Text
			|--------------------------------------------------
			*/}
			<MPText className={clsx('text-[#767676]', countDown > 0 && 'pointer-events-none')}>
				<MPText weight="medium" className="text-sm leading-6">
					I didn’t get code.{' '}
				</MPText>
				<MPText
					weight="medium"
					className="text-sm text-[#FF6A00]"
					onPress={() => {
						mutateRequestOtp({
							verificationType: 'email',
							sessionId: verificationData?.sessionId,
							email: verificationData?.email?.trim().toLowerCase(),
						});
					}}
				>
					Resend {countDown}
				</MPText>
			</MPText>

			{/**
			|--------------------------------------------------
			| Modal Overlay
			|--------------------------------------------------
			*/}
			<Modal transparent visible={isPending}>
				<View className="h-full flex-1 w-full items-center justify-center bg-black/20">
					<Animated.View style={animatedStyle}>
						<Image
							source={LOADER}
							style={{ height: clampFontSize(24, 17, 51), width: clampFontSize(24, 17, 51) }}
						/>
					</Animated.View>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
