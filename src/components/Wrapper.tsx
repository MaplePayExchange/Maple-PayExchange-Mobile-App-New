/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

interface Props {
	usePadding?: boolean;
	children: React.ReactNode;
}

export default function ScreenWrapper({ children, usePadding = true }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<SafeAreaView className={usePadding ? 'p-4 flex-1' : ''}>
			{/**
            |--------------------------------------------------
            | Status bar
            |--------------------------------------------------
            */}
			<StatusBar style="auto" />

			{/**
            |--------------------------------------------------
            | Children
            |--------------------------------------------------
            */}
			{children}
		</SafeAreaView>
	);
}
