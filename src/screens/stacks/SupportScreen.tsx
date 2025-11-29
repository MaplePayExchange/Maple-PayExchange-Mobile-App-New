/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions, Image, Linking, Pressable, ScrollView, TextInput, View, StatusBar } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import { User } from '@interfaces/user.interface';
import { ROUTE_NAMES } from '@constants/routes.conts';
import LoginSupportData from '@data/login-support.json';
import { FAQItem } from '@interfaces/support.interface';
//@ts-ignore
import { RootStackParamList } from '@constants/route.params';
import { RedRightArrowIcon, SearchIcon } from '@assets/svgs';
import TechnicalSupportData from '@data/technical-support.json';
import PaymentSupportData from '@data/payment-wallet-support.json';
import SecuritySupportData from '@data/security-safety-support.json';
import EmailSupportData from '@data/email-notification-support.json';
import { CHAT_AGENT, clampFontSize, fontSizes, WHATSAPP } from '@constants/app.constant';

const HELP = [
	{
		tag: 'Login issue',
		data: LoginSupportData,
	},
	{
		tag: 'Payments & Wallets',
		data: PaymentSupportData,
	},
	{
		tag: 'Notifications & Preferences',
		data: EmailSupportData,
	},
	{
		tag: 'Security & Safety',
		data: SecuritySupportData,
	},
	{
		tag: 'Technical & Support',
		data: TechnicalSupportData,
	},
];

type SupportScreenProps = NativeStackNavigationProp<RootStackParamList, 'SupportDetailsScreen'>;
export default function SupportScreen() {
	/**
	|--------------------------------------------------
	| Navigation
	|--------------------------------------------------
	*/
	const navigation = useNavigation<SupportScreenProps>();

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	const queryClient = useQueryClient();
	const data: any = queryClient.getQueryData(['maple_user_data']);
	const userData = data?.user as User;

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [searchQuery, setSearchQuery] = React.useState<string>('');

	/**
	|--------------------------------------------------
	| Handle open whatsApp
	|--------------------------------------------------
	*/
	const handleOpenWhatsApp = () => {
		/**
		|--------------------------------------------------
		| Phone to initiate chat with
		|--------------------------------------------------
		*/
		const phone = '+16475760680';

		/**
		|--------------------------------------------------
		| Message to prompt with
		|--------------------------------------------------
		*/
		const message = 'Hello, I need support with my:';

		/**
		|--------------------------------------------------
		| WhatsApp url
		|--------------------------------------------------
		*/
		const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

		Linking.openURL(url).catch(() => {
			/**
			|--------------------------------------------------
			| If WhatsApp is not installed, fall back to web
			| WhatsApp
			|--------------------------------------------------
			*/
			Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
		});
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<LinearGradient
			end={{ x: 0, y: 1 }}
			start={{ x: 0, y: 0 }}
			style={[
				{
					height: '100%',
				},
			]}
			colors={['#EE0979', '#EE0979']}
		>
			<SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className={`flex-1`}>
				{/**
				|--------------------------------------------------
				| Status bar
				|--------------------------------------------------
				*/}
				<StatusBar translucent backgroundColor="transparent" />

				<ScrollView showsVerticalScrollIndicator={false}>
					{/**
					|--------------------------------------------------
					| Content
					|--------------------------------------------------
					*/}
					<View className={clsx('flex-1 bg-white pb-16')} style={{ width: Dimensions.get('screen').width }}>
						<LinearGradient
							end={{ x: 0, y: 1 }}
							start={{ x: 0, y: 0 }}
							style={[
								{
									height: 150,
									flexDirection: 'row',
									alignItems: 'flex-start',
									justifyContent: 'center',
									maxWidth: Dimensions.get('screen').width,
								},
							]}
							colors={['#EE0979', '#FF6A00']}
						>
							<View className="h-full flex-1 flex-row items-end justify-between px-5 pb-[32px]">
								{/**
								|--------------------------------------------------
								| Hello message
								|--------------------------------------------------
								*/}
								<View className="">
									<MPText
										fontSize="FONT24"
										weight="extra-bold"
										className="text-2xl text-white"
										style={{
											letterSpacing: -1.0,
											lineHeight: fontSizes.FONT28,
										}}
									>
										Hello {userData?.firstName}
									</MPText>
									<MPText
										fontSize="FONT24"
										weight="extra-bold"
										className="text-2xl text-white"
										style={{
											letterSpacing: -1.0,
											lineHeight: fontSizes.FONT28,
										}}
									>
										How can we help?
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								|
								|--------------------------------------------------
								*/}
								<Pressable className="right-0 !hidden h-[38px] w-[96px] flex-row items-center justify-center gap-2 rounded-full bg-white">
									<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<Path
											d="M6.5625 7.8125C6.5625 7.56386 6.66127 7.3254 6.83709 7.14959C7.0129 6.97377 7.25136 6.875 7.5 6.875H12.5C12.7486 6.875 12.9871 6.97377 13.1629 7.14959C13.3387 7.3254 13.4375 7.56386 13.4375 7.8125C13.4375 8.06114 13.3387 8.2996 13.1629 8.47541C12.9871 8.65123 12.7486 8.75 12.5 8.75H7.5C7.25136 8.75 7.0129 8.65123 6.83709 8.47541C6.66127 8.2996 6.5625 8.06114 6.5625 7.8125ZM7.5 11.875H12.5C12.7486 11.875 12.9871 11.7762 13.1629 11.6004C13.3387 11.4246 13.4375 11.1861 13.4375 10.9375C13.4375 10.6889 13.3387 10.4504 13.1629 10.2746C12.9871 10.0988 12.7486 10 12.5 10H7.5C7.25136 10 7.0129 10.0988 6.83709 10.2746C6.66127 10.4504 6.5625 10.6889 6.5625 10.9375C6.5625 11.1861 6.66127 11.4246 6.83709 11.6004C7.0129 11.7762 7.25136 11.875 7.5 11.875ZM18.4375 4.375V14.375C18.4375 14.7894 18.2729 15.1868 17.9799 15.4799C17.6868 15.7729 17.2894 15.9375 16.875 15.9375H12.3352L11.357 17.65C11.2204 17.8894 11.0229 18.0883 10.7846 18.2267C10.5463 18.3651 10.2756 18.438 10 18.438C9.72441 18.438 9.45372 18.3651 9.21539 18.2267C8.97706 18.0883 8.77958 17.8894 8.64297 17.65L7.66484 15.9375H3.125C2.7106 15.9375 2.31317 15.7729 2.02015 15.4799C1.72712 15.1868 1.5625 14.7894 1.5625 14.375V4.375C1.5625 3.9606 1.72712 3.56317 2.02015 3.27015C2.31317 2.97712 2.7106 2.8125 3.125 2.8125H16.875C17.2894 2.8125 17.6868 2.97712 17.9799 3.27015C18.2729 3.56317 18.4375 3.9606 18.4375 4.375ZM16.5625 4.6875H3.4375V14.0625H8.20859C8.37391 14.0625 8.53628 14.1062 8.67925 14.1892C8.82221 14.2723 8.94069 14.3916 9.02266 14.5352L10 16.2453L10.9773 14.5352C11.0593 14.3916 11.1778 14.2723 11.3208 14.1892C11.4637 14.1062 11.6261 14.0625 11.7914 14.0625H16.5625V4.6875Z"
											fill="#484848"
										/>
									</Svg>

									{/**
									|--------------------------------------------------
									| ...
									|--------------------------------------------------
									*/}
									<MPText>Chats</MPText>
								</Pressable>
							</View>
						</LinearGradient>

						{/**
						|--------------------------------------------------
						| Search view
						|--------------------------------------------------
						*/}
						<View className="p-5">
							<View className="pointer-events-none mb-5 h-[42px] flex-row items-center justify-between rounded-[24px] bg-[#1018280D] px-5 opacity-0">
								<TextInput
									className="text-[15px]"
									value={searchQuery}
									placeholder="Search"
									placeholderTextColor="#484848"
									onChangeText={(value) => setSearchQuery(value)}
								/>

								{/**
								|--------------------------------------------------
								| Search icon
								|--------------------------------------------------
								*/}
								<SearchIcon />
							</View>

							{/**
							|--------------------------------------------------
							| Help
							|--------------------------------------------------
							*/}
							<View className="gap-4">
								{HELP.map((help) => (
									<Pressable
										key={help.tag}
										onPress={() =>
											navigation.navigate(
												ROUTE_NAMES.SUPPORT_DETAILS_SCREEN,
												help.data as FAQItem[]
											)
										}
										className="h-[43px] w-full flex-row items-center justify-between rounded-2xl border border-[#EEEEEE] px-5"
									>
										<MPText
											weight="medium"
											fontSize="FONT14"
											className="text-[15px] text-[#333333]"
										>
											{help.tag}
										</MPText>

										<Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
											<Path
												d="M11.3538 8.85403L6.35375 13.854C6.3073 13.9005 6.25215 13.9373 6.19145 13.9625C6.13076 13.9876 6.0657 14.0006 6 14.0006C5.93431 14.0006 5.86925 13.9876 5.80856 13.9625C5.74786 13.9373 5.69271 13.9005 5.64625 13.854C5.5998 13.8076 5.56295 13.7524 5.53781 13.6917C5.51267 13.631 5.49973 13.566 5.49973 13.5003C5.49973 13.4346 5.51267 13.3695 5.53781 13.3088C5.56295 13.2481 5.5998 13.193 5.64625 13.1465L10.2931 8.50028L5.64625 3.85403C5.55243 3.76021 5.49973 3.63296 5.49973 3.50028C5.49973 3.3676 5.55243 3.24035 5.64625 3.14653C5.74007 3.05271 5.86732 3 6 3C6.13269 3 6.25993 3.05271 6.35375 3.14653L11.3538 8.14653C11.4002 8.19296 11.4371 8.24811 11.4623 8.30881C11.4874 8.36951 11.5004 8.43457 11.5004 8.50028C11.5004 8.56599 11.4874 8.63105 11.4623 8.69175C11.4371 8.75245 11.4002 8.80759 11.3538 8.85403Z"
												fill="#767676"
											/>
										</Svg>
									</Pressable>
								))}
							</View>

							{/**
							|--------------------------------------------------
							| WhatsAppChatting
							|--------------------------------------------------
							*/}
							<Pressable
								onPress={handleOpenWhatsApp}
								className="mt-6 h-[102px] w-full flex-row items-center justify-between rounded-[24px] bg-[#FAFAF9] p-5"
							>
								<View className="max-w-[230px] justify-center">
									{/**
									|--------------------------------------------------
									| Header
									|--------------------------------------------------
									*/}
									<View className="flex-row items-center gap-2">
										<MPText
											fontSize="FONT14"
											weight="semibold"
											className="text-[15px] leading-6 text-black"
										>
											Reach out on WhatsApp
										</MPText>

										<RedRightArrowIcon />
									</View>

									{/**
									|--------------------------------------------------
									| Subtext
									|--------------------------------------------------
									*/}
									<MPText
										weight="regular"
										fontSize="FONT12"
										style={{ lineHeight: 20 }}
										className="mt-1 text-wrap text-[13px] leading-5 text-[#484848]"
									>
										Having issues with transactions, your account? Talk to us on WhatsApp
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Image badge
								|--------------------------------------------------
								*/}
								<Image
									source={WHATSAPP}
									style={{ width: clampFontSize(40, 40, 100), height: clampFontSize(40, 40, 100) }}
								/>
							</Pressable>

							{/**
							|--------------------------------------------------
							| Chat agent
							|--------------------------------------------------
							*/}
							<View className="pointer-events-none mt-6 !hidden h-[102px] w-full flex-row items-center justify-between rounded-[24px] bg-[#FAFAF9] p-5 opacity-40">
								<View className="max-w-[230px] justify-center">
									{/**
									|--------------------------------------------------
									| Header
									|--------------------------------------------------
									*/}
									<View className="flex-row items-center gap-2">
										<MPText
											fontSize="FONT14"
											weight="semibold"
											className="text-[15px] leading-6 text-black"
										>
											Connect with a live agent
										</MPText>
										<Pressable>
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
										fontSize="FONT12"
										style={{ lineHeight: 20 }}
										className="mt-1 text-wrap text-[13px] leading-5 text-[#484848]"
									>
										Having issues with transactions, your account? Speak to our live agent
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Image badge
								|--------------------------------------------------
								*/}
								<Image
									source={CHAT_AGENT}
									style={{ width: clampFontSize(40, 40, 100), height: clampFontSize(40, 40, 100) }}
								/>
							</View>

							<View className="h-[120px]" />
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
}
