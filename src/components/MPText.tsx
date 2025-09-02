/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
	className?: string;
	children: React.ReactNode;
	weight?: 'regular' | 'bold' | 'medium' | 'semibold';
}

export default function MPText({ children, weight = 'regular', className, ...props }: Props) {
	/**
    |--------------------------------------------------
    | Font setup
    |--------------------------------------------------
    */
	const fontFamily =
		weight === 'bold'
			? 'font-manrope-bold'
			: weight === 'regular'
				? 'font-manrope-regular'
				: weight === 'medium'
					? 'font-manrope-medium'
					: weight === 'semibold'
						? 'font-manrope-semibold'
						: undefined;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Text
			{...props}
			className={`text-base leading-9 ${fontFamily} ${className}`}
			style={[{ lineHeight: 20, fontSize: 14 }, props.style]}
		>
			{children}
		</Text>
	);
}
