/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import dayjs from 'dayjs';
import { View, ScrollView } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import advancedFormat from 'dayjs/plugin/advancedFormat';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@src/components/MPText';
import { RedRightArrowIcon } from '@assets/svgs';
import Container from '@src/components/Container';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { useGetRates } from '@services/user.services';

dayjs.extend(advancedFormat);

export default function ExchangeRatesScreen() {
	const queryClient = useQueryClient();
	/**
    |--------------------------------------------------
    | Api
    |--------------------------------------------------
    */
	const { data: rates, isLoading } = useGetRates();
	const userData = queryClient.getQueryData(['maple_user_data']) as any;

	console.log(userData?.user, 'user.data.rates');
	console.log(rates);

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	const NGNRate = rates?.items?.find(
		(rate) => rate.exchange === 'NGN-TO-CAD' && rate.userType === userData?.user?.userCategory
	);
	const CADRate = rates?.items?.find(
		(rate) => rate.exchange === 'CAD-TO-NGN' && rate.userType === userData?.user?.userCategory
	);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper usePadding={false}>
			<View className="px-4">
				<HeaderWrapper center title="Our Rates" />
			</View>

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="min-h-[75vh] flex-1 bg-[#f0f0f0] p-4">
					<MPText className="text-base" weight="semibold">
						Exchange Rates
					</MPText>
					<MPText className="text-[15px] text-[#767676]" weight="medium">
						Rates will refresh once there is an update.
					</MPText>

					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<Container className="mt-3">
						<MPText className="text-[15px] text-[#484848]">
							As at {dayjs(NGNRate?.updatedDate).format('dddd Do MMMM YYYY, hh:mm A')}
						</MPText>

						{/**
                        |--------------------------------------------------
                        | CAD
                        |--------------------------------------------------
                        */}
						<MPText weight="medium" className="mt-4 text-[15px] text-[#767676]">
							Canada
						</MPText>

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						<View className="mt-4 flex-row gap-2 px-4">
							<MPText weight="medium" className="text-[15px] text-[#1A1A1A]">
								🇨🇦
							</MPText>
							<MPText weight="medium" className="text-[15px] text-[#1A1A1A]">
								Canadian Dollar
							</MPText>
						</View>

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						<View className="mt-6 flex-row items-center gap-2 px-4">
							<MPText className="text-[15px]">🇨🇦</MPText>
							<MPText className="text-[15px]">CAD</MPText>
							<View>
								<RedRightArrowIcon color="#000000" />
							</View>
							<MPText className="text-[15px]">🇳🇬</MPText>
							<MPText className="text-[15px]">NGN</MPText>

							<MPText className="ml-auto text-[15px]" weight="semibold">
								1 CAD ={' '}
								{CADRate?.rate.toLocaleString(undefined, {
									maximumFractionDigits: 2,
									minimumFractionDigits: 2,
								})}{' '}
								NGN
							</MPText>
						</View>

						{/**
                        |--------------------------------------------------
                        | NGN
                        |--------------------------------------------------
                        */}
						<MPText weight="medium" className="mt-6 text-[15px] text-[#767676]">
							Nigeria
						</MPText>

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						<View className="mt-4 flex-row gap-2 px-4">
							<MPText weight="medium" className="text-[15px] text-[#1A1A1A]">
								🇳🇬
							</MPText>
							<MPText weight="medium" className="text-[15px] text-[#1A1A1A]">
								Nigerian Naira
							</MPText>
						</View>

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						<View className="mt-6 flex-row items-center gap-2 px-4">
							<MPText className="text-[15px]">🇳🇬</MPText>
							<MPText className="text-[15px]">NGN</MPText>
							<View>
								<RedRightArrowIcon color="#000000" />
							</View>
							<MPText className="text-[15px]">🇨🇦</MPText>
							<MPText className="text-[15px]">CAD</MPText>

							<MPText className="ml-auto text-[15px]" weight="semibold">
								{Number(NGNRate?.rate || 0).toLocaleString(undefined, {
									maximumFractionDigits: 2,
									minimumFractionDigits: 2,
								})}{' '}
								NGN = 1 CAD
							</MPText>
						</View>
					</Container>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
