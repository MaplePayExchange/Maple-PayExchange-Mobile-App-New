/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

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
interface Props {
	length?: number;
	onComplete?: (pin: string) => void;
}

export default function CustomKeyboard({ length = 4, onComplete }: Props) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [pin, setPin] = React.useState<string[]>([]);

	/**
    |--------------------------------------------------
    | Handles pressing the keys
    |--------------------------------------------------
    */
	const handlePress = (num: string) => {
		/**
        |--------------------------------------------------
        | Checks if the length of the input is maxed out
        |--------------------------------------------------
        */
		if (pin.length < length) {
			const newPin = [...pin, num];
			setPin(newPin);

			/**
            |--------------------------------------------------
            | Runs the onComplete function if the input lenght
            | is maxed out
            |--------------------------------------------------
            */
			if (newPin.length === length && onComplete) {
				onComplete(newPin.join(''));
			}
		}
	};

	/**
    |--------------------------------------------------
    | Handles deleting an input
    |--------------------------------------------------
    */
	const handleDelete = () => {
		setPin(pin.slice(0, -1));
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className="max-w-[260px] w-full self-center">
			{/**
            |--------------------------------------------------
            | PIN Boxes
            |--------------------------------------------------
            */}
			<View className="flex-row justify-center mb-12">
				{Array.from({ length }).map((_, index) => (
					<View
						key={index}
						className={`w-12 h-12 mx-2 rounded-xl flex bg-[#F7F7F7] items-center justify-center`}
					>
						{pin[index] && <View className="w-3 h-3 rounded-full bg-green-500" />}
					</View>
				))}
			</View>

			{/**
            |--------------------------------------------------
            | Keypad
            |--------------------------------------------------
            */}
			<View>
				{[
					['1', '2', '3'],
					['4', '5', '6'],
					['7', '8', '9'],
					['', '0', '⌫'],
				].map((row, rowIndex) => (
					<View key={rowIndex} className="flex-row my-2 justify-between">
						{row.map((key, keyIndex) => (
							<TouchableOpacity
								key={keyIndex}
								onPress={() => {
									if (key === '⌫') handleDelete();
									else if (key) handlePress(key);
								}}
								className={`w-16 h-16 mb-[7%] rounded-full flex items-center justify-center ${key ? 'bg-gray-100' : 'bg-transparent'}`}
							>
								<MPText weight="medium" style={{ lineHeight: 30 }} className="text-2xl">
									{key}
								</MPText>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
		</View>
	);
}
