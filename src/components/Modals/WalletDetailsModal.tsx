/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import utils from '@lib/utils';
import { CloseIcon, CopyIcon } from '@assets/svgs';
import { Wallet } from '@interfaces/wallet.interface';

interface Props {
	accountName: string;
	onDismiss?: () => void;
	setShowWalletDetails: any;
	showWalletDetails: boolean;
	selectedWallet: Wallet | null;
}
export default function WalletDetailsModal({
	onDismiss,
	accountName,
	selectedWallet,
	showWalletDetails,
	setShowWalletDetails,
}: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal transparent visible={showWalletDetails} animationType="slide" onDismiss={onDismiss}>
			<Pressable onPress={() => setShowWalletDetails(false)} className="flex-1 bg-black/10">
				<View className="rounded-3xl bg-white mt-auto p-4 min-h-[306px]">
					{/**
                    |--------------------------------------------------
                    | Close icon
                    |--------------------------------------------------
                    */}
					<Pressable className="ml-auto" onPress={() => setShowWalletDetails(false)}>
						<CloseIcon />
					</Pressable>

					{/**
                    |--------------------------------------------------
                    | Title
                    |--------------------------------------------------
                    */}
					<MPText weight="bold" className="" style={{ fontSize: 18 }}>
						{selectedWallet?.currency} Account Details
					</MPText>
					<MPText weight="medium" className="text-sm text-[#767676]">
						Here are your {selectedWallet?.currency} account details.
					</MPText>

					<View className="mt-5 gap-5">
						{/**
                        |--------------------------------------------------
                        | Account holder
                        |--------------------------------------------------
                        */}
						<View className="flex-row justify-between items-center">
							<View>
								<MPText weight="medium" className="text-sm text-[#767676]">
									Account holder
								</MPText>
								<MPText weight="medium" className="text-sm">
									{selectedWallet?.currency === 'CAD'
										? accountName
										: selectedWallet?.accountInformation?.accountName}
								</MPText>
							</View>

							{/**
                            |--------------------------------------------------
                            | Copy icon
                            |--------------------------------------------------
                            */}
							<Pressable
								onPress={() =>
									utils.copyToClipboard(
										selectedWallet?.currency === 'CAD'
											? accountName
											: (selectedWallet?.accountInformation?.accountName as string)
									)
								}
							>
								<CopyIcon />
							</Pressable>
						</View>

						{/**
                        |--------------------------------------------------
                        | Interac email for CAD users
                        |--------------------------------------------------
                        */}
						{selectedWallet?.currency === 'CAD' && (
							<View className="flex-row justify-between items-center">
								<View>
									<MPText weight="medium" className="text-sm text-[#767676]">
										Interac E-Transfer
									</MPText>
									<MPText weight="medium" className="text-sm">
										{selectedWallet.email}
									</MPText>
								</View>

								{/**
                                |--------------------------------------------------
                                | Copy icon
                                |--------------------------------------------------
                                */}
								<Pressable onPress={() => utils.copyToClipboard(selectedWallet.email)}>
									<CopyIcon />
								</Pressable>
							</View>
						)}

						{/**
                        |--------------------------------------------------
                        | Account number
                        |--------------------------------------------------
                        */}
						{selectedWallet?.currency === 'NGN' && (
							<View className="gap-5">
								{/**
                                |--------------------------------------------------
                                | Account number
                                |--------------------------------------------------
                                */}
								<View className="flex-row justify-between items-center">
									<View>
										<MPText weight="medium" className="text-sm text-[#767676]">
											Account Number
										</MPText>
										<MPText weight="medium" className="text-sm">
											{selectedWallet.accountInformation?.accountNumber}
										</MPText>
									</View>

									{/**
                                    |--------------------------------------------------
                                    | Copy icon
                                    |--------------------------------------------------
                                    */}
									<Pressable
										onPress={() =>
											utils.copyToClipboard(
												selectedWallet?.accountInformation?.accountNumber || ''
											)
										}
									>
										<CopyIcon />
									</Pressable>
								</View>

								{/**
                                |--------------------------------------------------
                                | Bank name
                                |--------------------------------------------------
                                */}
								<View className="flex-row justify-between items-center">
									<View>
										<MPText weight="medium" className="text-sm text-[#767676]">
											Bank Name
										</MPText>
										<MPText weight="medium" className="text-sm">
											{selectedWallet?.accountInformation?.bankName}
										</MPText>
									</View>

									{/**
                                    |--------------------------------------------------
                                    | Copy icon
                                    |--------------------------------------------------
                                    */}
									<Pressable
										onPress={() =>
											utils.copyToClipboard(selectedWallet?.accountInformation?.bankName || '')
										}
									>
										<CopyIcon />
									</Pressable>
								</View>
							</View>
						)}
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}
