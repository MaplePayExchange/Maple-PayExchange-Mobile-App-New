/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import {
	View,
	Modal,
	Keyboard,
	Platform,
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

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import Countries from '@data/country.json';
import MPText from '@src/components/MPText';
import Checkbox from '@src/components/Checkbox';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { fontSizes } from '@constants/app.constant';
import InputField from '@src/components/InputField';
import { useUpdateProfile } from '@services/user.services';
import TooltipPopover from '@src/components/TooltipPopover';
import { CarretDownIcon, CloseIcon, SearchIcon } from '@assets/svgs';
import utils from '@lib/utils';

export interface UserKycInfo {
	occupation: string;
	usagePurpose: string;
	annualSalaryRange: string;
	usagePurposeOthers: string;
	primarySourceOfFunds: string;
	isPolliticallyExposed: boolean;
	primarySourceOfFundsOthers: string;
	countryUserMostlySendsMoneyTo: string;
}

export default function TailorYourExperienceScreen() {
	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation();
	const { setTailorYourExperienceSkipCount, tailorYourExperienceSkipCount } = useUserStore();

	/**
    |--------------------------------------------------
    | states
    |--------------------------------------------------
    */
	const [showOccupation, setShowOccupation] = React.useState<boolean>(false);
	const [showSalaryRange, setShowSalaryRange] = React.useState<boolean>(false);
	const [showUsagePurpose, setShowUsagePurpose] = React.useState<boolean>(false);
	const [showSourceOfIncome, setShowSourceOfIncome] = React.useState<boolean>(false);
	const [showCountriesModal, setShowCountriesModal] = React.useState<boolean>(false);
	const [showIsPoliticallyExposed, setShowIsPoliticallyExposed] = React.useState<boolean>(false);

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [selectedOccupation, setSelectedOccupation] = React.useState<string | null>(null);
	const [selectedUsagePurpose, setSelectedUsagePurpose] = React.useState<string | null>(null);
	const [selectedSourceOfIncome, setSelectedSourceOfIncome] = React.useState<string | null>(null);
	const [selectedCountries, setSelectedCountries] = React.useState<Array<(typeof Countries)[0]>>([]);

	/**
    |--------------------------------------------------
    | Form handler
    |--------------------------------------------------
    */
	const {
		watch,
		control,
		setValue,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		defaultValues: {
			occupation: '',
			usagePurpose: '',
			annualSalaryRange: '',
			usagePurposeOthers: '',
			primarySourceOfFunds: '',
			isPolliticallyExposed: false,
			primarySourceOfFundsOthers: '',
			countryUserMostlySendsMoneyTo: '',
		},
	});

	const { mutate, isPending } = useUpdateProfile();

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const isUsagePurposeOthers = watch('usagePurposeOthers');
	const isSourceOfIncomeOthers = watch('primarySourceOfFundsOthers');

	const isValidInput =
		(isUsagePurposeOthers.length !== 0 || watch('usagePurpose').length !== 0) &&
		(isSourceOfIncomeOthers.length !== 0 || watch('primarySourceOfFunds').length !== 0) &&
		watch('occupation').length !== 0 &&
		watch('annualSalaryRange').length !== 0 &&
		selectedCountries.length !== 0;

	/**
    |--------------------------------------------------
    | Submit handler
    |--------------------------------------------------
    */
	const onSubmit = (data: UserKycInfo) => {
		let payload: any = {
			occupation: data.occupation,
			annualSalaryRange: data.annualSalaryRange,
			isPolliticallyExposed: data.isPolliticallyExposed,
			countryUserMostlySendsMoneyTo: selectedCountries.join(', '),
		};

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		if (data.usagePurposeOthers.length > 0) payload.usagePurpose = data.usagePurposeOthers;
		if (data.primarySourceOfFundsOthers.length > 0) payload.primarySourceOfFunds = data.primarySourceOfFundsOthers;

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		mutate(payload);
	};

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	React.useEffect(() => {
		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		if (isUsagePurposeOthers.length > 0) {
			setValue('usagePurpose', '');
			setSelectedUsagePurpose(null);
		}

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		if (isSourceOfIncomeOthers.length > 0) {
			setValue('primarySourceOfFunds', '');
			setSelectedSourceOfIncome(null);
		}

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
	}, [isUsagePurposeOthers, isSourceOfIncomeOthers]);

	/**
	|--------------------------------------------------
	| Prevent leaving screen until verification
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
			if ((tailorYourExperienceSkipCount || 0) >= 2) {
				e.preventDefault();
				utils.errorHandler(undefined, 'You need to complete the form below to continue');
			}
		});

		/**
		|--------------------------------------------------
		| ..
		|--------------------------------------------------
		*/
		return unsubscribe;
	}, [navigation, tailorYourExperienceSkipCount]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper className="">
			{/**
            |--------------------------------------------------
            | Header
            |--------------------------------------------------
            */}
			<HeaderWrapper
				titleFontSize="FONT24"
				subTitleFontSize="FONT14"
				title="Tailor Your Experience"
				subtitle="Select what best fits you. We need this information for regulatory purposes."
			/>

			{/**
            |--------------------------------------------------
            | Form
            |--------------------------------------------------
            */}
			<KeyboardAvoidingView
				className="mt-8 flex-1"
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
							<MPText weight="medium" className="mb-1 text-[15px]" fontSize="FONT14">
								Where do you mostly send money to?
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowCountriesModal(true)}
								className="min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<View className="flex-1 flex-row flex-wrap gap-1">
									{selectedCountries.length > 0 ? (
										selectedCountries.map((country) => (
											<Pressable
												key={country.name}
												className="flex-row gap-2"
												style={{ marginInline: 3 }}
												onPress={() => {
													/**
                                                    |--------------------------------------------------
                                                    | ...
                                                    |--------------------------------------------------
                                                    */
													setSelectedCountries((prevSelection) => {
														const selections = [...prevSelection];
														const newSelection = selections.filter(
															(selection) =>
																selection.name.toLowerCase() !==
																country.name.toLowerCase()
														);

														return newSelection;
													});
												}}
											>
												<MPText className="text-[#767676]" weight="medium">
													{country.name}
												</MPText>

												{/**
                                                |--------------------------------------------------
                                                | ...
                                                |--------------------------------------------------
                                                */}
												<View className="pointer-events-none">
													<CloseIcon />
												</View>
											</Pressable>
										))
									) : (
										<MPText className="text-[#767676]" weight="medium">
											Choose country
										</MPText>
									)}
								</View>

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
									<View className="mt-auto h-[78%] w-full rounded-t-3xl bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
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
										<View className="mb-3 h-[42px] flex-row items-center justify-between rounded-[24px] bg-[#1018280D] px-5">
											<TextInput
												value={searchQuery}
												placeholder="Search"
												returnKeyType="done"
												className="text-[15px]"
												submitBehavior="blurAndSubmit"
												placeholderTextColor="#484848"
												style={{ fontSize: fontSizes['FONT14'] }}
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
														/**
                                                        |--------------------------------------------------
                                                        | If selected the selection is removed
                                                        |--------------------------------------------------
                                                        */
														if (
															selectedCountries
																?.map((country) => country.name.toLowerCase())
																?.some(
																	(_country) =>
																		country.name.toLowerCase() === _country
																)
														) {
															/**
                                                            |--------------------------------------------------
                                                            | ...
                                                            |--------------------------------------------------
                                                            */
															setSelectedCountries((prevSelection) => {
																const selections = [...prevSelection];
																const newSelection = selections.filter(
																	(selection) =>
																		selection.name.toLowerCase() !==
																		country.name.toLowerCase()
																);

																return newSelection;
															});

															/**
                                                            |--------------------------------------------------
                                                            | ...
                                                            |--------------------------------------------------
                                                            */
															return;
														}

														/**
                                                        |--------------------------------------------------
                                                        | Adds the selection
                                                        |--------------------------------------------------
                                                        */
														setSelectedCountries((prevSelection) => [
															...prevSelection,
															country,
														]);
													}}
													className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
												>
													<MPText>{country.flag}</MPText>
													<MPText fontSize="FONT14" className="text-[15px]  text-[#1A1A1A]">
														{country.name}
													</MPText>

													{/**
                                                    |--------------------------------------------------
                                                    | ...
                                                    |--------------------------------------------------
                                                    */}
													<Checkbox
														className="pointer-events-none ml-auto"
														checked={selectedCountries
															?.map((country) => country.name.toLowerCase())
															?.some(
																(_country) => country.name.toLowerCase() === _country
															)}
														onChange={() => {}}
													/>
												</Pressable>
											))}
										</ScrollView>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
							|--------------------------------------------------
							| What will you use Maple PayExchange for?
							|--------------------------------------------------
							*/}
							<MPText weight="medium" className="mb-1 mt-6 text-[15px]" fontSize="FONT14">
								What will you use Maple PayExchange for?
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowUsagePurpose(true)}
								className="mb-6 min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<MPText className="text-[#767676]" weight="medium">
									{selectedUsagePurpose || 'Select an option'}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
                                |--------------------------------------------------
                                | Modal
                                |--------------------------------------------------
                                */}
								<Modal animationType="slide" transparent visible={showUsagePurpose}>
									<View className="border-t-1 mt-auto h-[300px] w-full rounded-t-3xl border border-gray-200 bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
												Select an option
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowUsagePurpose(false)}>
												<CloseIcon />
											</Pressable>
										</View>

										{/**
                                        |--------------------------------------------------
                                        | Options
                                        |--------------------------------------------------
                                        */}
										<View>
											{[
												'Send money to family or friends',
												'Pay for goods or services',
												'Fund my Nigerian/Canadian bank account',
												'Business or freelance payments',
												'Savings or personal financial management',
											].map((option) => (
												<Pressable
													key={option}
													onPress={() => {
														setSelectedUsagePurpose(option);
														setValue('usagePurpose', option);
														setShowUsagePurpose(false);
													}}
													className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
												>
													<MPText fontSize="FONT14" className="text-[15px]  text-[#1A1A1A]">
														{option}
													</MPText>
												</Pressable>
											))}
										</View>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
                            |--------------------------------------------------
                            | Usage Purpose Others
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								control={control}
								name="usagePurposeOthers"
								label="Others (please specify)"
								rules={{
									minLength: {
										value: 3,
										message: 'Must be at least 3 characters',
									},
								}}
							/>

							{/**
							|--------------------------------------------------
							| What is your primary source of funds?
							|--------------------------------------------------
							*/}
							<MPText weight="medium" className="mb-1 mt-6 text-[15px]" fontSize="FONT14">
								What is your primary source of funds?
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowSourceOfIncome(true)}
								className="mb-6 min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<MPText className="text-[#767676]" weight="medium">
									{selectedSourceOfIncome || 'Select an option'}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
                                |--------------------------------------------------
                                | Modal
                                |--------------------------------------------------
                                */}
								<Modal animationType="slide" transparent visible={showSourceOfIncome}>
									<View className="border-t-1 mt-auto h-[300px] w-full rounded-t-3xl border border-gray-200 bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
												Select an option
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowSourceOfIncome(false)}>
												<CloseIcon />
											</Pressable>
										</View>

										{/**
                                        |--------------------------------------------------
                                        | Options
                                        |--------------------------------------------------
                                        */}
										<View>
											{[
												'Salary or Employment Income',
												'Business or Self-Employment Income',
												'Savings or Personal Funds',
												'Gift or Support from Family/Friends',
												'Investment Income (e.g., stocks, crypto, real estate)',
												'Pension or Retirement Benefits',
											].map((option) => (
												<Pressable
													key={option}
													onPress={() => {
														setSelectedSourceOfIncome(option);
														setValue('primarySourceOfFunds', option);
														setShowSourceOfIncome(false);
													}}
													className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
												>
													<MPText fontSize="FONT14" className="text-[15px]  text-[#1A1A1A]">
														{option}
													</MPText>
												</Pressable>
											))}
										</View>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
                            |--------------------------------------------------
                            | Source of income Others
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								control={control}
								name="primarySourceOfFundsOthers"
								label="Others (please specify)"
								rules={{
									minLength: {
										value: 3,
										message: 'Must be at least 3 characters',
									},
								}}
							/>

							{/**
							|--------------------------------------------------
							| Occupation
							|--------------------------------------------------
							*/}
							<MPText weight="medium" className="mb-1 mt-6 text-[15px]" fontSize="FONT14">
								Occupation
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowOccupation(true)}
								className="mb-6 min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<MPText className="text-[#767676]" weight="medium">
									{selectedOccupation || 'Select an option'}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
                                |--------------------------------------------------
                                | Modal
                                |--------------------------------------------------
                                */}
								<Modal animationType="slide" transparent visible={showOccupation}>
									<View className="border-t-1 mt-auto h-[70%] w-full rounded-t-3xl border border-gray-200 bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
												Select an option
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowOccupation(false)}>
												<CloseIcon />
											</Pressable>
										</View>

										{/**
                                        |--------------------------------------------------
                                        | Options
                                        |--------------------------------------------------
                                        */}
										<ScrollView showsVerticalScrollIndicator={false}>
											<View>
												{[
													'Software Developer',
													'Teacher / Educator',
													'Accountant',
													'Nurse',
													'Customer Service Representative',
													'Business Analyst',
													'Civil Engineer',
													'Sales Representative',
													'Banker / Financial Services Officer',
													'Administrative Assistant',
													'Entrepreneur / Business Owner',
													'Marketing Specialist',
													'Project Manager',
													'Graphic Designer',
													'Driver / Logistics Personnel',
													'Others',
												].map((option) => (
													<Pressable
														key={option}
														onPress={() => {
															setSelectedOccupation(option);
															setValue('occupation', option);
															setShowOccupation(false);
														}}
														className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
													>
														<MPText
															fontSize="FONT14"
															className="text-[15px]  text-[#1A1A1A]"
														>
															{option}
														</MPText>
													</Pressable>
												))}
											</View>
										</ScrollView>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
							|--------------------------------------------------
							| Are you a Politically Exposed Person (PEP)
							|--------------------------------------------------
							*/}
							<View className="mb-1 flex-row items-center gap-1">
								<MPText weight="medium" className="text-[15px]" fontSize="FONT14">
									Are you a Politically Exposed Person (PEP)
								</MPText>

								{/**
                                |--------------------------------------------------
                                | Tooltip
                                |--------------------------------------------------
                                */}
								<TooltipPopover text="A politically exposed person is defined as a current or former senior official in the executive, legislative, administrative, military or judicial branches of a government (whether elected or not), a senior official of a political party, a senior executive of a government-owned enterprise, corporation, business or entity formed by or for the benefit of such individual." />
							</View>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowIsPoliticallyExposed(true)}
								className="mb-6 min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<MPText className="capitalize text-[#767676]" weight="medium">
									{String(watch('isPolliticallyExposed'))}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
                                |--------------------------------------------------
                                | Modal
                                |--------------------------------------------------
                                */}
								<Modal animationType="slide" transparent visible={showIsPoliticallyExposed}>
									<View className="border-t-1 mt-auto h-[200px] w-full rounded-t-3xl border border-gray-200 bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
												Select an option
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowIsPoliticallyExposed(false)}>
												<CloseIcon />
											</Pressable>
										</View>

										{/**
                                        |--------------------------------------------------
                                        | Options
                                        |--------------------------------------------------
                                        */}
										<ScrollView showsVerticalScrollIndicator={false}>
											<View>
												{['True', 'False'].map((option) => (
													<Pressable
														key={option}
														onPress={() => {
															setValue(
																'isPolliticallyExposed',
																Boolean(option === 'True' ? true : false)
															);
															setShowIsPoliticallyExposed(false);
														}}
														className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
													>
														<MPText
															fontSize="FONT14"
															className="text-[15px]  text-[#1A1A1A]"
														>
															{option}
														</MPText>
													</Pressable>
												))}
											</View>
										</ScrollView>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
							|--------------------------------------------------
							| What is your current annual salary range? Please
                            | select the option that best represents your total
                            | yearly compensation (before taxes)
							|--------------------------------------------------
							*/}
							<MPText weight="medium" className="mb-1 text-[15px]" fontSize="FONT14">
								What is your current annual salary range? Please select the option that best represents
								your total yearly compensation (before taxes)
							</MPText>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowSalaryRange(true)}
								className="mb-6 min-h-[42px] flex-row items-center justify-between rounded-[12px] bg-[#1018280D] px-3 py-2"
							>
								<MPText className="text-[#767676]" weight="medium">
									{watch('annualSalaryRange').length > 0
										? watch('annualSalaryRange')
										: 'Select an option'}
								</MPText>

								{/**
								|--------------------------------------------------
								| Carret
								|--------------------------------------------------
								*/}
								<CarretDownIcon />

								{/**
                                |--------------------------------------------------
                                | Modal
                                |--------------------------------------------------
                                */}
								<Modal animationType="slide" transparent visible={showSalaryRange}>
									<View className="border-t-1 mt-auto h-[70%] w-full rounded-t-3xl border border-gray-200 bg-white p-6">
										<View
											style={{ flexDirection: 'row' }}
											className="mb-4 items-center justify-between"
										>
											<MPText fontSize="FONT16" weight="semibold" className="text-base">
												Select an option
											</MPText>

											{/**
											|--------------------------------------------------
											| Close icon
											|--------------------------------------------------
											*/}
											<Pressable onPress={() => setShowSalaryRange(false)}>
												<CloseIcon />
											</Pressable>
										</View>

										{/**
                                        |--------------------------------------------------
                                        | Options
                                        |--------------------------------------------------
                                        */}
										<ScrollView showsVerticalScrollIndicator={false}>
											<View>
												{[
													'Less than $30,000',
													'$30,000 – $49,999',
													'$50,000 – $69,999',
													'$70,000 – $89,999',
													'$90,000 – $109,999',
													'$110,000 – $129,999',
													'$130,000 – $149,999',
													'$150,000 – $199,999',
													'$200,000 and above',
													'Prefer not to say',
												].map((option) => (
													<Pressable
														key={option}
														onPress={() => {
															setValue('annualSalaryRange', option);
															setShowSalaryRange(false);
														}}
														className="flex-row items-center gap-3 border-b border-b-[#EEEEEE] py-2"
													>
														<MPText
															fontSize="FONT14"
															className="text-[15px]  text-[#1A1A1A]"
														>
															{option}
														</MPText>
													</Pressable>
												))}
											</View>
										</ScrollView>
									</View>
								</Modal>
							</TouchableOpacity>

							{/**
                            |--------------------------------------------------
                            | Button
                            |--------------------------------------------------
                            */}
							<MPButton
								className="mt-6"
								isLoading={isPending}
								disabled={!isValidInput}
								useGradientBg={isValidInput}
								onPress={handleSubmit(onSubmit)}
							>
								<MPText
									weight="semibold"
									fontSize="FONT14"
									className={clsx(isValidInput ? 'text-white' : 'text-[15px]text-[#D1D1D1]')}
								>
									Continue
								</MPText>
							</MPButton>

							{/**
                            |--------------------------------------------------
                            | Already have an account
                            |--------------------------------------------------
                            */}
							{(tailorYourExperienceSkipCount || 0) >= 2 ? null : (
								<MPText className="mt-3 text-center text-[15px]" fontSize="FONT14">
									<MPText
										weight="semibold"
										fontSize="FONT14"
										className="text-[#FF6A00]"
										onPress={() => {
											navigation.goBack();
											setTailorYourExperienceSkipCount((tailorYourExperienceSkipCount || 0) + 1);
										}}
									>
										Skip
									</MPText>
								</MPText>
							)}
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
