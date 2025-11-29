/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';

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
				'absolute top-6 isolate z-50 w-[201px] rounded-md bg-[#0E314C] p-2',
				position === 'right' ? 'right-0' : position === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'
			)}
		>
			<MPText className="flex-1 text-white" weight="regular">
				{text}
			</MPText>
		</View>
	);
}
