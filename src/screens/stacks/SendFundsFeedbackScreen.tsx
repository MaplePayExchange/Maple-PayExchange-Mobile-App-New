/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { RootStackParamList } from '@types/route.params';
import { clampFontSize, SEND_FUNDS_FEEDBACK } from '@constants/app.constant';

type FeedbackScreenProps = RouteProp<RootStackParamList, 'SendFundsFeedbackScreen'>;
export default function SendFundsFeedbackScreen() {
	const route = useRoute<FeedbackScreenProps>();
	const params = route.params;

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
					source={SEND_FUNDS_FEEDBACK}
					style={{ width: clampFontSize(173, 100, 200), height: clampFontSize(171, 100, 200) }}
				/>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPText weight="semibold" className="mt-4 text-[18px]">
					Wallet funding complete
				</MPText>
				<MPText weight="medium" className="text-[15px] text-[#767676]">
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
					<MPText className="text-[15px] text-white" weight="semibold">
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
					className="mt-3 self-center"
					onPress={() => navigation.navigate('DashboardScreen' as never)}
				>
					<Pressable className="h-[93%] w-[99%] items-center justify-center rounded-[40px] bg-white">
						<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
							Exchange funds
						</MPText>
					</Pressable>
				</MPButton>
			</View>
		</ScreenWrapper>
	);
}
