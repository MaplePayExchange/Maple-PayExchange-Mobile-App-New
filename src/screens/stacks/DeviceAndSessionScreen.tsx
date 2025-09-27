/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import dayjs from 'dayjs';
import { View, ScrollView } from 'react-native';
import advancedFormat from 'dayjs/plugin/advancedFormat';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@/src/components/MPText';
import Container from '@/src/components/Container';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { useGetDeviceLoginHistory } from '@/services/user.services';

dayjs.extend(advancedFormat);

export default function DeviceAndSessionScreen() {
	/**
    |--------------------------------------------------
    | API
    |--------------------------------------------------
    */
	const { data, isLoading } = useGetDeviceLoginHistory();
	console.log(data);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper usePadding={false}>
			<View className="px-4">
				<HeaderWrapper center title="Devices and Sessions" />
			</View>

			{/**
            |--------------------------------------------------
            | Main content
            |--------------------------------------------------
            */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<View className="bg-[#f0f0f0] flex-1 p-4 h-[75vh]">
					<Container>
						<MPText className="text-base" weight="semibold">
							Devices and Sessions
						</MPText>

						{/**
                        |--------------------------------------------------
                        | History
                        |--------------------------------------------------
                        */}
						<View className="mt-6 gap-6">
							{data?.history.map((device) => (
								<View key={(device as any)?._id} className="">
									<MPText className="text-sm" weight="medium">
										{device.deviceName} {device.isCurrent && '(Current device)'}
									</MPText>
									<MPText className="text-sm text-[#767676]" weight="medium">
										As at {dayjs(device.lastLoginAt).format('dddd Do MMMM YYYY, hh:mm A')}
									</MPText>
								</View>
							))}
						</View>
					</Container>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
