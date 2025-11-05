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

export default function PrivacyPolicyScreen() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper useBottomInset>
			<HeaderWrapper title="Privacy Policy" center />

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
							items={['Introduction']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Maple PayExchange Inc. (“MPE Inc.”, “we”, “our”, “us”) respects your privacy and is
							committed to protecting your privacy and safeguarding your personal data. This Privacy
							Policy explains how we collect, use, store, disclose, and protect your information when you
							use our mobile application, website, and related services (collectively, the “Services”).
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We operate in Canada, Nigeria, and serve users globally. This policy is designed to comply
							with:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Canada’s PIPEDA and FINTRAC Anti-Money Laundering (AML), Know Your Customer (KYC) requirements',
								'Nigeria Data Protection Regulation / Nigeria Data Protection Act',
								'General Data Protection Regulation (GDPR) for EU/EEA and UK users',
								'California Consumer Privacy Act (CCPA/CPRA) and other applicable laws',
							]}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							By creating an account and selecting “I agree to the terms and conditions of this service,”
							you consent to the collection, use, processing and disclosure of your personal data as
							described in this Privacy Policy, to the extent permitted by applicable laws.
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							If you do not agree, you will not be able to create a profile or use our Services.
						</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| 2. Data Controller
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
							items={['Data Controller']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							MPE Inc. is the controller of your personal data for purposes of applicable privacy laws,
							including the Personal Information Protection and Electronic Documents Act (PIPEDA) in
							Canada, the Nigeria Data Protection Regulation / Nigeria Data Protection Act, the General
							Data Protection Regulation (GDPR) in the EU/UK, and other applicable global privacy
							regulations.
						</MPText>
						<View className="my-1" />
						<MPText weight="bold">Contact for privacy matters:</MPText>
						<MPText weight="bold">Email: privacy@mpexchange.ca</MPText>
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
							items={['Information We Collect']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We collect and process personal data only where it is lawful and necessary for delivering
							our Services, business, legal purposes, meeting regulatory obligations, and improving user
							experience.
						</MPText>
						<View className="my-2" />
						<List
							boldenText
							gap="gap-2"
							customLabel="A."
							type="unordered"
							bulletClassName="text-sm"
							items={['Information you provide']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Identification details: Full name, address, date of birth, occupation (required by law under FINTRAC rules).',
								'Verification documents: Government-issued ID, proof of address, and other KYC/AML documentation.',
								'Biometric data: Facial images or other biometric identifiers for identity verification (processed by Veriff).',
								'Contact information: Email address, phone number.',
								'Account details: Username, password, profile photo (optional).',
								'Communications: Messages, support requests, chat transcripts, correspondence.',
							]}
						/>
						<View className="mt-3 mb-1" />
						<List
							boldenText
							gap="gap-2"
							customLabel="B."
							type="unordered"
							bulletClassName="text-sm"
							items={['Information collected automatically']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Device type, operating system, IP address, browser type, app usage statistics.',
								'Crash reports, performance data, and analytics events.',
								'Location data (only if you grant permission).',
							]}
						/>
						<View className="mt-3 mb-1" />
						<List
							boldenText
							gap="gap-2"
							customLabel="C."
							type="unordered"
							bulletClassName="text-sm"
							items={['Information from third parties']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Apaylo & FINCRA: Payment processing and transaction confirmations',
								'Veriff: KYC and biometric verification status, watchlist screening results.',
								'AWS: Cloud hosting of our databases and application infrastructure.',
								'Publicly available sources where legally permitted.',
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
							startIndex={3}
							items={['Legal Basis for Processing']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We process personal data under one or more of the following legal bases:
						</MPText>
						<View className="my-1" />
						<List
							startIndex={0}
							textClassName="text-sm"
							type="ordered"
							items={[
								'Consent – where you actively agree to processing (e.g., marketing communications).',
								'Performance of a contract – to deliver our Services, manage your account and process transactions.',
								'Legal obligation – to comply with FINTRAC, AML, KYC, NDPR, anti-fraud, record-keeping laws and other applicable laws.',
								'Legitimate interests – to protect our business platform, improve services, and prevent fraud.',
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
							startIndex={4}
							items={['How We Use Your Information']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We use your personal data to:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Verify your identity, comply with KYC/AML obligations and counter-terrorism financing laws.',
								'Process payments and facilitate transactions.',
								'Send account updates, security alerts, and service notifications.',
								'Respond to inquiries, provide customer service and technical support.',
								'Monitor compliance with legal and regulatory requirements.',
								'Improve and secure our Services.',
								'Conduct analytics and product development.',
								'Comply with applicable legal and regulatory requirements.',
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
							startIndex={5}
							items={['Disclosure of Personal Data']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We share your personal data only as necessary and permitted by law:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Regulatory authorities – FINTRAC (Canada), Nigerian Data Protection Commission, or other regulators when legally required.',
								'Service providers – including Apaylo (payments), FINCRA (cross-border payments), Veriff (KYC/biometric verification), AWS(hosting), IT support, and customer service providers, all bound by confidentiality agreements.',
								'Business partners – for legitimate joint operations such as co-marketing (with consent where required).',
								'Public authorities/law enforcement – in response to lawful requests or legal processes.',
								'Corporate transactions – if MPE Inc. is involved in a merger, acquisition, or sale of assets.',
							]}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We do not sell your personal data.
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
							items={['International Data Transfers']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Your personal data may be stored or processed in Canada, the United States, Europe or
							Nigeria. Where data is transferred outside your jurisdiction, we use appropriate safeguards
							(e.g., Standard Contractual Clauses under GDPR) to ensure your data remains protected.
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
							items={['Data Retention']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We retain your personal data:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'KYC/AML records: Retained 7 years from account closure, per legal requirements.',
								'Transactional data: Retained 7 years.',
								'General Account information: until you close your account, plus any legally mandated retention period.',
								'Support communications: up to 3 years after resolution.',
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
							startIndex={8}
							items={['Your Rights']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							You may have the right to:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Access and obtain a copy of your personal data.',
								'Correct or update your data.',
								'Delete your personal data (subject to legal retention requirements and AML retention laws).',
								'Restrict or object to certain processing.',
								'Withdraw consent for processing (where applicable).',
								'Receive your data in a portable format.',
								'Request data portability.',
							]}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Requests can be made to: privacy@mpexchange.ca
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
							startIndex={9}
							items={['Data Security']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We implement technical, administrative, and physical safeguards to protect your personal
							data, including:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Encryption in transit (TLS) and at rest.',
								'Role-based access controls and authentication measures.',
								'Secure AWS-hosted environments and disaster recovery protocols.',
							]}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							No system is fully secure. If you suspect a security issue, contact us immediately at
							security@mpexchange.ca
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
							items={['Cookies, SDKs, and Tracking']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We use cookies and third -party SDKs for:
						</MPText>
						<View className="my-1" />
						<List
							gap="gap-2"
							type="unordered"
							textClassName="text-sm"
							items={[
								'Core app functionality',
								'Fraud prevention',
								'Analytics and performance monitoring',
							]}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							You can control certain tracking through device settings
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
							items={['Children’s Privacy']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Our Services are not intended for individuals under 18. We do not knowingly collect personal
							data from minors. If you believe we have done so, contact us to request deletion.
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
							items={['Updates to This Policy']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							We may update this Privacy Policy periodically. The “Last Updated” date will change
							accordingly. Significant changes will be communicated in-app and/or via email.
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
							items={['Contact Us']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Questions or concerns about this Privacy Policy can be sent to:
						</MPText>
						<View className="my-1" />
						<MPText weight="medium" className="text-sm">
							Email: privacy@mpexchange.ca
						</MPText>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
