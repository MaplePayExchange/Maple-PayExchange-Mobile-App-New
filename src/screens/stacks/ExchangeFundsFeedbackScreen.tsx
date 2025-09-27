/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system/legacy';
import { View, Image, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import Receipt from '@/src/components/Receipt';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';
import { TransactionInterface } from '@/interfaces/transaction.interface';
import { clampFontSize, SEND_FUNDS_FEEDBACK } from '@/constants/app.constant';

type ExchangeFundsFeedbackScreenProps = RouteProp<RootStackParamList, 'ExchangeFundsFeedbackScreen'>;
export default function ExchangeFundsFeedbackScreen() {
	const route = useRoute<ExchangeFundsFeedbackScreenProps>();
	const params = route.params;

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const viewShotRef = React.useRef<ViewShot>(null);

	/**
    |--------------------------------------------------
    |
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	const handleDownload = async () => {
		try {
			if (!viewShotRef.current) {
				console.warn('Receipt component not rendered yet');
				return;
			}

			/**
			|--------------------------------------------------
			| Capture the receipt component as PNG
			|--------------------------------------------------
			*/
			const uri = await viewShotRef?.current?.capture?.();

			/**
			|--------------------------------------------------
			| Save to filesystem using expo-file-system
			|--------------------------------------------------
			*/
			const fileName = `Receipt_${Date.now()}.png`;
			const path = `${FileSystem.documentDirectory}${fileName}`;
			await FileSystem.copyAsync({ from: uri as string, to: path });

			/**
			|--------------------------------------------------
			| Share it using expo-sharing
			|--------------------------------------------------
			*/
			await Sharing.shareAsync(path, { mimeType: 'image/png', dialogTitle: 'Download Receipt' });
		} catch (err) {
			console.error('Error generating receipt:', err);
		}
	};

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
				<MPButton useGradientBg className="self-center mt-3" onPress={handleDownload}>
					<Pressable className="bg-white w-[99%] h-[93%] rounded-[40px] justify-center items-center">
						<MPText weight="semibold" className="text-sm text-[#FF6A00]">
							Download Receipt
						</MPText>
					</Pressable>
				</MPButton>

				{/**
				|--------------------------------------------------
				| Action buttons
				|--------------------------------------------------
				*/}
				<ViewShot
					ref={viewShotRef}
					options={{ format: 'jpg', quality: 1 }}
					style={{ position: 'absolute', bottom: -999999 }}
				>
					<Receipt transaction={params as TransactionInterface} />
				</ViewShot>
			</View>
		</ScreenWrapper>
	);
}
