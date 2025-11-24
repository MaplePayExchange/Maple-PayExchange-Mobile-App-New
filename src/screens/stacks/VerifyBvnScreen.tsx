/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import { User } from '@interfaces/user.interface';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import InputField from '@src/components/InputField';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useRequestOtp } from '@services/auth.services';
import { SUCCESS_BADGE } from '@constants/app.constant';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';

type VerifyBvnScreenProps = NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;

export default function VerifyBvnScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<VerifyBvnScreenProps>();

	const queryClient = useQueryClient();
	const data: any = queryClient.getQueryData(['maple_user_data']);
	const user = data?.user as User;

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
			<HeaderWrapper title="Verify Account" titleFontSize="FONT24" />

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
							weight="semibold"
							className="mt-4 text-center text-[20px]"
							style={{ fontSize: 20, lineHeight: 32 }}
						>
							BVN Verification Complete
						</MPText>
						{typeof user.transactionPin !== 'string' ? (
							<MPText className="max-w-[290px] text-center text-[15px] text-[#484848]">
								You bvn has been verified! Let’s secure your account before you proceed.
							</MPText>
						) : (
							<MPText className="max-w-[290px] text-center text-[15px] text-[#484848]">
								Your BVN has been verified!.
							</MPText>
						)}

						{/**
						|--------------------------------------------------
						| Action button
						|--------------------------------------------------
						*/}
						{typeof user.transactionPin !== 'string' ? (
							<MPButton onPress={handleNavigationWithinModal} useGradientBg className="mt-8">
								<MPText weight="semibold" className="text-[15px] text-white">
									Create transaction pin
								</MPText>
							</MPButton>
						) : (
							<MPButton
								onPress={() => {
									setShowSuccessModal(false);
									navigation.navigate('DashboardScreen');
								}}
								useGradientBg
								className="mt-8"
							>
								<MPText weight="semibold" className="text-[15px] text-white">
									Go to dashboard
								</MPText>
							</MPButton>
						)}
					</View>
				</View>
			</Modal>
		</ScreenWrapper>
	);
}
