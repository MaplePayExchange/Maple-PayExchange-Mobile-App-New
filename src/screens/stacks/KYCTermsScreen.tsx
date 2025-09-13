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
import List from '@/src/components/List';
import MPText from '@/src/components/MPText';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';

export default function KYCTermsScreen() {
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
					<MPText weight="medium" className="text-sm">
						Effective Date: [January 25, 2019]
					</MPText>
					<MPText weight="medium" className="text-sm">
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
						<MPText weight="medium" className="text-sm">
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
							textClassName="text-sm"
							items={[
								'Verify the identity of customers and beneficial owners.',
								'Mitigate risks of money laundering, terrorist financing, and fraudulent activities.',
								'Ensure ongoing monitoring and reporting of suspicious activities.',
							]}
						/>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
