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

export default function TermsAndCondtionsScreen() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper title="Terms &amp; Conditions" center />

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
							items={['Acceptance of Terms']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By accessing or using the services provided by Maple PayExchange Inc. (“MPE Inc.”), you
							(“Customer”, “you”, “your”) agree to be bound by these Terms &amp; Conditions. If you do not
							agree with these terms, you must not use our services.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| 2. Services Provided
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
							startIndex={1}
							items={['Services Provided']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By accessing or using the services provided by Maple PayExchange Inc. (“MPE Inc.”), you
							(“Customer”, “you”, “your”) agree to be bound by these Terms &amp; Conditions. If you do not
							agree with these terms, you must not use our services.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| Eligibility
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
							startIndex={2}
							items={['Eligibility']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							To use our services, you must:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Be at least 18 years old.',
								'Provide valid and verifiable identification documents.',
								'Comply with all applicable laws and these Terms &amp; Conditions.',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| 2. Services Provided
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
							startIndex={3}
							items={['Customer Identification & Verification (KYC/AML Compliance)']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							You agree to provide accurate, complete, and current information as required under our Know
							Your Customer (KYC) policy.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We may request additional documents to verify your identity and source of funds.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We reserve the right to decline or terminate services if you fail to comply with these
							requirements or if the transaction appears suspicious under AML/CTF laws.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={4}
							items={['Exchange Rates &amp; Fees']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Exchange rates fluctuate and are subject to change without notice.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							The applicable rate will be the one in effect at the time your transaction is processed.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							All fees, commissions, and charges will be disclosed prior to completing the transaction.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={5}
							items={['Transaction Limits']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Transactions may be subject to daily, weekly, or monthly limits in compliance with
							regulatory requirements.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							For large transactions, additional verification and documentation may be required.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={6}
							items={['Processing Times']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Transfers and transactions are generally processed within 10 – 30 minutes same day.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							International transfers may take longer depending on banking networks, destination country,
							and compliance checks.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We are not responsible for delays caused by external factors such as banking institutions,
							compliance requirements, or incorrect customer details.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={7}
							items={['Cancellations & Refunds']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							A transaction may be canceled only if it has not been completed or settled.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Refunds for canceled transactions will be processed in accordance with applicable laws and
							may be subject to fees.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We do not guarantee refunds for transactions already executed.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={8}
							items={['Prohibited Transactions']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							You agree not to use our services for:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Money laundering or terrorist financing.',
								'Illegal activities under Canadian or international law.',
								'Transactions involving sanctioned individuals, entities, or jurisdictions.',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={9}
							items={['Customer Responsibilities']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Ensure all details provided (recipient information, account numbers, etc.) are accurate.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Provide identification documents promptly when requested.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Notify us immediately of any unauthorized transactions or security concerns.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={10}
							items={['Limitation of Liability']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We are not liable for delays, errors, or losses caused by incorrect information provided by
							you, banking institutions, or force majeure events.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={11}
							items={['Privacy & Data Protection']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We collect and process your personal information in compliance with the Personal Information
							Protection and Electronic Documents Act (PIPEDA) and our Privacy Policy.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By using our services, you consent to the collection and use of your data as outlined in our
							Privacy Policy.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={12}
							items={['Reporting Obligations']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We are legally required to report certain transactions to FINTRAC under the PCMLTFA.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By using our services, you acknowledge and agree to such reporting requirements.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={13}
							items={['Termination of Service']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We reserve the right to suspend or terminate your use of our services without prior notice
							if:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'You violate these Terms &amp; Conditions.',
								'You provide false or misleading information.',
								'Required by law or regulatory authority.',
							]}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={14}
							items={['Changes to Terms']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We may amend these Terms &amp; Conditions at any time. Updates will be posted on our website
							and will take effect immediately upon posting.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={15}
							items={['Governing Law']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							These Terms &amp; Conditions shall be governed by and interpreted in accordance with the
							laws of the Province of Ontario and the federal laws of Canada.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={16}
							items={['Contact Information']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							For inquiries or complaints, contact:
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Maple PayExchange Inc.
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={['Email: support@mpexchange.ca']}
						/>
					</View>

					{/**
					|--------------------------------------------------
					| ...
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
							startIndex={17}
							items={['Electronic Acceptance']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By ticking the content box and using our services, you agree to these Terms &amp;
							Conditions, without the need for a physical signature.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<View className="mt-6">
						<MPText weight="bold" style={{ fontSize: 16 }}>
							Acknowledgment
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By using our services, you acknowledge that you have read, understood, and agree to be bound
							by these Terms &amp; Conditions.
						</MPText>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
