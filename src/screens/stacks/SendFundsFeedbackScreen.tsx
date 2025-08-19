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
import { clampFontSize, MONEY_PAD } from '@/constants/app.constant';

export default function SendFundsFeedbackScreen() {
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
					source={MONEY_PAD}
					style={{ width: clampFontSize(173, 100, 200), height: clampFontSize(171, 100, 200) }}
				/>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPText weight="semibold" className="text-[18px] mt-4">
					Wallet funding complete
				</MPText>
				<MPText weight="medium" className="text-[#767676] text-sm">
					Your wallet funding request was successful
				</MPText>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPButton
					useGradientBg
					className="mt-6"
					onPress={() => navigation.navigate('DashboardScreen' as never)}
				>
					<MPText className="text-sm text-white" weight="semibold">
						Send funds
					</MPText>
				</MPButton>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPButton
					useGradientBg
					className="self-center mt-3"
					onPress={() => navigation.navigate('DashboardScreen' as never)}
				>
					<Pressable className="bg-white w-[99%] h-[93%] rounded-[40px] justify-center items-center">
						<MPText weight="semibold" className="text-sm text-[#FF6A00]">
							Exchange funds
						</MPText>
					</Pressable>
				</MPButton>
			</View>
		</ScreenWrapper>
	);
}
