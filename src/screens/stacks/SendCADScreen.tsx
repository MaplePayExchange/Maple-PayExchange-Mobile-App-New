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
import MPText from '@src/components/MPText';
import Checkbox from '@src/components/Checkbox';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import InputField from '@src/components/InputField';
import SelectField from '@src/components/SelectField';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { RootStackParamList } from '@types/route.params';
import { useGetSecurityQuestions } from '@services/user.services';

const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type SendCADProps = RouteProp<RootStackParamList, 'SendCADScreen'>;
type SendCADScreenProps = NativeStackNavigationProp<RootStackParamList, 'SendCADScreen'>;
export default function SendCADScreen() {
	const route = useRoute<SendCADProps>();
	const params = route.params;

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<SendCADScreenProps>();

	/**
	|--------------------------------------------------
	| Api
	|--------------------------------------------------
	*/
	const { data, isLoading } = useGetSecurityQuestions();

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
		formState: { errors },
	} = useForm({
		defaultValues: {
			saveAsBeneficiary: false,
			narration: params?.description || '',
			interacEmail: params?.interacEmail || '',
			lastName: params?.fullName?.split(' ')[1] || '',
			securityQuestion: params?.securityQuestion || '',
			firstName: params?.fullName?.split(' ')[0] || '',
			securityAnswer: params?.securityQuestionAnswer || '',
		},
	});

	/**
    |--------------------------------------------------
    | Watching the email for validity
    |--------------------------------------------------
    */
	const isValid = emailPattern.test(watch('interacEmail'));
	const isValidSecurityAnswer = watch('securityAnswer') !== '';
	const isValidSecurityQuestion = watch('securityQuestion') !== '';

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [saveAsBeneficiary, setSaveAsBeneficiary] = React.useState<boolean>(false);
	const [selectedQuestion, setSelectedQuestion] = React.useState<string | null>(null);

	/**
	|--------------------------------------------------
	| Submit handler
	|--------------------------------------------------
	*/
	const onSubmit = (data: any) => {
		let payload: any = {
			lastName: data.lastName,
			firstName: data.firstName,
			transactionType: 'CAD-to-CAD',
			interacEmail: data.interacEmail,
			securityAnswer: data.securityAnswer,
			securityQuestion: data.securityQuestion,
			saveAsBeneficiary: data.saveAsBeneficiary,
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
	| On focus
	|--------------------------------------------------
	*/
	navigation.addListener('focus', () => {
		if (params?.securityQuestion) {
			setSelectedQuestion(params.securityQuestion);
		}
	});

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
				<View className="flex-row justify-between items-center mb-10">
					{/**
					|--------------------------------------------------
					| Step 1 of 2
					|--------------------------------------------------
					*/}
					<View>
						<MPText weight="medium" className="text-sm text-[#767676]">
							Step 1/2
						</MPText>
						<MPText weight="semibold" className="text-xs">
							Enter recipient details
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| See our rates
					|--------------------------------------------------
					*/}
					<Pressable className="!hidden">
						<MPText weight="semibold" className="text-sm text-[#FF6A00]">
							See our rates
						</MPText>
					</Pressable>
				</View>

				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<ScrollView
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View className="w-full rounded-3xl border border-[#EEEEEE] p-5">
							<MPText weight="semibold" className="text-base text-center">
								Recipient’s details
							</MPText>
							<MPText weight="medium" className="text-[#767676] text-center text-sm mb-6">
								Enter recipient’s information
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Interac email
                            |--------------------------------------------------
                            */}
							<InputField
								type="email"
								control={control}
								name="interacEmail"
								label="Interac email"
								placeholder="Enter interac email"
								rules={{ pattern: { value: emailPattern, message: 'Invalid email!' } }}
							/>

							<View className="my-2" />

							{/**
                            |--------------------------------------------------
                            | Recipients First name
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								name="firstName"
								control={control}
								label="Recipients first name"
								placeholder="Recipients first name"
								rules={{ required: { value: true, message: 'This field is required' } }}
							/>

							<View className="my-2" />

							{/**
                            |--------------------------------------------------
                            | Recipients last name
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								control={control}
								name="lastName"
								label="Recipients last name"
								placeholder="Recipients last name"
								rules={{ required: { value: true, message: 'This field is required' } }}
							/>

							<View className="my-2" />

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
								wrapperClassName="min-h-[102px]"
							/>

							{/**
                            |--------------------------------------------------
                            | Select field
                            |--------------------------------------------------
                            */}
							<SelectField
								isVisible={showModal}
								wrapperClassName="mt-4"
								label="Security question"
								setIsVisible={setShowModal}
								/**
                                |--------------------------------------------------
                                | Trigger
                                |--------------------------------------------------
                                */
								triggerChildren={
									<View>
										<MPText
											weight="medium"
											style={{ fontSize: 13 }}
											className="text-base text-[#484848]"
										>
											{selectedQuestion || 'Select security question'}
										</MPText>
									</View>
								}
								/**
                                |--------------------------------------------------
                                | Content
                                |--------------------------------------------------
                                */
								contentChildren={
									<View className="gap-3 pb-6">
										{/**
										|--------------------------------------------------
										| Title
										|--------------------------------------------------
										*/}
										<MPText weight="semibold" className="text-sm text-center mb-5">
											Security Questions
										</MPText>

										{/**
										|--------------------------------------------------
										| Conent
										|--------------------------------------------------
										*/}
										<ScrollView
											showsVerticalScrollIndicator={false}
											contentContainerClassName="gap-3"
										>
											{data?.securityQuestions.map((item) => (
												<Pressable
													key={item._id}
													onPress={() => {
														setSelectedQuestion(item.text);
														setValue('securityQuestion', item.text);
														setShowModal((prevState) => !prevState);
													}}
													className={clsx(
														'flex-row px-4 h-[35px] items-center text-sm rounded-[8px] border',
														item.text.toLowerCase() === selectedQuestion?.toLowerCase()
															? 'border-[#FF6A00]'
															: 'border-[#EEEEEE]'
													)}
												>
													<MPText
														weight="medium"
														className="text-sm"
														style={{ fontSize: 12 }}
													>
														{item.text}
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
                            | Security answer
                            |--------------------------------------------------
                            */}
							<InputField
								type="text"
								control={control}
								name="securityAnswer"
								label="Security answer"
								placeholder="Security answer"
								rules={{ required: { value: true, message: 'This field is required' } }}
							/>

							{/**
                            |--------------------------------------------------
                            | Checkbox
                            |--------------------------------------------------
                            */}
							<Checkbox
								className="mt-6"
								checked={saveAsBeneficiary}
								onChange={(value) => {
									setSaveAsBeneficiary(value);
									setValue('saveAsBeneficiary', value);
								}}
								component={
									<View
										style={{ marginTop: 2 }}
										className={clsx(Platform.OS === 'android' ? '' : 'mt-[2px]')}
									>
										<MPText
											weight="medium"
											className="text-[#767676] text-xs"
											style={{ lineHeight: 15 }}
										>
											Save as beneficiary
										</MPText>
									</View>
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
								disabled={!isValid || !isValidSecurityAnswer || !isValidSecurityQuestion}
								useGradientBg={isValid && isValidSecurityAnswer && isValidSecurityQuestion}
							>
								<MPText weight="semibold" className="text-sm text-white">
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
