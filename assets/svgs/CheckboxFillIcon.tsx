/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Svg, Path, Defs, Stop, LinearGradient } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function CheckboxFillIcon() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<Path
					d="M0 4C0 2.29086 2.29086 0 4 0H12C14.2091 0 16 2.29086 16 4V12C16 14.2091 14.2091 16 12 16H4C2.29086 16 0 14.2091 0 12V4Z"
					fill="url(#paint0_linear_684_2785)"
				/>
				<Path
					stroke="white"
					strokeWidth="1.6666"
					d="M12 5L6.5 10.5L4 8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Defs>
					<LinearGradient
						x1="8"
						y1="0"
						x2="8"
						y2="16"
						id="paint0_linear_684_2785"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#EE0979" />
						<Stop offset="1" stopColor="#FF6A00" />
					</LinearGradient>
				</Defs>
			</Svg>
		</View>
	);
}
