/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import ScreenWrapper from '@/src/components/Wrapper';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { RootStackParamList } from '@/types/route.params';
import { useStartVeriffSession } from '@/services/auth.services';
import { clampFontSize, MONEY_PAD } from '@/constants/app.constant';

type KycStepsScreenProps = NativeStackNavigationProp<RootStackParamList, 'KycStepsScreen'>;
export default function KysStepsScreen() {
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
	const { verificationData } = useUserStore();
	const { mutate, isPending } = useStartVeriffSession();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="" style={{ minHeight: Dimensions.get('window').height - 130 }}>
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
					<MPText weight="semibold" className="text-[24px] text-[#1A1A1A] mt-8">
						Almost there! Verify your identity to start using MPExchange
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
						The next step will require you to upload a copy of a government issued ID and take a selfie with
						ID. Examples include:
					</MPText>

					{/**
                    |--------------------------------------------------
                    | Identities
                    |--------------------------------------------------
                    */}
					<View className="mt-1 mb-12">
						<View className="flex-row gap-1 items-center">
							<Entypo name="dot-single" size={16} color="black" />
							<MPText className="text-sm leading-5 text-[#767676]">International passport</MPText>
						</View>

						<View className="flex-row gap-1 items-center">
							<Entypo name="dot-single" size={16} color="black" />
							<MPText className="text-sm leading-5 text-[#767676]">Driver’s license</MPText>
						</View>
					</View>

					{/**
                    |--------------------------------------------------
                    | Action buttons
                    |--------------------------------------------------
                    */}
					<View className="mt-auto justify-end">
						{/**
						|--------------------------------------------------
						| Starts the veriff process
						|--------------------------------------------------
						*/}
						<MPButton
							useGradientBg
							isLoading={isPending}
							onPress={() => mutate({ email: verificationData?.email as string })}
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
						<MPButton onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN, { email: undefined })}>
							<MPText weight="semibold" className="text-[#EE0979] text-sm">
								I’ll do this later
							</MPText>
						</MPButton>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
