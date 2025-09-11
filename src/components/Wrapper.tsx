/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
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
	useBottomInset?: boolean;
	children: React.ReactNode;
}

export default function ScreenWrapper({ children, className, usePadding = true, useBottomInset = false }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<SafeAreaView
			edges={{ bottom: useBottomInset === true ? 'maximum' : 'off', top: 'maximum' }}
			className={`bg-white flex-1 ${className}`}
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
			<View className={clsx('flex-1 bg-white', usePadding ? 'p-4' : 'p-0')}>{children}</View>
		</SafeAreaView>
	);
}
