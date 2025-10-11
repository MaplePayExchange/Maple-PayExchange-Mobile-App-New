/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import {
	View,
	Modal,
	Platform,
	Keyboard,
	Pressable,
	TextInput,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import Countries from '@/data/country.json';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import InputField from '@/src/components/InputField';
import CalendarModal from '@/src/components/Calendar';
import { ROUTE_NAMES } from '@/constants/routes.conts';
import { useCreateUser } from '@/services/auth.services';
import { RootStackParamList } from '@/types/route.params';
import { getDeviceHardwareId } from '@/hooks/getDeviceHardwareId';
import AutocompleteExample from '@/src/components/PlacesAutoComplete';
import { CalendarIcon, CarretDownIcon, CloseIcon, SearchIcon } from '@/assets/svgs';

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type CreateUserScreenProps = NativeStackNavigationProp<RootStackParamList, 'CreateUserScreen'>;

export default function CreateUserScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<CreateUserScreenProps>();

	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { verificationData } = useUserStore();
	const { mutate, isPending } = useCreateUser();
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [birthDate, setBirthDate] = React.useState<Date | string | null>(
		`${2010}-${new Date().getMonth() + 1}-${new Date().getDate()}`
	);
	const [showCalendarModal, setShowCalendarModal] = React.useState<boolean>(false);
	const [showCountriesModal, setShowCountriesModal] = React.useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = React.useState<(typeof Countries)[0] | null>(null);

	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const {
		control,
		setValue,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		defaultValues: {
			address: '',
			lastName: '',
			referral: '',
			password: '',
			firstName: '',
			middleName: '',
			maidenLastName: '',
		},
	});

	/**
	|--------------------------------------------------
	| OnSubmit
	|--------------------------------------------------
	*/
	const onSubmit = async (data: any) => {
		/**
		|--------------------------------------------------
		| Gets the device's id
		|--------------------------------------------------
		*/
		const deviceId = (await getDeviceHardwareId()) ?? `${data.lastName}${data.firstName}${verificationData?.email}`;

		let payload: any = {
			deviceId: deviceId,
			address: data?.address,
			password: data?.password,
			birthDate: birthDate as string,
			lastName: data?.lastName.trim(),
			firstName: data?.firstName.trim(),
			country: selectedCountry?.name as string,
			phone: verificationData?.phoneNumber as string,
			email: verificationData?.email?.trim() as string,
			sessionId: verificationData?.sessionId as string,
		};

		console.log(verificationData);

		if (data.referral !== '') payload.referral = data.referral;
		if (data.middleName !== '') payload.middleName = data.middleName;
		if (data.maidenLastName !== '') payload.maidenLastName = data.maidenLastName;

		/**
		|--------------------------------------------------
		| Api call to create the user
		|--------------------------------------------------
		*/
		mutate(payload);
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			{/**
			|--------------------------------------------------
			| Header
			|--------------------------------------------------
			*/}
			<HeaderWrapper
				title="Create Your Account"
				onlClick={() => navigation.navigate('OnboardingScreen')}
				subtitle="Ensure you enter your legal names as shown on your government-issued identity document"
			/>

			{/**
			|--------------------------------------------------
			| Form
			|--------------------------------------------------
			*/}
			<KeyboardAvoidingView
				className="flex-1 mt-8"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 64}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View className="flex-1">
							{/**
							|--------------------------------------------------
							| Country of residence
							|--------------------------------------------------
							*/}
							<MPText weight="medium" className="text-sm">
								Country of residence
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowCountriesModal(true)}
								className="h-[42px] bg-[#1018280D] justify-between rounded-[12px] flex-row items-center px-3"
							>
								<MPText className="text-[#767676]" weight="medium">
									{selectedCountry?.name || 'Choose country of residence'}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
								|--------------------------------------------------
								| Modal for country of residence
								|--------------------------------------------------
								*/}
								<Modal animationType="slide" transparent visible={showCountriesModal}>
									<View className="w-full bg-white mt-auto h-[78%] rounded-t-3xl p-6">
										<View
											className="items-center justify-between mb-4"
											style={{ flexDirection: 'row' }}
										>
											<MPText weight="semibold" className="text-base">
												Country of residence
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowCountriesModal(false)}>
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
										| List of countries
										|--------------------------------------------------
										*/}
										<ScrollView>
											{Countries.filter((item) =>
												item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
											).map((country) => (
												<Pressable
													key={country.name}
													onPress={() => {
														setSelectedCountry(country);
														setShowCountriesModal(false);
													}}
													className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
												>
													<MPText>{country.flag}</MPText>
													<MPText className="text-sm text-[#1A1A1A]">{country.name}</MPText>
												</Pressable>
											))}
										</ScrollView>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
							|--------------------------------------------------
							| Address
							|--------------------------------------------------
							*/}
							<View className="mt-6">
								<MPText weight="medium" className="text-sm">
									Address
								</MPText>

								{/**
								|--------------------------------------------------
								| Address
								|--------------------------------------------------
								*/}
								<AutocompleteExample
									onSelect={(value) => {
										console.log(value);
										setValue('address', value);
									}}
								/>
							</View>

							<View className="gap-6 flex-1 mt-6">
								{/**
								|--------------------------------------------------
								| First name
								|--------------------------------------------------
								*/}
								<InputField
									type="text"
									name="firstName"
									control={control}
									label="First name (as it is on your ID)"
									placeholder="Enter your legal first name"
									rules={{
										required: {
											value: true,
											message: 'First name is required',
										},
										minLength: {
											value: 3,
											message: 'Must be at least 3 characters',
										},
									}}
								/>

								{/**
								|--------------------------------------------------
								| Middle name
								|--------------------------------------------------
								*/}
								<InputField
									type="text"
									name="middleName"
									control={control}
									label="Middle name (optional)"
									placeholder="Enter your legal middle name"
								/>

								{/**
								|--------------------------------------------------
								| Last name
								|--------------------------------------------------
								*/}
								<InputField
									type="text"
									name="lastName"
									control={control}
									label="Last name (as it is on your ID)"
									placeholder="Enter your legal last name"
									rules={{
										required: {
											value: true,
											message: 'Last name is required',
										},
										minLength: {
											value: 3,
											message: 'Must be at least 3 characters',
										},
									}}
								/>

								{/**
								|--------------------------------------------------
								| Last name
								|--------------------------------------------------
								*/}
								<View>
									<InputField
										type="text"
										control={control}
										name="maidenLastName"
										label="Maiden last name (optional)"
										placeholder="Enter your maiden last name"
										rules={{
											minLength: {
												value: 3,
												message: 'Must be at least 3 characters',
											},
										}}
									/>
									<MPText className="text-sm mt-1">
										(Please fill this field if BVN is registered in your maiden name)
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Birthday
								|--------------------------------------------------
								*/}
								<View>
									<MPText weight="medium" className="text-sm mb-2">
										Birthday
									</MPText>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => setShowCalendarModal(true)}
										className="h-[42px] bg-[#1018280D] justify-between rounded-[12px] flex-row items-center px-3"
									>
										<MPText className="text-[#484848]" weight="medium">
											{birthDate?.toString() || ''}
										</MPText>

										{/**
										|--------------------------------------------------
										| Calendar icon
										|--------------------------------------------------
										*/}
										<CalendarIcon />

										{/**
										|--------------------------------------------------
										| Calendar
										|--------------------------------------------------
										*/}
										<Modal animationType="slide" transparent visible={showCalendarModal}>
											<CalendarModal
												onApply={(date) => {
													setBirthDate(date as string);
												}}
												initialDate={birthDate as string}
												onClose={() => setShowCalendarModal(false)}
											/>
										</Modal>
									</TouchableOpacity>
								</View>

								{/**
								|--------------------------------------------------
								| Password
								|--------------------------------------------------
								*/}
								<InputField
									type="password"
									name="password"
									label="Password"
									control={control}
									placeholder="Password"
									rules={{
										minLength: {
											value: 8,
											message: 'Must be at least 8 characters',
										},
										required: { value: true, message: 'Password is requires' },
										pattern: {
											value: passwordRegex,
											message: 'Make sure your password matches all required checks',
										},
									}}
								/>
								<View className="-translate-y-2">
									<MPText
										weight="medium"
										style={{ fontSize: 12 }}
										className={clsx('text-xs text-[#767676] leading-6')}
									>
										Min 8 characters
									</MPText>
									<MPText
										weight="medium"
										style={{ fontSize: 12 }}
										className={clsx('text-xs text-[#767676] leading-6')}
									>
										At least 1 uppercase
									</MPText>
									<MPText
										weight="medium"
										style={{ fontSize: 12 }}
										className={clsx('text-xs text-[#767676] leading-6')}
									>
										At least 1 special character (e.g &%$#*)
									</MPText>
									<MPText
										weight="medium"
										style={{ fontSize: 12 }}
										className={clsx('text-xs text-[#767676] leading-6')}
									>
										At least 1 number
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Referral code
								|--------------------------------------------------
								*/}
								<InputField
									type="text"
									name="referral"
									control={control}
									placeholder="Referral code"
									label="Referral code (optional)"
								/>
							</View>

							{/**
							|--------------------------------------------------
							| Button
							|--------------------------------------------------
							*/}
							<MPButton
								className="mt-6"
								isLoading={isPending}
								onPress={handleSubmit(onSubmit)}
								disabled={!isValid || birthDate === null || selectedCountry === null || isPending}
								useGradientBg={isValid && typeof birthDate === 'string' && selectedCountry !== null}
							>
								<MPText
									weight="semibold"
									className={clsx(isValid ? 'text-white' : 'text-[#D1D1D1] text-sm')}
								>
									Continue
								</MPText>
							</MPButton>

							{/**
							|--------------------------------------------------
							| Already have an account
							|--------------------------------------------------
							*/}
							<MPText className="text-sm text-center mt-6">
								<MPText className="text-[#484848]">Already have an account? </MPText>
								<MPText
									onPress={() => navigation.navigate(ROUTE_NAMES.LOGIN, {})}
									className="text-[#FF6A00]"
								>
									Log in
								</MPText>
							</MPText>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
