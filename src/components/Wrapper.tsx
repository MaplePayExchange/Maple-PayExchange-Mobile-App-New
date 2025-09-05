/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

interface Props {
	className?: string;
	usePadding?: boolean;
	children: React.ReactNode;
}

export default function ScreenWrapper({ children, className, usePadding = true }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<SafeAreaView className={`bg-white ${usePadding ? 'p-4 flex-1' : ''} ${className}`}>
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
			<View className="pb-[48px] flex-1">{children}</View>
		</SafeAreaView>
	);
}
