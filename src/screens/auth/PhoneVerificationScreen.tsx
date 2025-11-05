/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import Checkbox from '@src/components/Checkbox';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import InputField from '@src/components/InputField';
import ScreenWrapper from '@src/components/Wrapper';
import { clampFontSize } from '@constants/app.constant';
import { useRequestOtp } from '@services/auth.services';
import { RootStackParamList } from '@types/route.params';
import { ROUTE_NAMES } from '@constants/routes.conts';

const phonePattern = /^(?:(?:\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})|(?:\s?\d{3}[\s-]?\d{3}[\s-]?\d{4}))$/;

/**
|--------------------------------------------------
| Interface definition
|--------------------------------------------------
*/
type PhoneVerificationScreenProps = NativeStackNavigationProp<RootStackParamList, 'PhoneVerificationScreen'>;

export default function PhoneVerificationScreen() {
	const navigation = useNavigation<PhoneVerificationScreenProps>();

	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const { mutate, isPending } = useRequestOtp('phone');
	const [countryCode, setCountryCode] = React.useState<string | null>(null);
	const [terms, setTerms] = React.useState<{ terms: boolean; policy: boolean }>({ terms: false, policy: false });

	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const { control, handleSubmit } = useForm({
		defaultValues: { phone: '' },
	});

	/**
	|--------------------------------------------------
	| Handles submitting the form
	|--------------------------------------------------
	*/
	const onSubmit = async (data: { phone: string }) => {
		mutate({ phoneNumber: `${countryCode}${data.phone}`, verificationType: 'phone' });
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
				useNavigation={false}
				title="Create Your Account"
				subtitle="Let’s get started. Enter your phone number to set up your account"
			/>

			<View className="my-3" />

			{/**
			|--------------------------------------------------
			| Form
			|--------------------------------------------------
			*/}
			<InputField
				type="phone"
				name="phone"
				control={control}
				label="Phone number"
				keyboardType="number-pad"
				getCountryCode={(value) => setCountryCode(value)}
				rules={{
					required: {
						value: true,
						message: 'Phone number is required',
					},
					pattern: {
						value: phonePattern,
						message: 'Enter a valid Canadian (+1) or Nigerian (+234) number with country code',
					},
				}}
			/>

			{/**
			|--------------------------------------------------
			| Privacy and policy
			|--------------------------------------------------
			*/}
			<Checkbox
				className="mt-6"
				checked={terms.terms}
				component={
					<View className="flex-row flex-1 items-center w-[88%] flex-wrap">
						<MPText weight="medium" style={{ lineHeight: 15 }} className="text-[#767676] leading-4 text-xs">
							By checking this box, you agree to the
						</MPText>
						<MPText
							weight="medium"
							style={{ lineHeight: 15 }}
							className="leading-4 text-xs text-[#FF6A00]"
							onPress={() => navigation.navigate(ROUTE_NAMES.TERMS_AND_CONDITIONS)}
						>
							{' '}
							Terms and Conditions,{' '}
						</MPText>
						<MPText weight="medium" style={{ lineHeight: 15 }} className="text-[#767676] leading-4 text-xs">
							<MPText
								weight="medium"
								style={{ lineHeight: 15 }}
								className="leading-4 text-xs text-[#FF6A00]"
								onPress={() => navigation.navigate(ROUTE_NAMES.PRIVACY_POLICY)}
							>
								Privacy Policy{' '}
							</MPText>
							and{' '}
							<MPText
								weight="medium"
								style={{ lineHeight: 15 }}
								className="leading-4 text-xs text-[#FF6A00]"
								onPress={() => navigation.navigate(ROUTE_NAMES.KYC_TERMS)}
							>
								KYC{' '}
							</MPText>
							<MPText
								weight="medium"
								style={{ lineHeight: 15 }}
								className="text-[#767676] leading-4 text-xs"
							>
								including verification of your identity with your mobile provider/third party.
							</MPText>
						</MPText>
					</View>
				}
				onChange={(value) => setTerms((prevState) => ({ ...prevState, terms: value }))}
			/>

			{/**
			|--------------------------------------------------
			| Confirm ownership
			|--------------------------------------------------
			*/}
			<Checkbox
				className="mt-5"
				checked={terms.policy}
				onChange={(value) => setTerms((prevState) => ({ ...prevState, policy: value }))}
				label="I confirm that I am opening this account for my own personal use and not for use by a third party."
			/>

			{/**
			|--------------------------------------------------
			| Button
			|--------------------------------------------------
			*/}
			<MPButton
				className="mt-auto"
				isLoading={isPending}
				onPress={handleSubmit(onSubmit)}
				useGradientBg={terms.terms && terms.policy}
				disabled={!terms.policy || !terms.terms || isPending}
			>
				<MPText
					weight="semibold"
					className={clsx(terms.terms && terms.policy ? 'text-sm text-white' : 'text-[#D1D1D1] text-sm')}
				>
					Continue
				</MPText>
			</MPButton>

			{/**
			|--------------------------------------------------
			| Already have an account
			|--------------------------------------------------
			*/}
			<MPText className="text-sm text-center mt-4">
				<MPText className="text-[#484848] text-sm">Already have an account? </MPText>
				<MPText
					weight="semibold"
					className="text-[#FF6A00] text-sm"
					onPress={() => navigation.navigate('LoginScreen', {})}
				>
					Log in
				</MPText>
			</MPText>
		</ScreenWrapper>
	);
}
