/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import {
	View,
	FlatList,
	Dimensions,
	StyleSheet,
	ImageBackground,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView as RNBlurView } from '@react-native-community/blur';
import Svg, { Defs, Rect, Stop, LinearGradient } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { ROUTE_NAMES } from '@constants/routes.conts';
//@ts-ignore
import { RootStackParamList } from '@constants/route.params';
import { ONBOARDING_ONE, ONBOARDING_THREE, ONBOARDING_TWO } from '@constants/app.constant';

const { width } = Dimensions.get('window');

/**
|--------------------------------------------------
| Onboarding images
|--------------------------------------------------
*/
const ONBOARDING_DATA = [
	{
		image: ONBOARDING_ONE,
		title: 'Exchange currencies, the smart way.',
		subtitle: 'Send and convert money across borders in seconds, with competitive rates and no hidden fees.',
	},
	{
		image: ONBOARDING_TWO,
		title: 'Made for people on the move.',
		subtitle:
			"Whether you're supporting loved ones, relocating, or investing abroad, we're here for every transfer.",
	},
	{
		image: ONBOARDING_THREE,
		title: 'The more you exchange, the more you earn.',
		subtitle: 'Enjoy milestone rewards, VIP benefits, and bonuses every time you transact or refer others.',
	},
];

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type OnboardingScreenProps = NativeStackNavigationProp<RootStackParamList, 'OnboardingScreen'>;

export default function OnboardingScreen() {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation<OnboardingScreenProps>();
	const insets = useSafeAreaInsets();

	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const flatListRef = React.useRef<FlatList>(null);
	const [currentStep, setCurrentStep] = React.useState<number>(0);
	const autoScrollInterval = 4000;

	/**
	|--------------------------------------------------
	| Auto scroll effect
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (currentStep >= ONBOARDING_DATA.length - 1) return;

		/**
		|--------------------------------------------------
		| Scroll timer
		|--------------------------------------------------
		*/
		const timer = setInterval(() => {
			/**
			|--------------------------------------------------
			| Gets the next index
			|--------------------------------------------------
			*/
			const nextIndex = currentStep + 1;

			/**
			|--------------------------------------------------
			| Scrolls to the next index
			|--------------------------------------------------
			*/
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });

			/**
			|--------------------------------------------------
			| Increments the current step
			|--------------------------------------------------
			*/
			setCurrentStep(nextIndex);
		}, autoScrollInterval);

		/**
		|--------------------------------------------------
		| Clean up
		|--------------------------------------------------
		*/
		return () => clearInterval(timer);
	}, [currentStep]);

	/**
    |--------------------------------------------------
    | Handle manual scroll
    |--------------------------------------------------
    */
	const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / width);
		setCurrentStep(index);
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<FlatList
			horizontal
			pagingEnabled
			ref={flatListRef}
			data={ONBOARDING_DATA}
			renderItem={({ item, index }) => {
				return (
					<ImageBackground source={item.image} className="h-full flex-1" style={{ width, flex: 1 }}>
						<SafeAreaView className="z-50 mt-4">
							{/**
							|--------------------------------------------------
							| Indicator
							|--------------------------------------------------
							*/}
							<View className="z-40 flex-row justify-between gap-4 px-6">
								<View
									className={clsx(
										'h-[6px] w-[30%] rounded-lg',
										index >= 0 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
								<View
									className={clsx(
										'h-[6px] w-[30%] rounded-lg',
										index >= 1 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
								<View
									className={clsx(
										'h-[6px] w-[30%] rounded-lg',
										index >= 2 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
							</View>
						</SafeAreaView>

						<View className="absolute top-0 z-40 h-[70%] w-full">
							<RNBlurView
								blurAmount={1}
								blurType="light"
								style={{ height: '100%', opacity: Platform.OS === 'android' ? 0.4 : 0.71 }}
								reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
							>
								<View className="h-full" pointerEvents="none" style={{ ...StyleSheet.absoluteFill }}>
									<Svg style={{ ...StyleSheet.absoluteFill, height: '100%' }}>
										<Defs>
											<LinearGradient id="overlayGradient" x1="0" y1="0" x2="0" y2="1">
												<Stop offset="1" stopColor="#000000" stopOpacity="0.54" />
												<Stop offset="0" stopColor="#000000" stopOpacity="0.54" />
												<Stop offset="0.7" stopColor="#000000" stopOpacity="0.54" />
												<Stop offset="0.4" stopColor="#000000" stopOpacity="0.54" />
											</LinearGradient>
										</Defs>

										<Rect width="100%" height="100%" fill="url(#overlayGradient)" />
									</Svg>
								</View>
							</RNBlurView>
						</View>

						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<View className={clsx('z-40 mt-auto h-[35%] translate-y-12')}>
							<RNBlurView
								blurAmount={1}
								blurType="light"
								reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
							>
								<View
									pointerEvents="none"
									style={{ ...StyleSheet.absoluteFill, backgroundColor: 'transparent' }}
								>
									<Svg style={StyleSheet.absoluteFill}>
										<Defs>
											<LinearGradient id="overlayGradient" x1="0" y1="0" x2="0" y2="1">
												<Stop offset="0" stopColor="#000000" stopOpacity="0.3" />
												<Stop offset="0.4" stopColor="#000000" stopOpacity="0.3" />
												<Stop offset="0.7" stopColor="#000000" stopOpacity="0.3" />
												<Stop offset="1" stopColor="#000000" stopOpacity="0.3" />
											</LinearGradient>
										</Defs>

										<Rect width="100%" height="100%" fill="url(#overlayGradient)" />
									</Svg>
								</View>

								{/**
								|--------------------------------------------------
								| Content
								|--------------------------------------------------
								*/}
								<SafeAreaView edges={{ bottom: 'maximum' }}>
									<View className="p-6 pb-8">
										{/**
										|--------------------------------------------------
										| Title
										|--------------------------------------------------
										*/}
										<MPText
											weight="bold"
											style={{ fontSize: 24, lineHeight: 32 }}
											className="mb-3 max-w-[90%] text-2xl tracking-tight text-white"
										>
											{item.title}
										</MPText>

										{/**
										|--------------------------------------------------
										| Subtitle
										|--------------------------------------------------
										*/}
										<MPText
											weight="semibold"
											style={{ lineHeight: 20, fontSize: 14 }}
											className="text-[15px] leading-6 text-white"
										>
											{item.subtitle}
										</MPText>

										{/**
										|--------------------------------------------------
										| Action button
										|--------------------------------------------------
										*/}
										<MPButton
											useGradientBg
											className="mt-6"
											onPress={() => navigation.navigate(ROUTE_NAMES.PHONE_VERIFICATION)}
										>
											<MPText weight="semibold" className="text-[15px] text-white">
												Create an account
											</MPText>
										</MPButton>

										{/**
										|--------------------------------------------------
										| Login
										|--------------------------------------------------
										*/}
										<MPButton onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN, {})}>
											<MPText
												weight="semibold"
												style={{ lineHeight: 21, fontSize: 15 }}
												className="w-max text-[15px] text-[#f84f21]"
											>
												Login
											</MPText>
										</MPButton>
									</View>
								</SafeAreaView>
							</RNBlurView>
						</View>
					</ImageBackground>
				);
			}}
			onMomentumScrollEnd={onScrollEnd}
			keyExtractor={(_, i) => String(i)}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
