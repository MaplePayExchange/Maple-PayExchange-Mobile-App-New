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
		<View className={clsx('flex-row w-full gap-12 justify-between items-start', wrapperClassName)}>
			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			<View className="max-w-[50%]">
				<MPText weight="regular" className={clsx('text-sm', labelClassName)}>
					{label || 'Label'}
				</MPText>
			</View>

			{/**
            |--------------------------------------------------
            | Value
            |--------------------------------------------------
            */}
			{typeof value === 'string' ? (
				<View className="flow-row justify-end max-w-[50%]">
					<MPText weight="medium" className={clsx('text-sm text-right text-wrap', valueClassName)}>
						{value || 'Value'}
					</MPText>
				</View>
			) : (
				value
			)}
		</View>
	);
}
