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
import MPText from '@/src/components/MPText';
import Toggler from '@/src/components/Toggler';
import Container from '@/src/components/Container';
import { useUserStore } from '@/zustand/userStore';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';

export default function NotificationsSettingsScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { notificationSettings, setNotificationSettings } = useUserStore();
	console.log(notificationSettings);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper usePadding={false}>
			<View className="px-4">
				<HeaderWrapper center title="Notifications" />
			</View>

			{/**
            |--------------------------------------------------
            | Content
            |--------------------------------------------------
            */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="bg-[#f0f0f0] min-h-screen flex-1 p-4">
					<MPText className="text-xs mb-3">In-app notifications</MPText>

					{/**
                    |--------------------------------------------------
                    | Notifications within app
                    |--------------------------------------------------
                    */}
					<Container className="mb-4">
						<Toggler
							title="Get notifications within app"
							checked={notificationSettings.inAppNotifications}
							onChange={() =>
								setNotificationSettings({
									inAppNotifications: !notificationSettings.inAppNotifications,
								})
							}
						/>
					</Container>

					<MPText className="text-xs mb-3">Push notifications</MPText>
					<View className="gap-4">
						{/**
                        |--------------------------------------------------
                        | Login alerts
                        |--------------------------------------------------
                        */}
						<Container>
							<Toggler
								title="Login alerts"
								checked={notificationSettings.loginAlerts}
								onChange={() =>
									setNotificationSettings({ loginAlerts: !notificationSettings.loginAlerts })
								}
							/>
						</Container>

						{/**
                        |--------------------------------------------------
                        | Rate alerts
                        |--------------------------------------------------
                        */}
						<Container>
							<Toggler
								title="Rate alerts"
								checked={notificationSettings.rateAlerts}
								onChange={() =>
									setNotificationSettings({ rateAlerts: !notificationSettings.rateAlerts })
								}
							/>
						</Container>

						{/**
                        |--------------------------------------------------
                        | Transaction alerts
                        |--------------------------------------------------
                        */}
						<Container>
							<Toggler
								title="Transaction alerts"
								checked={notificationSettings.transactionAlerts}
								onChange={() =>
									setNotificationSettings({
										transactionAlerts: !notificationSettings.transactionAlerts,
									})
								}
							/>
						</Container>

						{/**
                        |--------------------------------------------------
                        | Promotion alerts
                        |--------------------------------------------------
                        */}
						<Container>
							<Toggler
								title="Promotion alerts"
								checked={notificationSettings.promotionAlerts}
								onChange={() =>
									setNotificationSettings({
										promotionAlerts: !notificationSettings.promotionAlerts,
									})
								}
							/>
						</Container>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
