/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import List from '@/src/components/List';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { RootStackParamList } from '@/types/route.params';

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
	const [selectedFeedback, setSelectedFeedback] = React.useState<'yes' | 'no' | null>(null);

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
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="gap-4">
					{supportData.map((data, index) => (
						<View key={`${data.tag}${index}`}>
							{/**
							|--------------------------------------------------
							| Header
							|--------------------------------------------------
							*/}
							{data.question.header !== null ? (
								<MPText weight="extra-bold" className="text-lg">
									{data.question.header}
								</MPText>
							) : null}

							{/**
							|--------------------------------------------------
							| Subtext
							|--------------------------------------------------
							*/}
							{data.question.subtext !== null ? (
								<MPText weight="regular" className="text-sm text-[#484848] mt-4">
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
										<MPText weight="bold" className="text-base mt-4">
											{data.solution.header}
										</MPText>
									)}

									{/**
									|--------------------------------------------------
									| If solution has a subtext
									|--------------------------------------------------
									*/}
									{data.solution.subtext && (
										<MPText weight="regular" className="text-sm mt-1 text-[#484848]">
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
												textClassName="text-[#484848]"
												items={data.solution['bullet-points'] as string[]}
											/>
										</View>
									)}
								</React.Fragment>
							) : (
								data?.solution?.solutions?.map((_solution) => (
									<React.Fragment>
										{_solution.header && (
											<MPText weight="bold" className="text-base mt-4">
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
													textClassName="text-[#484848]"
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
				<View className="border-[#EEEEEE] border-t items-center mt-8 p-4">
					<MPText weight="medium" className="text-sm text-[#484848]">
						Did this resolve your enquiry?
					</MPText>

					{/**
					|--------------------------------------------------
					| Yes and no
					|--------------------------------------------------
					*/}
					<View className="flex-row justify-center gap-6 mt-4">
						<MPButton
							useGradientBg={selectedFeedback === 'yes'}
							onPress={() => setSelectedFeedback('yes')}
							className={clsx(
								'size-[42px] max-w-[42px] max-h-[42px] rounded-full border border-[#D0D5DD]',
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
							onPress={() => setSelectedFeedback('no')}
							className={clsx(
								'size-[42px] max-w-[42px] max-h-[42px] rounded-full border border-[#D0D5DD]'
							)}
						>
							<MPText className={clsx(selectedFeedback === 'no' ? 'text-white' : 'text-black')}>
								No
							</MPText>
						</MPButton>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
