/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { TextStyle, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from './MPText';

/**
 |--------------------------------------------------
 | Interface
|--------------------------------------------------
*/
type ListProps = {
	gap?: string;
	items: string[];
	startIndex?: number;
	boldenText?: boolean;
	customLabel?: string;
	textStyle?: TextStyle;
	textClassName?: string;
	bulletClassName?: string;
	type?: 'ordered' | 'unordered';
};

export default function List({
	items,
	textStyle,
	boldenText,
	startIndex,
	customLabel,
	textClassName,
	gap = 'gap-4',
	bulletClassName,
	type = 'ordered',
}: ListProps) {
	/**
    |--------------------------------------------------
    | Renedered view
    |--------------------------------------------------
    */
	return (
		<View className={gap}>
			{/**
            |--------------------------------------------------
            | Items
            |--------------------------------------------------
            */}
			{items?.map((item, index) => (
				<View key={index} className="flex-row items-start">
					{/**
                    |--------------------------------------------------
                    | Type
                    |--------------------------------------------------
                    */}
					{type === 'unordered' ? (
						<MPText
							style={[textStyle]}
							weight={boldenText ? 'bold' : 'medium'}
							className={clsx('mr-2 text-[15px]', bulletClassName)}
						>
							{customLabel ? customLabel : '\u2022'}
						</MPText>
					) : (
						<MPText
							style={[textStyle]}
							weight={boldenText ? 'bold' : 'medium'}
							className={clsx('mr-2 text-[15px]', bulletClassName)}
						>
							{customLabel ? customLabel : (startIndex || 0) + index + 1}.
						</MPText>
					)}

					{/**
                    |--------------------------------------------------
                    | Text
                    |--------------------------------------------------
                    */}
					<MPText
						style={[textStyle]}
						weight={boldenText ? 'bold' : 'medium'}
						className={clsx('flex-1', textClassName)}
					>
						{item}
					</MPText>
				</View>
			))}
		</View>
	);
}
