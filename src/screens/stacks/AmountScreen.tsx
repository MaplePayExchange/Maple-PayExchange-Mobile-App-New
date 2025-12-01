/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
//@ts-ignore
import { RootStackParamList } from '@constants/route.params';
import { View, Pressable, TextInput, Keyboard, ScrollView } from 'react-native';
//@ts-ignore
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { WalletIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import Container from '@src/components/Container';
import { useUserStore } from '@zustand/userStore';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import SelectField from '@src/components/SelectField';
import { Wallet } from '@interfaces/wallet.interface';
import { ROUTE_NAMES } from '@constants/routes.conts';
import DataRepresentation from '@src/components/DataRepresentation';
import ConfirmTransactionModal from '@src/components/Modals/ConfirmTransactionModal';
import TransactionConfirmationModal from '@src/components/Modals/TransactionConfirmationModal';
import { generateIdempotencyKey, useExchangeCurrency, useGetRates, useSendFundsToInterac, useSendWalletToBank } from '@services/user.services';

type AmountScreenProps = RouteProp<RootStackParamList, 'AmountScreen'>;
export default function AmountScreen() {
	const route = useRoute<AmountScreenProps>();
	const params = route.params;

	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const userData = queryClient.getQueryData(['maple_user_data']) as any;

	/**
	|--------------------------------------------------
	| Api
	|--------------------------------------------------
	*/
	const { data: rates } = useGetRates();
	const NGNRate = rates?.items?.find(
		(rate) => rate.exchange === 'NGN-TO-CAD' && rate.userType === userData?.user?.userCategory
	);
	const CADRate = rates?.items?.find(
		(rate) => rate.exchange === 'CAD-TO-NGN' && rate.userType === userData?.user?.userCategory
	);
	const { mutate: mutateExchange, isPending: isPendingExchange } = useExchangeCurrency(() =>
		setShowTransactionPin(false)
	);
	const { mutate: mutateNGN, isPending: isPendingNGN } = useSendWalletToBank(() => setShowTransactionPin(false));
	const { mutate: mutateCAD, isPending: isPendingCAD } = useSendFundsToInterac(() => setShowTransactionPin(false));

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { selectedWallet } = useUserStore();
	const [amountToSend, setAmountToSend] = React.useState<string>('');
	const [showTransactionPin, setShowTransactionPin] = React.useState<boolean>(false);
	const [transactionType, setTransactionType] = React.useState<'SWAP' | 'CAD-to-CAD' | 'NGN-to-NGN'>(
		params.transactionType
	);
	const [showTransactionPreviewModal, setShowTransactionPreviewModal] = React.useState<boolean>(false);
	const [sourceDestination, setSourceDestination] = React.useState<{
		source: string;
		destination: string;
		sourceFlag: string;
		destinationFlag: string;
	}>(() => {
		/**
		|--------------------------------------------------
		| For CAD
		|--------------------------------------------------
		*/
		if (params.transactionType === 'CAD-to-CAD') {
			return { source: 'CAD', destination: 'CAD', sourceFlag: '🇨🇦', destinationFlag: '🇨🇦' };
		}
		if (params.transactionType === 'SWAP' && selectedWallet?.currency === 'CAD') {
			return { source: 'CAD', destination: 'NGN', sourceFlag: '🇨🇦', destinationFlag: '🇳🇬' };
		}

		/**
		|--------------------------------------------------
		| For NGN
		|--------------------------------------------------
		*/
		if (params.transactionType === 'NGN-to-NGN') {
			return { source: 'NGN', destination: 'NGN', sourceFlag: '🇳🇬', destinationFlag: '🇳🇬' };
		}
		if (params.transactionType === 'SWAP' && selectedWallet?.currency === 'NGN') {
			return { source: 'NGN', destination: 'CAD', sourceFlag: '🇳🇬', destinationFlag: '🇨🇦' };
		}

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		return { source: 'NGN', destination: 'CAD', sourceFlag: '🇳🇬', destinationFlag: '🇨🇦' };
	});

	const rawAmount = Number(amountToSend.replaceAll(',', '') || 0);

	/**
	 |--------------------------------------------------
	 | Beneficiary information
	 |--------------------------------------------------
	 */
	const beneficiary = params?.accountName || `${params?.firstName} ${params?.lastName}` || 'Adaeze Ibekwe';

	/**
	|--------------------------------------------------
	| Getting the wallet balance
	|--------------------------------------------------
	*/
	const handleGetWalletBalance = () => {
		let balance = 0;
		/**
		|--------------------------------------------------
		| If the transaction type is NGN to NGN
		|--------------------------------------------------
		*/
		if (sourceDestination.source === 'NGN') {
			balance =
				(userData?.wallets.find((wallet: any) => wallet.currency === 'NGN') as Wallet)?.walletBalance ?? 0;
		}

		/**
		|--------------------------------------------------
		| If the transaction type is CAD to CAD
		|--------------------------------------------------
		*/
		if (sourceDestination.source === 'CAD') {
			balance =
				(userData?.wallets.find((wallet: any) => wallet.currency === 'CAD') as Wallet)?.walletBalance ?? 0;
		}

		return balance;
	};

	/**
	|--------------------------------------------------
	| If the amount is valid
	|--------------------------------------------------
	*/
	const isValidAmount =
		amountToSend !== '' &&
		((transactionType === 'SWAP' && sourceDestination.source === 'CAD' && rawAmount >= 2) ||
			(transactionType === 'SWAP' &&
				sourceDestination.source === 'NGN' &&
				rawAmount >= (NGNRate?.rate ?? 1150)) ||
			(transactionType === 'CAD-to-CAD' && rawAmount >= 10) ||
			(transactionType !== 'SWAP' && transactionType !== 'CAD-to-CAD' && rawAmount > 100)) &&
		handleGetWalletBalance() >= rawAmount;

	/**
	|--------------------------------------------------
	| Returns the appropriate symbols
	|--------------------------------------------------
	*/
	const handleCurrencySymbol = () => {
		const currencySymbols: Record<string, string> = {
			CAD: '$',
			NGN: '₦',
		};

		let sourceSymbol = '';
		let destinationSymbol = '';

		if (transactionType.includes('to')) {
			/**
			|--------------------------------------------------
			| Handles "CAD-to-CAD", "NGN-to-NGN"
			|--------------------------------------------------
			*/
			const [source, destination] = transactionType.split('-to-');
			sourceSymbol = currencySymbols[source] || '';
			destinationSymbol = currencySymbols[destination] || '';
		} else if (transactionType === 'SWAP' && selectedWallet?.currency) {
			/**
			|--------------------------------------------------
			| Handles generic SWAP case
			|--------------------------------------------------
			*/
			sourceSymbol = currencySymbols[sourceDestination.source] || '';
			destinationSymbol = currencySymbols[sourceDestination.destination] || '';
		}

		return { sourceSymbol, destinationSymbol };
	};

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
		| Allow numbers with optional decimals
		|--------------------------------------------------
		*/
		if (raw === '' || /^[0-9]*\.?[0-9]*$/.test(raw)) {
			const num = raw === '' ? 0 : parseFloat(raw);

			/**
			|--------------------------------------------------
			| Format with commas (keep decimals if any)
			|--------------------------------------------------
			*/
			const parts = raw.split('.');
			const formatted =
				parts.length > 1
					? `${parseInt(parts[0], 10).toLocaleString()}.${parts[1]}`
					: raw === ''
						? ''
						: num.toLocaleString();

			setAmountToSend(formatted);
		}
	};

	/**
	|--------------------------------------------------
	| Handles submission
	|--------------------------------------------------
	*/
	const handleSubmission = (pin: string) => {
		console.log(pin);
		if (params.transactionType === 'CAD-to-CAD') {
			mutateCAD({
				currency: 'CAD',
				transactionPin: pin,
				lastName: params.lastName as string,
				email: params.interacEmail as string,
				firstName: params.firstName as string,
				description: params?.narration || '--',
				saveBeneficiary: params.saveAsBeneficiary,
				amount: Number(amountToSend.replaceAll(',', '')),
				securityQuestion: params.securityQuestion as string,
				securityQuestionAnswer: params.securityAnswer as string,
			});
		} else if (params.transactionType === 'NGN-to-NGN') {
			mutateNGN({
				currency: 'NGN',
				transactionPin: pin,
				bank: params.bank as any,
				accountName: params.accountName as string,
				saveBeneficiary: params.saveAsBeneficiary,
				accountNumber: params.accountNumber as string,
				amount: Number(amountToSend.replaceAll(',', '')),
			});

			/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/
			const idempotencyKey = generateIdempotencyKey();
			console.log(idempotencyKey, 'idempotency');
		} else {
			mutateExchange({
				transactionPin: pin,
				amount: Number(amountToSend.replaceAll(',', '')),
				currency: handleCurrencySymbol().sourceSymbol === '₦' ? 'NGN' : 'CAD',
				exchangeCurrency: handleCurrencySymbol().sourceSymbol === '₦' ? 'CAD' : 'NGN',
				rate: (sourceDestination.source === 'NGN' ? NGNRate?.rate : CADRate?.rate) || 0,
			});
		}
	};

	/**
	|--------------------------------------------------
	| Handle conversion information
	|--------------------------------------------------
	*/
	const handleConversionInfo = (infoType: 'rate' | 'conversion') => {
		let info = '';

		/**
		|--------------------------------------------------
		| If the transaction type is not an exchange
		|--------------------------------------------------
		*/
		if (transactionType !== 'SWAP' && infoType === 'rate') {
			info = `${transactionType === 'NGN-to-NGN' ? `${1} NGN = ${1} NGN` : `${1} CAD = ${1} CAD`}`;
		}

		/**
		|--------------------------------------------------
		| If the transaction type is an exchange
		|--------------------------------------------------
		*/
		if (transactionType === 'SWAP' && infoType === 'rate') {
			info = `${sourceDestination.source === 'NGN' ? `${NGNRate?.rate.toLocaleString()} NGN = ${1} CAD` : `${1} CAD = ${CADRate?.rate.toLocaleString()} NGN`}`;
		}

		/**
		|--------------------------------------------------
		| If the transaction type is not an exchange
		|--------------------------------------------------
		*/
		if (transactionType !== 'SWAP' && infoType === 'conversion') {
			info = `${transactionType === 'NGN-to-NGN' ? `=₦${amountToSend}` : `=$${amountToSend}`}`;
		}

		/**
		|--------------------------------------------------
		| If the transaction type is an exchange
		|--------------------------------------------------
		*/
		if (transactionType === 'SWAP' && infoType === 'conversion') {
			info = `${sourceDestination.source === 'NGN' ? `=$${Number(Number(amountToSend.replaceAll(',', '')) / Number(NGNRate?.rate ?? 1)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}` : `=₦${Number(Number(amountToSend.replaceAll(',', '')) * Number(CADRate?.rate ?? 1)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`}`;
		}

		return info;
	};

	/**
	|--------------------------------------------------
	| On focus
	|--------------------------------------------------
	*/
	navigation.addListener('focus', () => {
		setTransactionType(params.transactionType);
	});

	const handleChangeWallet = (wallet: Wallet, type: 'source' | 'destination') => {
		/**
		|--------------------------------------------------
		| Currency to flag mapping
		|--------------------------------------------------
		*/
		const currencyMap: Record<'NGN' | 'CAD', string> = {
			NGN: '🇳🇬',
			CAD: '🇨🇦',
		};

		setSourceDestination(() => {
			let updatedState: any;

			if (type === 'source') {
				updatedState = {
					source: wallet.currency,
					destination: wallet.currency === 'CAD' ? 'NGN' : 'CAD',
					sourceFlag: wallet.currency === 'CAD' ? currencyMap.CAD : currencyMap.NGN,
					destinationFlag: wallet.currency === 'CAD' ? currencyMap.NGN : currencyMap.CAD,
				};
			} else {
				updatedState = {
					destination: wallet.currency,
					source: wallet.currency === 'CAD' ? 'NGN' : 'CAD',
					sourceFlag: wallet.currency === 'CAD' ? currencyMap.NGN : currencyMap.CAD,
					sourcedestinationFlag: wallet.currency === 'CAD' ? currencyMap.CAD : currencyMap.NGN,
				};
			}

			return updatedState;
		});
	};

	/**
	|--------------------------------------------------
	| Currency changer
	|--------------------------------------------------
	*/
	const renderCurrencyChanger = (type: 'source' | 'destination', flag: 'sourceFlag' | 'destinationFlag') => (
		<View className="mt-12 gap-4">
			{userData?.wallets.map((wallet: any) => (
				<Pressable
					key={wallet?._id}
					onPress={() => handleChangeWallet(wallet, type)}
					className="h-[46px] w-full justify-center rounded-[10px] bg-[#F7F7F7] px-6"
				>
					<MPText weight="medium" className="text-[15px]">
						{wallet.currency === 'NGN' ? '🇳🇬 ' : '🇨🇦 '} {wallet.currency}
					</MPText>
				</Pressable>
			))}
		</View>
	);

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
			<View className="mb-10 flex-row items-center justify-between">
				{/**
				|--------------------------------------------------
				| Step 1 of 2
				|--------------------------------------------------
				*/}
				<View>
					<MPText weight="medium" className="text-[15px] text-[#767676]">
						Step {transactionType === 'SWAP' ? '1/2' : '2/2'}
					</MPText>
					<MPText weight="semibold" className="text-[13px]">
						Enter details
					</MPText>
				</View>

				{/**
				|--------------------------------------------------
				| See our rates
				|--------------------------------------------------
				*/}
				<Pressable onPress={() => navigation.navigate(ROUTE_NAMES.EXCHANGE_RATE as never)}>
					<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
						See our rates
					</MPText>
				</Pressable>
			</View>

			<ScrollView>
				{/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/}
				<Container>
					{/**
					|--------------------------------------------------
					| Main text
					|--------------------------------------------------
					*/}
					<MPText weight="semibold" className="text-center text-base">
						{params.transactionType === 'CAD-to-CAD'
							? 'Send to an Interac Email'
							: params.transactionType === 'SWAP' && sourceDestination.source === 'CAD'
								? 'Send to your NGN wallet'
								: params.transactionType === 'SWAP' && sourceDestination.source === 'NGN'
									? 'Send to your CAD wallet'
									: 'Send to bank account'}
					</MPText>

					{/**
					|--------------------------------------------------
					| Subtext
					|--------------------------------------------------
					*/}
					<MPText weight="medium" className="mb-6 text-center text-[15px] text-[#767676]">
						Enter amount to{' '}
						{params.transactionType === 'CAD-to-CAD'
							? 'send to recipient'
							: params.transactionType === 'SWAP' && sourceDestination.source === 'CAD'
								? 'send to your NGN wallet'
								: params.transactionType === 'SWAP' && sourceDestination.source === 'NGN'
									? 'send to your CAD wallet'
									: 'send to recipient'}
					</MPText>

					{/**
					|--------------------------------------------------
					| Amount to send
					|--------------------------------------------------
					*/}
					<View className="gap-1">
						<MPText className="text-[15px] text-[#1A1A1A]" weight="medium">
							Amount to send
						</MPText>

						{/**
						|--------------------------------------------------
						| Wallet For sender
						|--------------------------------------------------
						*/}
						<View className="mb-4 rounded-[16px] bg-[#FFFFFF] p-4">
							<View className="w-full flex-row items-center justify-between">
								{/**
								|--------------------------------------------------
								| Wallet balance
								|--------------------------------------------------
								*/}
								<View className="flex-row items-center gap-1">
									<MPText weight="semibold" className="text-[18px]">
										{handleCurrencySymbol().sourceSymbol}
									</MPText>

									{/**
									|--------------------------------------------------
									|
									|--------------------------------------------------
									*/}
									<TextInput
										placeholder="0"
										returnKeyType="done"
										value={amountToSend}
										keyboardType="numeric"
										onChangeText={handleChange}
										submitBehavior="blurAndSubmit"
										className="min-w-[100px] text-[18px] font-semibold"
									/>
								</View>

								{/**
								|--------------------------------------------------
								| Select field
								|--------------------------------------------------
								*/}
								<SelectField
									closeOnModalClick
									triggerClassName="h-[32px] max-h-[32px]"
									disabled={params.transactionType !== 'SWAP'}
									wrapperClassName="w-[96px] h-[32px] max-h-[32px] max-w-[96px]"
									triggerChildren={
										<View>
											<MPText weight="medium" className="text-[15px] text-black">
												{sourceDestination.sourceFlag} {sourceDestination.source}
											</MPText>
										</View>
									}
									contentChildren={renderCurrencyChanger('source', 'sourceFlag')}
								/>
							</View>

							{/**
							|--------------------------------------------------
							| Second row
							|--------------------------------------------------
							*/}
							<View className="mt-1 flex-row items-center justify-between">
								<View className="flex-row items-center gap-1">
									<WalletIcon />
									<MPText weight="regular" className="text-[15px] text-[#767676]">
										Wallet Bal:
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Wallet balance
								|--------------------------------------------------
								*/}
								<MPText weight="regular" className="text-[15px] text-[#767676]">
									{handleCurrencySymbol().sourceSymbol}
									{handleGetWalletBalance().toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</MPText>
							</View>
						</View>

						{/**
						|--------------------------------------------------
						| Insufficient balance warning
						|--------------------------------------------------
						*/}
						{handleGetWalletBalance() < Number(amountToSend ?? 0) && (
							<MPText weight="semibold" className="-translate-y-3 text-[13px] text-[#D92D20]">
								Insufficient funds in your wallet
							</MPText>
						)}

						{/**
						|--------------------------------------------------
						| If the amount is less than 100 naira
						|--------------------------------------------------
						*/}
						{params.transactionType === 'NGN-to-NGN' && Number(amountToSend) < 100 && (
							<MPText weight="semibold" className="-translate-y-3 text-[13px] text-[#D92D20]">
								You can't send less than 100 Naira
							</MPText>
						)}

						{/**
						|--------------------------------------------------
						| If the amount is less than 10 naira
						|--------------------------------------------------
						*/}
						{params.transactionType === 'CAD-to-CAD' && Number(amountToSend) < 10 && (
							<MPText weight="semibold" className="-translate-y-3 text-[13px] text-[#D92D20]">
								You can't send less than 10 CAD
							</MPText>
						)}

						{/**
						|--------------------------------------------------
						| If the amount is less than what is allowed
						|--------------------------------------------------
						*/}
						{params.transactionType === 'SWAP' &&
							sourceDestination.source === 'NGN' &&
							Number(amountToSend) < (NGNRate?.rate ?? 0) * 5 && (
								<MPText weight="semibold" className="-translate-y-3 text-[13px] text-[#D92D20]">
									The amount you're trying to exchange is too low
								</MPText>
							)}

						{/**
						|--------------------------------------------------
						| If the amount is less than what is allowed
						|--------------------------------------------------
						*/}
						{params.transactionType === 'SWAP' &&
							sourceDestination.source === 'CAD' &&
							Number(amountToSend) < 10 && (
								<MPText weight="semibold" className="-translate-y-3 text-[13px] text-[#D92D20]">
									The amount you're trying to exchange is too low
								</MPText>
							)}

						{/**
						|--------------------------------------------------
						| Exchange rate
						|--------------------------------------------------
						*/}
						<View className="my-4 h-[108px] w-full justify-between rounded-2xl bg-[#ECEDEE] p-4">
							<DataRepresentation
								label="Today's rate"
								valueClassName="text-[#767676]"
								value={handleConversionInfo('rate')}
							/>

							<DataRepresentation label="Amount we'll send" value={handleConversionInfo('conversion')} />
						</View>

						{/**
						|--------------------------------------------------
						| Amount they’ll receive
						|--------------------------------------------------
						*/}
						<MPText className="text-[15px] text-[#1A1A1A]" weight="medium">
							Amount they’ll receive
						</MPText>

						{/**
						|--------------------------------------------------
						| Wallet for receiver
						|--------------------------------------------------
						*/}
						<View className="rounded-[16px] bg-[#FFFFFF] p-4">
							<View className="w-full flex-row items-center justify-between">
								{/**
								|--------------------------------------------------
								| Wallet balance
								|--------------------------------------------------
								*/}
								<View className="flex-row items-center gap-1">
									<MPText weight="semibold" className="text-[18px]">
										{handleCurrencySymbol().destinationSymbol}
									</MPText>

									{/**
									|--------------------------------------------------
									|
									|--------------------------------------------------
									*/}
									<TextInput
										placeholder="0"
										returnKeyType="done"
										keyboardType="numeric"
										onChangeText={handleChange}
										submitBehavior="blurAndSubmit"
										onSubmitEditing={Keyboard.dismiss}
										className={clsx(
											'w-auto text-[18px] font-semibold',
											transactionType === 'SWAP' ? '' : 'pointer-events-none'
										)}
										value={handleConversionInfo('conversion')
											.replace('=', '')
											.replace('$', '')
											.replace('₦', '')}
									/>
								</View>

								{/**
								|--------------------------------------------------
								| Select field
								|--------------------------------------------------
								*/}
								<SelectField
									closeOnModalClick
									triggerClassName="h-[32px] max-h-[32px]"
									disabled={params.transactionType !== 'SWAP'}
									wrapperClassName="w-[96px] h-[32px] max-h-[32px] max-w-[96px]"
									triggerChildren={
										<View>
											<MPText weight="medium" className="text-[15px] text-black">
												{sourceDestination.destinationFlag} {sourceDestination.destination}
											</MPText>
										</View>
									}
									contentChildren={renderCurrencyChanger('destination', 'destinationFlag')}
								/>
							</View>

							{/**
							|--------------------------------------------------
							| Second row
							|--------------------------------------------------
							*/}
							<View
								className={clsx(
									'mt-1 flex-row items-center justify-between',
									transactionType === 'SWAP' ? 'flex' : 'hidden'
								)}
							>
								<View className="flex-row items-center gap-1">
									<WalletIcon />
									<MPText weight="regular" className="text-[15px] text-[#767676]">
										Wallet Bal:
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Wallet balance
								|--------------------------------------------------
								*/}
								<MPText weight="regular" className="text-[15px] text-[#767676]">
									{handleCurrencySymbol().sourceSymbol}
									{handleGetWalletBalance().toLocaleString(undefined, {
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
						disabled={!isValidAmount}
						useGradientBg={isValidAmount}
						className="mt-6 w-[91px] max-w-[91px] self-center"
						onPress={() => setShowTransactionPreviewModal(true)}
					>
						<MPText weight="semibold" className="text-[15px] text-white">
							Continue
						</MPText>
					</MPButton>
				</Container>
			</ScrollView>

			{/**
            |--------------------------------------------------
            | Transaction confirmation modal
            |--------------------------------------------------
            */}
			<TransactionConfirmationModal
				amount={amountToSend}
				beneficiary={beneficiary}
				visible={showTransactionPreviewModal}
				setVisible={setShowTransactionPreviewModal}
				onConfirm={() => {
					setShowTransactionPin(true);
					setShowTransactionPreviewModal(false);
				}}
				currencySymbol={handleCurrencySymbol().sourceSymbol}
				transactionType={transactionType === 'SWAP' ? 'SWAP' : 'SEND'}
				receivedAmount={handleConversionInfo('conversion').replace('=', '')}
			/>

			{/**
			|--------------------------------------------------
			| Confirm Transaction modal
			|--------------------------------------------------
			*/}
			<ConfirmTransactionModal
				visible={showTransactionPin}
				setVisible={setShowTransactionPin}
				onComplete={(value) => handleSubmission(value)}
				isLoading={isPendingCAD || isPendingNGN || isPendingExchange}
			/>
		</ScreenWrapper>
	);
}
