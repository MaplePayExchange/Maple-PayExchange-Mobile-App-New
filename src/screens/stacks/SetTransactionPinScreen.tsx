/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useNavigation } from 'expo-router';
import { Image, Modal, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { SUCCESS_BADGE } from '@/constants/app.constant';
import { RootStackParamList } from '@/types/route.params';
import CustomKeyboard from '@/src/components/CustomKeyboard';
import { useSetTransactionPin } from '@/services/auth.services';

type SetTransactionPinScreenProps = NativeStackNavigationProp<RootStackParamList, 'SetTransactionPinScreen'>;

export default function SetTransactionPinScreen() {
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
	const { mutate, isPending, isSuccess } = useSetTransactionPin();
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
			<HeaderWrapper title="Set Transaction Pin" />

			{/**
            |--------------------------------------------------
            | Sub text
            |--------------------------------------------------
            */}
			<View className="items-center mt-6 mb-8">
				<MPText weight="semibold" className="text-base text-center" style={{ fontSize: 18 }}>
					Create PIN
				</MPText>
				<MPText weight="medium" className="text-[#484848] text-center max-w-[280px] text-sm leading-5 mt-2">
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
				<View className="flex-1 justify-center items-center">
					<Image source={SUCCESS_BADGE} />

					{/**
                    |--------------------------------------------------
                    | Title and subtitle
                    |--------------------------------------------------
                    */}
					<MPText weight="semibold" className="text-xl mt-8">
						You’re all set!
					</MPText>
					<MPText weight="medium" className="text-sm">
						You have successfully set up your pin.
					</MPText>

					{/**
                    |--------------------------------------------------
                    | Action button
                    |--------------------------------------------------
                    */}
					<MPButton
						useGradientBg
						className="max-w-[142px] mt-6"
						onPress={() => {
							setShowSuccessModal(false);
							navigation.navigate('DashboardScreen');
						}}
					>
						<MPText className="text-white text-sm" weight="semibold">
							Go to dashboard
						</MPText>
					</MPButton>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
