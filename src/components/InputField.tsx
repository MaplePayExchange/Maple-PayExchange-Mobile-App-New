/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { View, Text, TextInputProps, TextInput, Pressable, Modal, Image, TouchableOpacity } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import { CarretDownIcon, CloseIcon, ErrorInfoIcon, EyeIcon } from '@/assets/svgs';
import { FLAG_CANADA, FLAG_NIGERIA } from '@/constants/app.constant';

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
interface Props<T extends FieldValues> extends TextInputProps {
	name: Path<T>;
	rules?: object;
	label?: string;
	control: Control<T>;
	getCountryCode?: (value: string) => void;
	type?: 'phone' | 'email' | 'text' | 'password';
}

const COUNTRY_CODES = [
	{ code: '+1', 'short-name': 'CAD', 'long-name': 'Canada', flag: FLAG_CANADA },
	{ code: '+234', 'short-name': 'NGN', 'long-name': 'Nigeria', flag: FLAG_NIGERIA },
];

export default function InputField<T extends FieldValues>({
	name,
	label,
	control,
	rules = {},
	type = 'text',
	getCountryCode,
	...rest
}: Props<T>) {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [visible, setVisible] = React.useState<boolean>(false);
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [phoneInput, setPhoneInput] = React.useState<(typeof COUNTRY_CODES)[0] | null>(null);

	/**
    |--------------------------------------------------
    | Gets the country code
    |--------------------------------------------------
    */
	React.useEffect(() => {
		if (phoneInput === null) {
			setPhoneInput(COUNTRY_CODES[0]);
			getCountryCode?.(COUNTRY_CODES[0].code);
		}
	}, []);

	console.log(showPassword);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<React.Fragment>
			<Animated.View entering={FadeInDown.duration(100).springify()}>
				<Controller
					name={name}
					rules={rules}
					control={control}
					render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
						<View className="">
							{/**
                            |--------------------------------------------------
                            | Label
                            |--------------------------------------------------
                            */}
							{label && (
								<MPText weight="medium" className="text-sm">
									{label}
								</MPText>
							)}

							<View
								style={{ flexDirection: 'row' }}
								className={clsx('rounded-[12px] px-4 text-base bg-[#1018280D] h-[42px] items-center')}
							>
								{/**
                                |--------------------------------------------------
                                | If the type is phone
                                |--------------------------------------------------
                                */}
								{type === 'phone' && (
									<Pressable
										style={{ flexDirection: 'row' }}
										className="items-center w-[50px]"
										onPress={() => setVisible(!visible)}
									>
										<MPText weight="medium" className="text-sm text-[#333333]">
											{phoneInput?.['short-name']}
										</MPText>
										<CarretDownIcon />
									</Pressable>
								)}

								{/**
                                |--------------------------------------------------
                                | Text input
                                |--------------------------------------------------
                                */}
								{type === 'phone' && (
									<TextInput value={phoneInput?.code} className="pointer-events-none pr-0.5" />
								)}
								<TextInput
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									placeholderClassName="text-sm"
									placeholderTextColor="#767676"
									className="max-w-[90%] min-w-[40%]"
									key={showPassword ? 'visible' : 'hidden'}
									{...rest}
									secureTextEntry={type === 'password' && !showPassword}
								/>

								{type === 'password' && (
									<Pressable
										onPress={() => {
											setShowPassword((prev) => !prev);
										}}
										className="ml-auto w-[20px]"
									>
										<EyeIcon />
									</Pressable>
								)}

								{/**
								|--------------------------------------------------
								| Error for icon
								|--------------------------------------------------
								*/}
								{error && (
									<View className="ml-auto">
										<ErrorInfoIcon />
									</View>
								)}
							</View>

							{/**
                            |--------------------------------------------------
                            | Error message
                            |--------------------------------------------------
                            */}
							{error && (
								<MPText weight="medium" className="text-xs text-[#D92D20]">
									{error.message || 'Invalid input'}
								</MPText>
							)}
						</View>
					)}
				/>
			</Animated.View>

			{/**
            |--------------------------------------------------
            | Modal for Phone number selection
            |--------------------------------------------------
            */}
			<Modal animationType="slide" transparent visible={visible}>
				<View className="w-full bg-white mt-auto h-[50%] rounded-t-3xl p-6">
					<View className="items-center justify-between mb-4" style={{ flexDirection: 'row' }}>
						<MPText weight="semibold" className="text-base">
							Country code
						</MPText>

						{/**
                        |--------------------------------------------------
                        | Close icon
                        |--------------------------------------------------
                        */}
						<Pressable onPress={() => setVisible(false)}>
							<CloseIcon />
						</Pressable>
					</View>

					{/**
                    |--------------------------------------------------
                    | Country code
                    |--------------------------------------------------
                    */}
					{COUNTRY_CODES.map((_code) => (
						<TouchableOpacity
							activeOpacity={0.8}
							key={_code['short-name']}
							className="items-center gap-3"
							style={{ flexDirection: 'row' }}
							onPress={() => {
								setPhoneInput(_code);
								getCountryCode?.(_code.code);
								setVisible(false);
							}}
						>
							{/**
							|--------------------------------------------------
							| Flag icon
							|--------------------------------------------------
							*/}
							<Image source={_code.flag} className="w-[20px] h-[20px]" />

							{/**
							|--------------------------------------------------
							| Label
							|--------------------------------------------------
							*/}
							<MPText>
								{_code.code} - {_code['short-name']}
							</MPText>
						</TouchableOpacity>
					))}
				</View>
			</Modal>
		</React.Fragment>
	);
}
