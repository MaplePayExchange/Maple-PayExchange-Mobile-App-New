/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import clsx from 'clsx';

export default function Tooltip({
	text,
	position = 'right',
}: {
	text: string;
	position?: 'left' | 'center' | 'right';
}) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View
			className={clsx(
				'absolute z-50 p-2 rounded-md bg-[#0E314C] w-[201px] isolate top-6',
				position === 'right' ? 'right-0' : position === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'
			)}
		>
			<MPText className="text-white flex-1" weight="regular">
				{text}
			</MPText>
		</View>
	);
}
