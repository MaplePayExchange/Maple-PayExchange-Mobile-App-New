/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Text, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import ScreenWrapper from '@/src/components/Wrapper';
import { Pressable } from 'react-native-gesture-handler';
import { useUserStore } from '@/zustand/userStore';

export default function SplashScreen() {
	const { setName, name } = useUserStore();
	console.log(name);
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<View>
				<Text>SplashScreen</Text>
				<Pressable
					onPress={() => {
						useUserStore.getState().setName('Finley');
					}}
				>
					<Text>Press me</Text>
				</Pressable>
			</View>
		</ScreenWrapper>
	);
}
