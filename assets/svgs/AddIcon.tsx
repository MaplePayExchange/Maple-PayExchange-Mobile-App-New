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
			<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<Path d="M12 4V20" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<Path d="M4 12H20" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</Svg>
		</View>
	);
}
