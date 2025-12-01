/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { Pressable, ScrollView } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '@src/components/MPText';
import { CarretDownIcon } from '@assets/svgs';
import Container from '@src/components/Container';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import ProgressBar from '@src/components/ProgressBar';
import { useGetUserInformation } from '@services/auth.services';
import { useGetTransactionLimits } from '@services/user.services';

export default function TransactionLimitScreen() {
	/**
    |--------------------------------------------------
    | API's
    |--------------------------------------------------
    */
	const { data } = useGetTransactionLimits();
	const { data: userData } = useGetUserInformation();
	const transactionLimits = userData?.user?.transactionLimits;

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showDropDown, setShowDropDown] = React.useState<{ cad: boolean; ngn: boolean }>({ cad: true, ngn: false });

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper usePadding={false}>
			<View className="px-4">
				<HeaderWrapper center title="Transaction Limit" />
			</View>

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="min-h-screen flex-1 bg-[#f0f0f0] p-4">
					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<View className="flex-row items-center gap-1">
						<MPText className="text-base" weight="semibold">
							Transaction Limit
						</MPText>

						{/**
                        |--------------------------------------------------
                        | Icon
                        |--------------------------------------------------
                        */}
						{Icons.badge}
					</View>

					{/**
                    |--------------------------------------------------
                    | CAD
                    |--------------------------------------------------
                    */}
					<Container className="mt-4 bg-white">
						<View className="flex-row items-center justify-between">
							<MPText className="text-[15px]" weight="semibold">
								CAD
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Icon
                            |--------------------------------------------------
                            */}
							<Pressable
								onPress={() => setShowDropDown((prevState) => ({ ...prevState, cad: !prevState.cad }))}
							>
								<CarretDownIcon />
							</Pressable>
						</View>

						{/**
                        |--------------------------------------------------
                        | Content
                        |--------------------------------------------------
                        */}
						<View className={clsx('mt-2', showDropDown.cad ? '' : '!hidden')}>
							<MPText weight="medium" className="text-[15px] text-[#767676]">
								Please be aware that your send limit is the maximum amount of money you can send using
								interac e-Transfer based on a 24 hours, 7 days and a 30 days time period.
							</MPText>

							{/**
                            |--------------------------------------------------
                            | ... Limits
                            |--------------------------------------------------
                            */}
							<View className="gap-4">
								{/**
                                |--------------------------------------------------
                                | Daily
                                |--------------------------------------------------
                                */}
								<View className="my-1 mt-3 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											24-hours limit: $
											{transactionLimits?.dailyLimit['CAD']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: $
											{(
												Number(transactionLimits?.dailyLimit['CAD'] || 0) -
												Number(data?.metrics.dailyCAD || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.dailyCAD || 0) /
													Number(transactionLimits?.dailyLimit['CAD'] || 0)) *
												100
											}
										/>
									</View>
								</View>

								{/**
                                |--------------------------------------------------
                                | Weekly
                                |--------------------------------------------------
                                */}
								<View className="my-1 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											7-day limit: $
											{transactionLimits?.weeklyLimit['CAD']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: $
											{(
												Number(transactionLimits?.weeklyLimit['CAD'] || 0) -
												Number(data?.metrics.weeklyCAD || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.weeklyCAD || 0) /
													Number(transactionLimits?.weeklyLimit['CAD'] || 0)) *
												100
											}
										/>
									</View>
								</View>

								{/**
                                |--------------------------------------------------
                                | Weekly
                                |--------------------------------------------------
                                */}
								<View className="my-1 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											30-day limit: $
											{transactionLimits?.monthlyLimit['CAD']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: $
											{(
												Number(transactionLimits?.monthlyLimit['CAD'] || 0) -
												Number(data?.metrics.monthlyCAD || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.monthlyCAD || 0) /
													Number(transactionLimits?.monthlyLimit['CAD'] || 0)) *
												100
											}
										/>
									</View>
								</View>
							</View>
						</View>
					</Container>

					{/**
                    |--------------------------------------------------
                    | NGN
                    |--------------------------------------------------
                    */}
					<Container className="mt-5 bg-white">
						<View className="flex-row items-center justify-between">
							<MPText className="text-[15px]" weight="semibold">
								NGN
							</MPText>

							{/**
                            |--------------------------------------------------
                            | Icon
                            |--------------------------------------------------
                            */}
							<Pressable
								onPress={() => setShowDropDown((prevState) => ({ ...prevState, ngn: !prevState.ngn }))}
							>
								<CarretDownIcon />
							</Pressable>
						</View>

						{/**
                        |--------------------------------------------------
                        | Content
                        |--------------------------------------------------
                        */}
						<View className={clsx('mt-2', showDropDown.ngn ? '' : '!hidden')}>
							<MPText weight="medium" className="text-[15px] text-[#767676]">
								Please be aware that your send limit is the maximum amount of money you can send based
								on a 24 hours, 7 days and a 30 days time period.
							</MPText>

							{/**
                            |--------------------------------------------------
                            | ... Limits
                            |--------------------------------------------------
                            */}
							<View className="gap-4">
								{/**
                                |--------------------------------------------------
                                | Daily
                                |--------------------------------------------------
                                */}
								<View className="my-1 mt-3 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											24-hours limit: ₦
											{transactionLimits?.dailyLimit['NGN']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: ₦
											{(
												Number(transactionLimits?.dailyLimit['NGN'] || 0) -
												Number(data?.metrics.dailyNGN || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.dailyNGN || 0) /
													Number(transactionLimits?.dailyLimit['NGN'] || 0)) *
												100
											}
										/>
									</View>
								</View>

								{/**
                                |--------------------------------------------------
                                | Weekly
                                |--------------------------------------------------
                                */}
								<View className="my-1 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											7-day limit: ₦
											{transactionLimits?.weeklyLimit['NGN']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: ₦
											{(
												Number(transactionLimits?.weeklyLimit['NGN'] || 0) -
												Number(data?.metrics.weeklyNGN || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.weeklyNGN || 0) /
													Number(transactionLimits?.weeklyLimit['NGN'] || 0)) *
												100
											}
										/>
									</View>
								</View>

								{/**
                                |--------------------------------------------------
                                | Monthly
                                |--------------------------------------------------
                                */}
								<View className="my-1 flex-row items-center gap-4 rounded-2xl border-[0.5px] border-[#EEEEEE] p-4">
									{/**
                                    |--------------------------------------------------
                                    | Icon
                                    |--------------------------------------------------
                                    */}
									<View className="">{Icons.limitIcon}</View>

									<View className="">
										<MPText weight="semibold">
											30-day limit: ₦
											{transactionLimits?.monthlyLimit['NGN']?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>
										<MPText weight="medium" className="text-[13px] text-[#767676]">
											Available: ₦
											{(
												Number(transactionLimits?.monthlyLimit['NGN'] || 0) -
												Number(data?.metrics.monthlyNGN || 0)
											).toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											})}
										</MPText>

										{/**
                                        |--------------------------------------------------
                                        | Progress
                                        |--------------------------------------------------
                                        */}
										<ProgressBar
											height={4}
											color="#47C285"
											backgroundColor="#EBF8F1"
											progress={
												(Number(data?.metrics.monthlyNGN || 0) /
													Number(transactionLimits?.monthlyLimit['NGN'] || 0)) *
												100
											}
										/>
									</View>
								</View>
							</View>
						</View>
					</Container>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}

/**
|--------------------------------------------------
| Icons
|--------------------------------------------------
*/
const Icons = {
	badge: (
		<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
			<Path
				d="M13.5902 3.65263C13.0977 3.65263 12.8514 3.65263 12.6271 3.56939C12.5959 3.55783 12.5652 3.54511 12.535 3.53125C12.3175 3.43147 12.1433 3.25734 11.7951 2.90907C10.9935 2.10749 10.5927 1.7067 10.0996 1.66974C10.0333 1.66477 9.96666 1.66477 9.90036 1.66974C9.40721 1.7067 9.00642 2.10749 8.20484 2.90907C7.85657 3.25734 7.68244 3.43147 7.46493 3.53125C7.43472 3.54511 7.40401 3.55783 7.37285 3.56939C7.1485 3.65263 6.90224 3.65263 6.40971 3.65263H6.31886C5.06228 3.65263 4.43399 3.65263 4.04362 4.043C3.65324 4.43338 3.65324 5.06167 3.65324 6.31825V6.4091C3.65324 6.90163 3.65324 7.14789 3.57 7.37224C3.55844 7.4034 3.54572 7.43411 3.53186 7.46432C3.43208 7.68182 3.25795 7.85596 2.90968 8.20423C2.1081 9.00581 1.70731 9.4066 1.67035 9.89975C1.66538 9.96605 1.66538 10.0326 1.67035 10.0989C1.70731 10.5921 2.1081 10.9929 2.90968 11.7945C3.25795 12.1427 3.43208 12.3169 3.53186 12.5344C3.54572 12.5646 3.55844 12.5953 3.57 12.6265C3.65324 12.8508 3.65324 13.0971 3.65324 13.5896V13.6804C3.65324 14.937 3.65324 15.5653 4.04362 15.9557C4.43399 16.3461 5.06228 16.3461 6.31886 16.3461H6.40971C6.90224 16.3461 7.1485 16.3461 7.37285 16.4293C7.40401 16.4409 7.43473 16.4536 7.46493 16.4674C7.68244 16.5672 7.85657 16.7414 8.20484 17.0896C9.00642 17.8912 9.40721 18.292 9.90036 18.329C9.96667 18.3339 10.0333 18.3339 10.0996 18.329C10.5927 18.292 10.9935 17.8912 11.7951 17.0896C12.1433 16.7414 12.3175 16.5672 12.535 16.4674C12.5652 16.4536 12.5959 16.4409 12.6271 16.4293C12.8514 16.3461 13.0977 16.3461 13.5902 16.3461H13.6811C14.9376 16.3461 15.5659 16.3461 15.9563 15.9557C16.3467 15.5653 16.3467 14.937 16.3467 13.6804V13.5896C16.3467 13.0971 16.3467 12.8508 16.4299 12.6265C16.4415 12.5953 16.4542 12.5646 16.4681 12.5344C16.5678 12.3169 16.742 12.1427 17.0902 11.7945C17.8918 10.9929 18.2926 10.5921 18.3296 10.0989C18.3345 10.0326 18.3345 9.96605 18.3296 9.89975C18.2926 9.4066 17.8918 9.00581 17.0902 8.20423C16.742 7.85596 16.5678 7.68183 16.4681 7.46432C16.4542 7.43411 16.4415 7.4034 16.4299 7.37224C16.3467 7.14789 16.3467 6.90163 16.3467 6.4091V6.31825C16.3467 5.06167 16.3467 4.43338 15.9563 4.043C15.5659 3.65263 14.9376 3.65263 13.6811 3.65263H13.5902Z"
				fill="url(#paint0_linear_618_5435)"
				stroke="white"
				strokeWidth="1.5"
			/>
			<Path
				d="M10.2019 13.3327V9.99935C10.2019 9.60651 10.2019 9.41009 10.0798 9.28805C9.95779 9.16602 9.76137 9.16602 9.36853 9.16602"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9.99337 6.66602H10.0009H9.99337Z"
				fill="url(#paint1_linear_618_5435)"
			/>
			<Path
				d="M9.99337 6.66602H10.0009"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_618_5435"
					x1="1.66663"
					y1="9.99935"
					x2="18.3333"
					y2="9.99935"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#EE0979" />
					<Stop offset="1" stopColor="#FF6A00" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_618_5435"
					x1="9.99353"
					y1="7.08268"
					x2="10.001"
					y2="7.08268"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#EE0979" />
					<Stop offset="1" stopColor="#FF6A00" />
				</LinearGradient>
			</Defs>
		</Svg>
	),

	limitIcon: (
		<Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
			<Rect width="40" height="40" rx="8" fill="#DCFCE7" />
			<Path
				d="M21.7678 21.268C21.3154 21.7204 20.6904 22.0002 20 22.0002C18.6193 22.0002 17.5 20.8809 17.5 19.5002C17.5 18.8098 17.7798 18.1848 18.2322 17.7324"
				stroke="#15803D"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<Path
				d="M27 18.641C26.6749 18.594 26.341 18.5581 26 18.5342M14 20.4648C13.659 20.441 13.3251 20.4051 13 20.358"
				stroke="#15803D"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M26 26.048C26 26.048 25.0738 26.048 24.5455 26.048C22.6865 26.048 20.9891 26.4166 19.697 27.024C18.4048 27.6314 16.7075 28 14.8485 28C13.8149 28 12.8312 27.8861 11.9394 27.6805C11.3661 27.5483 11.0795 27.4822 10.736 27.2087C10.5401 27.0527 10.2956 26.7439 10.1882 26.5168C10 26.1188 10 25.7328 10 24.9608V14.4474C10 13.4862 11.0085 12.826 11.9394 13.0406C12.3753 13.1411 12.919 13.3059 13.3939 13.36"
				stroke="#15803D"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M30.0001 25V14.114C30.0001 12.6204 29.5818 11.6897 28.0001 11.3274C27.0804 11.1167 26.066 11 25.0001 11C23.083 11 21.3326 11.3776 20.0001 12C19.2807 12.336 18.4238 12.8276 17.5002 13"
				stroke="#15803D"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M10 9.5L30 29.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
		</Svg>
	),
};
