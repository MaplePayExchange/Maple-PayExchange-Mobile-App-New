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

export default function ReferralTermsAndConditionsScreen() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper title="Refer & Earn" center />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="">
					<MPText weight="bold" className="text-lg">
						Referral Program Terms & Conditions
					</MPText>
					<MPText weight="medium" className="text-[15px]">
						Last Updated: August 1, 2025
					</MPText>
					<MPText className="mt-2 text-[15px] text-[#484848]" weight="medium">
						These terms apply to the Maple PayExchange Inc (“MPE Inc.”) Referral Program (“Program”). By
						participating, you agree to these rules in addition to our Terms & Conditions and Privacy Policy
					</MPText>

					{/**
                    |--------------------------------------------------
                    | Elgigibility
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
							items={['Eligibility']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'Open to existing MPE Inc. account holders aged 18 or older.',
								'Referrals must be new users who have never registered with MPE Inc.',
								'Program available where permitted by law.',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>

					{/**
                    |--------------------------------------------------
                    | 2. How It Works
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
							items={['How It Works']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'Share your unique referral link or code with friends.',
								'Your invitee must sign up using your referral code.',
								'When your referred friend (“Invitee”) signs up and completes one qualifying transfer of $100 CAD or more in a single transaction, you (“Referrer”) earn a $10 CAD reward.',
								'The qualifying transfer must be made within 90 days of the Invitee’s registration.',
								'The qualifying transfer must be made from their primary wallet.',
								'Wallet-to-wallet transfers do not qualify for a referral bonus.',
								'Transfers into wallets will not qualify for a bonus',
								'The qualifying single transfer of $100 must be an international transfer or exchange',
								'User-to-user transfers as a first transaction by the invitee will be invalid',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>

					{/**
                    |--------------------------------------------------
                    | 3. Reward Details
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
							items={['Reward Details']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'Referral bonuses are a one-time payment made in CAD and credited to your MPE Inc. account within 5 business days of the qualifying transfer.',
								'Rewards are non-transferable and not redeemable for cash outside the app balance.',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>

					{/**
                    |--------------------------------------------------
                    | 4. Prohibited Conduct
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
							items={['Prohibited Conduct']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'No self-referrals or creating multiple/fake accounts.',
								'No referrals through paid ads, spam, or misleading statements.',
								'MPE Inc. reserves the right to reject referrals suspected of abuse or fraud.',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>

					{/**
                    |--------------------------------------------------
                    | 5. Program Changes
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
							startIndex={4}
							type="ordered"
							items={['Program Changes']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'MPE Inc. may modify, suspend, or end the Program at any time without prior notice.',
								'Any referrals made before termination will be honored if they meet the qualifying conditions.',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>

					{/**
                    |--------------------------------------------------
                    | 5. Program Changes
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
							items={['Fraud Protection & Compliance']}
							textStyle={{ fontWeight: '700', fontSize: 16 }}
						/>
						<View className="my-1" />
						<List
							type="unordered"
							items={[
								'All referrals and rewards are subject to Know Your Customer (KYC) and Anti-Money Laundering (AML) checks.',
								'MPE Inc. may delay, withhold, or cancel rewards if:',
							]}
							textClassName="text-[15px] text-[#484848]"
						/>
						<View className="mt-1 pl-4">
							<List
								type="unordered"
								items={[
									'A referred account is flagged for suspicious or prohibited activity',
									'Multiple accounts are linked to the same individual or device',
									'The transaction appears structured to artificially meet the $100 threshold.',
								]}
								textClassName="text-[15px] text-[#484848]"
							/>
						</View>
						<List
							type="unordered"
							items={['MPE Inc. decision on suspected abuse or eligibility is final.']}
							textClassName="text-[15px] text-[#484848]"
						/>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
