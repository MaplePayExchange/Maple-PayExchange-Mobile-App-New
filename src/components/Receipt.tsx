/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import dayjs from 'dayjs';
import { Image, ScrollView, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import Container from './Container';
import ScreenWrapper from './Wrapper';
import DataRepresentation from './DataRepresentation';
import { MAPLE_LOGO_WHITE } from '@/constants/app.constant';
import { TransactionInterface } from '@/interfaces/transaction.interface';

export default function Receipt({ transaction }: { transaction: TransactionInterface }) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<ScrollView showsHorizontalScrollIndicator={false}>
				<View>
					<View className="h-[64px] w-full flex-row justify-between items-center bg-[#EE0979] px-5">
						<MPText weight="semibold" className="text-white text-lg">
							Transaction receipt
						</MPText>

						{/**
						|--------------------------------------------------
						| Logo
						|--------------------------------------------------
						*/}
						<Image source={MAPLE_LOGO_WHITE} width={34} height={32} className="h-[32px] w-[34px]" />
					</View>

					{/**
					|--------------------------------------------------
					| Title
					|--------------------------------------------------
					*/}
					<MPText weight="medium" className="text-sm text-[#484848] mt-8 self-center mb-2">
						{transaction.type === 'Incoming'
							? 'Deposit'
							: transaction.type === 'Outgoing'
								? 'Transfer'
								: 'Wallet to wallet'}{' '}
						receipt
					</MPText>

					{/**
					|--------------------------------------------------
					| Amount
					|--------------------------------------------------
					*/}
					<MPText weight="semibold" className="text-[32px] self-center mb-8" style={{ lineHeight: 40 }}>
						{transaction.sourceCurrency === 'NGN' ? '₦' : '$'}{' '}
						{(transaction.type === 'Incoming'
							? transaction?.amountReceived
							: transaction?.amountSent || 0
						)?.toLocaleString(undefined, {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						})}
					</MPText>

					{/**
					|--------------------------------------------------
					| Container
					|--------------------------------------------------
					*/}
					<Container>
						<View className="gap-6">
							<DataRepresentation label="Transaction ID:" value={transaction?.reference || 'Reference'} />

							{/**
							|--------------------------------------------------
							| Outgoing and incoming transaction
							|--------------------------------------------------
							*/}
							{(transaction.type === 'Outgoing' || transaction.type === 'Incoming') && (
								<DataRepresentation
									label="Sender details:"
									value={transaction?.senderAccountName || transaction?.customerName || '--'}
								/>
							)}

							{/**
							|--------------------------------------------------
							| Fundswap
							|--------------------------------------------------
							*/}
							<React.Fragment>
								{transaction.type === 'FundSwap' && (
									<DataRepresentation
										label="Withdrawal from:"
										value={`${transaction?.sourceCurrency} wallet` || '--'}
									/>
								)}

								{/**
								|--------------------------------------------------
								| Amount withdrawn
								|--------------------------------------------------
								*/}
								{transaction.type === 'FundSwap' && (
									<DataRepresentation
										label="Amount withdrawn:"
										value={`${transaction.sourceCurrency === 'CAD' ? '$' : '₦'}${
											transaction?.sourceAmount?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											}) || '0.00'
										}`}
									/>
								)}

								{/**
								|--------------------------------------------------
								| Destination wallet
								|--------------------------------------------------
								*/}
								{transaction.type === 'FundSwap' && (
									<DataRepresentation
										label="Destination wallet:"
										value={`${transaction?.destinationCurrency} wallet` || '--'}
									/>
								)}

								{/**
								|--------------------------------------------------
								| Destination amount
								|--------------------------------------------------
								*/}
								{transaction.type === 'FundSwap' && (
									<DataRepresentation
										label="Destination amount:"
										value={`${transaction.destinationCurrency === 'CAD' ? '$' : '₦'}${
											transaction?.destinationAmount?.toLocaleString(undefined, {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											}) || '0.00'
										}`}
									/>
								)}
							</React.Fragment>

							{/**
							|--------------------------------------------------
							| Outgoing
							|--------------------------------------------------
							*/}
							{transaction.type === 'Outgoing' && (
								<DataRepresentation
									label="Recipient details:"
									value={transaction?.receiverAccountName || '--'}
								/>
							)}
							{transaction.type === 'Outgoing' && (
								<DataRepresentation
									label="Amount sent:"
									value={`${transaction.sourceCurrency === 'CAD' ? '$' : '₦'}${
										transaction?.amountSent?.toLocaleString(undefined, {
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
										}) || '0.00'
									}`}
								/>
							)}

							{/**
							|--------------------------------------------------
							| Incoming
							|--------------------------------------------------
							*/}
							{transaction.type === 'Incoming' && (
								<DataRepresentation
									label="Amount received:"
									value={`${transaction.sourceCurrency === 'CAD' ? '$' : '₦'}${transaction?.amountReceived?.toLocaleString(
										undefined,
										{
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
										}
									)}`}
								/>
							)}

							{transaction.type === 'Incoming' && (
								<DataRepresentation
									label="Destination wallet:"
									value={transaction?.destinationCurrency === 'CAD' ? 'CAD wallet' : 'NGN wallet'}
								/>
							)}

							{/**
							|--------------------------------------------------
							| General
							|--------------------------------------------------
							*/}
							<React.Fragment>
								{/**
								|--------------------------------------------------
								| Transaction type
								|--------------------------------------------------
								*/}
								<DataRepresentation label="Transaction type:" value={transaction?.type || '--'} />
								{/**
								|--------------------------------------------------
								| Transaction date
								|--------------------------------------------------
								*/}
								<DataRepresentation
									label="Transaction date:"
									value={
										transaction?.createdAt
											? dayjs(transaction.createdAt).format('DD MMM YYYY, hh:mm A')
											: '--'
									}
								/>

								{/**
								|--------------------------------------------------
								| Transaction status
								|--------------------------------------------------
								*/}
								<DataRepresentation
									label="Transaction status:"
									value={transaction.status || 'Successful'}
								/>
							</React.Fragment>

							{/**
							|--------------------------------------------------
							| Outgoing and incoming
							|--------------------------------------------------
							*/}
							{(transaction.type === 'Outgoing' || transaction.type === 'Incoming') && (
								<DataRepresentation label="Narration:" value={transaction?.description || '--'} />
							)}
						</View>
					</Container>

					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<MPText
						weight="medium"
						style={{ lineHeight: 14 }}
						className="text-center text-xs max-w-[60%] self-center mt-12"
					>
						For complaints regarding this transaction, contact our support team.
					</MPText>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
