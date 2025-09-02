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
import MPText from '@/src/components/MPText';
import { fontSizes } from '@/constants/app.constant';
import { CheckboxFillIcon, CheckboxOutlineIcon } from '@/assets/svgs';

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
			<Pressable onPress={() => !disabled && onChange(!checked)} className={`mt-1.5 mr-2`}>
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
					style={{ fontSize: fontSizes.FONT12 }}
				>
					{label}
				</MPText>
			)}
			{component && component}
		</View>
	);
}
