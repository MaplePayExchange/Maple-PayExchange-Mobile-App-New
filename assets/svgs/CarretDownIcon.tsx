/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function CarretDownIcon() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<Path
					stroke="#484848"
					strokeWidth="1.66667"
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M5 7.5L10 12.5L15 7.5"
				/>
			</Svg>
		</View>
	);
}
