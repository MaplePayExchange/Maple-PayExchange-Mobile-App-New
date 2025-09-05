/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { Svg, Path as _Path, Stop, Defs, G, LinearGradient, ClipPath, Rect } from 'react-native-svg';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function CustomRefreshControl({ refreshing }: { refreshing: boolean }) {
	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const rotation = useSharedValue(0);

	/**
    |--------------------------------------------------
    | Rotate the icon while refreshing
    |--------------------------------------------------
    */
	if (refreshing) {
		rotation.value = withRepeat(withTiming(10060, { duration: 10000 }), -1, false);
	} else {
		rotation.value = 0;
	}

	/**
    |--------------------------------------------------
    | Animated style
    |--------------------------------------------------
    */
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	/**
    |--------------------------------------------------
    | Returned View
    |--------------------------------------------------
    */
	return (
		<Animated.View
			style={[animatedStyle]}
			className="self-center absolute z-[50] size-12 bg-white justify-center items-center rounded-full"
		>
			<Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: [{ scale: 1.5 }] }}>
				<G clipPath="url(#clip0_5_1384)">
					<_Path
						d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
						stroke="url(#paint0_linear_5_1384)"
						strokeWidth="1.66667"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</G>
				<Defs>
					<LinearGradient
						id="paint0_linear_5_1384"
						x1="10.0001"
						y1="1.66663"
						x2="10.0001"
						y2="18.3333"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#EE0979" />
						<Stop offset="0.3" stopColor="#FFFFFF" />
						<Stop offset="1" stopColor="#FF6A00" />
					</LinearGradient>
					<ClipPath id="clip0_5_1384">
						<Rect width="20" height="20" fill="white" />
					</ClipPath>
				</Defs>
			</Svg>
		</Animated.View>
	);
}
