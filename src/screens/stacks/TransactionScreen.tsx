/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Pressable, TextInput, View, ScrollView, Modal, RefreshControl } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { SearchIcon } from '@assets/svgs';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import CalendarModal from '@src/components/Calendar';
import Transaction from '@src/components/Transaction';
import CustomRefreshControl from '@src/components/CustomRefreshControl';
import { TransactionFilters, useGetUserTransactions } from '@services/auth.services';

let usingFilters = false;
export default function TransactionsScreen() {
	const navigation = useNavigation();
	const queryClient = useQueryClient();

	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const [showFilter, setShowFilter] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [showCalendarModal, setShowCalendarModal] = React.useState<boolean>(false);
	const [range, setRange] = React.useState<{ start: string; end: string | null }>({ start: '', end: null });
	const [filters, setFilters] = React.useState<TransactionFilters | undefined>({ limit: 20, page: currentPage });

	/**
	|--------------------------------------------------
	| Api calls
	|--------------------------------------------------
	*/
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isPending } = useGetUserTransactions(
		{ ...filters },
		usingFilters === false ? true : false
	);

	const transactions = data?.pages?.flatMap((page) => page.transactions) ?? [];

	/**
	|--------------------------------------------------
	| Handles filters
	|--------------------------------------------------
	*/
	const handleFilters = (filter: keyof TransactionFilters, value: string | number) => {
		usingFilters = true;
		setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
		usingFilters = false;
	};

	/**
	|--------------------------------------------------
	| Handles applying the filters
	|--------------------------------------------------
	*/
	const handleApplyFilter = async () => {
		if (range.end !== null) {
			setFilters((prevState) => ({ ...prevState, page: undefined }));
			handleFilters('startDate', new Date(range.start).toISOString());
			handleFilters('endDate', new Date(range.end as any).toISOString());
		}

		/**
		|--------------------------------------------------
		| Turns the modal off
		|--------------------------------------------------
		*/
		setShowFilter(false);

		if (filters?.currency || filters?.endDate || filters?.type || filters?.filter) {
			setFilters((prevState) => ({ ...prevState, page: undefined }));
		}

		/**
		|--------------------------------------------------
		| Fetches the data
		|--------------------------------------------------
		*/
		const queryKey = filters ? `${JSON.stringify(filters)}-maple_user_transactions` : `maple_user_transactions`;
		queryClient.invalidateQueries({ queryKey: [queryKey] });
	};

	/**
	|--------------------------------------------------
	| Setting filter back to default
	|--------------------------------------------------
	*/
	navigation.addListener('blur', () => {
		setCurrentPage(1);
		setFilters({ page: 1, limit: 20 });
		setRange({ start: '', end: null });
	});

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper useNavigation={false} title="Recent transactions" center />

			<View className="flex-row items-center justify-between gap-4">
				<View className="h-[42px] w-[85%] flex-row items-center gap-2 rounded-xl border-[0.5px] border-[#EEEEEE] px-5">
					{/**
					|--------------------------------------------------
					| Search icon
					|--------------------------------------------------
					*/}
					<SearchIcon />
					<TextInput
						className="h-full"
						value={searchQuery}
						returnKeyType="done"
						submitBehavior="blurAndSubmit"
						placeholderTextColor="#BABABA"
						placeholder="Amount, outgoing, incoming, swap"
						onChangeText={(value) => setSearchQuery(value)}
					/>
				</View>

				<Pressable
					onPress={() => setShowFilter(true)}
					className="size-11 items-center justify-center rounded-xl bg-[#FAFAF9]"
				>
					<Svg width="18" height="14" viewBox="0 0 18 14" fill="none">
						<Path
							d="M4.23995 0.576552L0.91078 3.90989L0.84078 3.98905C0.716511 4.14949 0.655055 4.34975 0.667943 4.55228C0.680831 4.7548 0.767177 4.94566 0.91078 5.08905L0.989947 5.15822C1.15038 5.28249 1.35065 5.34394 1.55317 5.33106C1.7557 5.31817 1.94656 5.23182 2.08995 5.08822L3.99995 3.17405V12.8324L4.00578 12.9299C4.02947 13.1327 4.12684 13.3198 4.27938 13.4556C4.43193 13.5914 4.62904 13.6665 4.83328 13.6666L4.93078 13.6607C5.13363 13.6368 5.32064 13.5393 5.45629 13.3866C5.59195 13.2338 5.66679 13.0366 5.66661 12.8324V3.17989L7.57745 5.08822L7.65661 5.15822C7.82413 5.28932 8.03543 5.35139 8.24724 5.33173C8.45904 5.31207 8.65531 5.21216 8.79583 5.05246C8.93634 4.89277 9.01047 4.68538 9.00303 4.4728C8.99558 4.26021 8.90713 4.05852 8.75578 3.90905L5.41745 0.575718L5.33911 0.506552C5.17868 0.382283 4.97841 0.320827 4.77589 0.333714C4.57336 0.346602 4.38333 0.432949 4.23995 0.576552ZM13.1666 0.334885L13.0691 0.340719C12.8664 0.3646 12.6795 0.462046 12.5439 0.614575C12.4082 0.767104 12.3333 0.964107 12.3333 1.16822V10.8182L10.4224 8.90989L10.3433 8.83988C10.1757 8.71032 9.96508 8.64942 9.75422 8.66959C9.54336 8.68975 9.34809 8.78946 9.20811 8.94843C9.06812 9.10741 8.99394 9.31373 9.00062 9.52545C9.00731 9.73717 9.09438 9.93839 9.24411 10.0882L12.5808 13.4216L12.6591 13.4916C12.8195 13.6158 13.0198 13.6773 13.2223 13.6644C13.4249 13.6515 13.6157 13.5652 13.7591 13.4216L17.0891 10.0882L17.1591 10.0091C17.2834 9.84862 17.3448 9.64835 17.332 9.44583C17.3191 9.2433 17.2327 9.05244 17.0891 8.90905L17.0099 8.83988C16.8495 8.71562 16.6492 8.65416 16.4467 8.66705C16.2442 8.67994 16.0533 8.76628 15.9099 8.90989L13.9999 10.8216V1.16822L13.9941 1.07155C13.9704 0.868692 13.8731 0.681596 13.7205 0.545793C13.568 0.409989 13.3709 0.334936 13.1666 0.334885Z"
							fill="#1A1A1A"
						/>
					</Svg>
				</Pressable>
			</View>

			{/**
			|--------------------------------------------------
			| Transactions
			|--------------------------------------------------
			*/}
			<ScrollView
				className="mt-5"
				refreshControl={
					<RefreshControl
						refreshing={false}
						tintColor="transparent"
						colors={['transparent']}
						onRefresh={() => {
							queryClient.invalidateQueries({ queryKey: ['maple_user_transactions'] });
						}}
					/>
				}
				showsVerticalScrollIndicator={false}
				onScroll={async ({ nativeEvent }) => {
					const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
					const isScrolledToEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;

					/**
					|--------------------------------------------------
					| If the user has scrolled to the end
					|--------------------------------------------------
					*/
					if (isScrolledToEnd && hasNextPage && !isFetchingNextPage) {
						fetchNextPage();
					}
				}}
			>
				{(!isLoading || !isPending || isFetchingNextPage) && (
					<View className="gap-6">
						{transactions
							?.filter((trans) =>
								`${trans.type}${trans.amountReceived}${trans.amountSent}`
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							?.map((transaction, index) => (
								<Transaction key={`${transaction.reference}-${index}`} transaction={transaction} />
							))}

						{/**
						|--------------------------------------------------
						| If there are no more transactions
						|--------------------------------------------------
						*/}
						{!hasNextPage && (
							<MPText weight="medium" className="self-center text-[15px] text-[#FF6A00]">
								No more transactions
							</MPText>
						)}
					</View>
				)}

				{/**
				|--------------------------------------------------
				| IsLoading
				|--------------------------------------------------
				*/}
				{(isLoading || isPending) && (
					<View className="mt-[50%] w-full flex-1 items-center justify-center">
						<CustomRefreshControl refreshing={isPending || isLoading} />
					</View>
				)}
			</ScrollView>

			{/**
			|--------------------------------------------------
			| Modal for transaction filters
			|--------------------------------------------------
			*/}
			<Modal transparent visible={showFilter} animationType="slide">
				<Pressable onPress={() => setShowFilter(false)} className="flex-1 bg-black/10">
					{/**
					|--------------------------------------------------
					| Content
					|--------------------------------------------------
					*/}
					<View
						className={clsx(
							'mt-auto w-full rounded-2xl bg-white p-4 pt-8',
							showCalendarModal ? 'h-[487px]' : 'h-[387px]'
						)}
					>
						{showCalendarModal ? (
							<CalendarModal
								dateType="period"
								onApply={(date) => {
									setRange(date as any);
								}}
								onClose={() => setShowCalendarModal(false)}
							/>
						) : (
							<React.Fragment>
								{/**
								|--------------------------------------------------
								| Filter by
								|--------------------------------------------------
								*/}
								<View className="w-full px-2">
									<MPText className="text-[15px]" weight="semibold">
										Filter by
									</MPText>

									{/**
									|--------------------------------------------------
									| Filter
									|--------------------------------------------------
									*/}
									<View className="mt-3 flex-row justify-between">
										{/**
										|--------------------------------------------------
										| CAD
										|--------------------------------------------------
										*/}
										<Pressable
											onPress={() => handleFilters('currency', 'CAD')}
											className={clsx(
												'h-[42px] w-[45%] flex-row items-center justify-center gap-2 rounded-xl border-[0.5px]',
												filters?.currency === 'CAD' ? 'border-[#F58D88]' : 'border-[#F7F7F7]'
											)}
										>
											<MPText weight="medium" className="text-[13px]">
												🇨🇦
											</MPText>
											<MPText weight="medium" className="text-[13px]">
												Canadian Dollar
											</MPText>
										</Pressable>

										{/**
										|--------------------------------------------------
										| NGN
										|--------------------------------------------------
										*/}
										<Pressable
											onPress={() => handleFilters('currency', 'NGN')}
											className={clsx(
												'h-[42px] w-[45%] flex-row items-center justify-center gap-2 rounded-xl border-[0.5px]',
												filters?.currency === 'NGN' ? 'border-[#F58D88]' : 'border-[#F7F7F7]'
											)}
										>
											<MPText weight="medium" className="text-[13px]">
												🇳🇬
											</MPText>
											<MPText weight="medium" className="text-[13px]">
												Nigerian Naira
											</MPText>
										</Pressable>
									</View>
								</View>

								{/**
								|--------------------------------------------------
								| Sort by
								|--------------------------------------------------
								*/}
								<View className="mt-5 w-full px-2">
									<MPText className="text-[15px]" weight="semibold">
										Sort by
									</MPText>

									{/**
									|--------------------------------------------------
									| Sort
									|--------------------------------------------------
									*/}
									<View className="mt-3 flex-row justify-between">
										{/**
										|--------------------------------------------------
										| CAD
										|--------------------------------------------------
										*/}
										<Pressable
											onPress={() => handleFilters('type', 'Incoming')}
											className={clsx(
												'h-[42px] w-[45%] flex-row items-center justify-center gap-2 rounded-xl border-[0.5px]',
												filters?.type === 'Incoming' ? 'border-[#F58D88]' : 'border-[#F7F7F7]'
											)}
										>
											<MPText weight="medium" className="text-[13px]">
												Incoming Trans.
											</MPText>
										</Pressable>

										{/**
										|--------------------------------------------------
										| NGN
										|--------------------------------------------------
										*/}
										<Pressable
											onPress={() => handleFilters('type', 'Outgoing')}
											className={clsx(
												'h-[42px] w-[45%] flex-row items-center justify-center gap-2 rounded-xl border-[0.5px]',
												filters?.type === 'Outgoing' ? 'border-[#F58D88]' : 'border-[#F7F7F7]'
											)}
										>
											<MPText weight="medium" className="text-[13px]">
												Outgoing Trans.
											</MPText>
										</Pressable>
									</View>
								</View>

								{/**
								|--------------------------------------------------
								| Date
								|--------------------------------------------------
								*/}
								<View className="mt-5 w-full px-2">
									<MPText className="text-[15px]" weight="semibold">
										Filter by date range
									</MPText>

									<Pressable
										onPress={() => setShowCalendarModal(true)}
										className={clsx(
											'mt-3 h-[42px] w-full flex-row items-center justify-center gap-2 rounded-xl border-[0.5px]',
											'border-[#F7F7F7]'
										)}
									>
										<MPText weight="medium" className="text-[13px]">
											{range.end === null
												? 'Select date range'
												: `${dayjs(range.start).format('DD MMM, YYYY')} - ${dayjs(range.end).format('DD MMM, YYYY')}`}
										</MPText>

										<Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
											<Path
												d="M14.0161 5.66667V11.8333C14.0161 12.408 13.7878 12.9591 13.3815 13.3654C12.9752 13.7717 12.4241 14 11.8494 14H4.18278C3.60814 14 3.05704 13.7717 2.65072 13.3654C2.24439 12.9591 2.01611 12.408 2.01611 11.8333V5.66667H14.0161ZM4.84945 10C4.62843 10 4.41647 10.0878 4.26019 10.2441C4.10391 10.4004 4.01611 10.6123 4.01611 10.8333C4.01611 11.0543 4.10391 11.2663 4.26019 11.4226C4.41647 11.5789 4.62843 11.6667 4.84945 11.6667C5.07046 11.6667 5.28242 11.5789 5.4387 11.4226C5.59498 11.2663 5.68278 11.0543 5.68278 10.8333C5.68278 10.6123 5.59498 10.4004 5.4387 10.2441C5.28242 10.0878 5.07046 10 4.84945 10ZM8.01611 10C7.7951 10 7.58314 10.0878 7.42686 10.2441C7.27058 10.4004 7.18278 10.6123 7.18278 10.8333C7.18278 11.0543 7.27058 11.2663 7.42686 11.4226C7.58314 11.5789 7.7951 11.6667 8.01611 11.6667C8.23713 11.6667 8.44909 11.5789 8.60537 11.4226C8.76165 11.2663 8.84945 11.0543 8.84945 10.8333C8.84945 10.6123 8.76165 10.4004 8.60537 10.2441C8.44909 10.0878 8.23713 10 8.01611 10ZM4.84945 7C4.62843 7 4.41647 7.0878 4.26019 7.24408C4.10391 7.40036 4.01611 7.61232 4.01611 7.83333C4.01611 8.05435 4.10391 8.26631 4.26019 8.42259C4.41647 8.57887 4.62843 8.66667 4.84945 8.66667C5.07046 8.66667 5.28242 8.57887 5.4387 8.42259C5.59498 8.26631 5.68278 8.05435 5.68278 7.83333C5.68278 7.61232 5.59498 7.40036 5.4387 7.24408C5.28242 7.0878 5.07046 7 4.84945 7ZM8.01611 7C7.7951 7 7.58314 7.0878 7.42686 7.24408C7.27058 7.40036 7.18278 7.61232 7.18278 7.83333C7.18278 8.05435 7.27058 8.26631 7.42686 8.42259C7.58314 8.57887 7.7951 8.66667 8.01611 8.66667C8.23713 8.66667 8.44909 8.57887 8.60537 8.42259C8.76165 8.26631 8.84945 8.05435 8.84945 7.83333C8.84945 7.61232 8.76165 7.40036 8.60537 7.24408C8.44909 7.0878 8.23713 7 8.01611 7ZM11.1828 7C10.9618 7 10.7498 7.0878 10.5935 7.24408C10.4372 7.40036 10.3494 7.61232 10.3494 7.83333C10.3494 8.05435 10.4372 8.26631 10.5935 8.42259C10.7498 8.57887 10.9618 8.66667 11.1828 8.66667C11.4038 8.66667 11.6158 8.57887 11.772 8.42259C11.9283 8.26631 12.0161 8.05435 12.0161 7.83333C12.0161 7.61232 11.9283 7.40036 11.772 7.24408C11.6158 7.0878 11.4038 7 11.1828 7ZM11.8494 2C12.4241 2 12.9752 2.22827 13.3815 2.6346C13.7878 3.04093 14.0161 3.59203 14.0161 4.16667V4.66667H2.01611V4.16667C2.01611 3.59203 2.24439 3.04093 2.65072 2.6346C3.05704 2.22827 3.60814 2 4.18278 2H11.8494Z"
												fill="#1A1A1A"
											/>
										</Svg>
									</Pressable>
								</View>

								{/**
								|--------------------------------------------------
								| Apply filter button
								|--------------------------------------------------
								*/}
								<MPButton onPress={handleApplyFilter} useGradientBg className="mt-4">
									<MPText weight="semibold" className="text-[15px] text-white">
										Apply filter
									</MPText>
								</MPButton>
							</React.Fragment>
						)}
					</View>
				</Pressable>
			</Modal>
		</ScreenWrapper>
	);
}
