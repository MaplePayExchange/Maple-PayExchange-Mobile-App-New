/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { WebView } from 'react-native-webview';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Image, ScrollView, Platform, Pressable } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { CloseIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { RootStackParamList } from '@constants/route.params';
import { useStartVeriffSession } from '@services/auth.services';
import { clampFontSize, MONEY_PAD } from '@constants/app.constant';
import { useCameraPermission } from '@src/hooks/useCameraPermission';

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
	const queryClient = useQueryClient();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { mutate, isPending, data } = useStartVeriffSession();
	const [showBrowser, setShowBrowser] = React.useState<boolean>(false);
	const redirectUrl = 'https://maple-server-new.vercel.app/auth/callback';

	/**
	|--------------------------------------------------
	| Permissions
	|--------------------------------------------------
	*/
	const ensureCameraAccess = useCameraPermission();

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		(async () => {
			try {
				/**
				|--------------------------------------------------
				| If there’s a veriffUrl, show the browser once
				|--------------------------------------------------
				*/
				const allowed = await ensureCameraAccess();
				await new Promise((resolve) => setTimeout(resolve, 600));

				console.log(allowed, 'allowed');

				/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/
				if (allowed && data?.veriffUrl) {
					setShowBrowser(true);
				}
			} catch (err) {
				console.error('Error requesting camera permission:', err);
			}
		})();
	}, [data?.veriffUrl]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className="h-[100%] bg-white px-6">
			<SafeAreaView />
			{!showBrowser && (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ height: '105%', paddingBottom: 64 }}
				>
					<View className="h-[100%]">
						{/**
						|--------------------------------------------------
						| Close icon
						|--------------------------------------------------
						*/}
						<Pressable
							className="absolute left-0"
							onPress={() => navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN)}
						>
							<CloseIcon />
						</Pressable>

						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<View className="mt-6 items-center">
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
							fontSize="FONT24"
							weight="semibold"
							style={{ fontSize: 24, lineHeight: 32 }}
							className="mt-8 text-[24px] text-[#1A1A1A]"
						>
							Almost there!
						</MPText>
						<MPText
							fontSize="FONT24"
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
						<MPText
							weight="medium"
							fontSize="FONT14"
							style={{ lineHeight: 24 }}
							className="mt-4 text-[15px] leading-5 text-[#767676]"
						>
							This is a legal requirement, and verification protects you from fraud and identity theft.
						</MPText>

						{/**
						|--------------------------------------------------
						| Next steps
						|--------------------------------------------------
						*/}
						<MPText
							weight="medium"
							fontSize="FONT14"
							style={{ lineHeight: 24 }}
							className="mt-10 text-[15px] leading-5 text-[#767676]"
						>
							The next step will require you to take a picture of your government issued ID and your face
							(liveness test). Examples of ID include:
						</MPText>

						{/**
						|--------------------------------------------------
						| Identities
						|--------------------------------------------------
						*/}
						<View className="mb-12 mt-8">
							{/**
							|--------------------------------------------------
							| Passport
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-1">
								<MPText>-</MPText>
								<MPText className="text-[15px] leading-5 text-[#767676]">International passport</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| Drivers license
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-1">
								<MPText>-</MPText>
								<MPText className="text-[15px] leading-5 text-[#767676]">Driver’s license</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| PR card
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-1">
								<MPText>-</MPText>
								<MPText className="text-[15px] leading-5 text-[#767676]">PR card</MPText>
							</View>
						</View>

						{/**
						|--------------------------------------------------
						| Action buttons
						|--------------------------------------------------
						*/}
						<View className="mt-auto">
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
								<MPText weight="semibold" className="text-[15px] text-white">
									Start
								</MPText>
							</MPButton>

							{/**
							|--------------------------------------------------
							| Takes the user to the login screen
							|--------------------------------------------------
							*/}
							<MPButton onPress={() => navigation.navigate('TabNavigation')}>
								<MPText weight="semibold" className="text-[15px] text-[#EE0979]">
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
						cacheEnabled={false}
						javaScriptEnabled={true}
						domStorageEnabled={true}
						cacheMode="LOAD_NO_CACHE"
						startInLoadingState={true}
						allowsInlineMediaPlayback
						allowsCameraCapture={true}
						allowsMicrophoneCapture={true}
						source={{ uri: data?.veriffUrl }}
						mediaPlaybackRequiresUserAction={false}
						originWhitelist={['*']}
						mixedContentMode="always"
						webViewConfiguration={{
							allowsInlineMediaPlayback: true,
							mediaTypesRequiringUserAction: [],
						}}
						onPermissionRequest={(event: any) => {
							console.log(event);
							if (Platform.OS === 'android') {
								event.grant();
							}
						}}
						onNavigationStateChange={(event) => {
							/**
							 |--------------------------------------------------
							 | Detect redirect
							 |--------------------------------------------------
							 */
							if (event.url.startsWith(redirectUrl)) {
								setShowBrowser(false);
								queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });

								/**
								|--------------------------------------------------
								| ...
								|--------------------------------------------------
								*/
								if (params?.isLastStep === true) navigation.navigate('TabNavigation');
								else navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN);
							}
						}}
						mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
					/>
				</View>
			)}
		</View>
	);
}
