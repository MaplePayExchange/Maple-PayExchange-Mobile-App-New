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
import clsx from 'clsx';
import MPText from '@src/components/MPText';
import Toggler from '@src/components/Toggler';
import Container from '@src/components/Container';
import { useUserStore } from '@zustand/userStore';
import { User } from '@interfaces/user.interface';
import HeaderWrapper from '@src/components/Header';
import { useRoute } from '@react-navigation/native';
import ScreenWrapper from '@src/components/Wrapper';
import { useUpdateProfile } from '@services/user.services';
import { useGetUserInformation } from '@services/auth.services';

export default function NotificationsSettingsScreen() {
	const route = useRoute();
	const user = route.params as User;

	/**
	|--------------------------------------------------
	| API
	|--------------------------------------------------
	*/
	const { mutate, isPending } = useUpdateProfile();
	const { data: userData, isSuccess } = useGetUserInformation();

	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { notificationSettings, setNotificationSettings } = useUserStore();

	/**
	|--------------------------------------------------
	| Update settings
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (userData?.user?.notificationSettings) {
			console.log(userData?.user?.notificationSettings);
			setNotificationSettings(userData?.user?.notificationSettings as any);
		}
	}, [userData]);

	console.log(notificationSettings, 'notificationSettings');

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
							onChange={() => {
								mutate({
									...notificationSettings,
									inAppNotifications: !notificationSettings.inAppNotifications,
								});
							}}
						/>
					</Container>

					<MPText className="text-xs mb-3">Push notifications</MPText>
					<View className={clsx('gap-4', isPending ? 'pointer-events-none opacity-65' : '')}>
						{/**
                        |--------------------------------------------------
                        | Login alerts
                        |--------------------------------------------------
                        */}
						<Container>
							<Toggler
								title="Login alerts"
								checked={notificationSettings.loginAlerts}
								onChange={() => {
									mutate({
										...notificationSettings,
										loginAlerts: !notificationSettings.loginAlerts,
									});
								}}
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
								onChange={() => {
									mutate({
										...notificationSettings,
										rateAlerts: !notificationSettings.rateAlerts,
									});
								}}
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
								onChange={() => {
									mutate({
										...notificationSettings,
										transactionAlerts: !notificationSettings.transactionAlerts,
									});
								}}
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
								onChange={() => {
									mutate({
										...notificationSettings,
										promotionAlerts: !notificationSettings.promotionAlerts,
									});
								}}
							/>
						</Container>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
