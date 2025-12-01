/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { SearchIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { ROUTE_NAMES } from '@constants/routes.conts';
import { useGetBeneficiaries } from '@services/user.services';
import { BankAccount } from '@interfaces/transaction.interface';
import CustomRefreshControl from '@src/components/CustomRefreshControl';
import { BENEFICIARY_EMPTY_STATE } from '@constants/app.constant';

export default function SendFundsBeneficiaryScreen() {
	const route = useRoute();
	const params = route?.params;

	/**
    |--------------------------------------------------
    | Navigation
    |--------------------------------------------------
    */
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | Api calls
    |--------------------------------------------------
    */
	const { data, isLoading } = useGetBeneficiaries();

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [searchQuery, setSearchQuery] = React.useState<string>('');

	/**
    |--------------------------------------------------
    | Handle press beneficiary
    |--------------------------------------------------
    */
	const handleSelectBeneficiary = (beneficiary: BankAccount) => {
		if (beneficiary.type === 'Bank') navigation.navigate(...([ROUTE_NAMES.SEND_NGN_FUNDS, beneficiary] as any));
		if (beneficiary.type === 'Interac') navigation.navigate(...([ROUTE_NAMES.SEND_CAD_FUNDS, beneficiary] as any));
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper title="Saved Beneficiaries" center />

			{/**
            |--------------------------------------------------
            |
            |--------------------------------------------------
            */}
			{params?.currency && (
				<View className="mb-5 flex-row items-center justify-between">
					{/**
					|--------------------------------------------------
					| Step 1 of 2
					|--------------------------------------------------
					*/}
					<View>
						<MPText style={{ fontSize: 12 }} weight="medium" className="text-[15px] text-[#767676]">
							Step 1/2
						</MPText>
						<MPText style={{ fontSize: 12 }} weight="semibold" className="text-[13px]">
							Choose beneficiary
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| See our rates
					|--------------------------------------------------
					*/}
					<Pressable onPress={() => navigation.navigate(ROUTE_NAMES.EXCHANGE_RATE)}>
						<MPText weight="semibold" className="text-[15px] text-[#FF6A00]">
							See our rates
						</MPText>
					</Pressable>
				</View>
			)}

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			{data?.items?.length !== 0 && (
				<View className="mb-4 h-[42px] flex-row items-center justify-between rounded-[24px] bg-[#1018280D] px-5 ">
					<TextInput
						className="text-[15px]"
						value={searchQuery}
						returnKeyType="done"
						style={{ fontSize: 14 }}
						submitBehavior="blurAndSubmit"
						placeholderTextColor="#484848"
						onChangeText={(value) => setSearchQuery(value)}
						placeholder="Search by name, email or account no"
					/>

					{/**
					|--------------------------------------------------
					| Search icon
					|--------------------------------------------------
					*/}
					<SearchIcon />
				</View>
			)}

			<View className="mb-4 h-1 w-full border-b-[0.5px] border-b-[#EEEEEE]" />

			{/**
			|--------------------------------------------------
			| IsPending
			|--------------------------------------------------
			*/}
			{isLoading && <CustomRefreshControl refreshing={isLoading} />}

			{/**
            |--------------------------------------------------
            |
            |--------------------------------------------------
            */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="gap-6">
					{data?.items?.length === 0 ? (
						<View className="h-[130%] w-full items-center justify-center">
							<Image source={BENEFICIARY_EMPTY_STATE} className="mb-4 h-[171px] w-[171px]" />
							<MPText fontSize="FONT18" weight="semibold" className="mt-2">
								No saved beneficiary
							</MPText>
							<MPText fontSize="FONT14" className="mt-1 max-w-[214px] text-center text-[#767676]">
								You can save a beneficiary while sending money
							</MPText>
						</View>
					) : (
						data?.items?.map((beneficiary) => (
							<Pressable
								key={beneficiary?._id}
								className="h-[60px] w-full flex-row items-center"
								onPress={() => handleSelectBeneficiary(beneficiary)}
							>
								<View className="size-10 items-center justify-center rounded-full bg-[#F7F7F7]">
									<MPText>{beneficiary.bankCode ? '🇳🇬' : '🇨🇦'}</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Title
								|--------------------------------------------------
								*/}
								<View className="ml-4">
									<MPText weight="medium" className="mb-1">
										{beneficiary?.accountName ?? beneficiary?.nickname}
									</MPText>
									<MPText style={{ fontSize: 12 }} className="text-[#767676]">
										{beneficiary?.bankName || beneficiary?.interacEmail || beneficiary?.mapleEmail}
									</MPText>

									{/**
									|--------------------------------------------------
									| Shows only if the beneficiary type has account
									| number
									|--------------------------------------------------
									*/}
									{beneficiary.type === 'Bank' && (
										<MPText style={{ fontSize: 12 }} className="text-[#767676]">
											{beneficiary?.accountNumber}
										</MPText>
									)}
								</View>

								<View className="ml-auto">
									<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<Path
											d="M11.3538 8.35403L6.35378 13.354C6.30733 13.4005 6.25218 13.4373 6.19148 13.4625C6.13079 13.4876 6.06573 13.5006 6.00003 13.5006C5.93434 13.5006 5.86928 13.4876 5.80859 13.4625C5.74789 13.4373 5.69274 13.4005 5.64628 13.354C5.59983 13.3076 5.56298 13.2524 5.53784 13.1917C5.5127 13.131 5.49976 13.066 5.49976 13.0003C5.49976 12.9346 5.5127 12.8695 5.53784 12.8088C5.56298 12.7481 5.59983 12.693 5.64628 12.6465L10.2932 8.00028L5.64628 3.35403C5.55246 3.26021 5.49976 3.13296 5.49976 3.00028C5.49976 2.8676 5.55246 2.74035 5.64628 2.64653C5.7401 2.55271 5.86735 2.5 6.00003 2.5C6.13272 2.5 6.25996 2.55271 6.35378 2.64653L11.3538 7.64653C11.4003 7.69296 11.4372 7.74811 11.4623 7.80881C11.4875 7.86951 11.5004 7.93457 11.5004 8.00028C11.5004 8.06599 11.4875 8.13105 11.4623 8.19175C11.4372 8.25245 11.4003 8.30759 11.3538 8.35403Z"
											fill="#767676"
										/>
									</Svg>
								</View>
							</Pressable>
						))
					)}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
