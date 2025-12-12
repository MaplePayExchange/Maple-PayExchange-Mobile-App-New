/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Image, Modal, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { SUCCESS_BADGE } from '@constants/app.constant';
//@ts-ignore
import { ROUTE_NAMES } from '@constants/routes.conts';
import { RootStackParamList } from '@constants/route.params';
import CustomKeyboard from '@src/components/CustomKeyboard';
import { useSetTransactionPin } from '@services/auth.services';

type SetTransactionPinScreenProps = NativeStackNavigationProp<RootStackParamList, 'SetTransactionPinScreen'>;

export default function SetTransactionPinScreen() {
	const route = useRoute();
	const params = route.params as any;

	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation<SetTransactionPinScreenProps>();

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { mutate, isSuccess } = useSetTransactionPin();
	const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| Checks if the set pin was successful and shows a
	| modal
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (isSuccess) setShowSuccessModal(true);
	}, [isSuccess]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper
				title="Set Transaction Pin"
				titleFontSize="FONT24"
				onlClick={() => {
					if (params?.isLastStep === true) navigation.navigate('TabNavigation');
					else navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN);
				}}
			/>

			{/**
            |--------------------------------------------------
            | Sub text
            |--------------------------------------------------
            */}
			<View className="mb-8 mt-6 items-center">
				<MPText fontSize="FONT16" weight="semibold" className="text-center text-base" style={{ fontSize: 18 }}>
					Create PIN
				</MPText>
				<MPText
					weight="medium"
					fontSize="FONT14"
					className="mt-2 max-w-[280px] text-center text-[15px] leading-5 text-[#484848]"
				>
					This PIN will serve as confirmation for transactions on MaplePay.
				</MPText>
			</View>

			{/**
            |--------------------------------------------------
            | Keyboard and input box
            |--------------------------------------------------
            */}
			<CustomKeyboard
				length={4}
				onComplete={(value) => {
					console.log(value);
					mutate({ pin: value });
				}}
			/>

			{/**
            |--------------------------------------------------
            | Modal
            |--------------------------------------------------
            */}
			<Modal visible={showSuccessModal} animationType="slide">
				<View className="flex-1 items-center justify-center p-6">
					<Image source={SUCCESS_BADGE} />

					{/**
                    |--------------------------------------------------
                    | Title and subtitle
                    |--------------------------------------------------
                    */}
					<MPText fontSize="FONT18" weight="semibold" className="mt-8 text-xl">
						{params?.isLastStep === true ? 'You’re all set!' : 'You are almost all set!'}
					</MPText>
					<MPText fontSize="FONT14" weight="medium" className="text-[15px]">
						You have successfully set up your pin.
					</MPText>

					{/**
                    |--------------------------------------------------
                    | Action button
                    |--------------------------------------------------
                    */}
					<MPButton
						useGradientBg
						className="mt-6"
						onPress={() => {
							setShowSuccessModal(false);

							if (params?.isLastStep === true) navigation.navigate('TabNavigation');
							else navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN as never);
						}}
					>
						<MPText fontSize="FONT14" className="text-[15px] text-white" weight="semibold">
							{params?.isLastStep === true ? 'Go to dashboard' : 'Continue'}
						</MPText>
					</MPButton>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
