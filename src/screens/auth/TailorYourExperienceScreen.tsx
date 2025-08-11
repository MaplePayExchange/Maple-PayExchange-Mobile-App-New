/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';

type TailorYourExperienceRouteProp = RouteProp<RootStackParamList, 'TailorYourExperienceScreen'>;

export default function TailorYourExperienceScreen() {
	/**
    |--------------------------------------------------
    | Route
    |--------------------------------------------------
    */
	const route = useRoute<TailorYourExperienceRouteProp>();
	const { ...rest } = route.params;

	console.log(rest);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper useNavigation={false} title="Tailor Your Experience" subtitle="Select what best fits you" />

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			<KeyboardAvoidingView
				className="flex-1 mt-8"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View className="flex-1"></View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
