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

/**
 |--------------------------------------------------
 | Interface
|--------------------------------------------------
*/
type ListProps = {
	items: string[];
	textClassName?: string;
	bulletClassName?: string;
	type?: 'ordered' | 'unordered';
};

export default function List({ items, type = 'ordered', bulletClassName, textClassName }: ListProps) {
	/**
    |--------------------------------------------------
    | Renedered view
    |--------------------------------------------------
    */
	return (
		<View className="gap-4">
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
						<MPText className={clsx('mr-2 text-sm', bulletClassName)}>{'\u2022'}</MPText>
					) : (
						<MPText className={clsx('mr-2 text-sm', bulletClassName)}>{index + 1}.</MPText>
					)}

					{/**
                    |--------------------------------------------------
                    | Text
                    |--------------------------------------------------
                    */}
					<MPText weight="medium" className={clsx('flex-1 text-sm', textClassName)}>
						{item}
					</MPText>
				</View>
			))}
		</View>
	);
}
