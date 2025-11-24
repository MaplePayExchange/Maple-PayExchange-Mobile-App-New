/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { View, Image, Pressable } from 'react-native';
//@ts-ignore
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import Receipt from '@src/components/Receipt';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';
import { TransactionInterface } from '@interfaces/transaction.interface';
import { clampFontSize, SEND_FUNDS_FEEDBACK } from '@constants/app.constant';

type ExchangeFundsFeedbackScreenProps = RouteProp<RootStackParamList, 'ExchangeFundsFeedbackScreen'>;

export default function ExchangeFundsFeedbackScreen() {
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

	/**
	|--------------------------------------------------
	| Function to handle the download
	|--------------------------------------------------
	*/
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
			const uri = await viewShotRef.current.capture?.();
			if (!uri) return;

			/**
			|--------------------------------------------------
			| Save to filesystem using react-native-fs
			|--------------------------------------------------
			*/
			const fileName = `Receipt_${Date.now()}.png`;
			const path = `${RNFS.CachesDirectoryPath}/${fileName}`;
			await RNFS.copyFile(uri, path);

			/**
			|--------------------------------------------------
			| Share the actual PNG file
			|--------------------------------------------------
			*/
			await Share.open({
				url: 'file://' + path,
				type: 'image/png',
				title: 'Download Receipt',
				message: 'Here is your transaction receipt.',
				failOnCancel: false,
			});
		} catch (err) {
			console.error('Error generating receipt:', err);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	const route = useRoute<ExchangeFundsFeedbackScreenProps>();
	const params = route.params;

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
					Exchange successful!
				</MPText>
				<MPText weight="medium" className="text-[15px] text-[#767676]">
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
					<MPText className="text-[15px] text-white" weight="semibold">
						Back to wallet{' '}
					</MPText>
				</MPButton>

				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<MPButton useGradientBg className="mt-3 self-center">
					<Pressable
						onPress={handleDownload}
						className="h-[93%] w-[99%] items-center justify-center rounded-[40px] bg-white"
					>
						<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
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
