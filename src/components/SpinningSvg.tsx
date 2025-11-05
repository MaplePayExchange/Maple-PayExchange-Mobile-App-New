/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function SpinningSVG({ loading, color }: { loading: boolean; color?: string }) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const spinValue = React.useRef(new Animated.Value(0)).current;

	/**
    |--------------------------------------------------
    | Loading starts when the loading state is true
    |--------------------------------------------------
    */
	React.useEffect(() => {
		let animation: Animated.CompositeAnimation;

		if (loading) {
			animation = Animated.loop(
				Animated.timing(spinValue, {
					toValue: 1,
					duration: 1200,
					easing: Easing.linear,
					useNativeDriver: true,
				})
			);
			animation.start();
		} else {
			/**
            |--------------------------------------------------
            | stop spinning
            |--------------------------------------------------
            */
			spinValue.stopAnimation();

			/**
            |--------------------------------------------------
            | reset
            |--------------------------------------------------
            */
			spinValue.setValue(0);
		}

		return () => animation?.stop?.();
	}, [loading]);

	/**
    |--------------------------------------------------
    | Spin value
    |--------------------------------------------------
    */
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	if (!loading) return null;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Animated.View style={{ transform: [{ rotate: spin }] }}>
			<Svg width="36" height="36" viewBox={`0 0 ${36} ${36}`} fill="none">
				<Defs>
					<LinearGradient id="g" x1="0" y1="0" x2="1" y2="1">
						<Stop offset="0" stopColor={color || '#FFFFFF'} />
						<Stop offset="1" stopColor={color || '#FFFFFF'} />
					</LinearGradient>
				</Defs>

				<Circle
					cx="18"
					cy="18"
					r={9}
					fill="none"
					stroke="url(#g)"
					strokeWidth={2}
					strokeLinecap="round"
					strokeDasharray="36 70"
					transform="rotate(-90 18 18)"
				/>
			</Svg>
		</Animated.View>
	);
}
