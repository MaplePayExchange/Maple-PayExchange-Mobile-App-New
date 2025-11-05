/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Svg, Defs, Path, Rect, G, ClipPath } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function ErrorInfoIcon() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<G clip-path="url(#clip0_684_1323)">
					<Path
						d="M7.99967 5.33325V7.99992M7.99967 10.6666H8.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992Z"
						stroke="#F04438"
						stroke-width="1.33333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</G>
				<Defs>
					<ClipPath id="clip0_684_1323">
						<Rect width="16" height="16" fill="white" />
					</ClipPath>
				</Defs>
			</Svg>
		</View>
	);
}
