/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import CustomKeyboard from '@src/components/CustomKeyboard';
import { useResetTransactionPin } from '@services/auth.services';

export default function ResetPinScreen() {
	const navigation = useNavigation();
	/**
    |--------------------------------------------------
    | API
    |--------------------------------------------------
    */
	const { mutate, isPending, error } = useResetTransactionPin();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [screenState, setScreenState] = React.useState<
		'old_pin_screen' | 'new_pin_screen' | 'confirm_new_pin_screen'
	>('old_pin_screen');
	const [formValues, setFormValues] = React.useState<{ oldPin: string; newPin: string; confirmNewPin: string }>({
		oldPin: '',
		newPin: '',
		confirmNewPin: '',
	});

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper usePadding={false}>
			<View className="px-6">
				<HeaderWrapper
					title="Reset PIN"
					titleFontSize="FONT24"
					onlClick={() => {
						if (screenState === 'new_pin_screen') setScreenState('old_pin_screen');
						else if (screenState === 'confirm_new_pin_screen') setScreenState('new_pin_screen');
						else navigation.goBack();
					}}
				/>
			</View>

			{/**
			|--------------------------------------------------
			| Sub text
			|--------------------------------------------------
			*/}
			<View className="mb-8 items-center">
				<MPText fontSize="FONT16" weight="semibold" className="text-center text-base" style={{ fontSize: 18 }}>
					{screenState === 'old_pin_screen'
						? 'Enter Old PIN'
						: screenState === 'new_pin_screen'
							? 'Enter New PIN'
							: 'Confirm New PIN'}
				</MPText>
				<MPText
					weight="medium"
					fontSize="FONT14"
					className="mt-2 max-w-[280px] text-center text-[15px] leading-5 text-[#484848]"
				>
					This PIN will serve as confirmation for transactions on MaplePay.
				</MPText>
			</View>

			{/**
			|--------------------------------------------------
			| Keyboard and input box
			|--------------------------------------------------
			*/}
			<CustomKeyboard
				length={4}
				useActionButton
				loadingState={isPending}
				errorMessage={
					errorMessage || error?.message ? (
						<MPText className="mt-4 self-center text-center text-[#EE4139]" fontSize="FONT12">
							{errorMessage || (error as any)?.response?.data?.message || error?.message}
						</MPText>
					) : undefined
				}
				shouldResetValues={screenState === 'old_pin_screen' || screenState === 'new_pin_screen'}
				onComplete={(value) => {
					/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/
					if (screenState === 'old_pin_screen') {
						setFormValues((prevValues) => ({ ...prevValues, oldPin: value }));
						setScreenState('new_pin_screen');
					} else if (screenState === 'new_pin_screen') {
						/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/
						setFormValues((prevValues) => ({ ...prevValues, newPin: value }));
						setScreenState('confirm_new_pin_screen');
					} else {
						setErrorMessage(null);
						/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/
						if (formValues.newPin !== value) {
							setErrorMessage('PINs do not match');
							return;
						}

						console.log(formValues, value);
						mutate({ oldPin: formValues.oldPin, newPin: formValues.newPin });
					}
				}}
			/>
		</ScreenWrapper>
	);
}
