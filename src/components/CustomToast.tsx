/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/
interface CustomToastProps {
	theme?: any;
	text1: string;
	text2?: string;
	hide?: () => void;
}

export default function CustomToast({ text1, text2, hide, theme }: CustomToastProps) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View
			style={{
				padding: 16,
				elevation: 2,
				borderWidth: 1,
				borderRadius: 8,
				shadowRadius: 4,
				shadowOpacity: 0.1,
				flexDirection: 'row',
				shadowColor: '#000',
				borderColor: 'transparent',
				alignItems: 'flex-start',
				shadowOffset: { width: 0, height: 2 },
				width: Dimensions.get('window').width - 40,
				backgroundColor: theme === 'light' ? '#E8FCE5' : '#fcdddc',
			}}
		>
			{/**
            |--------------------------------------------------
            | Icon
            |--------------------------------------------------
            */}
			<MaterialIcons
				size={24}
				style={{ marginRight: 8, marginTop: 2 }}
				color={theme === 'light' ? 'green' : 'red'}
				name={theme === 'light' ? 'check-circle' : 'error'}
			/>

			{/**
            |--------------------------------------------------
            | Message
            |--------------------------------------------------
            */}
			<View style={{ flex: 1, paddingHorizontal: 6 }}>
				{text1 && <Text style={{ fontSize: 13, color: '#333', marginTop: 2 }}>{JSON.stringify(text1)}</Text>}
				{text2 && <Text style={{ fontSize: 13, color: '#333', marginTop: 2 }}>{text2.toString()}</Text>}
			</View>

			{/**
            |--------------------------------------------------
            | Close Button
            |--------------------------------------------------
            */}
			<TouchableOpacity onPress={hide}>
				<MaterialIcons name="close" size={20} color="#333" />
			</TouchableOpacity>
		</View>
	);
}
