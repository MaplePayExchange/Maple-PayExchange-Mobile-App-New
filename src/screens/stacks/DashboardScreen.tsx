/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Entypo } from '@expo/vector-icons';
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
import { clampFontSize, MONEY_PAD } from '@/constants/app.constant';
import { AddIcon, BellIcon, DetailsIcon, ExchangeIcon, PadlockIcon, RedRightArrowIcon, SendIcon } from '@/assets/svgs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/route.params';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '@/constants/routes.conts';

type PossibleActions = 'see_more_transactions' | 'details' | 'add' | 'send' | 'exchange' | 'notification';
type DashboardScreenProps = NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;

export default function DashboardScreen() {
	const navigation = useNavigation<DashboardScreenProps>();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const { userData } = useUserStore();
	const isVerified = userData?.user?.isVerified;
	const isBvnVerified = userData?.user?.isBvnVerified;
	const [showBvnModal, setShowBvnModal] = React.useState<boolean>(false);

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
		if (!isBvnVerified) {
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

			default:
				break;
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper className="bg-white">
			<ScrollView showsVerticalScrollIndicator={false}>
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
					<View className="max-w-[200px] justify-center">
						<View className="flex-row gap-2 items-center">
							<MPText weight="medium" className="text-sm leading-6">
								Account Verification
							</MPText>
							<RedRightArrowIcon />
						</View>
						<MPText
							weight="regular"
							style={{ lineHeight: 20 }}
							className="leading-5 text-wrap text-xs mt-1 text-[#484848]"
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
				</View>

				{/**
				|--------------------------------------------------
				| Overview pane
				|--------------------------------------------------
				*/}
				<View className="h-[220px] w-full rounded-[24px] py-6 px-5 mt-4 bg-[#031D30]">
					<View className="justify-center items-center">
						<PadlockIcon />
						<MPText className="text-white text-xs mt-2" weight="semibold">
							Wallet Locked
						</MPText>
						<MPText style={{ lineHeight: 26 }} weight="semibold" className="text-2xl text-white">
							00.00
						</MPText>
					</View>

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
				<View className="items-center h-[158px] justify-center">
					<MPText weight="medium" className="text-sm text-[#767676]">
						No transactions yet
					</MPText>
				</View>

				{/**
				|--------------------------------------------------
				| Modal for unverified account
				|--------------------------------------------------
				*/}
				<Modal transparent visible={showBvnModal} animationType="slide">
					<TouchableOpacity
						activeOpacity={0.8}
						className="flex-1 bg-black/10 p-6"
						onPress={() => setShowBvnModal(false)}
					>
						<View className="mt-auto bg-white w-full h-[342px] rounded-[24px] p-3 justify-center items-center py-5 px-6">
							<Image
								source={MONEY_PAD}
								className="mt-[51px]"
								style={{ width: clampFontSize(110, 70, 190), height: clampFontSize(109, 70, 188) }}
							/>

							{/**
							|--------------------------------------------------
							| Text
							|--------------------------------------------------
							*/}
							<MPText weight="semibold" className="text-black">
								Verify Account with BVN
							</MPText>
							<MPText style={{ lineHeight: 20 }} className="leading-5 text-xs text-center max-w-[290px]">
								Please ensure that your account is verified in order to obtain a virtual account for
								receiving funds into your MaplePay wallet.
							</MPText>

							{/**
							|--------------------------------------------------
							| Verify bvn button
							|--------------------------------------------------
							*/}
							<MPButton
								useGradientBg
								className="mt-auto"
								onPress={() => {
									setShowBvnModal(false);
									navigation.navigate(ROUTE_NAMES.BVN_VERIFICATION);
								}}
							>
								<MPText weight="bold" className="text-white text-sm">
									Verify BVN
								</MPText>
							</MPButton>
						</View>
					</TouchableOpacity>
				</Modal>
			</ScrollView>
		</ScreenWrapper>
	);
}

{
	/* <MPButton onPress={() => useUserStore.setState({ isLoggedIn: false })}>
				<MPText>Log out</MPText>
			</MPButton> */
}
