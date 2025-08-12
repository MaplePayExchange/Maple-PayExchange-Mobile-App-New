/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, ImageBackground, FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { RootStackParamList } from '@/types/route.params';
import { ONBOARDING_ONE, ONBOARDING_THREE, ONBOARDING_TWO } from '@/constants/app.constant';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '@/constants/routes.conts';

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
			const nextIndex = currentStep < ONBOARDING_DATA.length - 1 ? currentStep + 1 : 0;

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
			renderItem={({ item }) => {
				return (
					<ImageBackground source={item.image} className="flex-1 h-full" style={{ width, flex: 1 }}>
						<BlurView intensity={30} tint="systemUltraThinMaterialDark" className="mt-auto h-[268px]">
							<View className="p-6">
								{/**
                                |--------------------------------------------------
                                | Title
                                |--------------------------------------------------
                                */}
								<MPText weight="bold" className="text-white text-2xl mb-3 tracking-tight">
									{item.title}
								</MPText>

								{/**
                                |--------------------------------------------------
                                | Subtitle
                                |--------------------------------------------------
                                */}
								<MPText
									style={{ lineHeight: 20 }}
									weight="semibold"
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
						</BlurView>
					</ImageBackground>
				);
			}}
			onMomentumScrollEnd={onScrollEnd}
			keyExtractor={(_, i) => String(i)}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
