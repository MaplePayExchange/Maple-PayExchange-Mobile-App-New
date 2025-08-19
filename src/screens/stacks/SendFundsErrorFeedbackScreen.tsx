/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { clampFontSize, ERROR_BADGE, MONEY_PAD } from '@/constants/app.constant';

export default function SendFundsErrorFeedbackScreen() {
	/**
    |--------------------------------------------------
    |
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper useNavigation center title="Fund CAD Wallet" />

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			<View className="justify-center items-center flex-1">
				<Image
					source={ERROR_BADGE}
					style={{ width: clampFontSize(173, 100, 200), height: clampFontSize(171, 100, 200) }}
				/>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPText weight="semibold" className="text-[18px] mt-5">
					Wallet funding failed
				</MPText>
				<MPText weight="medium" className="text-[#767676] text-sm text-center">
					The name on the source account does not match your registration details. Third- party deposits are
					not accepted
				</MPText>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPButton useGradientBg className="mt-6" onPress={() => navigation.goBack()}>
					<MPText className="text-sm text-white" weight="semibold">
						Try again
					</MPText>
				</MPButton>
			</View>
		</ScreenWrapper>
	);
}
