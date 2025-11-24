/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import {
	View,
	Platform,
	Keyboard,
	Pressable,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { SearchIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import Checkbox from '@src/components/Checkbox';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import InputField from '@src/components/InputField';
import SelectField from '@src/components/SelectField';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { RootStackParamList } from '@types/route.params';
import { useGetBanksList, useVerifyBankAccount } from '@services/user.services';

type SendNGNProps = RouteProp<RootStackParamList, 'SendNGNScreen'>;
type SendNGNScreenProps = NativeStackNavigationProp<RootStackParamList, 'SendNGNScreen'>;
export default function SendNGNScreen() {
	const route = useRoute<SendNGNProps>();
	const params = route.params;

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<SendNGNScreenProps>();

	/**
    |--------------------------------------------------
    | Api call to get the banks
    |--------------------------------------------------
    */
	const { data, isLoading } = useGetBanksList();
	const { mutate, isPending, data: receipientData } = useVerifyBankAccount();

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
			narration: '',
			saveAsBeneficiary: false,
			recipientName: params?.accountName || '',
			accountNumber: params?.accountNumber || '',
			bank: { code: params?.bankCode || '', name: params?.bankName || '', _id: '', id: '' },
		},
	});

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const searchInputRef = React.useRef<TextInput>(null);
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [showBanksModal, setShowBanksModal] = React.useState<boolean>(false);
	const [saveAsBeneficiary, setSaveAsBeneficiary] = React.useState<boolean>(false);
	const [selectedBank, setSelectedBank] = React.useState<{
		id: number;
		_id: string;
		code: string;
		name: string;
	} | null>(params?.type ? { id: 1234, _id: '', code: params?.bankCode || '', name: params?.bankName || '' } : null);

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	const accountNumber = watch('accountNumber');
	const isRecipient = watch('recipientName') !== '';

	/**
    |--------------------------------------------------
    | Fetches the account information
    |--------------------------------------------------
    */
	React.useEffect(() => {
		/**
        |--------------------------------------------------
        | Once the account number is 10
        |--------------------------------------------------
        */
		if (accountNumber.length === 10 && !params?.type) {
			mutate({
				accountNumber: params?.accountNumber || accountNumber,
				bank: {
					name: params?.type ? params.bankName || '' : (selectedBank?.name ?? ''),
					code: params?.type ? (Number(params.bankCode) as any) : (selectedBank?.code ?? 0),
				},
			});
		} else {
			setValue('recipientName', '');
		}
	}, [accountNumber]);

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
		if (params?.type) setValue('recipientName', params?.accountName || '');
		if (receipientData && !params?.type) setValue('recipientName', receipientData?.result?.accountName);
	}, [receipientData, params?.type]);

	/**
	|--------------------------------------------------
	| Submit handler
	|--------------------------------------------------
	*/
	const onSubmit = (data: any) => {
		let payload: any = {
			transactionType: 'NGN-to-NGN',
			accountName: data?.recipientName,
			accountNumber: data?.accountNumber,
			saveAsBeneficiary: data?.saveAsBeneficiary,
			bank: { ...selectedBank, code: selectedBank?.code.toString() } as any,
		};

		if (data.narration !== '') payload.narration = data.narration;

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		navigation.navigate(ROUTE_NAMES.AMOUNT_SCREEN, payload);
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<ScreenWrapper>
				<HeaderWrapper useNavigation title="Send Funds" center />

				{/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/}
				<View className="mb-10 flex-row items-center justify-between">
					{/**
					|--------------------------------------------------
					| Step 1 of 2
					|--------------------------------------------------
					*/}
					<View>
						<MPText weight="medium" className="text-[15px] text-[#767676]">
							Step 1/2
						</MPText>
						<MPText weight="semibold" className="text-[13px]">
							Enter recipient details
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| See our rates
					|--------------------------------------------------
					*/}
					<Pressable className="!hidden">
						<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
							See our rates
						</MPText>
					</Pressable>
				</View>

				{/**
				|--------------------------------------------------
				| Form
				|--------------------------------------------------
				*/}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View className="w-full rounded-3xl border border-[#EEEEEE] p-5">
							<MPText weight="semibold" className="text-center text-base">
								Recipient’s details
							</MPText>
							<MPText weight="medium" className="mb-6 text-center text-[15px] text-[#767676]">
								Enter recipient’s information
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Banks list
                            |--------------------------------------------------
                            */}
							<SelectField
								label="Bank name"
								isLoading={isLoading}
								wrapperClassName="mt-4"
								closeOnModalClick={false}
								isVisible={showBanksModal}
								setIsVisible={setShowBanksModal}
								/**
                                |--------------------------------------------------
                                | Trigger
                                |--------------------------------------------------
                                */
								triggerChildren={
									<Pressable onPress={() => setShowBanksModal(true)}>
										<MPText weight="medium" className="text-base text-[#484848]">
											{selectedBank?.name || 'Select bank'}
										</MPText>
									</Pressable>
								}
								/**
                                |--------------------------------------------------
                                | Content
                                |--------------------------------------------------
                                */
								contentChildren={
									<View className="min-h-[400px] gap-3 pb-6">
										{/**
                                        |--------------------------------------------------
                                        | Title
                                        |--------------------------------------------------
                                        */}
										<MPText weight="semibold" className="mb-5 text-center text-[15px]">
											Banks
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Content
                                        |--------------------------------------------------
                                        */}
										<Pressable
											onPress={() => searchInputRef.current?.focus()}
											className="mb-3 h-[42px] flex-row items-center justify-between rounded-[24px] bg-[#1018280D] px-5"
										>
											<TextInput
												className="text-[15px]"
												value={searchQuery}
												ref={searchInputRef}
												placeholder="Search"
												returnKeyType="done"
												submitBehavior="blurAndSubmit"
												placeholderTextColor="#484848"
												onChangeText={(value) => setSearchQuery(value)}
											/>

											{/**
                                            |--------------------------------------------------
                                            | Search icon
                                            |--------------------------------------------------
                                            */}
											<View className="pointer-events-none">
												<SearchIcon />
											</View>
										</Pressable>

										{/**
                                        |--------------------------------------------------
                                        | Conent
                                        |--------------------------------------------------
                                        */}
										<ScrollView
											contentContainerClassName="gap-3"
											showsVerticalScrollIndicator={false}
										>
											{data?.banks
												?.filter((item) =>
													item.name.toLowerCase().includes(searchQuery.toLowerCase())
												)
												?.map((item) => (
													<Pressable
														key={item._id}
														onPress={() => {
															setSelectedBank({
																id: item.id,
																_id: item._id,
																name: item.name,
																code: item.code.toString(),
															});
															setValue('bank', {
																_id: item._id,
																name: item.name,
																id: item.id.toString(),
																code: item.code.toString(),
															});

															setShowBanksModal((prevState) => !prevState);
														}}
														className={clsx(
															'h-[35px] flex-row items-center rounded-[8px] border px-4 text-[15px]',
															item._id.toLowerCase() === selectedBank?._id
																? 'border-[#FF6A00]'
																: 'border-[#EEEEEE]'
														)}
													>
														<MPText weight="medium" className="text-[15px]">
															{item.name}
														</MPText>
													</Pressable>
												))}
										</ScrollView>
									</View>
								}
							/>

							<View className="my-2" />

							{/**
                            |--------------------------------------------------
                            | Account number
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								control={control}
								name="accountNumber"
								isLoading={isPending}
								label="Account number"
								keyboardType="number-pad"
								placeholder="Account number"
								rules={{
									required: { value: true, message: 'This field is required' },
									pattern: { value: /^\d{10}$/, message: 'Invalid account number' },
								}}
							/>

							<View className="my-2" />

							{/**
                            |--------------------------------------------------
                            | Receipients information
                            |--------------------------------------------------
                            */}
							{isRecipient && (
								<InputField
									type="email"
									control={control}
									name="recipientName"
									className="pointer-events-none opacity-60"
								/>
							)}

							{isRecipient && <View className="my-2" />}

							{/**
                            |--------------------------------------------------
                            | Narration
                            |--------------------------------------------------
                            */}
							<InputField
								multiline
								type="text"
								name="narration"
								label="Narration"
								control={control}
								numberOfLines={4}
								wrapperClassName="min-h-[102px] h-[102px]"
							/>

							{/**
                            |--------------------------------------------------
                            | Checkbox
                            |--------------------------------------------------
                            */}
							<Checkbox
								className="mt-5"
								checked={saveAsBeneficiary}
								onChange={(value) => {
									setSaveAsBeneficiary(value);
									setValue('saveAsBeneficiary', value);
								}}
								component={
									<MPText
										weight="medium"
										className="mt-[2px] text-[13px] text-[#767676]"
										style={{ lineHeight: 15 }}
									>
										Save as beneficiary
									</MPText>
								}
							/>

							{/**
                            |--------------------------------------------------
                            | Continue
                            |--------------------------------------------------
                            */}
							<MPButton
								onPress={handleSubmit(onSubmit)}
								className="mt-6 max-w-[96px] self-center"
								disabled={!isValid || selectedBank === null}
								useGradientBg={isValid && selectedBank !== null}
							>
								<MPText weight="semibold" className="text-[15px] text-white">
									Continue
								</MPText>
							</MPButton>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</ScreenWrapper>
		</KeyboardAvoidingView>
	);
}
