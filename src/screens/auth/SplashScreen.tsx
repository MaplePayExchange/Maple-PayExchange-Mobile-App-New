/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Image } from 'react-native';
import { useUserStore } from '@/zustand/userStore';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import ScreenWrapper from '@/src/components/Wrapper';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { clampFontSize, MAPLE_LOGO } from '@/constants/app.constant';

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type SplashScreenProps = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function SplashScreen() {
	let timeout: any;

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<SplashScreenProps>();

	/**
	|--------------------------------------------------
	| Store
	|--------------------------------------------------
	*/
	const { isRegistered, verificationData, hasCompletedOnboarding } = useUserStore();

	/**
	|--------------------------------------------------
	| Navigates the user to the login screen
	|--------------------------------------------------
	*/
	navigation.addListener('focus', () => {
		if (hasCompletedOnboarding) {
			useUserStore.setState((state) => ({ ...state, isSessionExpired: false }));
			navigation.navigate(ROUTE_NAMES.LOGIN, {});
			return;
		}

		/**
		|--------------------------------------------------
		| Navigates to the next screen from here
		|--------------------------------------------------
		*/
		timeout = setTimeout(() => {
			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			if (verificationData?.currentStep === 'email') {
				useUserStore.setState((state) => ({ ...state, isSessionExpired: false }));
				navigation.navigate(ROUTE_NAMES.LOGIN, {});
				return;
			}

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			if (verificationData?.currentStep === 'phone') {
				navigation.navigate(ROUTE_NAMES.EMAIL_VERIFICATION);
				return;
			}

			/**
			|--------------------------------------------------
			| Goest to onboarding if there is no verification
			| data
			|--------------------------------------------------
			*/
			navigation.navigate(ROUTE_NAMES.ONBOARDING);
		}, 3000);

		/**
		|--------------------------------------------------
		| If the user is registered
		|--------------------------------------------------
		*/
		if (isRegistered) {
			clearTimeout(timeout);
			useUserStore.setState((state) => ({ ...state, isSessionExpired: false }));
			navigation.navigate(ROUTE_NAMES.LOGIN, {});
		}
	});

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	navigation.addListener('beforeRemove', () => {
		clearTimeout(timeout);
	});

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<View className="flex-1 h-full items-center justify-center">
				<Animated.View entering={FadeInRight.duration(100).springify()}>
					<Image
						source={MAPLE_LOGO}
						width={clampFontSize(102, 59, 104)}
						height={clampFontSize(102, 59, 104)}
						style={[{ width: clampFontSize(102, 59, 104), height: clampFontSize(102, 59, 104) }]}
					/>
				</Animated.View>
			</View>
		</ScreenWrapper>
	);
}
