/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Tooltip from '../Tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { View, Modal, Pressable, Platform, Share } from 'react-native';
import { Svg, Path, Defs, Stop, LinearGradient } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import utils from '@/lib/utils';
import MPButton from '../MPButton';
import HeaderWrapper from '../Header';
import ScreenWrapper from '../Wrapper';
import { CopyIcon, InfoIcon } from '@/assets/svgs';
import { Wallet } from '@/interfaces/wallet.interface';
import { useVerifyInteracTransfer } from '@/services/user.services';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
	onDismiss?: () => void;
	showFundWalletModal: boolean;
	selectedWallet: Wallet | null;
	setShowFundWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShowCurrencyConverModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FundWalletModal({
	onDismiss,
	selectedWallet,
	showFundWalletModal,
	setShowFundWalletModal,
	setShowCurrencyConverModal,
}: Props) {
	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();
	const [showTip, setShowtip] = React.useState<boolean>(false);
	const { mutate, isPending } = useVerifyInteracTransfer(() => setShowFundWalletModal(false));

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={showFundWalletModal} animationType="slide" onDismiss={onDismiss}>
			{Platform.OS === 'ios' && <View className="mt-[70px]" />}
			<View className="flex-1 bg-white">
				<ScreenWrapper>
					{/**
                    |--------------------------------------------------
                    | Header
                    |--------------------------------------------------
                    */}
					<HeaderWrapper
						center
						useNavigation
						onlClick={() => setShowFundWalletModal(false)}
						title={`Fund ${selectedWallet?.currency} Wallet`}
					/>

					{/**
                    |--------------------------------------------------
                    | Content
                    |--------------------------------------------------
                    */}
					<View className="bg-[#F9F9F9] p-5 rounded-3xl">
						{selectedWallet?.currency === 'CAD' && (
							<View className="h-[20px] flex-row items-center w-[60%] rounded-3xl bg-[#FFFAEB] pl-2 gap-2 pr-6 border-[#FEDF89] border justify-start mb-4">
								<MaterialIcons name="circle" size={8} color="#F79009" />
								<MPText
									weight="medium"
									className="text-xs text-[#B54708]"
									style={{ lineHeight: 14, fontSize: 12 }}
								>
									No third-party deposits.{' '}
								</MPText>
							</View>
						)}

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						<View className={clsx(selectedWallet?.currency === 'CAD' ? 'flex' : 'hidden')}>
							<View className="flex-row items-center gap-2 z-50">
								<MPText style={{ fontSize: 16 }} weight="semibold" className="text-base">
									Fund via Interac
								</MPText>

								<View className="relative">
									{/**
									|--------------------------------------------------
									| Icon
									|--------------------------------------------------
									*/}
									<Pressable onPress={() => setShowtip(!showTip)}>
										<InfoIcon />
									</Pressable>

									{/**
									|--------------------------------------------------
									| Popup
									|--------------------------------------------------
									*/}
									{showTip && (
										<Tooltip
											position="center"
											text="Interac e-Transfer must be sent from a bank account with the same legal name as your Maple account."
										/>
									)}
								</View>
							</View>

							{/**
                            |--------------------------------------------------
                            | Instructions
                            |--------------------------------------------------
                            */}
							<MPText weight="medium" className="text-sm text-[#767676]">
								Follow the instructions below to fund your Maple CAD wallet, payment details can be
								shared across apps:
							</MPText>

							{/**
                            |--------------------------------------------------
                            | First step
                            |--------------------------------------------------
                            */}
							<View className="flex-row gap-3 mt-6">
								{/**
                                |--------------------------------------------------
                                | Bank icon
                                |--------------------------------------------------
                                */}
								<Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
									<Path
										d="M2.25 10.2496H4.125V15.2496H2.875C2.70924 15.2496 2.55027 15.3155 2.43306 15.4327C2.31585 15.5499 2.25 15.7089 2.25 15.8746C2.25 16.0404 2.31585 16.1993 2.43306 16.3166C2.55027 16.4338 2.70924 16.4996 2.875 16.4996H17.875C18.0408 16.4996 18.1997 16.4338 18.3169 16.3166C18.4342 16.1993 18.5 16.0404 18.5 15.8746C18.5 15.7089 18.4342 15.5499 18.3169 15.4327C18.1997 15.3155 18.0408 15.2496 17.875 15.2496H16.625V10.2496H18.5C18.636 10.2495 18.7682 10.205 18.8766 10.1229C18.9851 10.0408 19.0637 9.92561 19.1008 9.79476C19.1378 9.6639 19.1311 9.52455 19.0818 9.39783C19.0324 9.27111 18.9431 9.16394 18.8273 9.09258L10.7023 4.09258C10.6039 4.03205 10.4906 4 10.375 4C10.2594 4 10.1461 4.03205 10.0477 4.09258L1.92266 9.09258C1.8069 9.16394 1.71757 9.27111 1.66823 9.39783C1.61888 9.52455 1.61222 9.6639 1.64924 9.79476C1.68626 9.92561 1.76494 10.0408 1.87336 10.1229C1.98178 10.205 2.11401 10.2495 2.25 10.2496ZM5.375 10.2496H7.875V15.2496H5.375V10.2496ZM11.625 10.2496V15.2496H9.125V10.2496H11.625ZM15.375 15.2496H12.875V10.2496H15.375V15.2496ZM10.375 5.3582L16.2922 8.99961H4.45781L10.375 5.3582ZM19.75 18.3746C19.75 18.5404 19.6842 18.6993 19.5669 18.8166C19.4497 18.9338 19.2908 18.9996 19.125 18.9996H1.625C1.45924 18.9996 1.30027 18.9338 1.18306 18.8166C1.06585 18.6993 1 18.5404 1 18.3746C1 18.2089 1.06585 18.0499 1.18306 17.9327C1.30027 17.8155 1.45924 17.7496 1.625 17.7496H19.125C19.2908 17.7496 19.4497 17.8155 19.5669 17.9327C19.6842 18.0499 19.75 18.2089 19.75 18.3746Z"
										fill="#0E314C"
									/>
								</Svg>

								{/**
                                |--------------------------------------------------
                                | Text label
                                |--------------------------------------------------
                                */}
								<MPText
									weight="medium"
									style={{ lineHeight: 18 }}
									className="text-sm flex-1 text-[#767676]"
								>
									Log into your banking app and send money to{' '}
									<MPText weight="semibold" className="text-black">
										payments@mpexchange.ca
									</MPText>
								</MPText>
							</View>

							{/**
                            |--------------------------------------------------
                            | Step 2
                            |--------------------------------------------------
                            */}
							<View className="flex-row gap-3 mt-6">
								{/**
                                |--------------------------------------------------
                                | Bank icon
                                |--------------------------------------------------
                                */}
								<Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
									<Path
										d="M17.625 4H2.625C2.45924 4 2.30027 4.06585 2.18306 4.18306C2.06585 4.30027 2 4.45924 2 4.625V15.25C2 15.5815 2.1317 15.8995 2.36612 16.1339C2.60054 16.3683 2.91848 16.5 3.25 16.5H17C17.3315 16.5 17.6495 16.3683 17.8839 16.1339C18.1183 15.8995 18.25 15.5815 18.25 15.25V4.625C18.25 4.45924 18.1842 4.30027 18.0669 4.18306C17.9497 4.06585 17.7908 4 17.625 4ZM16.018 5.25L10.125 10.6523L4.23203 5.25H16.018ZM17 15.25H3.25V6.04609L9.70234 11.9609C9.81765 12.0668 9.96848 12.1255 10.125 12.1255C10.2815 12.1255 10.4324 12.0668 10.5477 11.9609L17 6.04609V15.25Z"
										fill="#0E314C"
									/>
								</Svg>

								{/**
                                |--------------------------------------------------
                                | Text label
                                |--------------------------------------------------
                                */}
								<MPText
									weight="medium"
									style={{ lineHeight: 18 }}
									className="text-sm flex-1 text-[#767676]"
								>
									Make sure you are sending money from your verified interac address
								</MPText>
							</View>

							{/**
                            |--------------------------------------------------
                            | Step 3
                            |--------------------------------------------------
                            */}
							<View className="flex-row gap-3 mt-6">
								{/**
                                |--------------------------------------------------
                                | Bank icon
                                |--------------------------------------------------
                                */}
								<Svg width="21" height="23" viewBox="0 0 21 23" fill="none">
									<Path
										d="M10.125 4C8.51803 4 6.94714 4.47652 5.611 5.36931C4.27485 6.2621 3.23344 7.53105 2.61848 9.0157C2.00352 10.5003 1.84262 12.134 2.15612 13.7101C2.46963 15.2862 3.24346 16.7339 4.37976 17.8702C5.51606 19.0065 6.9638 19.7804 8.5399 20.0939C10.116 20.4074 11.7497 20.2465 13.2343 19.6315C14.719 19.0166 15.9879 17.9752 16.8807 16.639C17.7735 15.3029 18.25 13.732 18.25 12.125C18.2477 9.97081 17.391 7.90551 15.8677 6.38227C14.3445 4.85903 12.2792 4.00227 10.125 4ZM10.125 19C8.76526 19 7.43605 18.5968 6.30546 17.8414C5.17487 17.0859 4.29368 16.0122 3.77333 14.7559C3.25298 13.4997 3.11683 12.1174 3.3821 10.7838C3.64738 9.45013 4.30216 8.22513 5.26364 7.26364C6.22513 6.30216 7.45014 5.64737 8.78376 5.3821C10.1174 5.11683 11.4997 5.25298 12.756 5.77333C14.0122 6.29368 15.0859 7.17487 15.8414 8.30545C16.5968 9.43604 17 10.7653 17 12.125C16.9979 13.9477 16.2729 15.6952 14.9841 16.9841C13.6952 18.2729 11.9477 18.9979 10.125 19ZM15.125 12.125C15.125 12.2908 15.0592 12.4497 14.9419 12.5669C14.8247 12.6842 14.6658 12.75 14.5 12.75H10.125C9.95924 12.75 9.80027 12.6842 9.68306 12.5669C9.56585 12.4497 9.5 12.2908 9.5 12.125V7.75C9.5 7.58424 9.56585 7.42527 9.68306 7.30806C9.80027 7.19085 9.95924 7.125 10.125 7.125C10.2908 7.125 10.4497 7.19085 10.5669 7.30806C10.6842 7.42527 10.75 7.58424 10.75 7.75V11.5H14.5C14.6658 11.5 14.8247 11.5658 14.9419 11.6831C15.0592 11.8003 15.125 11.9592 15.125 12.125Z"
										fill="#0E314C"
									/>
								</Svg>

								{/**
                                |--------------------------------------------------
                                | Text label
                                |--------------------------------------------------
                                */}
								<MPText
									weight="medium"
									style={{ lineHeight: 18 }}
									className="text-sm flex-1 text-[#767676]"
								>
									It takes an average of 10-20 minutes for the funds to appear in your wallet
								</MPText>
							</View>

							{/**
                            |--------------------------------------------------
                            | Copy account information
                            |--------------------------------------------------
                            */}
							<View className="h-[74px] bg-white rounded-3xl p-4 flex-row items-center mt-6">
								<View>
									<MPText
										weight="regular"
										style={{ fontSize: 12 }}
										className="text-xs text-[#767676]"
									>
										INTERAC EMAIL ADDRESS
									</MPText>
									<MPText className="text-sm" weight="medium">
										Payments@mpexchange.ca
									</MPText>
								</View>

								{/**
                                |--------------------------------------------------
                                | ...
                                |--------------------------------------------------
                                */}
								<Pressable
									className="ml-auto"
									onPress={() => utils.copyToClipboard(selectedWallet?.email as string)}
								>
									<CopyIcon color="#767676" />
								</Pressable>
								<Pressable
									className="ml-4"
									onPress={async () => {
										await Share.share({
											message: `Interac email: Payments@mpexchange.ca`,
										});
									}}
								>
									<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<Path
											d="M16.875 8.75049V16.2505C16.875 16.582 16.7433 16.9 16.5089 17.1344C16.2745 17.3688 15.9565 17.5005 15.625 17.5005H4.375C4.04348 17.5005 3.72554 17.3688 3.49112 17.1344C3.2567 16.9 3.125 16.582 3.125 16.2505V8.75049C3.125 8.41897 3.2567 8.10103 3.49112 7.86661C3.72554 7.63219 4.04348 7.50049 4.375 7.50049H6.25C6.41576 7.50049 6.57473 7.56634 6.69194 7.68355C6.80915 7.80076 6.875 7.95973 6.875 8.12549C6.875 8.29125 6.80915 8.45022 6.69194 8.56743C6.57473 8.68464 6.41576 8.75049 6.25 8.75049H4.375V16.2505H15.625V8.75049H13.75C13.5842 8.75049 13.4253 8.68464 13.3081 8.56743C13.1908 8.45022 13.125 8.29125 13.125 8.12549C13.125 7.95973 13.1908 7.80076 13.3081 7.68355C13.4253 7.56634 13.5842 7.50049 13.75 7.50049H15.625C15.9565 7.50049 16.2745 7.63219 16.5089 7.86661C16.7433 8.10103 16.875 8.41897 16.875 8.75049ZM7.31719 5.44268L9.375 3.38409V10.6255C9.375 10.7913 9.44085 10.9502 9.55806 11.0674C9.67527 11.1846 9.83424 11.2505 10 11.2505C10.1658 11.2505 10.3247 11.1846 10.4419 11.0674C10.5592 10.9502 10.625 10.7913 10.625 10.6255V3.38409L12.6828 5.44268C12.8001 5.55996 12.9591 5.62584 13.125 5.62584C13.2909 5.62584 13.4499 5.55996 13.5672 5.44268C13.6845 5.3254 13.7503 5.16634 13.7503 5.00049C13.7503 4.83464 13.6845 4.67558 13.5672 4.5583L10.4422 1.4333C10.3841 1.37519 10.3152 1.32909 10.2393 1.29764C10.1635 1.26619 10.0821 1.25 10 1.25C9.91787 1.25 9.83654 1.26619 9.76066 1.29764C9.68479 1.32909 9.61586 1.37519 9.55781 1.4333L6.43281 4.5583C6.31554 4.67558 6.24965 4.83464 6.24965 5.00049C6.24965 5.16634 6.31554 5.3254 6.43281 5.44268C6.55009 5.55995 6.70915 5.62584 6.875 5.62584C7.04085 5.62584 7.19991 5.55996 7.31719 5.44268Z"
											fill="#767676"
										/>
									</Svg>
								</Pressable>
							</View>

							{/**
							|--------------------------------------------------
							| See rate
							|--------------------------------------------------
							*/}
							<MPButton useGradientBg className="w-[194px] self-center mt-6">
								<Pressable
									onPress={() => {
										setShowFundWalletModal(false);
										setShowCurrencyConverModal(true);
									}}
									className="bg-white w-[99%] h-[93%] rounded-[40px] justify-center items-center"
								>
									<MPText weight="semibold" className="text-sm text-[#FF6A00]">
										See rate
									</MPText>
								</Pressable>
							</MPButton>

							{/**
							|--------------------------------------------------
							| I have made payment
							|--------------------------------------------------
							*/}
							<MPButton
								useGradientBg
								className="w-[194px] self-center mt-6"
								onPress={() => mutate({ startDate: new Date(new Date().setDate(17)).toISOString() })}
							>
								<MPText weight="semibold" className="text-sm text-white">
									{isPending ? 'Verifying...' : 'I have made the payment'}
								</MPText>
							</MPButton>
						</View>

						{/**
                        |--------------------------------------------------
                        | For NGN wallet
                        |--------------------------------------------------
                        */}
						<View className={clsx(selectedWallet?.currency === 'NGN' ? 'flex' : 'hidden')}>
							<View className="flex-row items-center gap-2 z-50">
								<MPText style={{ fontSize: 16 }} weight="semibold" className="text-base">
									Fund wallet via bank transfer
								</MPText>

								<View className="relative">
									{/**
									|--------------------------------------------------
									| Icon
									|--------------------------------------------------
									*/}
									<Pressable onPress={() => setShowtip(!showTip)}>
										<InfoIcon />
									</Pressable>

									{/**
									|--------------------------------------------------
									| Popup
									|--------------------------------------------------
									*/}
									{showTip && (
										<Tooltip text="The bank transfer must be sent from a bank with the same legal name as your Maple Pay Account." />
									)}
								</View>
							</View>

							{/**
                            |--------------------------------------------------
                            | Instructions
                            |--------------------------------------------------
                            */}
							<MPText weight="medium" className="text-sm text-[#767676] mt-1">
								Transfer money from your bank to the following account:
							</MPText>

							<View className="gap-5 mt-6">
								{/**
                                |--------------------------------------------------
                                | Bank name
                                |--------------------------------------------------
                                */}
								<View className="flex-row justify-between items-center">
									{/**
                                    |--------------------------------------------------
                                    | Text information
                                    |--------------------------------------------------
                                    */}
									<View>
										<MPText
											weight="medium"
											style={{ fontSize: 12 }}
											className="text-sm text-[#767676]"
										>
											BANK NAME
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

								{/**
                                |--------------------------------------------------
                                | Account number
                                |--------------------------------------------------
                                */}
								<View className="flex-row justify-between items-center">
									{/**
                                    |--------------------------------------------------
                                    | Text information
                                    |--------------------------------------------------
                                    */}
									<View>
										<MPText
											weight="medium"
											style={{ fontSize: 12 }}
											className="text-sm text-[#767676]"
										>
											ACCOUNT NUMBER
										</MPText>
										<MPText weight="medium" className="text-sm">
											{selectedWallet?.accountInformation?.accountNumber}
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
                                | Account holder
                                |--------------------------------------------------
                                */}
								<View className="flex-row justify-between items-center">
									{/**
                                    |--------------------------------------------------
                                    | Text information
                                    |--------------------------------------------------
                                    */}
									<View>
										<MPText
											weight="medium"
											style={{ fontSize: 12 }}
											className="text-sm text-[#767676]"
										>
											ACCOUNT HOLDER
										</MPText>
										<MPText weight="medium" className="text-sm">
											{selectedWallet?.accountInformation?.accountName}
										</MPText>
									</View>

									{/**
                                    |--------------------------------------------------
                                    | Copy icon
                                    |--------------------------------------------------
                                    */}
									<Pressable
										onPress={() =>
											utils.copyToClipboard(selectedWallet?.accountInformation?.accountName || '')
										}
									>
										<CopyIcon />
									</Pressable>
								</View>

								<MPButton
									useGradientBg
									className="w-[194px] self-center mt-6"
									onPress={() => {
										queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
										setShowFundWalletModal(false);
									}}
								>
									<MPText weight="semibold" className="text-sm text-[#FFFFFF]">
										{isPending ? 'Verifying...' : 'I have made the payment'}
									</MPText>
								</MPButton>
							</View>
						</View>
					</View>

					{selectedWallet?.currency === 'CAD' && (
						<Pressable className="flex-row items-center justify-center gap-3 mt-6">
							<MPText weight="semibold" className="text-[#FF6A00] text-sm">
								How to fund via interac
							</MPText>
							<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<Path
									d="M13.8538 8.35354L9.35375 12.8535C9.25993 12.9474 9.13268 13.0001 9 13.0001C8.86732 13.0001 8.74007 12.9474 8.64625 12.8535C8.55243 12.7597 8.49972 12.6325 8.49972 12.4998C8.49972 12.3671 8.55243 12.2399 8.64625 12.146L12.2931 8.49979H2.5C2.36739 8.49979 2.24021 8.44711 2.14645 8.35334C2.05268 8.25958 2 8.1324 2 7.99979C2 7.86718 2.05268 7.74 2.14645 7.64624C2.24021 7.55247 2.36739 7.49979 2.5 7.49979H12.2931L8.64625 3.85354C8.55243 3.75972 8.49972 3.63247 8.49972 3.49979C8.49972 3.36711 8.55243 3.23986 8.64625 3.14604C8.74007 3.05222 8.86732 2.99951 9 2.99951C9.13268 2.99951 9.25993 3.05222 9.35375 3.14604L13.8538 7.64604C13.9002 7.69248 13.9371 7.74762 13.9623 7.80832C13.9874 7.86902 14.0004 7.93408 14.0004 7.99979C14.0004 8.0655 13.9874 8.13056 13.9623 8.19126C13.9371 8.25196 13.9002 8.3071 13.8538 8.35354Z"
									fill="url(#paint0_linear_1129_4386)"
								/>
								<Defs>
									<LinearGradient
										id="paint0_linear_1129_4386"
										x1="8.0002"
										y1="2.99951"
										x2="8.0002"
										y2="13.0001"
										gradientUnits="userSpaceOnUse"
									>
										<Stop stopColor="#EE0979" />
										<Stop offset="1" stopColor="#FF6A00" />
									</LinearGradient>
								</Defs>
							</Svg>
						</Pressable>
					)}
				</ScreenWrapper>
			</View>
		</Modal>
	);
}
