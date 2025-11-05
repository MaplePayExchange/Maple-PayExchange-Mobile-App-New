/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View, StatusBar } from 'react-native';
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

/**
|--------------------------------------------------
| Screen Wrapper Component
|--------------------------------------------------
*/
export default function ScreenWrapper({ children, className, usePadding = true, useBottomInset = false }: Props) {
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<SafeAreaView
			className={clsx('flex-1 bg-white', className)}
			edges={{ bottom: useBottomInset === true ? 'maximum' : 'off', top: 'maximum' }}
		>
			{/**
			|--------------------------------------------------
			| Status bar
			|--------------------------------------------------
			*/}
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

			{/**
			|--------------------------------------------------
			| Children
			|--------------------------------------------------
			*/}
			<View className={clsx('flex-1 bg-white', usePadding ? 'p-4' : 'p-0')}>{children}</View>
		</SafeAreaView>
	);
}
