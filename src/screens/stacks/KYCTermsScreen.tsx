/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, ScrollView } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import List from '@src/components/List';
import MPText from '@src/components/MPText';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';

export default function KYCTermsScreen() {
	const data = [
		{ deviceName: 'iPhone 16 Pro', osName: 'iOS 18.5', lastLogin: '2025-09-27' },
		{ deviceName: 'Samsung S24', osName: 'Android 15', lastLogin: '2025-09-20' },
	];

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper title="Know Your Customer (KYC) Policy" center />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="">
					{/**
					|--------------------------------------------------
					|
					|--------------------------------------------------
					*/}
					<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
						Effective Date: [January 25, 2019]
					</MPText>
					<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
						Last Updated: [June 1, 2025]
					</MPText>

					{/**
					|--------------------------------------------------
					| Acceptance of terms
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<List
							boldenText
							type="ordered"
							items={['Purpose']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							The purpose of this KYC Policy is to ensure that Maple PayExchange Inc. (“MPE Inc.”, “we”,
							“our”, “us”) complies with Financial Transactions and Reports Analysis Centre of Canada
							(FINTRAC) requirements, Proceeds of Crime (Money Laundering) and Terrorist Financing Act
							(PCMLTFA), Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) laws, related
							regulations in Canada. This policy aims to:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Verify the identity of customers and beneficial owners.',
								'Mitigate risks of money laundering, terrorist financing, and fraudulent activities.',
								'Ensure ongoing monitoring and reporting of suspicious activities.',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| Acceptance of terms
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<List
							boldenText
							startIndex={1}
							type="ordered"
							items={['Scope']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							This policy applies to:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'All customers (individuals and entities) using our money exchange services.',
								'All MPE Inc. employees, agents, and partners involved in onboarding, transactions, and customer support.',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					|  Regulatory Framework
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<List
							boldenText
							startIndex={2}
							type="ordered"
							items={['Regulatory Framework']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							This KYC policy is designed to comply with:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA) and related regulations in Canada.',
								'Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) requirements.',
								'Applicable international standards (FATF Recommendations).',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| Customer Identification Program (CIP)
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<List
							boldenText
							startIndex={3}
							type="ordered"
							items={['Customer Identification Program (CIP)']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							Identification requirements and verification methods for individuals and businesses are
							outlined to ensure proper KYC compliance for MPE Inc. customers.
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							boldenText
							customLabel="4.1"
							textClassName="text-base"
							items={['Identification Requirements']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="semibold" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							For Individuals:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Full legal name',
								'Date of birth',
								'Residential address',
								'Government-issued photo ID (e.g., passport, driver’s license)',
								'Contact information (phone number, email)',
								'Occupation',
							]}
						/>
						<View className="my-1" />
						<MPText weight="semibold" className="text-justify text-[15px]" style={{ lineHeight: 21 }}>
							For Businesses/Entities:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Legal name and business registration documents',
								'Address of principal place of business',
								'Nature of business',
								'Identification of beneficial owners (natural persons owning or controlling 25% or more)',
								'Names and IDs of directors/signatories',
							]}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							boldenText
							customLabel="4.2"
							textClassName="text-base"
							items={['Verification Methods']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Documentary verification: Authentic government-issued ID for individuals; business incorporation documents for entities.',
								'Non-documentary verification: Phone verification, email confirmation, third-party database checks (credit bureau or government databases).',
							]}
						/>
					</View>

					<View className="mt-6">
						<List
							gap="gap-2"
							boldenText
							customLabel="5"
							textClassName="text-base"
							textStyle={{ fontWeight: '700', fontSize: 16 }}
							items={['Risk-Based Approach and Risk Assessment Matrix']}
						/>
						<View className="my-1" />

						<ScrollView horizontal className="w-full">
							<View>
								{/**
								|--------------------------------------------------
								| Row 1
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Risk Factor
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										Low Risk
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Medium Risk
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										High Risk
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Row 2
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Customer Type
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										Salaried individual
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Small business
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										PEP or shell company
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Row 3
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Geography
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										Canada, Nigeria, Other Countries
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										FATF gray list country
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										FATF high-risk country
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Row 4
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Transaction Volume
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										$10,000/month
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										CAD $10,000–$50,000/month
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										CAD $50,000/month
									</MPText>
								</View>

								{/**
								|--------------------------------------------------
								| Row 5
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Source of Funds
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										Verified salary
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Business income
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Unclear or unverifiable
									</MPText>
								</View>
								{/**
								|--------------------------------------------------
								| Row 6
								|--------------------------------------------------
								*/}
								<View className="flex-row border-b border-gray-300">
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Delivery Channel
									</MPText>
									<MPText weight="medium" className="w-32 p-3 text-gray-700">
										Via App (Online)
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Via App (Online)
									</MPText>
									<MPText weight="medium" className="w-40 p-3 text-gray-700">
										Via App (Online)
									</MPText>
								</View>
							</View>
						</ScrollView>

						<MPText className="mt-4 text-justify text-[15px]" style={{ lineHeight: 21 }}>
							Enhanced Due Diligence (EDD) applies to PEPs, high-risk countries, and large or unusual
							transactions.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| Acceptance of terms
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<List
							boldenText
							startIndex={5}
							type="ordered"
							items={[' Suspicious Activity Indicators']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-[15px] text-justify"
							textStyle={{ lineHeight: 21 }}
							items={[
								'Transactions structured just under reporting thresholds.',
								'Customer reluctant to provide ID or gives false/inconsistent information.',
								'Large transfers to/from high-risk countries without clear purpose.',
								'Sudden increase in transaction volume inconsistent with customer profile.',
								'Use of third parties or multiple accounts without clear reason.',
							]}
						/>
						<MPText className="mt-6 text-lg" weight="extra-bold">
							Acknowledgment
						</MPText>
						<MPText className="mt-2 text-justify text-[15px]" style={{ lineHeight: 21 }}>
							All MPE Inc. staff and agents must confirm they have read, understood, and will comply with
							this KYC Policy.
						</MPText>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
