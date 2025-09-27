/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import { Image, Linking, Pressable, ScrollView, View } from 'react-native';
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import utils from '@/lib/utils';
import MPText from '@/src/components/MPText';
import MPButton from '@/src/components/MPButton';
import { User } from '@/interfaces/user.interface';
import Container from '@/src/components/Container';
import HeaderWrapper from '@/src/components/Header';
import ScreenWrapper from '@/src/components/Wrapper';
import { useUploadProfileImage } from '@/services/user.services';
import DataRepresentation from '@/src/components/DataRepresentation';

export default function ProfileSettingsScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const route = useRoute();
	const { user } = route.params as { user: User };
	const { mutate, isPending } = useUploadProfileImage();
	const [imageUri, setImageUri] = React.useState<string | null>(user.profileImage || null);

	const handlePickImage = async () => {
		/**
        |--------------------------------------------------
        | Request permission
        |--------------------------------------------------
        */
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			utils.errorHandler(undefined, 'Permission to access media library is required.');
			return;
		}

		/**
        |--------------------------------------------------
        | Launch image picker
        |--------------------------------------------------
        */
		const result = await ImagePicker.launchImageLibraryAsync({
			quality: 0.8,
			mediaTypes: 'images',
			allowsEditing: true,
		});

		if (result.canceled) {
			/**
            |--------------------------------------------------
            | User cancelled
            |--------------------------------------------------
            */
			utils.errorHandler(undefined, 'User cancelled upload!');
			return;
		}

		/**
        |--------------------------------------------------
        | Image
        |--------------------------------------------------
        */
		const asset = result.assets[0];
		setImageUri(asset.uri);

		/**
		|--------------------------------------------------
		| ..
		|--------------------------------------------------
		*/
		mutate({ imageUri: asset.uri });
	};

	/**
    |--------------------------------------------------
    | ...
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
		<ScreenWrapper usePadding={false}>
			<View className="px-4">
				<HeaderWrapper title="Account Settings" center />
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/**
                |--------------------------------------------------
                | ...
                |--------------------------------------------------
                */}
				<View
					className={clsx(
						'bg-[#f0f0f0] flex-1 p-4 min-h-[90vh]',
						isPending ? 'pointer-events-none opacity-55' : ''
					)}
				>
					<View className="size-[118px] relative rounded-full flex-row justify-center items-center bg-[#F7F7F7] self-center mt-6 mb-8">
						<Pressable onPress={handlePickImage} className="absolute bottom-2 right-2 z-30">
							<Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
								<Rect
									x="0.0609741"
									y="0.191406"
									width="17.2683"
									height="17.2683"
									rx="8.63415"
									fill="url(#paint0_linear_290_3848)"
								/>
								<Path
									d="M6.81 12.4217H10.5802C11.5732 12.4217 11.9689 11.8137 12.0157 11.0726L12.2027 8.10101C12.2531 7.32394 11.6343 6.66559 10.8537 6.66559C10.6342 6.66559 10.4327 6.53967 10.332 6.3454L10.073 5.82376C9.9075 5.49638 9.4758 5.22656 9.10884 5.22656H8.285C7.91445 5.22656 7.48275 5.49638 7.31726 5.82376L7.05823 6.3454C6.9575 6.53967 6.75604 6.66559 6.53659 6.66559C5.75592 6.66559 5.13714 7.32394 5.1875 8.10101L5.37458 11.0726C5.41775 11.8137 5.81708 12.4217 6.81 12.4217Z"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Path
									d="M8.15546 7.38477H9.23472"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Path
									d="M8.69506 10.981C9.33902 10.981 9.86426 10.4557 9.86426 9.81179C9.86426 9.16782 9.33902 8.64258 8.69506 8.64258C8.05109 8.64258 7.52585 9.16782 7.52585 9.81179C7.52585 10.4557 8.05109 10.981 8.69506 10.981Z"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Defs>
									<LinearGradient
										id="paint0_linear_290_3848"
										x1="0.0609741"
										y1="8.82555"
										x2="17.3293"
										y2="8.82555"
										gradientUnits="userSpaceOnUse"
									>
										<Stop stopColor="#EE0979" />
										<Stop offset="1" stopColor="#FF6A00" />
									</LinearGradient>
								</Defs>
							</Svg>
						</Pressable>

						{/**
                        |--------------------------------------------------
                        | ...
                        |--------------------------------------------------
                        */}
						{imageUri && (
							<Image source={{ uri: imageUri }} style={{ width: 118, height: 118, borderRadius: 9999 }} />
						)}
					</View>
					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<MPText className="text-sm">Personal Details</MPText>

					{/**
                    |--------------------------------------------------
                    | ...
                    |--------------------------------------------------
                    */}
					<Container className="mt-4 gap-8 rounded-lg">
						<DataRepresentation label="First Name" value={user?.firstName} />
						<DataRepresentation label="Last Name" value={user?.lastName} />
						<DataRepresentation label="Phone Number" value={user?.phone} />
						<DataRepresentation label="Email" value={user?.mail?.email} />
						<DataRepresentation
							label="Date of Birth"
							value={dayjs(user.birthDate).format('MMM DD, YYYY')}
						/>
					</Container>

					{/**
                    |--------------------------------------------------
                    | Interac
                    |--------------------------------------------------
                    */}
					<View className="flex-row items-center gap-2 my-4">
						<MPText className="text-sm">Interac E-Transfer Tag</MPText>
						<Pressable onPress={() => utils.copyToClipboard(user?.mail?.email || '')}>
							<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<G clip-path="url(#clip0_290_3884)">
									<Path
										d="M6 10C6 8.11438 6 7.17157 6.58579 6.58579C7.17157 6 8.11438 6 10 6L10.6667 6C12.5523 6 13.4951 6 14.0809 6.58579C14.6667 7.17157 14.6667 8.11438 14.6667 10V10.6667C14.6667 12.5523 14.6667 13.4951 14.0809 14.0809C13.4951 14.6667 12.5523 14.6667 10.6667 14.6667H10C8.11438 14.6667 7.17157 14.6667 6.58579 14.0809C6 13.4951 6 12.5523 6 10.6667L6 10Z"
										stroke="url(#paint0_linear_290_3884)"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<Path
										d="M11.3333 6.00065C11.3317 4.02926 11.3018 3.00812 10.728 2.30894C10.6172 2.17391 10.4934 2.0501 10.3584 1.93929C9.62083 1.33398 8.525 1.33398 6.33334 1.33398C4.14169 1.33398 3.04586 1.33398 2.3083 1.93929C2.17327 2.0501 2.04946 2.17391 1.93865 2.30894C1.33334 3.0465 1.33334 4.14233 1.33334 6.33398C1.33334 8.52564 1.33334 9.62146 1.93865 10.359C2.04946 10.4941 2.17327 10.6179 2.30829 10.7287C3.00748 11.3025 4.02862 11.3323 6.00001 11.3339"
										stroke="url(#paint1_linear_290_3884)"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</G>
								<Defs>
									<LinearGradient
										id="paint0_linear_290_3884"
										x1="6"
										y1="10.3333"
										x2="14.6667"
										y2="10.3333"
										gradientUnits="userSpaceOnUse"
									>
										<Stop stopColor="#EE0979" />
										<Stop offset="1" stopColor="#FF6A00" />
									</LinearGradient>
									<LinearGradient
										id="paint1_linear_290_3884"
										x1="1.33334"
										y1="6.33398"
										x2="11.3333"
										y2="6.33398"
										gradientUnits="userSpaceOnUse"
									>
										<Stop stopColor="#EE0979" />
										<Stop offset="1" stopColor="#FF6A00" />
									</LinearGradient>
									<ClipPath id="clip0_290_3884">
										<Rect width="16" height="16" fill="white" />
									</ClipPath>
								</Defs>
							</Svg>
						</Pressable>
					</View>

					{/**
                    |--------------------------------------------------
                    | Email
                    |--------------------------------------------------
                    */}
					<Container className="rounded-lg">
						<MPText className="text-sm" weight="medium">
							{user?.mail?.email}
						</MPText>
					</Container>

					{/**
                    |--------------------------------------------------
                    | Contact support
                    |--------------------------------------------------
                    */}
					<Container className="!bg-[#9F0651] items-center mt-5">
						<MPText
							weight="medium"
							style={{ lineHeight: 15 }}
							className="text-center text-white text-xs max-w-[302px]"
						>
							You are unable to edit this profile because your account has already been verified. If you
							need to edit, please reach out to support
						</MPText>

						{/**
                        |--------------------------------------------------
                        | Contact support
                        |--------------------------------------------------
                        */}
						<MPButton
							onPress={handleOpenWhatsApp}
							className="bg-white rounded-full mt-4 max-w-[122px] h-[32px]"
						>
							<MPText weight="medium" className="text-sm">
								Contact support
							</MPText>
						</MPButton>
					</Container>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
