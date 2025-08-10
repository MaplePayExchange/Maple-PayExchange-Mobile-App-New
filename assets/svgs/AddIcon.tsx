/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function AddIcon() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
				<Path
					stroke="#484848"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.33337 2.6665V13.3332"
				/>
				<Path
					d="M3 8H13.6667"
					stroke="#484848"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</Svg>
		</View>
	);
}
