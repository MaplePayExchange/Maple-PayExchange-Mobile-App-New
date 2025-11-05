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

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return <View className={clsx('bg-[#F9F9F9] p-5 rounded-3xl', className)}>{children}</View>;
}
