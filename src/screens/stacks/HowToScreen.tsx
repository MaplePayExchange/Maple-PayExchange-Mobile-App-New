/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import WebView from 'react-native-webview';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { View, TextInput, Image, Pressable, ScrollView, Platform } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import Container from '@src/components/Container';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { CloseIcon, SearchIcon } from '@assets/svgs';
import { ONBOARDING_ONE } from '@constants/app.constant';

const HOW_TOS = [
	{
		image_url: ONBOARDING_ONE,
		label: 'How to send money',
		link: 'https://m.youtube.com/watch?v=Uz2tcCqoixA',
	},
	{
		image_url: ONBOARDING_ONE,
		label: 'How to delete account',
		link: 'https://m.youtube.com/watch?v=eXeDfNqhJ84',
	},
	{
		image_url: ONBOARDING_ONE,
		label: 'How add money to your wallet',
		link: 'https://m.youtube.com/watch?v=dTFXufTgfOE',
	},
];
export default function HowToScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [showBrowser, setShowBrowser] = React.useState<boolean>(false);
	const [selectedHowTo, setSelectedHowTo] = React.useState<(typeof HOW_TOS)[0] | null>(null);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			{!showBrowser && <HeaderWrapper title="How-Tos" center />}

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			{!showBrowser && (
				<View className="mb-5 h-[42px] flex-row items-center justify-between rounded-[24px] bg-[#1018280D] px-5">
					<TextInput
						value={searchQuery}
						className="text-[15px]"
						placeholderTextColor="#484848"
						placeholder="Fund Wallet, Verify ID"
						onChangeText={(value) => setSearchQuery(value)}
					/>

					{/**
                    |--------------------------------------------------
                    | Search icon
                    |--------------------------------------------------
                    */}
					<SearchIcon />
				</View>
			)}

			{/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */}
			{!showBrowser && (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="gap-6">
						{HOW_TOS.filter((_how) => _how.label.toLowerCase().includes(searchQuery.toLowerCase())).map(
							(how) => (
								<View key={how.label}>
									<Container className="h-[117px] w-full items-center justify-center overflow-hidden !p-0">
										<Image source={how.image_url} />
									</Container>

									{/**
                                    |--------------------------------------------------
                                    | ...
                                    |--------------------------------------------------
                                    */}
									<View className="mt-4 flex-row items-center justify-between">
										<MPText weight="medium" fontSize="FONT14">
											{how.label}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | ...
                                        |--------------------------------------------------
                                        */}
										<Pressable
											className="flex-row items-center gap-2"
											onPress={() => {
												setSelectedHowTo(how);
												setShowBrowser(true);
											}}
										>
											<MPText weight="semibold" fontSize="FONT14" className="text-[#FF6A00]">
												Watch video
											</MPText>

											{/**
                                            |--------------------------------------------------
                                            | Arrow
                                            |--------------------------------------------------
                                            */}
											<Svg width="6" height="11" viewBox="0 0 6 11" fill="none">
												<Path
													d="M5.85403 5.85403L0.854028 10.854C0.807573 10.9005 0.752423 10.9373 0.691726 10.9625C0.63103 10.9876 0.565975 11.0006 0.500278 11.0006C0.434581 11.0006 0.369526 10.9876 0.30883 10.9625C0.248133 10.9373 0.192983 10.9005 0.146528 10.854C0.100073 10.8076 0.0632225 10.7524 0.0380812 10.6917C0.0129398 10.631 0 10.566 0 10.5003C0 10.4346 0.0129398 10.3695 0.0380812 10.3088C0.0632225 10.2481 0.100073 10.193 0.146528 10.1465L4.7934 5.50028L0.146528 0.854028C0.0527074 0.760208 -9.88558e-10 0.63296 0 0.500278C9.88559e-10 0.367596 0.0527074 0.240348 0.146528 0.146528C0.240348 0.0527077 0.367596 9.88558e-10 0.500278 0C0.63296 -9.88558e-10 0.760208 0.0527077 0.854028 0.146528L5.85403 5.14653C5.90052 5.19296 5.9374 5.24811 5.96256 5.30881C5.98772 5.36951 6.00067 5.43457 6.00067 5.50028C6.00067 5.56599 5.98772 5.63105 5.96256 5.69175C5.9374 5.75245 5.90052 5.80759 5.85403 5.85403Z"
													fill="url(#paint0_linear_985_6679)"
												/>
												<Defs>
													<LinearGradient
														id="paint0_linear_985_6679"
														x1="3.00034"
														y1="0"
														x2="3.00034"
														y2="11.0006"
														gradientUnits="userSpaceOnUse"
													>
														<Stop stopColor="#EE0979" />
														<Stop offset="1" stopColor="#FF6A00" />
													</LinearGradient>
												</Defs>
											</Svg>
										</Pressable>
									</View>
								</View>
							)
						)}
					</View>
				</ScrollView>
			)}

			{/**
			|--------------------------------------------------
			| Webview
			|--------------------------------------------------
			*/}
			{showBrowser && (
				<View style={{ flex: 1 }} className="">
					<View className="h-auto w-full flex-row items-center justify-start gap-2 py-3">
						<Pressable
							onPress={() => {
								setShowBrowser(false);
								setSelectedHowTo(null);
							}}
							className="rounded-full bg-slate-300 p-1"
						>
							<CloseIcon />
						</Pressable>
						<MPText weight="semibold" fontSize="FONT14">
							Back to Maple
						</MPText>
					</View>
					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<WebView
						cacheEnabled={false}
						javaScriptEnabled={true}
						domStorageEnabled={true}
						cacheMode="LOAD_NO_CACHE"
						startInLoadingState={true}
						allowsInlineMediaPlayback
						mediaPlaybackRequiresUserAction={false}
						originWhitelist={['*']}
						mixedContentMode="always"
						onPermissionRequest={(event: any) => {
							console.log(event);
							if (Platform.OS === 'android') {
								event.grant();
							}
						}}
						source={{ uri: selectedHowTo?.link as any }}
						onNavigationStateChange={(event) => {
							console.log(event.url);
							/**
							 |--------------------------------------------------
							 | Detect redirect
							 |--------------------------------------------------
							 */
							if (!event.url.includes(selectedHowTo?.link as string)) {
								setShowBrowser(false);
								setSelectedHowTo(null);
							}
						}}
						mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
					/>
				</View>
			)}
		</ScreenWrapper>
	);
}
