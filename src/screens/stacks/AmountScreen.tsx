/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { RootStackParamList } from '@/types/route.params';
import { View, Pressable, TextInput } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { WalletIcon } from '@/assets/svgs';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import Container from '@/src/components/Container';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import SelectField from '@/src/components/SelectField';
import ConfirmTransactionModal from '@/src/components/Modals/ConfirmTransactionModal';
import TransactionConfirmationModal from '@/src/components/Modals/TransactionConfirmationModal';

type AmountScreenProps = RouteProp<RootStackParamList, 'AmountScreen'>;
export default function AmountScreen() {
	const route = useRoute<AmountScreenProps>();
	const params = route.params;

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { selectedWallet } = useUserStore();
	const transactionType = 'CAD' as 'CAD' | 'NGN' | 'SWAP';
	const [amountToSend, setAmountToSend] = React.useState<string>('');
	const [showTransactionPin, setShowTransactionPin] = React.useState<boolean>(false);
	const [showTransactionPreviewModal, setShowTransactionPreviewModal] = React.useState<boolean>(false);

	const beneficiary = params?.accountName || `${params?.firstName} ${params?.lastName}` || 'Adaeze Ibekwe';

	/**
	|--------------------------------------------------
	| For handling number input
	|--------------------------------------------------
	*/
	const handleChange = (text: string) => {
		/**
		|--------------------------------------------------
		| Remove all commas
		|--------------------------------------------------
		*/
		const raw = text.replace(/,/g, '');

		/**
		|--------------------------------------------------
		| If not a valid number, reject input (optional)
		|--------------------------------------------------
		*/
		if (raw === '' || /^[0-9]+$/.test(raw)) {
			const num = raw === '' ? 0 : parseInt(raw, 10);

			/**
			|--------------------------------------------------
			| Format with commas
			|--------------------------------------------------
			*/
			const formatted = raw === '' ? '' : num.toLocaleString();
			setAmountToSend(formatted);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper useNavigation center title="Send Funds" />

			{/**
			|--------------------------------------------------
			| Content
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
						Step 2/2
					</MPText>
					<MPText weight="semibold" className="text-xs">
						Enter details
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
			| ...
			|--------------------------------------------------
			*/}
			<Container>
				<MPText weight="semibold" className="text-base text-center">
					Send to a bank account
				</MPText>
				<MPText weight="medium" className="text-[#767676] text-center text-sm mb-6">
					Enter amount to send to recipient
				</MPText>

				{/**
				|--------------------------------------------------
				| Amount to send
				|--------------------------------------------------
				*/}
				<View className="gap-1">
					<MPText className="text-sm text-[#1A1A1A]" weight="medium">
						Amount to send
					</MPText>

					{/**
					|--------------------------------------------------
					| Wallet For sender
					|--------------------------------------------------
					*/}
					<View className="rounded-[16px] bg-[#FFFFFF] p-4 mb-4">
						<View className="flex-row items-center justify-between w-full">
							{/**
							|--------------------------------------------------
							| Wallet balance
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-1">
								<MPText weight="semibold" className="text-[18px]">
									{selectedWallet?.currency === 'CAD' ? '$' : '₦'}
								</MPText>

								{/**
								|--------------------------------------------------
								|
								|--------------------------------------------------
								*/}
								<TextInput
									value={amountToSend}
									placeholder="0"
									keyboardType="numeric"
									onChangeText={handleChange}
									className="text-[18px] font-semibold w-auto"
								/>
							</View>

							{/**
							|--------------------------------------------------
							| Select field
							|--------------------------------------------------
							*/}
							<SelectField
								triggerClassName="h-[32px]"
								wrapperClassName="w-[96px] h-[32px]"
								disabled={transactionType !== 'SWAP'}
								triggerChildren={
									<View>
										<MPText weight="medium" className="text-sm text-black">
											{selectedWallet?.currency === 'CAD' ? '🇨🇦' : '🇳🇬'}{' '}
											{selectedWallet?.currency}
										</MPText>
									</View>
								}
							/>
						</View>

						{/**
						|--------------------------------------------------
						| Second row
						|--------------------------------------------------
						*/}
						<View className="mt-1 flex-row justify-between items-center">
							<View className="flex-row items-center gap-1">
								<WalletIcon />
								<MPText weight="regular" className="text-[#767676] text-sm">
									Wallet Bal:
								</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| Wallet balance
							|--------------------------------------------------
							*/}
							<MPText weight="regular" className="text-[#767676] text-sm">
								{selectedWallet?.currency === 'CAD' ? '$' : '₦'}
								{(selectedWallet?.walletBalance ?? 0).toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</MPText>
						</View>
					</View>

					{/**
					|--------------------------------------------------
					| Amount they’ll receive
					|--------------------------------------------------
					*/}
					<MPText className="text-sm text-[#1A1A1A]" weight="medium">
						Amount they’ll receive
					</MPText>

					{/**
					|--------------------------------------------------
					| Wallet for receiver
					|--------------------------------------------------
					*/}
					<View className="rounded-[16px] bg-[#FFFFFF] p-4">
						<View className="flex-row items-center justify-between w-full">
							{/**
							|--------------------------------------------------
							| Wallet balance
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-1">
								<MPText weight="semibold" className="text-[18px]">
									{selectedWallet?.currency === 'CAD' ? '$' : '₦'}
								</MPText>

								{/**
								|--------------------------------------------------
								|
								|--------------------------------------------------
								*/}
								<TextInput
									placeholder="0"
									value={amountToSend}
									keyboardType="numeric"
									onChangeText={handleChange}
									className={clsx(
										'text-[18px] font-semibold w-auto',
										transactionType === 'SWAP' ? '' : 'pointer-events-none'
									)}
								/>
							</View>

							{/**
							|--------------------------------------------------
							| Select field
							|--------------------------------------------------
							*/}
							<SelectField
								triggerClassName="h-[32px]"
								wrapperClassName="w-[96px] h-[32px]"
								disabled={transactionType !== 'SWAP'}
								triggerChildren={
									<View>
										<MPText weight="medium" className="text-sm text-black">
											{selectedWallet?.currency === 'CAD' ? '🇨🇦' : '🇳🇬'}{' '}
											{selectedWallet?.currency}
										</MPText>
									</View>
								}
							/>
						</View>

						{/**
						|--------------------------------------------------
						| Second row
						|--------------------------------------------------
						*/}
						<View
							className={clsx(
								'mt-1 flex-row justify-between items-center',
								transactionType === 'SWAP' ? 'flex' : 'hidden'
							)}
						>
							<View className="flex-row items-center gap-1">
								<WalletIcon />
								<MPText weight="regular" className="text-[#767676] text-sm">
									Wallet Bal:
								</MPText>
							</View>

							{/**
							|--------------------------------------------------
							| Wallet balance
							|--------------------------------------------------
							*/}
							<MPText weight="regular" className="text-[#767676] text-sm">
								{selectedWallet?.currency === 'CAD' ? '$' : '₦'}
								{(selectedWallet?.walletBalance ?? 0).toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</MPText>
						</View>
					</View>
				</View>

				{/**
				|--------------------------------------------------
				| Continue button
				|--------------------------------------------------
				*/}
				<MPButton
					disabled={amountToSend === ''}
					useGradientBg={amountToSend !== ''}
					className="w-[91px] mt-4 self-center"
					onPress={() => setShowTransactionPreviewModal(true)}
				>
					<MPText weight="semibold" className="text-sm text-white">
						Continue
					</MPText>
				</MPButton>
			</Container>

			{/**
            |--------------------------------------------------
            | Transaction confirmation modal
            |--------------------------------------------------
            */}
			<TransactionConfirmationModal
				amount={amountToSend}
				beneficiary={beneficiary}
				visible={showTransactionPreviewModal}
				currency={selectedWallet?.currency as any}
				setVisible={setShowTransactionPreviewModal}
				onConfirm={() => {
					setShowTransactionPin(true);
					setShowTransactionPreviewModal(false);
				}}
			/>

			{/**
			|--------------------------------------------------
			| Confirm Transaction modal
			|--------------------------------------------------
			*/}
			<ConfirmTransactionModal
				visible={showTransactionPin}
				setVisible={setShowTransactionPin}
				onComplete={(value) => console.log(value)}
			/>
		</ScreenWrapper>
	);
}
