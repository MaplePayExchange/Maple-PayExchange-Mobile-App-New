/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import InputField from '@src/components/InputField';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useRequestOtp } from '@services/auth.services';
import { SUCCESS_BADGE } from '@constants/app.constant';
//@ts-ignore
import { RootStackParamList } from '@constants/route.params';

type VerifyBvnScreenProps = NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;

export default function VerifyBvnScreen() {
	const route = useRoute();
	const params = route.params as any;

	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<VerifyBvnScreenProps>();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { userData } = useUserStore();
	const { mutate, isPending, isSuccess } = useRequestOtp('bvn');
	const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| Form handler
	|--------------------------------------------------
	*/
	const { control, handleSubmit } = useForm({
		defaultValues: { bvn: '' },
	});

	/**
	|--------------------------------------------------
	| Handles submission
	|--------------------------------------------------
	*/
	const onSubmit = (data: { bvn: string }) => {
		mutate({ bvn: data.bvn, sessionId: userData?.user?.sessionId, verificationType: 'bvn' });
	};

	/**
	|--------------------------------------------------
	| Show success modal
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (isSuccess) setShowSuccessModal(true);
	}, [isSuccess]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper className="bg-white">
			{/**
            |--------------------------------------------------
            | Header
            |--------------------------------------------------
            */}
			<HeaderWrapper
				title="Verify Account"
				titleFontSize="FONT24"
				onlClick={() => {
					if (params?.isLastStep === true) navigation.navigate('TabNavigation');
					else navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN);
				}}
			/>

			<MPText weight="semibold" className="text-base" fontSize="FONT18">
				Add BVN Number
			</MPText>
			<MPText fontSize="FONT14" weight="medium" className="mt-2 text-[15px] leading-5 text-[#484848]">
				We use your BVN to automatically create a NGN MaplePay account for you
			</MPText>

			{/**
			|--------------------------------------------------
			| Spacer
			|--------------------------------------------------
			*/}
			<View className="my-3" />

			{/**
            |--------------------------------------------------
            | Form
            |--------------------------------------------------
            */}
			<InputField
				name="bvn"
				type="text"
				maxLength={11}
				control={control}
				placeholder="Enter your BVN"
				label="Bank verification number (11 digits)"
				rules={{
					required: {
						value: true,
						message: 'Bvn is required',
					},
					minLength: { value: 11, message: 'BVN must be 11 characters' },
					maxLength: { value: 11, message: 'BVN must be 11 characters' },
					pattern: {
						value: /^\d+$/,
						message: 'Enter a valid Canadian (+1) or Nigerian (+234) number with country code',
					},
				}}
			/>

			{/**
			|--------------------------------------------------
			| Submit button
			|--------------------------------------------------
			*/}
			<MPButton isLoading={isPending} useGradientBg className="mt-8" onPress={handleSubmit(onSubmit)}>
				<MPText weight="semibold" className="text-[15px] text-white">
					Submit
				</MPText>
			</MPButton>

			{/**
			|--------------------------------------------------
			| Success modal
			|--------------------------------------------------
			*/}
			<Modal transparent visible={showSuccessModal}>
				<View className="flex-1 bg-black/10 p-6">
					<View className="mt-auto min-h-[220px] w-full items-center rounded-3xl bg-white p-5">
						<Image source={SUCCESS_BADGE} />

						{/**
						|--------------------------------------------------
						| Title
						|--------------------------------------------------
						*/}
						<MPText
							fontSize="FONT24"
							weight="semibold"
							style={{ lineHeight: 32 }}
							className="mt-4 text-center text-[20px]"
						>
							BVN Verification Complete
						</MPText>
						<MPText fontSize="FONT16" className="max-w-[290px] text-center text-[#484848]">
							Your BVN has been verified!.
						</MPText>

						{/**
						|--------------------------------------------------
						| Action button
						|--------------------------------------------------
						*/}
						<MPButton
							onPress={() => {
								setShowSuccessModal(false);

								/**
								|--------------------------------------------------
								| ...
								|--------------------------------------------------
								*/
								if (params?.isLastStep === true) navigation.navigate('TabNavigation');
								else navigation.navigate(ROUTE_NAMES.VERIFICATION_STEPS_SCREEN);
							}}
							useGradientBg
							className="mt-8"
						>
							<MPText weight="semibold" className="text-[15px] text-white">
								{params?.isLastStep === true ? 'Go to dashboard' : 'Continue'}
							</MPText>
						</MPButton>
					</View>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
