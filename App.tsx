/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import {
	useFonts,
	Manrope_700Bold,
	Manrope_500Medium,
	Manrope_400Regular,
	Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ToastManager from 'toastify-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import './global.css';
import RootNavigation from './src/screens/navigation/RootNavigation';

const queryClient = new QueryClient();

export default function App() {
	/**
    |--------------------------------------------------
    | Fonts
    |--------------------------------------------------
    */
	const [fontsLoaded] = useFonts({
		Manrope_700Bold,
		Manrope_500Medium,
		Manrope_400Regular,
		Manrope_600SemiBold,
	});

	React.useEffect(() => {
		const subscription = Linking.addEventListener('url', ({ url }) => {
			console.log('App opened with URL:', url);
		});

		/**
		|--------------------------------------------------
		| Clean up
		|--------------------------------------------------
		*/
		return () => subscription.remove();
	}, []);

	/**
    |--------------------------------------------------
    | Returns nothing if the fonts aren't loaded yet
    |--------------------------------------------------
    */
	if (!fontsLoaded) return null;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View style={[styles.container]}>
			{/**
            |--------------------------------------------------
            | Status bar theme
            |--------------------------------------------------
            */}
			<StatusBar style="auto" />

			{/**
            |--------------------------------------------------
            | Root navigation
            |--------------------------------------------------
            */}
			<QueryClientProvider client={queryClient}>
				<RootNavigation />
			</QueryClientProvider>

			{/**
			|--------------------------------------------------
			| Toast manager
			|--------------------------------------------------
			*/}
			<ToastManager animationStyle="fade" />
		</View>
	);
}

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
	/**
    |--------------------------------------------------
    | Container
    |--------------------------------------------------
    */
	container: { flex: 1 },
});
