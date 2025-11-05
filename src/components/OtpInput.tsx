/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import { View, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';

interface OTPInputProps {
	length?: number;
	className?: string;
	autoFocus?: boolean;
	inputClassName?: string;
	onComplete: (code: string) => void;
}

export default function OTPInput({
	className,
	length = 6,
	onComplete,
	inputClassName,
	autoFocus = true,
}: OTPInputProps) {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const inputsRef = useRef<Array<TextInput | null>>([]);
	const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

	/**
  |--------------------------------------------------
  | Handles input / paste
  |--------------------------------------------------
  */
	const handleChange = (text: string, index: number) => {
		let newOtp = [...otp];

		/**
		|--------------------------------------------------
		| If user pastes multiple characters
		|--------------------------------------------------
		*/
		if (text.length > 1) {
			const chars = text.split('').slice(0, length - index);
			chars.forEach((char, i) => {
				newOtp[index + i] = char;
			});

			setOtp(newOtp);

			/**
			|--------------------------------------------------
			| Focus the next empty box if available
			|--------------------------------------------------
			*/
			const nextIndex = index + text.length - 1;
			if (nextIndex < length) {
				inputsRef.current[nextIndex]?.focus();
			}

			if (newOtp.every((digit) => digit !== '')) {
				onComplete(newOtp.join(''));
			}
			return;
		}

		/**
		|--------------------------------------------------
		| Normal single character input
		|--------------------------------------------------
		*/
		newOtp[index] = text;
		setOtp(newOtp);

		if (text && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}

		if (newOtp.every((digit) => digit !== '')) {
			onComplete(newOtp.join(''));
		}
	};

	/**
    |--------------------------------------------------
    | Handles backspace
    |--------------------------------------------------
    */
	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className={clsx('flex-row justify-between', className)}>
			{otp.map((digit, index) => (
				<TextInput
					key={index}
					value={digit}
					keyboardType="numeric"
					autoFocus={autoFocus && index === 0}
					onKeyPress={(e) => handleKeyPress(e, index)}
					ref={(ref) => (inputsRef.current[index] = ref) as any}
					onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
					className={clsx(
						'w-12 h-12 flex-row items-center rounded-lg mx-1 text-center font-semibold bg-[#1018280D] text-black',
						inputClassName
					)}
				/>
			))}
		</View>
	);
}
