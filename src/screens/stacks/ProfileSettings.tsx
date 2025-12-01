/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';
import { Image, Linking, Pressable, ScrollView, View } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import utils from '@lib/utils';
import MPText from '@src/components/MPText';
import { CarretDownIcon } from '@assets/svgs';
import MPButton from '@src/components/MPButton';
import { User } from '@interfaces/user.interface';
import Container from '@src/components/Container';
import HeaderWrapper from '@src/components/Header';
import ScreenWrapper from '@src/components/Wrapper';
import { useUploadProfileImage } from '@services/user.services';
import DataRepresentation from '@src/components/DataRepresentation';

export default function ProfileSettingsScreen() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const route = useRoute();
	const { user } = route.params as { user: User };
	const { mutate, isPending } = useUploadProfileImage();
	const [showFullUserInfo, setShowFullUserInfo] = React.useState<boolean>(false);
	const [imageUri, setImageUri] = React.useState<string | null>(user.profileImage || null);

	console.log(user);

	/**
	|--------------------------------------------------
	| Handle image selection
	|--------------------------------------------------
	*/
	const handlePickImage = async () => {
		try {
			/**
			|--------------------------------------------------
			| Image options
			|--------------------------------------------------
			*/
			const options: ImageLibraryOptions = {
				mediaType: 'photo',
				includeBase64: false,
				quality: 0.8,
				selectionLimit: 1,
			};

			/**
			|--------------------------------------------------
			| Opening the image library
			|--------------------------------------------------
			*/
			launchImageLibrary(options, (response) => {
				if (response.didCancel) {
					utils.errorHandler(undefined, 'User cancelled upload!');
					return;
				}

				/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/
				if (response.errorCode) {
					utils.errorHandler(undefined, response.errorMessage || 'Image picker error!');
					return;
				}

				/**
				|--------------------------------------------------
				| ...
				|--------------------------------------------------
				*/
				const asset = response.assets?.[0];
				if (asset?.uri) {
					setImageUri(asset.uri);
					mutate({ imageUri: asset.uri });
				}
			});
		} catch (err) {
			utils.errorHandler(err, 'An unexpected error occurred while picking the image.');
		}
	};

	/**
    |--------------------------------------------------
    | Handle open WhatsApp
    |--------------------------------------------------
    */
	const handleOpenWhatsApp = () => {
		const phone = '+16475760680';
		const message = 'Hello, I need support with my:';
		const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

		/**
		|--------------------------------------------------
		| ...
		|--------------------------------------------------
		*/
		Linking.openURL(url).catch(() => {
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
						'min-h-[90vh] flex-1 bg-[#f0f0f0] p-4',
						isPending ? 'pointer-events-none opacity-55' : ''
					)}
				>
					<View className="relative mb-8 mt-6 size-[118px] flex-row items-center justify-center self-center rounded-full bg-[#F7F7F7]">
						{/**
						|--------------------------------------------------
						| Image picker
						|--------------------------------------------------
						*/}
						<Pressable onPress={handlePickImage} className="absolute bottom-2 right-2 z-30">
							<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<Rect width="24" height="24" rx="12" fill="url(#paint0_linear_290_3848)" />
								<Path
									d="M8.50677 18.6615H15.4934C17.3334 18.6615 18.0668 17.5348 18.1534 16.1615L18.5001 10.6548C18.5934 9.21479 17.4468 7.99479 16.0001 7.99479C15.5934 7.99479 15.2201 7.76146 15.0334 7.40146L14.5534 6.43479C14.2468 5.82813 13.4468 5.32812 12.7668 5.32812H11.2401C10.5534 5.32812 9.75343 5.82813 9.44677 6.43479L8.96677 7.40146C8.7801 7.76146 8.40677 7.99479 8.0001 7.99479C6.55343 7.99479 5.40677 9.21479 5.5001 10.6548L5.84677 16.1615C5.92677 17.5348 6.66677 18.6615 8.50677 18.6615Z"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Path
									d="M11.0001 9.32812H13.0001"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Path
									d="M12 15.9915C13.1933 15.9915 14.1666 15.0182 14.1666 13.8249C14.1666 12.6315 13.1933 11.6582 12 11.6582C10.8066 11.6582 9.83331 12.6315 9.83331 13.8249C9.83331 15.0182 10.8066 15.9915 12 15.9915Z"
									stroke="white"
									strokeWidth="0.719512"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<Defs>
									<LinearGradient
										id="paint0_linear_290_3848"
										x1="0"
										y1="12"
										x2="24"
										y2="12"
										gradientUnits="userSpaceOnUse"
									>
										<Stop stopColor="#EE0979" />
										<Stop offset="1" stopColor="#FF6A00" />
									</LinearGradient>
								</Defs>
							</Svg>
						</Pressable>

						{imageUri && (
							<Image source={{ uri: imageUri }} style={{ width: 118, height: 118, borderRadius: 9999 }} />
						)}
					</View>

					{/**
					|--------------------------------------------------
					| Product details
					|--------------------------------------------------
					*/}
					<MPText className="text-[15px]">Personal Details</MPText>

					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<Container className="mt-4 gap-10 rounded-lg">
						<DataRepresentation
							label="First Name"
							value={user?.firstName}
							labelClassName="text-[#767676]"
						/>
						<DataRepresentation labelClassName="text-[#767676]" label="Last Name" value={user?.lastName} />
						<DataRepresentation labelClassName="text-[#767676]" label="Phone Number" value={user?.phone} />
						<DataRepresentation labelClassName="text-[#767676]" label="Email" value={user?.mail?.email} />
						<DataRepresentation
							label="Date of Birth"
							labelClassName="text-[#767676]"
							value={dayjs(user.birthDate?.slice(0, 10)).format('MMM DD, YYYY')}
						/>
						<DataRepresentation labelClassName="text-[#767676]" label="Country" value={user?.country} />
						<DataRepresentation
							labelClassName="text-[#767676]"
							label="Address"
							value={user?.street || '- -'}
						/>

						{/**
						|--------------------------------------------------
						| Others
						|--------------------------------------------------
						*/}
						{showFullUserInfo ? (
							<View className="gap-10">
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Occupation"
									value={user?.occupation || '- -'}
								/>
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Usage Purpose"
									value={user?.usagePurpose || '- -'}
								/>
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Annual Salary Range"
									value={user?.annualSalaryRange || '- -'}
								/>
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Primary Source of Funds"
									value={user?.primarySourceOfFunds || '- -'}
								/>
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Is Politically Exposed"
									valueClassName="capitalize pr-1"
									value={String(user?.isPolliticallyExposed) || '- -'}
								/>
								<DataRepresentation
									labelClassName="text-[#767676]"
									label="Country You Mostly Send Money To"
									value={user?.countryUserMostlySendsMoneyTo || '- -'}
								/>
							</View>
						) : null}

						{/**
						|--------------------------------------------------
						| See more
						|--------------------------------------------------
						*/}
						<Pressable
							onPress={() => setShowFullUserInfo(!showFullUserInfo)}
							className="w-[120px] flex-row items-center justify-center gap-1 self-center rounded-full border border-[#EEEEEE] p-2"
						>
							<MPText fontSize="FONT12" weight="regular">
								{showFullUserInfo ? 'Hide more' : 'View more'}
							</MPText>
							{showFullUserInfo ? (
								<View className="" style={{ transform: [{ rotate: '180deg' }] }}>
									<CarretDownIcon />
								</View>
							) : (
								<View className="mt-[2px]">
									<CarretDownIcon />
								</View>
							)}
						</Pressable>
					</Container>

					{/**
                    |--------------------------------------------------
                    | Interac
                    |--------------------------------------------------
                    */}
					<View className="my-4 flex-row items-center gap-2">
						<MPText className="text-[15px] text-[#484848]">Interac E-Transfer Tag</MPText>
					</View>

					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<Container className="flex-row items-center justify-between rounded-lg">
						<MPText className="text-[15px]" weight="medium">
							{user?.mail?.email}
						</MPText>

						{/**
						|--------------------------------------------------
						| ...
						|--------------------------------------------------
						*/}
						<Pressable onPress={() => utils.copyToClipboard(user?.mail?.email || '')}>
							<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<G clipPath="url(#clip0_290_3884)">
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
					</Container>

					{/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/}
					<Container className="mt-5 items-center !bg-[#9F0651]">
						<MPText
							weight="medium"
							fontSize="FONT12"
							style={{ lineHeight: 15 }}
							className="max-w-[302px] text-center text-white"
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
							className="mt-4 h-[32px] max-w-[142px] rounded-full bg-white"
						>
							<MPText fontSize="FONT14" weight="medium" className="">
								Contact support
							</MPText>
						</MPButton>
					</Container>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
