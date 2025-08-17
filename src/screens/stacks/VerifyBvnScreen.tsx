/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import InputField from '@/src/components/InputField';
import { useRequestOtp } from '@/services/auth.services';
import { SUCCESS_BADGE } from '@/constants/app.constant';
import { RootStackParamList } from '@/types/route.params';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '@/constants/routes.conts';

type VerifyBvnScreenProps = NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;

export default function VerifyBvnScreen() {
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
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm({
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
	| Handles navigation withing the modal
	|--------------------------------------------------
	*/
	const handleNavigationWithinModal = () => {
		setShowSuccessModal(false);
		navigation.navigate(ROUTE_NAMES.SET_TRANSACTION_PIN);
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
			<HeaderWrapper title="Verify Account" />

			<MPText weight="semibold" className="text-base" style={{ fontSize: 18 }}>
				Add BVN Number
			</MPText>
			<MPText weight="medium" className="text-[#484848] text-sm leading-5 mt-2">
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
				<MPText weight="semibold" className="text-white text-sm">
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
					<View className="mt-auto rounded-3xl bg-white p-5 h-[290px] w-full items-center">
						<Image source={SUCCESS_BADGE} />

						{/**
						|--------------------------------------------------
						| Title
						|--------------------------------------------------
						*/}
						<MPText style={{ fontSize: 20, lineHeight: 32 }} weight="semibold" className="text-[20px] mt-4">
							Verification Complete
						</MPText>
						<MPText className="text-center max-w-[290px] text-[#484848] text-sm">
							You’re verified! Let’s secure your account before you proceed.
						</MPText>

						{/**
						|--------------------------------------------------
						| Action button
						|--------------------------------------------------
						*/}
						<MPButton onPress={handleNavigationWithinModal} useGradientBg className="mt-8">
							<MPText weight="semibold" className="text-sm text-white">
								Create transaction pin
							</MPText>
						</MPButton>
					</View>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
