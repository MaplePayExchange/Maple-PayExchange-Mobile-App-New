/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Svg, Path as _Path, Stop, Defs, G, LinearGradient, ClipPath, Rect } from 'react-native-svg';
import { View, TextInputProps, TextInput, Pressable, Modal, TouchableOpacity, ScrollView } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import CountriesData from '@/data/country.json';
import { CarretDownIcon, CloseIcon, ErrorInfoIcon, EyeIcon, SearchIcon } from '@/assets/svgs';

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
interface Props<T extends FieldValues> extends TextInputProps {
	name: Path<T>;
	rules?: object;
	label?: string;
	isLoading?: boolean;
	control: Control<T>;
	wrapperClassName?: string;
	getCountryCode?: (value: string) => void;
	type?: 'phone' | 'email' | 'text' | 'password';
}

interface CountryCode {
	name: string;
	flag: string;
	code: string;
	dial_code: string;
}

export default function InputField<T extends FieldValues>({
	name,
	label,
	control,
	isLoading,
	rules = {},
	type = 'text',
	getCountryCode,
	wrapperClassName,
	...rest
}: Props<T>) {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [visible, setVisible] = React.useState<boolean>(false);
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [phoneInput, setPhoneInput] = React.useState<CountryCode | null>(null);

	/**
    |--------------------------------------------------
    | Gets the country code
    |--------------------------------------------------
    */
	React.useEffect(() => {
		if (type === 'phone' && phoneInput === null) {
			setPhoneInput(CountriesData[0]);
			getCountryCode?.(CountriesData[0].dial_code);
		}
	}, []);

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
								<MPText weight="medium" className="text-sm mb-1.5">
									{label}
								</MPText>
							)}

							<View
								style={{ flexDirection: 'row' }}
								className={clsx(
									'rounded-[12px] px-4 text-base bg-[#1018280D] min-h-[42px] items-center',
									wrapperClassName
								)}
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
											{phoneInput?.flag}
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
									<TextInput value={phoneInput?.dial_code} className="pointer-events-none pr-0.5" />
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
									style={{ color: 'black' }}
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
									<View className={clsx(type === 'password' ? '' : 'ml-auto')}>
										<ErrorInfoIcon />
									</View>
								)}

								{/**
								|--------------------------------------------------
								| Loading
								|--------------------------------------------------
								*/}
								{isLoading && (
									<View className="ml-auto">
										<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
											<G clipPath="url(#clip0_5_1384)">
												<_Path
													d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
													stroke="url(#paint0_linear_5_1384)"
													strokeWidth="1.66667"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</G>
											<Defs>
												<LinearGradient
													id="paint0_linear_5_1384"
													x1="10.0001"
													y1="1.66663"
													x2="10.0001"
													y2="18.3333"
													gradientUnits="userSpaceOnUse"
												>
													<Stop stopColor="#EE0979" />
													<Stop offset="1" stopColor="#FF6A00" />
												</LinearGradient>
												<ClipPath id="clip0_5_1384">
													<Rect width="20" height="20" fill="white" />
												</ClipPath>
											</Defs>
										</Svg>
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
				<View className="w-full bg-white mt-auto h-[70%] rounded-t-3xl p-6">
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
					| Content
					|--------------------------------------------------
					*/}
					<View className="h-[42px] mb-3 bg-[#1018280D] justify-between rounded-[24px] flex-row items-center px-5">
						<TextInput
							className="text-sm"
							value={searchQuery}
							placeholder="Search"
							placeholderTextColor="#484848"
							onChangeText={(value) => setSearchQuery(value)}
						/>

						{/**
						|--------------------------------------------------
						| Search icon
						|--------------------------------------------------
						*/}
						<SearchIcon />
					</View>

					{/**
                    |--------------------------------------------------
                    | Country code
                    |--------------------------------------------------
                    */}
					<ScrollView>
						{CountriesData.filter((item) =>
							item.name.toLowerCase().includes(searchQuery.toLowerCase())
						).map((_code) => (
							<TouchableOpacity
								key={_code.code}
								activeOpacity={0.8}
								className="items-center gap-3 mb-4"
								style={{ flexDirection: 'row' }}
								onPress={() => {
									setPhoneInput(_code);
									getCountryCode?.(_code.dial_code);
									setVisible(false);
								}}
							>
								{/**
								|--------------------------------------------------
								| Flag icon
								|--------------------------------------------------
								*/}
								<MPText>{_code.flag}</MPText>

								{/**
								|--------------------------------------------------
								| Label
								|--------------------------------------------------
								*/}
								<MPText>
									{_code.code} - {_code.dial_code}
								</MPText>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</Modal>
		</React.Fragment>
	);
}
