/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, RefreshControl, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import { useUserStore } from '@zustand/userStore';
import ScreenWrapper from '@src/components/Wrapper';
import { Wallet } from '@interfaces/wallet.interface';
import Transaction from '@src/components/Transaction';
import { ROUTE_NAMES } from '@constants/routes.conts';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';
import { useGetUserInformation } from '@services/auth.services';
import SendFundsModal from '@src/components/Modals/SendFundsModal';
import { MONEY_PAD, clampFontSize } from '@constants/app.constant';
import FundWalletModal from '@src/components/Modals/FundWalletModal';
import BiometricsModal from '@src/components/Modals/BiometricsModal';
import CustomRefreshControl from '@src/components/CustomRefreshControl';
import CurrencyConverter from '@src/components/Modals/CurrencyConverter';
import WalletDetailsModal from '@src/components/Modals/WalletDetailsModal';
import UnverifiedAcountModal from '@src/components/Modals/UnverifiedAccountModal';
import { AddIcon, BellIcon, SendIcon, DetailsIcon, PadlockIcon, ExchangeIcon, RedRightArrowIcon } from '@assets/svgs';

/**
|--------------------------------------------------
| Dashboard types
|--------------------------------------------------
*/
type PossibleActions = 'see_more_transactions' | 'details' | 'add' | 'send' | 'exchange' | 'notification';
type DashboardScreenProps = NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;

export default function DashboardScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<DashboardScreenProps>();

	/**
	|--------------------------------------------------
	| Api calls
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();
	const { data, isPending, isLoading, error } = useGetUserInformation();
	const [showBvnModal, setShowBvnModal] = React.useState<boolean>(false);
	const [showWalletModal, setShowWalletModal] = React.useState<boolean>(false);
	const [showWalletDetails, setShowWalletDetails] = React.useState<boolean>(false);
	const [showSendFundsModal, setShowSendFundsModal] = React.useState<boolean>(false);
	const [showFundWalletModal, setShowFundWalletModal] = React.useState<boolean>(false);
	const [showCurrencyConvertModal, setShowCurrencyConvertModal] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const {
		userData,
		selectedWallet,
		biometricsInfo,
		setBiometricsInfo,
		setSelectedWallet,
		setBiometricsModal,
		showBiometricsModal,
	} = useUserStore();
	const isVerified = data?.user.isVerified;
	const isBvnVerified = data?.user?.isBvnVerified;

	console.log(error);

	/**
	|--------------------------------------------------
	| Handles any click on the dashbaord screen
	|--------------------------------------------------
	*/
	const handleInitiateAction = (type: PossibleActions) => {
		/**
		|--------------------------------------------------
		| Checking if the user has been verified
		|--------------------------------------------------
		*/
		if (!isVerified || !isBvnVerified || typeof userData?.user?.transactionPin !== 'string') {
			setShowBvnModal(true);
			return;
		}

		/**
		|--------------------------------------------------
		| Handling actions based on type
		|--------------------------------------------------
		*/
		switch (type) {
			/**
			|--------------------------------------------------
			| To see more transactions
			|--------------------------------------------------
			*/
			case 'see_more_transactions':
				navigation.navigate(ROUTE_NAMES.TRANSACTION as never);
				break;

			/**
			|--------------------------------------------------
			| To see notifications
			|--------------------------------------------------
			*/
			case 'notification':
				navigation.navigate(ROUTE_NAMES.NOTIFICATION_SCREEN as never);
				break;

			/**
			|--------------------------------------------------
			| Case details
			|--------------------------------------------------
			*/
			case 'details':
				setShowWalletDetails(true);
				break;

			/**
			|--------------------------------------------------
			| Show fund wallet modal
			|--------------------------------------------------
			*/
			case 'add':
				setShowFundWalletModal(true);
				break;

			/**
			|--------------------------------------------------
			| Send funds
			|--------------------------------------------------
			*/
			case 'send':
				setShowSendFundsModal(true);
				break;

			/**
			|--------------------------------------------------
			| Exchange funds
			|--------------------------------------------------
			*/
			case 'exchange':
				navigation.navigate('AmountScreen', {
					transactionType: 'SWAP',
					accountName: `${userData?.user?.firstName} ${userData?.user?.lastName}`,
				});
				break;

			default:
				break;
		}
	};

	/**
	|--------------------------------------------------
	| handle Dismissing all modals
	|--------------------------------------------------
	*/
	const handleDismissAllModals = () => {
		setShowBvnModal(false);
		setShowWalletModal(false);
		setShowWalletDetails(false);
		setShowSendFundsModal(false);
		setShowFundWalletModal(false);
	};

	/**
	|--------------------------------------------------
	| Effect
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		const walletToShow =
			data?.wallets.find((wallet) => wallet.currency === selectedWallet?.currency) || data?.wallets?.[0];
		setSelectedWallet(walletToShow as Wallet);
	}, [data]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper className="bg-white pb-0">
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={false}
						tintColor="transparent"
						colors={['transparent']}
						onRefresh={() => {
							queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
						}}
					/>
				}
			>
				{/**
				|--------------------------------------------------
				| IsPending
				|--------------------------------------------------
				*/}
				{(isPending || isLoading) && <CustomRefreshControl refreshing={isPending || isLoading} />}

				{/**
				|--------------------------------------------------
				| Header
				|--------------------------------------------------
				*/}
				<View className="flex-row items-center">
					{/**
					|--------------------------------------------------
					| Profile wrapper
					|--------------------------------------------------
					*/}
					<View className="mr-3 size-10 items-center justify-center rounded-full bg-[#909083]">
						<Image source={{ uri: data?.user.profileImage }} className="h-10 w-10 rounded-full" />
					</View>
					{/**
					|--------------------------------------------------
					| Welcome text
					|--------------------------------------------------
					*/}
					<MPText fontSize="FONT18" className="flex-1 text-xl text-[#A4A6AA]">
						Hello,{' '}
						<MPText fontSize="FONT18" weight="semibold" className="text-xl text-[#1A1A1A]">
							{data?.user?.firstName || ''} {data?.user?.lastName || ''}
						</MPText>
					</MPText>

					{/**
					|--------------------------------------------------
					| Notification
					|--------------------------------------------------
					*/}
					<Pressable
						onPress={() => handleInitiateAction('notification')}
						className="relative ml-auto size-10 items-center justify-center rounded-full bg-[#FAFAF9]"
					>
						<BellIcon />
						<View className="absolute right-3 top-2 size-2 rounded-full bg-[#EE4139]">
							<Svg width={8} height={8} viewBox="0 0 24 24">
								<Path
									d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2"
									fill="red"
								/>
							</Svg>
						</View>
					</Pressable>
				</View>

				{/**
				|--------------------------------------------------
				| Overview pane
				|--------------------------------------------------
				*/}
				<View className="mt-8 h-[220px] w-full rounded-[24px] bg-[#031D30] px-5 py-6">
					{/**
					|--------------------------------------------------
					| If bvn has not been verified, wallet is locked
					|--------------------------------------------------
					*/}
					{!isVerified && !isLoading && (
						<View className="items-center justify-center">
							<PadlockIcon />
							<MPText style={{ fontSize: 12 }} className="mt-2 text-[13px] text-white" weight="semibold">
								Wallet Locked
							</MPText>
							<MPText
								weight="semibold"
								className="text-2xl text-white"
								style={{ lineHeight: 26, fontSize: 24 }}
							>
								00.00
							</MPText>
						</View>
					)}

					{/**
					|--------------------------------------------------
					| Wallet is unlocked
					|--------------------------------------------------
					*/}
					{isVerified && !isLoading && (
						<Pressable
							onPress={() => setShowWalletModal(true)}
							className="h-[20px] w-[68px] flex-row items-center justify-center gap-1 self-center rounded-[8px] bg-[#F7F7F7]"
						>
							<MPText className="text-[15px]">{selectedWallet?.currency === 'NGN' ? '🇳🇬' : '🇨🇦'}</MPText>
							<MPText style={{ fontSize: 10 }} className="text-[13px]" weight="bold">
								{selectedWallet?.currency}
							</MPText>

							<Svg width="10" height="7" viewBox="0 0 10 7" fill="none">
								<Path
									d="M9.68453 1.55977L5.30953 5.93477C5.2689 5.97545 5.22065 6.00772 5.16754 6.02974C5.11442 6.05176 5.05749 6.06309 5 6.06309C4.9425 6.06309 4.88557 6.05176 4.83246 6.02974C4.77935 6.00772 4.7311 5.97545 4.69047 5.93477L0.315468 1.55977C0.233375 1.47768 0.187256 1.36634 0.187256 1.25024C0.187256 1.13415 0.233375 1.0228 0.315468 0.940712C0.397561 0.858619 0.508902 0.8125 0.624999 0.8125C0.741096 0.8125 0.852438 0.858619 0.93453 0.940712L5 5.00673L9.06547 0.940712C9.10612 0.900064 9.15437 0.86782 9.20748 0.845821C9.26059 0.823822 9.31751 0.8125 9.375 0.8125C9.43248 0.8125 9.48941 0.823822 9.54252 0.845821C9.59563 0.86782 9.64388 0.900064 9.68453 0.940712C9.72518 0.98136 9.75742 1.02962 9.77942 1.08273C9.80142 1.13584 9.81274 1.19276 9.81274 1.25024C9.81274 1.30773 9.80142 1.36465 9.77942 1.41776C9.75742 1.47087 9.72518 1.51913 9.68453 1.55977Z"
									fill="#1A1A1A"
								/>
							</Svg>

							{/**
							|--------------------------------------------------
							| Modal to select wallet type
							|--------------------------------------------------
							*/}
							<Modal transparent visible={showWalletModal} animationType="slide">
								<TouchableOpacity
									activeOpacity={0.98}
									onPress={() => setShowWalletModal(false)}
									className="flex-1 justify-center bg-black/10 p-6"
								>
									<View className="min-h-[186px] rounded-3xl bg-white p-4">
										<MPText weight="semibold" className="text-center text-[15px]">
											MY WALLETS
										</MPText>

										{/**
										|--------------------------------------------------
										| Wallets
										|--------------------------------------------------
										*/}
										<View className="mt-6 gap-4">
											{data?.wallets.map((wallet) => (
												<Pressable
													key={wallet?._id}
													onPress={() => {
														setSelectedWallet(wallet);
														setShowWalletModal(false);
													}}
													className="h-[46px] w-full justify-center rounded-[10px] bg-[#F7F7F7] px-6"
												>
													<MPText weight="medium" className="text-[15px]">
														{wallet.currency === 'NGN' ? '🇳🇬 ' : '🇨🇦 '} {wallet.currency}
													</MPText>
												</Pressable>
											))}
										</View>

										{/**
										|--------------------------------------------------
										| Action button
										|--------------------------------------------------
										*/}
										<MPButton useGradientBg className="mt-6 !hidden w-[128px] self-center">
											<Pressable className="h-[93%] w-[99%] items-center justify-center rounded-[40px] bg-white">
												<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
													Add new wallet
												</MPText>
											</Pressable>
										</MPButton>
									</View>
								</TouchableOpacity>
							</Modal>
						</Pressable>
					)}

					{/**
					|--------------------------------------------------
					| Wallet Balance
					|--------------------------------------------------
					*/}
					{isVerified && (
						<MPText weight="semibold" className="mb-1 mt-4 self-center text-[13px] text-white">
							Wallet Balance
						</MPText>
					)}

					{/**
					|--------------------------------------------------
					| Balance
					|--------------------------------------------------
					*/}
					{isVerified && (
						<MPText
							weight="semibold"
							style={{ fontSize: 24, lineHeight: 30 }}
							className="self-center text-[24px] text-white"
						>
							{selectedWallet?.currency === 'CAD' ? '$' : '₦'}{' '}
							{selectedWallet?.walletBalance.toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</MPText>
					)}

					{/**
					|--------------------------------------------------
					| Action icons
					|--------------------------------------------------
					*/}
					<View className="mt-auto flex-row justify-evenly">
						{[
							{ name: 'details', icon: DetailsIcon, label: 'Details' },
							{ name: 'add', icon: AddIcon, label: 'Add' },
							{ name: 'send', icon: SendIcon, label: 'Send' },
							{ name: 'exchange', icon: ExchangeIcon, label: 'Exchange' },
						].map((action) => (
							<View key={action.label} className="items-center justify-center">
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={() => handleInitiateAction(action.name as any)}
									className="mb-2 size-9 items-center justify-center rounded-full bg-white"
								>
									<action.icon />
								</TouchableOpacity>
								{/**
								|--------------------------------------------------
								| Label
								|--------------------------------------------------
								*/}
								<MPText style={{ fontSize: 12 }} weight="medium" className="text-[13px] text-white">
									{action.label}
								</MPText>
							</View>
						))}

						{/**
						|--------------------------------------------------
						| Wallet details
						|--------------------------------------------------
						*/}
						<WalletDetailsModal
							selectedWallet={selectedWallet}
							onDismiss={handleDismissAllModals}
							showWalletDetails={showWalletDetails}
							setShowWalletDetails={setShowWalletDetails}
							accountName={`${data?.user.firstName} ${data?.user.lastName}`}
						/>

						{/**
						|--------------------------------------------------
						| Fund wallet modal
						|--------------------------------------------------
						*/}
						<FundWalletModal
							selectedWallet={selectedWallet}
							onDismiss={handleDismissAllModals}
							showFundWalletModal={showFundWalletModal}
							setShowFundWalletModal={setShowFundWalletModal}
							interacEmail={data?.user?.mail?.email as string}
							setShowCurrencyConverModal={setShowCurrencyConvertModal}
						/>

						{/**
						|--------------------------------------------------
						| Send funds
						|--------------------------------------------------
						*/}
						<SendFundsModal
							visible={showSendFundsModal}
							setVisible={setShowSendFundsModal}
							type={selectedWallet?.currency as 'CAD' | 'NGN'}
						/>
					</View>
				</View>

				{/**
				|--------------------------------------------------
				| If account has not been verified
				|--------------------------------------------------
				*/}
				{!isVerified && (
					<Pressable
						onPress={() => setShowBvnModal(true)}
						className="mt-6 h-[102px] w-full flex-row items-center justify-between rounded-[24px] bg-[#FAFAF9] p-5"
					>
						<View className="pointer-events-none max-w-[230px] justify-center">
							{/**
							|--------------------------------------------------
							| Header
							|--------------------------------------------------
							*/}
							<View className="flex-row items-center gap-2">
								<MPText weight="medium" className="text-[15px] leading-6 text-black">
									Account Verification
								</MPText>
								<Pressable onPress={() => setShowBvnModal(true)}>
									<RedRightArrowIcon />
								</Pressable>
							</View>

							{/**
							|--------------------------------------------------
							| Subtext
							|--------------------------------------------------
							*/}
							<MPText
								weight="regular"
								style={{ lineHeight: 20, fontSize: 12 }}
								className="mt-1 text-wrap text-[13px] leading-5 text-[#484848]"
							>
								Verify your identity to create your wallet(s) and start exchanging money.
							</MPText>
						</View>

						{/**
						|--------------------------------------------------
						| Image badge
						|--------------------------------------------------
						*/}
						<Image
							source={MONEY_PAD}
							style={{ width: clampFontSize(65, 40, 100), height: clampFontSize(61, 39, 98) }}
						/>
					</Pressable>
				)}

				{/**
				|--------------------------------------------------
				| Recent transactions
				|--------------------------------------------------
				*/}
				<View className="mt-6 flex-row justify-between p-4">
					<MPText fontSize="FONT14" className="text-[15px]" weight="semibold">
						Recent Transactions
					</MPText>

					{/**
					|--------------------------------------------------
					| See more
					|--------------------------------------------------
					*/}
					<Pressable onPress={() => handleInitiateAction('see_more_transactions')}>
						<MPText fontSize="FONT14" weight="semibold" className="text-[15px] text-[#FF6A00]">
							See more
						</MPText>
					</Pressable>
				</View>

				{/**
				|--------------------------------------------------
				| Transactions
				|--------------------------------------------------
				*/}
				{data?.transactions.length === 0 && (
					<View className="h-[158px] items-center justify-center">
						<MPText fontSize="FONT14" weight="medium" className="text-[15px] text-[#767676]">
							No transactions yet
						</MPText>
					</View>
				)}

				{/**
				|--------------------------------------------------
				| When there are transactions
				|--------------------------------------------------
				*/}
				<View className="gap-5 px-4">
					{data?.transactions.map((transaction) => (
						<React.Fragment key={transaction.reference}>
							{/**
							|--------------------------------------------------
							| Transaction component
							|--------------------------------------------------
							*/}
							<Transaction transaction={transaction} />
						</React.Fragment>
					))}
				</View>

				{/**
				|--------------------------------------------------
				| Modal for unverified account
				|--------------------------------------------------
				*/}
				<UnverifiedAcountModal
					userData={data?.user}
					showBvnModal={showBvnModal}
					setShowBvnModal={setShowBvnModal}
					isVerified={isVerified as boolean}
					isBvnVerified={isBvnVerified as boolean}
				/>

				{/**
				|--------------------------------------------------
				| Biometrics modal
				|--------------------------------------------------
				*/}
				<BiometricsModal
					setVisible={() => {
						setBiometricsModal(!showBiometricsModal);
						setBiometricsInfo({ ...biometricsInfo, hasPromptedUser: true });
					}}
				/>

				{/**
				|--------------------------------------------------
				| Currecny converter
				|--------------------------------------------------
				*/}
				<CurrencyConverter visible={showCurrencyConvertModal} setVisible={setShowCurrencyConvertModal} />
			</ScrollView>
		</ScreenWrapper>
	);
}
