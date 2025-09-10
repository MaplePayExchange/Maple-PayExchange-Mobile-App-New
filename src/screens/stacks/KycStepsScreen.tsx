/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { View, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PermissionStatus, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';
import { useStartVeriffSession } from '@/services/auth.services';
import { clampFontSize, MONEY_PAD } from '@/constants/app.constant';

type KycStepsScreenProps = NativeStackNavigationProp<RootStackParamList, 'KycStepsScreen'>;
export default function KysStepsScreen() {
	const route = useRoute();
	const params = route.params as any;

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<KycStepsScreenProps>();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [status, requestPermission] = useCameraPermissions();
	const { mutate, isPending, data } = useStartVeriffSession();
	const [showBrowser, setShowBrowser] = React.useState<boolean>(false);
	const redirectUrl = 'https://maple-server-new.vercel.app/auth/callback';

	/**
	|--------------------------------------------------
	| State to determine when the browser shows up
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (data?.veriffUrl) setShowBrowser(true);
		if (status?.status !== PermissionStatus.GRANTED) {
			requestPermission();
		}
	}, [data, status]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			{!showBrowser && (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="">
						<View className="items-center mt-6">
							<Image
								width={195}
								height={197}
								source={MONEY_PAD}
								style={{ width: clampFontSize(195, 90, 380), height: clampFontSize(197, 93, 387) }}
							/>
						</View>

						{/**
						|--------------------------------------------------
						| Heading text
						|--------------------------------------------------
						*/}
						<MPText
							weight="semibold"
							style={{ fontSize: 24, lineHeight: 32 }}
							className="text-[24px] text-[#1A1A1A] mt-8"
						>
							Almost there!
						</MPText>
						<MPText
							weight="semibold"
							style={{ fontSize: 24, lineHeight: 32 }}
							className="text-[24px] text-[#1A1A1A]"
						>
							Verify your identity to start using MPExchange
						</MPText>

						{/**
						|--------------------------------------------------
						| Subtext
						|--------------------------------------------------
						*/}
						<MPText weight="medium" className="text-sm leading-5 mt-4 text-[#767676]">
							This is a legal requirement, and verification protects you from fraud and identity theft.
						</MPText>

						{/**
						|--------------------------------------------------
						| Next steps
						|--------------------------------------------------
						*/}
						<MPText weight="medium" className="text-sm leading-5 mt-10 text-[#767676]">
							The next step will require you to take a picture of your government issued ID and your face
							(liveness test). Examples of ID include:
						</MPText>

						{/**
						|--------------------------------------------------
						| Identities
						|--------------------------------------------------
						*/}
						<View className="mt-1 mb-12">
							{/**
							|--------------------------------------------------
							| Passport
							|--------------------------------------------------
							*/}
							<View className="flex-row gap-1 items-center">
								<Entypo name="dot-single" size={16} color="black" />
								<MPText className="text-sm leading-5 text-[#767676]">International passport</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| Drivers license
							|--------------------------------------------------
							*/}
							<View className="flex-row gap-1 items-center">
								<Entypo name="dot-single" size={16} color="black" />
								<MPText className="text-sm leading-5 text-[#767676]">Driver’s license</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| PR card
							|--------------------------------------------------
							*/}
							<View className="flex-row gap-1 items-center">
								<Entypo name="dot-single" size={16} color="black" />
								<MPText className="text-sm leading-5 text-[#767676]">PR card</MPText>
							</View>
						</View>

						{/**
						|--------------------------------------------------
						| Action buttons
						|--------------------------------------------------
						*/}
						<View className="mt-[5%] justify-end">
							{/**
							|--------------------------------------------------
							| Starts the veriff process
							|--------------------------------------------------
							*/}
							<MPButton
								useGradientBg
								isLoading={isPending}
								onPress={() => mutate({ email: params?.email as any })}
							>
								<MPText weight="semibold" className="text-white text-sm">
									Start
								</MPText>
							</MPButton>

							{/**
							|--------------------------------------------------
							| Takes the user to the login screen
							|--------------------------------------------------
							*/}
							<MPButton onPress={() => navigation.goBack()}>
								<MPText weight="semibold" className="text-[#EE0979] text-sm">
									I’ll do this later
								</MPText>
							</MPButton>
						</View>
					</View>
				</ScrollView>
			)}

			{/**
			|--------------------------------------------------
			| Webview
			|--------------------------------------------------
			*/}
			{showBrowser && (
				<View style={{ flex: 1 }}>
					<WebView
						useWebView2
						javaScriptEnabled={true}
						domStorageEnabled={true}
						startInLoadingState={true}
						source={{ uri: data?.veriffUrl }}
						onNavigationStateChange={(event) => {
							/**
							|--------------------------------------------------
							| Detect redirect
							|--------------------------------------------------
							*/
							if (event.url.startsWith(redirectUrl)) {
								setShowBrowser(false);
								navigation.navigate('DashboardScreen');
							}
						}}
						mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
					/>
				</View>
			)}
		</ScreenWrapper>
	);
}
