/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Animated, View, Text } from 'react-native';
import MPText from './MPText';

/**
|--------------------------------------------------
| ProgressBar component
|--------------------------------------------------
*/
type ProgressBarProps = {
	color?: string;
	height?: number;
	progress: number;
	showLabel?: boolean;
	backgroundColor?: string;
};

export default function ProgressBar({
	progress,
	height = 12,
	showLabel = true,
	color = '#3b82f6',
	backgroundColor = '#e5e7eb',
}: ProgressBarProps) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const animatedValue = React.useRef(new Animated.Value(0)).current;

	/**
    |--------------------------------------------------
    | Animate on progress change
    |--------------------------------------------------
    */
	React.useEffect(() => {
		Animated.timing(animatedValue, {
			duration: 500,
			toValue: progress,
			useNativeDriver: false,
		}).start();
	}, [progress]);

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const widthInterpolated = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	/**
    |--------------------------------------------------
    | Rendered Ciew
    |--------------------------------------------------
    */
	return (
		<View className="w-full flex-row items-center gap-4">
			{/**
            |--------------------------------------------------
            | Progress bar container
            |--------------------------------------------------
            */}
			<View className="rounded-full overflow-hidden w-[80%]" style={{ height, backgroundColor }}>
				<Animated.View
					className="rounded-full"
					style={{ width: widthInterpolated, backgroundColor: color, height }}
				/>
			</View>

			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			{showLabel && (
				<MPText className="text-[8px] text-gray-700 font-medium text-center">{Math.round(progress)}%</MPText>
			)}
		</View>
	);
}
