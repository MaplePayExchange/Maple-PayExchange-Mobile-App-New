/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Pressable, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@src/components/MPText';
import { CheckboxFillIcon, CheckboxOutlineIcon } from '@assets/svgs';

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
			<Pressable onPress={() => !disabled && onChange(!checked)} className={`mr-2 mt-[2px] flex-row items-start`}>
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
					fontSize="FONT12"
					className="w-[88%] text-[13px] text-[#767676]"
					style={{ lineHeight: 18 }}
				>
					{label}
				</MPText>
			)}

			{component && component}
		</View>
	);
}
