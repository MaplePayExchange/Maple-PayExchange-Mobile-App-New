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

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import Checkbox from '@/src/components/Checkbox';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import InputField from '@/src/components/InputField';
import SelectField from '@/src/components/SelectField';

const emailPattern = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export default function SendCADScreen() {
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
			lastName: '',
			narration: '',
			firstName: '',
			interacEmail: '',
			securityAnswer: '',
			securityQuestion: '',
			saveAsBeneficiary: false,
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
	const [saveAsBeneficiary, setSaveAsBeneficiary] = React.useState<boolean>(false);
	const [selectedQuestion, setSelectedQuestion] = React.useState<string | null>(null);

	/**
     | Submit handler
     |--------------------------------------------------
    |--------------------------------------------------
    */
	const onSubmit = (data: any) => {
		console.log(errors);
		console.log(data, 'submitted.data');
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
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
				<Pressable>
					<MPText weight="semibold" className="text-sm text-[#FF6A00]">
						See our rates
					</MPText>
				</Pressable>
			</View>

			{/**
            |--------------------------------------------------
            | Form
            |--------------------------------------------------
            */}
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
			>
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
								wrapperClassName="mt-4"
								label="Security question"
								/**
                                |--------------------------------------------------
                                | Trigger
                                |--------------------------------------------------
                                */
								triggerChildren={
									<View>
										<MPText weight="medium" className="text-base text-[#484848]">
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
									<View className="gap-3">
										{['What is your name', "What is your wife's name"].map((item) => (
											<Pressable
												key={item}
												onPress={() => {
													setSelectedQuestion(item);
													setValue('securityQuestion', item);
												}}
												className={clsx(
													'flex-row px-4 h-[35px] items-center text-sm rounded-[8px] border',
													item.toLowerCase() === selectedQuestion?.toLowerCase()
														? 'border-[#FF6A00]'
														: 'border-[#EEEEEE]'
												)}
											>
												<MPText weight="medium" className="text-sm">
													{item}
												</MPText>
											</Pressable>
										))}
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
								label="Save as beneficiary"
								onChange={(value) => {
									setSaveAsBeneficiary(value);
									setValue('saveAsBeneficiary', value);
								}}
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
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}
