/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
//@ts-ignore
import { RouteProp, useRoute } from '@react-navigation/native';
import { Linking, Pressable, ScrollView, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import List from '@src/components/List';
import MPText from '@src/components/MPText';
import MPButton from '@src/components/MPButton';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
//@ts-ignore
import { RootStackParamList } from '@types/route.params';

type SupportDetailsScreenProps = RouteProp<RootStackParamList, 'SupportDetailsScreen'>;
export default function SupportDetailsScreen() {
	/**
	|--------------------------------------------------
	| Router
	|--------------------------------------------------
	*/
	const router = useRoute<SupportDetailsScreenProps>();

	/**
	|--------------------------------------------------
	| State
	|--------------------------------------------------
	*/
	const supportData = router.params;
	const scrollViewRef = React.useRef<ScrollView>(null);
	const [selectedFeedback, setSelectedFeedback] = React.useState<'yes' | 'no' | null>(null);

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	const handleScrollToBottom = () => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	};

	/**
	|--------------------------------------------------
	| Handle open whatsApp
	|--------------------------------------------------
	*/
	const handleOpenWhatsApp = () => {
		/**
		|--------------------------------------------------
		| Phone to initiate chat with
		|--------------------------------------------------
		*/
		const phone = '+16475760680';

		/**
		|--------------------------------------------------
		| Message to prompt with
		|--------------------------------------------------
		*/
		const message = 'Hello, I need support with my:';

		/**
		|--------------------------------------------------
		| WhatsApp url
		|--------------------------------------------------
		*/
		const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

		Linking.openURL(url).catch(() => {
			/**
			|--------------------------------------------------
			| If WhatsApp is not installed, fall back to web
			| WhatsApp
			|--------------------------------------------------
			*/
			Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
		});
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<HeaderWrapper title="Support" center />

			{/**
			|--------------------------------------------------
			| Content
			|--------------------------------------------------
			*/}
			<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
				<View className="gap-4">
					{supportData.map((data: any, index: number) => (
						<View key={`${data.tag}${index}`}>
							{/**
							|--------------------------------------------------
							| Header
							|--------------------------------------------------
							*/}
							{data.question.header !== null ? (
								<MPText fontSize="FONT18" weight="bold" className="">
									{data.question.header}
								</MPText>
							) : null}

							{/**
							|--------------------------------------------------
							| Subtext
							|--------------------------------------------------
							*/}
							{data.question.subtext !== null ? (
								<MPText weight="medium" className="mt-4 text-[15px] text-[#484848]">
									{data.question.subtext}
								</MPText>
							) : null}

							{/**
							|--------------------------------------------------
							| Solution
							|--------------------------------------------------
							*/}
							{data.solution.type === 'single' && data.solution ? (
								<React.Fragment>
									{data.solution.header !== null && (
										<MPText fontSize="FONT16" weight="bold" className="mt-4 text-base">
											{data.solution.header}
										</MPText>
									)}

									{/**
									|--------------------------------------------------
									| If solution has a subtext
									|--------------------------------------------------
									*/}
									{data.solution.subtext && (
										<MPText weight="medium" className="mt-1 text-[15px] text-[#484848]">
											{data.solution.subtext}
										</MPText>
									)}

									{/**
									|--------------------------------------------------
									| List
									|--------------------------------------------------
									*/}
									{data.solution['bullet-points'] !== null && (
										<View className="mt-2">
											<List
												type="unordered"
												textClassName="text-[#484848] text-[15px]"
												items={data.solution['bullet-points'] as string[]}
											/>
										</View>
									)}
								</React.Fragment>
							) : (
								data?.solution?.solutions?.map((_solution: any, index: number) => (
									<React.Fragment key={`solution-solution-${index}`}>
										{_solution.header && (
											<MPText fontSize="FONT16" weight="bold" className="mt-4 text-base">
												{_solution.header}
											</MPText>
										)}

										{/**
										|--------------------------------------------------
										| List
										|--------------------------------------------------
										*/}
										{_solution['bullet-points'] !== null && (
											<View className="mt-2">
												<List
													type="unordered"
													textClassName="text-[#484848] text-[15px]"
													items={_solution['bullet-points'] as string[]}
												/>
											</View>
										)}
									</React.Fragment>
								))
							)}
						</View>
					))}
				</View>

				{/**
				|--------------------------------------------------
				| Feedback on help
				|--------------------------------------------------
				*/}
				<View className="mt-8 items-center border-t border-[#EEEEEE] p-4">
					<MPText weight="medium" className="text-[15px] text-[#484848]">
						Did this resolve your enquiry?
					</MPText>

					{/**
					|--------------------------------------------------
					| Yes and no
					|--------------------------------------------------
					*/}
					<View className="mt-4 flex-row justify-center gap-6">
						<MPButton
							useGradientBg={selectedFeedback === 'yes'}
							onPress={() => setSelectedFeedback('yes')}
							className={clsx(
								'size-[42px] max-h-[42px] max-w-[42px] rounded-full border border-[#D0D5DD]',
								selectedFeedback === 'yes' ? 'text-white' : 'text-black'
							)}
						>
							<MPText className={clsx(selectedFeedback === 'yes' ? 'text-white' : 'text-black')}>
								Yes
							</MPText>
						</MPButton>

						{/**
						|--------------------------------------------------
						| No
						|--------------------------------------------------
						*/}
						<MPButton
							useGradientBg={selectedFeedback === 'no'}
							onPress={async () => {
								setSelectedFeedback('no');
								await new Promise((resolve) => setTimeout(resolve, 300));
								handleScrollToBottom();
							}}
							className={clsx(
								'size-[42px] max-h-[42px] max-w-[42px] rounded-full border border-[#D0D5DD]'
							)}
						>
							<MPText className={clsx(selectedFeedback === 'no' ? 'text-white' : 'text-black')}>
								No
							</MPText>
						</MPButton>
					</View>
					{/**
					|--------------------------------------------------
					| Live agent
					|--------------------------------------------------
					*/}
					{selectedFeedback === 'no' && (
						<Pressable onPress={handleOpenWhatsApp} className="mt-4">
							<MPText weight="medium" className="text-[15px] text-[#EE0979]">
								Connect to live agent
							</MPText>
						</Pressable>
					)}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
