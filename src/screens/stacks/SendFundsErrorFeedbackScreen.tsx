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
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { clampFontSize, ERROR_BADGE } from '@constants/app.constant';

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
			<View className="flex-1 items-center justify-center">
				<Image
					source={ERROR_BADGE}
					style={{ width: clampFontSize(173, 100, 200), height: clampFontSize(171, 100, 200) }}
				/>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPText weight="semibold" className="mt-5 text-[18px]">
					Wallet funding failed
				</MPText>
				<MPText weight="medium" className="text-center text-[15px] text-[#767676]">
					Please try again
				</MPText>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPButton useGradientBg className="mt-6" onPress={() => navigation.goBack()}>
					<MPText className="text-[15px] text-white" weight="semibold">
						Try again
					</MPText>
				</MPButton>
			</View>
		</ScreenWrapper>
	);
}
