/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Pressable, ScrollView, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from './MPText';
import utils from '@lib/utils';
import MPButton from './MPButton';

interface CalendarModalProps {
	onClose: () => void;
	initialDate?: string;
	dateType?: 'period' | 'dot';
	onApply?: (date: string | { start: string; end: string | null }) => void;
}

export default function CalendarModal({ onClose, initialDate, onApply, dateType = 'dot' }: CalendarModalProps) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showYearPopup, setShowYearPopup] = useState(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [range, setRange] = useState<{ start: string; end: string | null }>({
		start: '',
		end: null,
	});
	const [selectedDate, setSelectedDate] = useState(initialDate || new Date().toISOString().split('T')[0]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className="w-full relative bg-white mt-auto h-[480px] rounded-t-3xl">
			{/**
            |--------------------------------------------------
            | Calendar
            |--------------------------------------------------
            */}
			<Calendar
				key={selectedDate}
				markingType={dateType}
				onDayPress={(day) => {
					/**
                    |--------------------------------------------------
                    | If the date type is single
                    |--------------------------------------------------
                    */
					if (dateType === 'dot') {
						const [year, month, dayNum] = day.dateString.split('-');
						setSelectedDate(`${selectedYear}-${month}-${dayNum}`);
					}

					/**
                    |--------------------------------------------------
                    | For periods
                    |--------------------------------------------------
                    */
					if (dateType === 'period') {
						if (!range.start || (range.start && range.end)) {
							setRange({ start: day.dateString, end: null });
						} else {
							setRange({ ...range, end: day.dateString });
						}
					}
				}}
				markedDates={
					dateType === 'dot'
						? {
								[selectedDate]: {
									selected: true,
									disableTouchEvent: true,
									selectedTextColor: 'white',
									customTextStyle: { fontWeight: '700' },
								},
							}
						: {
								[range.start]: { startingDay: true, color: '#FF6A00', textColor: 'white' },
								...(range.end && {
									[range.end]: { endingDay: true, color: '#FF6A00', textColor: 'white' },
								}),
							}
				}
				theme={{
					textDayFontSize: 14,
					arrowColor: '#000000',
					textDayFontFamily: '400',
					textDayHeaderFontSize: 14,
					textMonthFontWeight: '600',
					textDayHeaderFontWeight: '400',
					textDisabledColor: '#a4a3a4',
					selectedDayBackgroundColor: '#FF6A00',
				}}
				current={selectedDate}
			/>

			{/**
            |--------------------------------------------------
            | Year toggle button
            |--------------------------------------------------
            */}
			<Pressable
				onPress={() => setShowYearPopup(true)}
				className="bg-transparent absolute h-[30px] w-[100px] top-4 right-[34%]"
			/>

			{/**
            |--------------------------------------------------
            | Year popup
            |--------------------------------------------------
            */}
			{showYearPopup && (
				<View className="absolute bg-white w-[95%] z-30 self-center overflow-hidden max-h-[400px] top-12 border border-slate-100 rounded-3xl p-5">
					<ScrollView showsVerticalScrollIndicator={false}>
						<View className="flex-row flex-wrap gap-5 justify-between">
							{utils.generateYears().map((year) => (
								<Pressable
									key={year}
									onPress={() => {
										setSelectedYear(year);
										setShowYearPopup(false);
										setSelectedDate(`${year}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
									}}
									className={clsx(
										'rounded-md py-1 px-2 w-[50px] border',
										selectedYear === year ? 'border-[#FF6A00]' : 'border-slate-300'
									)}
								>
									<MPText>{year}</MPText>
								</Pressable>
							))}
						</View>
					</ScrollView>
				</View>
			)}

			{/**
            |--------------------------------------------------
            | Action buttons
            |--------------------------------------------------
            */}
			<View className="flex-row gap-4 mt-4 border-t border-t-[#EAECF0] p-6 flex-1">
				<MPButton onPress={onClose} className="max-w-[48%] rounded-[12px] h-[40px] border border-[#D0D5DD]">
					<MPText weight="semibold" className="text-sm">
						Cancel
					</MPText>
				</MPButton>

				{/**
                |--------------------------------------------------
                | Apply button
                |--------------------------------------------------
                */}
				<MPButton
					useGradientBg
					onPress={() => {
						onApply?.(dateType === 'dot' ? selectedDate : range);
						onClose();
					}}
					className="max-w-[48%] h-[40px] rounded-[12px]"
				>
					<MPText weight="bold" className="text-white text-sm">
						Apply
					</MPText>
				</MPButton>
			</View>
		</View>
	);
}
