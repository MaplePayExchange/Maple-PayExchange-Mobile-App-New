/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function RoundRedBallIcon() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			<Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
				<Circle cx="5" cy="5" r="4.5" fill="#EE4139" stroke="#FAFAF9" />
			</Svg>
		</View>
	);
}
