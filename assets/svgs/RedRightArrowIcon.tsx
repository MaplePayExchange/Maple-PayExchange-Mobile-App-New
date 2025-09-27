/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Svg, LinearGradient, Path, Defs, Stop } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function RedRightArrowIcon({ color }: { color?: string }) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<Path
					d="M15.8335 9.99902L3.3335 9.99902"
					stroke="url(#paint0_linear_170_5886)"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M12.5 5.83301L15.9596 9.29257C16.2929 9.6259 16.4596 9.79257 16.4596 9.99967C16.4596 10.2068 16.2929 10.3734 15.9596 10.7068L12.5 14.1663"
					stroke="url(#paint1_linear_170_5886)"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Defs>
					<LinearGradient
						id="paint0_linear_170_5886"
						x1="3.3335"
						y1="10.499"
						x2="15.8335"
						y2="10.499"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor={color || '#EE0979'} />
						<Stop offset="1" stopColor={color || '#FF6A00'} />
					</LinearGradient>
					<LinearGradient
						id="paint1_linear_170_5886"
						x1="12.5"
						y1="9.99967"
						x2="16.6667"
						y2="9.99967"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor={color || '#EE0979'} />
						<Stop offset="1" stopColor={color || '#FF6A00'} />
					</LinearGradient>
				</Defs>
			</Svg>
		</View>
	);
}
