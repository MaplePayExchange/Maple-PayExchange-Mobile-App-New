/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Pressable, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import { CheckboxFillIcon, CheckboxOutlineIcon } from '@/assets/svgs';
import clsx from 'clsx';
import { clampFontSize } from '@/constants/app.constant';

interface CheckboxProps {
	label?: string;
	checked: boolean;
	disabled?: boolean;
	className?: string;
	component?: React.ReactNode;
	onChange: (value: boolean) => void;
}

export default function Checkbox({ checked, className, component, onChange, label, disabled }: CheckboxProps) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View style={{ opacity: disabled ? 0.5 : 1 }} className={clsx('flex-row items-start', className)}>
			<Pressable onPress={() => !disabled && onChange(!checked)} className={`mt-0.5 mr-2`}>
				{checked ? <CheckboxFillIcon /> : <CheckboxOutlineIcon />}
			</Pressable>

			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			{label && (
				<MPText
					weight="medium"
					className="text-[#767676] leading-4 w-[88%]"
					style={{ fontSize: clampFontSize(12, 10, 27) }}
				>
					{label}
				</MPText>
			)}
			{component && component}
		</View>
	);
}
