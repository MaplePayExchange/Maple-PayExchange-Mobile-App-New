/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';

interface Props extends TouchableOpacityProps {
	isLoading?: boolean;
	useGradientBg?: boolean;
}

export default function MPButton({ useGradientBg = false, className, children, disabled, isLoading, ...rest }: Props) {
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
			className={`flex h-[40px] overflow-hidden rounded-[59px] items-center justify-center w-full ${disabled && 'bg-[#EAECF0] text-[#D1D1D1] pointer-events-none'} ${className}`}
		>
			<Animated.View entering={FadeInDown.duration(100).springify()} style={[commonStyles as any]}>
				{/**
				|--------------------------------------------------
				| With gradient
				|--------------------------------------------------
				*/}
				{useGradientBg ? (
					<LinearGradient
						end={{ x: 1, y: 0 }}
						start={{ x: 0, y: 0 }}
						style={[commonStyles as any]}
						colors={['#EE0979', '#FF6A00']}
					>
						{isLoading ? (
							<MPText weight="medium" className="text-white">
								Submitting...
							</MPText>
						) : (
							children
						)}
					</LinearGradient>
				) : /**
					|--------------------------------------------------
					| Without the gradient
					|--------------------------------------------------
					*/
				isLoading ? (
					<MPText weight="medium" className="text-white">
						Submitting...
					</MPText>
				) : (
					children
				)}
			</Animated.View>
		</TouchableOpacity>
	);
}
