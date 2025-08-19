/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Svg, Path } from 'react-native-svg';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { useUserStore } from '@/zustand/userStore';
import ScreenWrapper from '@/src/components/Wrapper';
import { Wallet } from '@/interfaces/wallet.interface';
import Transaction from '@/src/components/Transaction';
import { RootStackParamList } from '@/types/route.params';
import { useGetUserInformation } from '@/services/auth.services';
import { MONEY_PAD, clampFontSize } from '@/constants/app.constant';
import FundWalletModal from '@/src/components/Modals/FundWalletModal';
import WalletDetailsModal from '@/src/components/Modals/WalletDetailsModal';
import UnverifiedAcountModal from '@/src/components/Modals/UnverifiedAccountModal';
import { AddIcon, BellIcon, SendIcon, DetailsIcon, PadlockIcon, ExchangeIcon, RedRightArrowIcon } from '@/assets/svgs';
import SendFundsModal from '@/src/components/Modals/SendFundsModal';

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
	const { data, isLoading, isPending, error } = useGetUserInformation();
	const [showBvnModal, setShowBvnModal] = React.useState<boolean>(false);
	const [showWalletModal, setShowWalletModal] = React.useState<boolean>(false);
	const [showWalletDetails, setShowWalletDetails] = React.useState<boolean>(false);
	const [showSendFundsModal, setShowSendFundsModal] = React.useState<boolean>(false);
	const [showFundWalletModal, setShowFundWalletModal] = React.useState<boolean>(false);
	const [showExchangeFundsModal, setShowExchangeFundsModal] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { userData, selectedWallet, setSelectedWallet } = useUserStore();
	const isVerified = userData?.user?.isVerified;
	const isBvnVerified = userData?.user?.isBvnVerified;

	/**
	|--------------------------------------------------
	| Handles any click on the dashbaord screen
	|--------------------------------------------------
	*/
	const handleInitiateAction = (type: PossibleActions) => {
		console.log(type);
		/**
		|--------------------------------------------------
		| Checking if the user has been verified
		|--------------------------------------------------
		*/
		// if (!isBvnVerified || isVerified || typeof userData.user?.transactionPin === 'string') {
		// 	setShowBvnModal(true);
		// 	return;
		// }

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
				navigation.navigate('TransactionScreen');
				break;

			/**
			|--------------------------------------------------
			| To see notifications
			|--------------------------------------------------
			*/
			case 'notification':
				navigation.navigate('TransactionScreen');
				break;

			/**
			|--------------------------------------------------
			| Case details
			|--------------------------------------------------
			*/
			case 'details':
				console.log('object');
				setShowWalletDetails(true);

			/**
			|--------------------------------------------------
			| Show fund wallet modal
			|--------------------------------------------------
			*/
			case 'add':
				console.log('object');
				setShowFundWalletModal(true);

			/**
			|--------------------------------------------------
			| Send funds
			|--------------------------------------------------
			*/
			case 'send':
				setShowSendFundsModal(true);

			/**
			|--------------------------------------------------
			| Exchange funds
			|--------------------------------------------------
			*/
			case 'exchange':
				setShowExchangeFundsModal(true);

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
		setShowExchangeFundsModal(false);
	};

	/**
	|--------------------------------------------------
	| Effect
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		setSelectedWallet(data?.wallets?.[0] as Wallet);
	}, [data]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper className="bg-white">
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isPending}
						onRefresh={() => {
							queryClient.invalidateQueries({ queryKey: ['maple_user_data'] });
						}}
					/>
				}
			>
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
					<View className="size-10 rounded-full justify-center items-center bg-[#909083] mr-3"></View>
					{/**
					|--------------------------------------------------
					| Welcome text
					|--------------------------------------------------
					*/}
					<MPText className="text-xl text-[#A4A6AA]">
						Hello,{' '}
						<MPText weight="semibold" className="text-xl text-[#1A1A1A]">
							{userData?.user?.firstName || 'John'} {userData?.user?.lastName || 'Doe'}
						</MPText>
					</MPText>

					{/**
					|--------------------------------------------------
					| Notification
					|--------------------------------------------------
					*/}
					<Pressable
						onPress={() => handleInitiateAction('notification')}
						className="size-10 bg-[#FAFAF9] relative justify-center items-center rounded-full ml-auto"
					>
						<BellIcon />
						<Entypo className="absolute rounded-full size-2 bg-[#EE4139] top-2 right-3" size={8} />
					</Pressable>
				</View>

				{/**
				|--------------------------------------------------
				| If account has not been verified
				|--------------------------------------------------
				*/}
				<View className="h-[102px] w-full bg-[#FAFAF9] rounded-[24px] mt-6 p-5 flex-row items-center justify-between">
					{!isVerified && (
						<View className="max-w-[200px] justify-center">
							{/**
							|--------------------------------------------------
							| Header
							|--------------------------------------------------
							*/}
							<View className="flex-row gap-2 items-center">
								<MPText weight="medium" className="text-sm leading-6">
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
								style={{ lineHeight: 20 }}
								className="leading-5 text-wrap text-xs mt-1 text-[#484848]"
							>
								Verify your identity to create your wallet(s) and start exchanging money.
							</MPText>
						</View>
					)}

					{/**
					|--------------------------------------------------
					| Image badge
					|--------------------------------------------------
					*/}
					<Image
						source={MONEY_PAD}
						style={{ width: clampFontSize(65, 40, 100), height: clampFontSize(61, 39, 98) }}
					/>
				</View>

				{/**
				|--------------------------------------------------
				| Overview pane
				|--------------------------------------------------
				*/}
				<View className="h-[220px] w-full rounded-[24px] py-6 px-5 mt-4 bg-[#031D30]">
					{/**
					|--------------------------------------------------
					| If bvn has not been verified, wallet is locked
					|--------------------------------------------------
					*/}
					{!isBvnVerified && (
						<View className="justify-center items-center">
							<PadlockIcon />
							<MPText className="text-white text-xs mt-2" weight="semibold">
								Wallet Locked
							</MPText>
							<MPText style={{ lineHeight: 26 }} weight="semibold" className="text-2xl text-white">
								00.00
							</MPText>
						</View>
					)}

					{/**
					|--------------------------------------------------
					| Wallet is unlocked
					|--------------------------------------------------
					*/}
					<Pressable
						onPress={() => setShowWalletModal(true)}
						className="h-[20px] w-[68px] self-center bg-[#F7F7F7] rounded-[8px] flex-row items-center justify-center gap-1"
					>
						<MPText className="text-sm">{selectedWallet?.currency === 'NGN' ? '🇳🇬' : '🇨🇦'}</MPText>
						<MPText className="text-xs" weight="semibold">
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
								className="flex-1 bg-black/10 justify-center p-6"
							>
								<View className="bg-white rounded-3xl min-h-[246px] p-4">
									<MPText weight="semibold" className="text-sm text-center">
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
												className="h-[46px] w-full rounded-[10px] bg-[#F7F7F7] justify-center px-6"
											>
												<MPText weight="medium" className="text-sm">
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
									<MPButton useGradientBg className="w-[128px] self-center mt-6">
										<Pressable className="bg-white w-[98%] h-[93%] rounded-[40px] justify-center items-center">
											<MPText weight="semibold" className="text-sm text-[#FF6A00]">
												Add new wallet
											</MPText>
										</Pressable>
									</MPButton>
								</View>
							</TouchableOpacity>
						</Modal>
					</Pressable>

					{/**
					|--------------------------------------------------
					| Wallet Balance
					|--------------------------------------------------
					*/}
					<MPText weight="semibold" className="text-xs text-white self-center mt-4">
						Wallet Balance
					</MPText>

					{/**
					|--------------------------------------------------
					| Balance
					|--------------------------------------------------
					*/}
					<MPText
						weight="semibold"
						style={{ fontSize: 24, lineHeight: 30 }}
						className="text-white text-[24px] self-center"
					>
						{selectedWallet?.currency === 'CAD' ? '$' : '₦'}{' '}
						{selectedWallet?.walletBalance.toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</MPText>

					{/**
					|--------------------------------------------------
					| Action icons
					|--------------------------------------------------
					*/}
					<View className="flex-row justify-evenly mt-auto">
						{[
							{ name: 'details', icon: DetailsIcon, label: 'Details' },
							{ name: 'add', icon: AddIcon, label: 'Add' },
							{ name: 'send', icon: SendIcon, label: 'Send' },
							{ name: 'exchange', icon: ExchangeIcon, label: 'Exchange' },
						].map((action) => (
							<View key={action.label} className="justify-center items-center">
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={() => handleInitiateAction(action.name as any)}
									className="size-9 justify-center items-center bg-white rounded-full"
								>
									<action.icon />
								</TouchableOpacity>
								{/**
								|--------------------------------------------------
								| Label
								|--------------------------------------------------
								*/}
								<MPText weight="medium" className="text-white text-xs">
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
				| Recent transactions
				|--------------------------------------------------
				*/}
				<View className="mt-6 p-4 flex-row justify-between">
					<MPText className="text-sm" weight="semibold">
						Recent Transactions
					</MPText>

					{/**
					|--------------------------------------------------
					| See more
					|--------------------------------------------------
					*/}
					<Pressable onPress={() => handleInitiateAction('see_more_transactions')}>
						<MPText weight="semibold" className="text-sm text-[#FF6A00]">
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
					<View className="items-center h-[158px] justify-center">
						<MPText weight="medium" className="text-sm text-[#767676]">
							No transactions yet
						</MPText>
					</View>
				)}

				{/**
				|--------------------------------------------------
				| When there are transactions
				|--------------------------------------------------
				*/}
				<View className="gap-3 px-4">
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
					userData={userData}
					showBvnModal={showBvnModal}
					setShowBvnModal={setShowBvnModal}
					isVerified={isVerified as boolean}
					isBvnVerified={isBvnVerified as boolean}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
}
