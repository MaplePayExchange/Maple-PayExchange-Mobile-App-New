/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, ImageBackground, FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { ONBOARDING_ONE, ONBOARDING_THREE, ONBOARDING_TWO } from '@/constants/app.constant';

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
					<ImageBackground source={item.image} className="flex-1 h-full" style={{ width, flex: 1 }}>
						<SafeAreaView className="z-20">
							{/**
							|--------------------------------------------------
							| Indicator
							|--------------------------------------------------
							*/}
							<View className="flex-row justify-between gap-4 px-6 z-40">
								<View
									className={clsx(
										'w-[30%] h-[6px] rounded-lg',
										index >= 0 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
								<View
									className={clsx(
										'w-[30%] h-[6px] rounded-lg',
										index >= 1 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
								<View
									className={clsx(
										'w-[30%] h-[6px] rounded-lg',
										index >= 2 ? 'bg-white' : 'bg-[#FFFFFF80]'
									)}
								/>
							</View>
						</SafeAreaView>

						<BlurView
							intensity={20}
							tint="systemUltraThinMaterialDark"
							className="mt-auto h-[318px] z-20"
							style={{ paddingBottom: insets.bottom }}
						>
							<SafeAreaView>
								<View className="p-6">
									{/**
									|--------------------------------------------------
									| Title
									|--------------------------------------------------
									*/}
									<MPText
										weight="bold"
										style={{ fontSize: 24, lineHeight: 32 }}
										className="text-white text-2xl mb-3 tracking-tight"
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
										className="leading-6 text-white text-sm"
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
										<MPText weight="semibold" className="text-white text-sm">
											Create an account
										</MPText>
									</MPButton>

									{/**
									|--------------------------------------------------
									| Login
									|--------------------------------------------------
									*/}
									<MPButton onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN, {})}>
										<MPText weight="semibold" className="text-[#f84f21] text-sm">
											Login
										</MPText>
									</MPButton>
								</View>
							</SafeAreaView>
						</BlurView>

						{/**
						|--------------------------------------------------
						| Overlay
						|--------------------------------------------------
						*/}
						<View className="w-full z-10 absolute h-full flex-1 bg-black/30" />
					</ImageBackground>
				);
			}}
			onMomentumScrollEnd={onScrollEnd}
			keyExtractor={(_, i) => String(i)}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
