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
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';
import { clampFontSize, SEND_FUNDS_FEEDBACK } from '@/constants/app.constant';

type ExchangeFundsFeedbackScreenProps = RouteProp<RootStackParamList, 'ExchangeFundsFeedbackScreen'>;
export default function ExchangeFundsFeedbackScreen() {
	const route = useRoute<ExchangeFundsFeedbackScreenProps>();
	const params = route.params;

	console.log(params);

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
			<HeaderWrapper
				center
				useNavigation
				title="Fund CAD Wallet"
				onlClick={() => navigation.navigate('DashboardScreen' as never)}
			/>

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			<View className="justify-center items-center flex-1">
				<Image
					source={SEND_FUNDS_FEEDBACK}
					style={{ width: clampFontSize(173, 100, 200), height: clampFontSize(171, 100, 200) }}
				/>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPText weight="semibold" className="text-[18px] mt-4">
					Exchange successful!
				</MPText>
				<MPText weight="medium" className="text-[#767676] text-sm">
					Your wallet has been funded
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
						Back to wallet{' '}
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
							Download Receipt
						</MPText>
					</Pressable>
				</MPButton>
			</View>
		</ScreenWrapper>
	);
}
