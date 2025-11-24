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
import MPText from '@src/components/MPText';
import OTPInput from '@src/components/OtpInput';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';
import { clampFontSize, LOADER } from '@constants/app.constant';
import { useRequestOtp, useVerifyOtp } from '@services/auth.services';

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type VerifyPhoneNumberScreenProps = NativeStackNavigationProp<RootStackParamList, 'VerifyPhoneNumberScreen'>;

export default function VerifyPhoneNumberScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<VerifyPhoneNumberScreenProps>();

	const rotation = useSharedValue(0);
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { verificationData } = useUserStore();
	const { mutate, isPending } = useVerifyOtp('phone');
	const [countDown, setCountDown] = React.useState<number>(60);
	const { mutate: mutateRequestOtp, isPending: isPendingRequestOtp } = useRequestOtp('phone');

	/**
	|--------------------------------------------------
	|
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);

		/**
		|--------------------------------------------------
		| Counts down
		|--------------------------------------------------
		*/
		const interval = setInterval(() => {
			setCountDown((prevCount) => (prevCount !== 0 ? prevCount - 1 : 0));
		}, 1000);

		/**
		|--------------------------------------------------
		| Cleans up the function
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
			<HeaderWrapper useNavigation title="Verify Your Phone Number" />
			{/**
			|--------------------------------------------------
			| Subtext
			|--------------------------------------------------
			*/}
			<MPText fontSize="FONT14" weight="semibold" className="text-[16px] leading-6">
				Enter confirmation code
			</MPText>

			{/**
			|--------------------------------------------------
			| Text
			|--------------------------------------------------
			*/}
			<MPText className="text-[#767676]">
				<MPText fontSize="FONT14" weight="medium" className="text-[15px] leading-6">
					We sent a 6-digit code to {verificationData?.phoneNumber}.{' '}
				</MPText>
				<MPText
					weight="medium"
					fontSize="FONT14"
					onPress={() => navigation.goBack()}
					className="text-[15px] text-[#FF6A00]"
				>
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
					mutate({ otp: value, verificationType: 'phone', phoneNumber: verificationData?.phoneNumber });
				}}
			/>

			{/**
			|--------------------------------------------------
			| Text
			|--------------------------------------------------
			*/}
			<MPText className={clsx('text-[#767676]', countDown > 0 && 'pointer-events-none')}>
				<MPText fontSize="FONT14" weight="medium" className="text-[15px] leading-6">
					I didn’t get code.{' '}
				</MPText>
				<MPText
					weight="medium"
					fontSize="FONT14"
					className="text-[15px] text-[#FF6A00]"
					onPress={() => {
						mutateRequestOtp({ phoneNumber: verificationData?.phoneNumber, verificationType: 'phone' });
						setCountDown(60);
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
			<Modal transparent visible={isPending || isPendingRequestOtp}>
				<View className="h-full w-full flex-1 items-center justify-center bg-black/20">
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
