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
		<View className={clsx('w-full flex-row items-start justify-between gap-12', wrapperClassName)}>
			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			<View className="max-w-[50%]">
				<MPText fontSize='FONT14' weight="regular" className={clsx('text-[15px]', labelClassName)}>
					{label || 'Label'}
				</MPText>
			</View>

			{/**
            |--------------------------------------------------
            | Value
            |--------------------------------------------------
            */}
			{typeof value === 'string' ? (
				<View className="flow-row max-w-[50%] justify-end">
					<MPText fontSize='FONT14' weight="medium" className={clsx('text-wrap text-right text-[15px]', valueClassName)}>
						{value || 'Value'}
					</MPText>
				</View>
			) : (
				value
			)}
		</View>
	);
}
