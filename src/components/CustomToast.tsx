/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Svg, { Path } from 'react-native-svg';
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
			{theme === 'light' ? (
				<Svg width={24} height={24} viewBox="0 0 24 24" style={{ marginRight: 8, marginTop: 2 }}>
					<Path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
						fill="green"
					/>
				</Svg>
			) : (
				<Svg width={24} height={24} viewBox="0 0 24 24" style={{ marginRight: 8, marginTop: 2 }}>
					<Path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"
						fill="red"
					/>
				</Svg>
			)}

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
				<Svg width={20} height={20} viewBox="0 0 24 24">
					<Path
						d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
						fill={'#333'}
					/>
				</Svg>
			</TouchableOpacity>
		</View>
	);
}
