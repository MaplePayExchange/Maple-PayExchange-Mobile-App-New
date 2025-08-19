/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function Container({ children }: { children: React.ReactNode }) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return <View className="bg-[#F9F9F9] p-5 rounded-3xl">{children}</View>;
}
