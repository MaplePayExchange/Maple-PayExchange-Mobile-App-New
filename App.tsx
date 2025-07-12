/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
