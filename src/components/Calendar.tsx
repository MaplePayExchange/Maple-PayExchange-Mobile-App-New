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
		<View className="relative mt-auto h-[497px] w-full rounded-t-3xl bg-white">
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
				className="absolute right-[34%] top-4 h-[30px] w-[100px] bg-transparent"
			/>

			{/**
            |--------------------------------------------------
            | Year popup
            |--------------------------------------------------
            */}
			{showYearPopup && (
				<View className="absolute top-12 z-30 max-h-[400px] w-[95%] self-center overflow-hidden rounded-3xl border border-slate-100 bg-white p-5">
					<ScrollView showsVerticalScrollIndicator={false}>
						<View className="flex-row flex-wrap justify-between gap-5">
							{utils.generateYears().map((year) => (
								<Pressable
									key={year}
									onPress={() => {
										setSelectedYear(year);
										setShowYearPopup(false);
										setSelectedDate(`${year}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
									}}
									className={clsx(
										'w-[50px] rounded-md border px-2 py-1',
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
			<View className="my-4 flex-1 flex-row gap-4 border-t border-t-[#EAECF0] p-6">
				<MPButton onPress={onClose} className="h-[40px] max-w-[48%] rounded-[12px] border border-[#D0D5DD]">
					<MPText weight="semibold" className="text-[15px]">
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
					className="h-[40px] max-w-[48%] rounded-[12px]"
				>
					<MPText weight="bold" className="text-[15px] text-white">
						Apply
					</MPText>
				</MPButton>
			</View>
		</View>
	);
}
