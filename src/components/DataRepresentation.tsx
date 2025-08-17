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

interface Props {
	label?: string;
	value?: React.ReactNode;
	labelClassName?: string;
	valueClassName?: string;
	wrapperClassName?: string;
}

export default function DataRepresentation({ label, value, labelClassName, valueClassName, wrapperClassName }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className={clsx('flex-row w-full justify-between items-center', wrapperClassName)}>
			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			<MPText weight="regular" className={clsx('text-sm', labelClassName)}>
				{label || 'Label'}
			</MPText>

			{/**
            |--------------------------------------------------
            | Value
            |--------------------------------------------------
            */}
			{typeof value === 'string' ? (
				<MPText weight="medium" className={clsx('text-sm', valueClassName)}>
					{value || 'Value'}
				</MPText>
			) : (
				value
			)}
		</View>
	);
}
