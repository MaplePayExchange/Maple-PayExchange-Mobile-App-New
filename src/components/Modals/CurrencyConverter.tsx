/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { View, Modal, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import Container from '../Container';
import SelectField from '../SelectField';
import { useUserStore } from '@/zustand/userStore';
import { CloseIcon, WalletIcon } from '@/assets/svgs';
import DataRepresentation from '../DataRepresentation';
import { Wallet } from '@/interfaces/wallet.interface';
import { useGetRates } from '@/services/user.services';

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CurrencyConverter({ visible, setVisible }: Props) {
	const insets = useSafeAreaInsets();
	const queryClient = useQueryClient();
	/**
    |--------------------------------------------------
    | Api
    |--------------------------------------------------
    */
	const { data: rates } = useGetRates();
	const NGNRate = rates?.items?.find((rate) => rate.exchange === 'NGN-TO-CAD');
	const CADRate = rates?.items?.find((rate) => rate.exchange === 'CAD-TO-NGN');
	const userData = queryClient.getQueryData(['maple_user_data']) as any;

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const transactionType = 'SWAP';
	const { selectedWallet } = useUserStore();
	const [amountToSend, setAmountToSend] = React.useState<string>('');
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
		if (transactionType === 'SWAP' && selectedWallet?.currency === 'CAD') {
			return { source: 'CAD', destination: 'NGN', sourceFlag: '🇨🇦', destinationFlag: '🇳🇬' };
		}

		/**
        |--------------------------------------------------
        | For NGN
        |--------------------------------------------------
        */
		if (transactionType === 'SWAP' && selectedWallet?.currency === 'NGN') {
			return { source: 'NGN', destination: 'CAD', sourceFlag: '🇳🇬', destinationFlag: '🇨🇦' };
		}

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		return { source: 'NGN', destination: 'CAD', sourceFlag: '🇳🇬', destinationFlag: '🇨🇦' };
	});

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
				(userData?.wallets?.find((wallet: any) => wallet.currency === 'NGN') as Wallet)?.walletBalance ?? 0;
		}

		/**
            |--------------------------------------------------
            | If the transaction type is CAD to CAD
            |--------------------------------------------------
            */
		if (sourceDestination.source === 'CAD') {
			balance =
				(userData?.wallets?.find((wallet: any) => wallet.currency === 'CAD') as Wallet)?.walletBalance ?? 0;
		}

		return balance;
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
		| If the transaction type is an exchange
		|--------------------------------------------------
		*/
		if (transactionType === 'SWAP' && infoType === 'rate') {
			info = `${sourceDestination.source === 'NGN' ? `${NGNRate?.rate.toLocaleString()} NGN = ${1} CAD` : `${1} CAD = ${CADRate?.rate.toLocaleString()} NGN`}`;
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
    | Handles changing wallet
    |--------------------------------------------------
    */
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

		if (transactionType === 'SWAP' && selectedWallet?.currency) {
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
    | Currency changer
    |--------------------------------------------------
    */
	const renderCurrencyChanger = (type: 'source' | 'destination', flag: 'sourceFlag' | 'destinationFlag') => (
		<View className="mt-12 gap-4">
			{userData?.wallets.map((wallet: any) => (
				<Pressable
					key={wallet?._id}
					onPress={() => handleChangeWallet(wallet, type)}
					className="h-[46px] w-full rounded-[10px] bg-[#F7F7F7] justify-center px-6"
				>
					<MPText weight="medium" className="text-sm">
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
		<Modal visible={visible} transparent animationType="slide">
			<Pressable className="flex-1 bg-black/10">
				{/**
                |--------------------------------------------------
                | Content
                |--------------------------------------------------
                */}
				<View
					className="bg-white p-6 mt-auto rounded-2xl min-h-[200px] w-full"
					style={{ paddingBottom: insets.bottom }}
				>
					{/**
                    |--------------------------------------------------
                    | Header
                    |--------------------------------------------------
                    */}
					<View className="flex-row justify-between items-center mb-4">
						<MPText weight="semibold" className="text-sm">
							Currency converter
						</MPText>

						<Pressable onPress={() => setVisible(false)}>
							<CloseIcon />
						</Pressable>
					</View>

					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<Container>
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
										{handleCurrencySymbol().sourceSymbol}
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
										className="text-[18px] font-semibold w-auto"
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
									disabled={transactionType !== 'SWAP'}
									wrapperClassName="w-[96px] h-[32px] max-h-[32px] max-w-[96px]"
									triggerChildren={
										<View>
											<MPText weight="medium" className="text-sm text-black">
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
                        | Exchange rate
                        |--------------------------------------------------
                        */}
						<View className="min-h-[50px] rounded-2xl bg-[#ECEDEE] w-full p-4 justify-between my-4">
							<DataRepresentation
								label="Today's rate"
								valueClassName="text-[#767676]"
								value={handleConversionInfo('rate')}
							/>
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
										{handleCurrencySymbol().destinationSymbol}
									</MPText>

									{/**
                                    |--------------------------------------------------
                                    |
                                    |--------------------------------------------------
                                    */}
									<TextInput
										placeholder="0"
										keyboardType="numeric"
										onChangeText={handleChange}
										className={clsx(
											'text-[18px] font-semibold w-auto',
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
									disabled={transactionType !== 'SWAP'}
									triggerClassName="h-[32px] max-h-[32px]"
									wrapperClassName="w-[96px] h-[32px] max-h-[32px] max-w-[96px]"
									triggerChildren={
										<View>
											<MPText weight="medium" className="text-sm text-black">
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
									{handleCurrencySymbol().sourceSymbol}
									{handleGetWalletBalance().toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</MPText>
							</View>
						</View>
					</Container>
				</View>
			</Pressable>
		</Modal>
	);
}
