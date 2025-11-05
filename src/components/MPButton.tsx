/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import SpinningSVG from './SpinningSvg';

interface Props extends TouchableOpacityProps {
	isLoading?: boolean;
	useGradientBg?: boolean;
	customClassName?: ViewStyle;
}

/**
|--------------------------------------------------
| MPButton Component
|--------------------------------------------------
*/
export default function MPButton({
	children,
	disabled,
	isLoading,
	className,
	customClassName,
	useGradientBg = false,
	...rest
}: Props) {
	/**
	|--------------------------------------------------
	| Common Styles
	|--------------------------------------------------
	*/
	const commonStyles = {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	};

	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<TouchableOpacity
			{...rest}
			activeOpacity={0.8}
			className={`flex h-[40px] overflow-hidden rounded-[59px] items-center justify-center w-full ${
				disabled && 'bg-[#EAECF0] text-[#D1D1D1] pointer-events-none'
			} ${className}`}
		>
			<Animated.View
				entering={FadeInDown.duration(100).springify()}
				style={[commonStyles as any, customClassName]}
			>
				{/**
				|--------------------------------------------------
				| With gradient
				|--------------------------------------------------
				*/}
				{useGradientBg ? (
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={[commonStyles as any, customClassName]}
						colors={['#EE0979', '#FF6A00']}
					>
						{isLoading ? <SpinningSVG loading={isLoading} /> : children}
					</LinearGradient>
				) : /**
					|--------------------------------------------------
					| Without the gradient
					|--------------------------------------------------
					*/
				isLoading ? (
					<SpinningSVG color="#000000" loading={isLoading} />
				) : (
					children
				)}
			</Animated.View>
		</TouchableOpacity>
	);
}
