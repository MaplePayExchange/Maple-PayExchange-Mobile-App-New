/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Platform, View } from 'react-native';
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
		<SafeAreaView
			edges={{ bottom: 'off', top: 'maximum' }}
			className={`bg-white ${usePadding ? 'flex-1' : ''} ${className}`}
		>
			{/**
            |--------------------------------------------------
            | Status bar
            |--------------------------------------------------
            */}
			<StatusBar style="dark" translucent backgroundColor="transparent" />

			{/**
            |--------------------------------------------------
            | Children
            |--------------------------------------------------
            */}
			<View className={clsx('flex-1 p-4 bg-white')}>{children}</View>
		</SafeAreaView>
	);
}
