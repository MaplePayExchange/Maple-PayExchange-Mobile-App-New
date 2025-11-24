/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { fontSizes } from '@constants/app.constant';
import React from 'react';
import { Platform, Text, TextProps } from 'react-native';

interface Props extends TextProps {
	className?: string;
	children: React.ReactNode;
	fontSize?: keyof typeof fontSizes;
	weight?: 'regular' | 'bold' | 'medium' | 'semibold' | 'extra-bold';
}

export default function MPText({ children, weight = 'regular', className, fontSize, ...props }: Props) {
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
						: weight === 'extra-bold'
							? 'font-manrope-extrabold'
							: undefined;
	/**
	|--------------------------------------------------
	| Ios font
	|--------------------------------------------------
	*/
	const iosFontFamily =
		weight === 'bold'
			? 'font-manrope-bold-ios'
			: weight === 'regular'
				? 'font-manrope-regular-ios'
				: weight === 'medium'
					? 'font-manrope-medium-ios'
					: weight === 'semibold'
						? 'font-manrope-semibold-ios'
						: weight === 'extra-bold'
							? 'font-manrope-extrabold-ios'
							: undefined;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Text
			{...props}
			style={[{ lineHeight: 20, fontSize: fontSizes[fontSize || 'FONT14'] }, props.style]}
			className={`text-base leading-9 ${Platform.OS === 'ios' ? iosFontFamily : fontFamily} ${className}`}
		>
			{children}
		</Text>
	);
}
