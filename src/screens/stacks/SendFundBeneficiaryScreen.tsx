/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { SearchIcon } from '@/assets/svgs';
import MPText from '@/src/components/MPText';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import Svg, { Path } from 'react-native-svg';

export default function SendFundsBeneficiaryScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [searchQuery, setSearchQuery] = React.useState<string>('');

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
			<View className="flex-row justify-between items-center mb-5">
				{/**
                |--------------------------------------------------
                | Step 1 of 2
                |--------------------------------------------------
                */}
				<View>
					<MPText style={{ fontSize: 12 }} weight="medium" className="text-sm text-[#767676]">
						Step 1/2
					</MPText>
					<MPText style={{ fontSize: 12 }} weight="semibold" className="text-xs">
						Choose beneficiary
					</MPText>
				</View>

				{/**
                |--------------------------------------------------
                | See our rates
                |--------------------------------------------------
                */}
				<Pressable>
					<MPText weight="semibold" className="text-sm text-[#FF6A00]">
						See our rates
					</MPText>
				</Pressable>
			</View>

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			<View className="h-[42px] mb-3 bg-[#1018280D] justify-between rounded-[24px] flex-row items-center px-5">
				<TextInput
					className="text-sm"
					value={searchQuery}
					style={{ fontSize: 14 }}
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

			{/**
            |--------------------------------------------------
            |
            |--------------------------------------------------
            */}
			<Pressable className="h-[60px] flex-row items-center w-full">
				<View className="size-10 rounded-full bg-[#F7F7F7] justify-center items-center">
					<MPText>🇳🇬</MPText>
				</View>

				{/**
                |--------------------------------------------------
                | Title
                |--------------------------------------------------
                */}
				<View className="ml-4">
					<MPText weight="medium" className="mb-1">
						Gbeyide Olaide
					</MPText>
					<MPText style={{ fontSize: 12 }} className="text-[#767676]">
						Standard chartered bank
					</MPText>
					<MPText style={{ fontSize: 12 }} className="text-[#767676]">
						00000000
					</MPText>
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
		</ScreenWrapper>
	);
}
