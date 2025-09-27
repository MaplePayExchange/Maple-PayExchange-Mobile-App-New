/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import { Svg, Path, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import Toggler from '../Toggler';
import MPButton from '../MPButton';
import { useUserStore } from '@/zustand/userStore';
import { useBiometricAuth } from '@/hooks/useBiometrics';

interface Props {
	visible: boolean;
	setVisible: () => void;
}

export default function BiometricsModal({ visible, setVisible }: Props) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { authenticate } = useBiometricAuth();
	const { setBiometricsInfo, biometricsInfo, setBiometricsModal, showBiometricsModal } = useUserStore();

	/**
	|--------------------------------------------------
	| Toggles the biometrics
	|--------------------------------------------------
	*/
	const handleBiometrics = async () => {
		const response = await authenticate();

		if (response.success) {
			setBiometricsInfo({ ...biometricsInfo, isTurnedOn: !biometricsInfo?.isTurnedOn || false });
			setBiometricsModal(false);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal transparent visible={showBiometricsModal} animationType="slide">
			<Pressable onPress={() => setVisible()} className="bg-black/10 flex-1">
				<View className="bg-white rounded-2xl mt-auto w-full min-h-[290px] px-6 pt-4 items-center">
					{/**
                    |--------------------------------------------------
                    | Drawer
                    |--------------------------------------------------
                    */}
					<Pressable className="bg-[#F5F5F5] w-[46px] h-[7px] mb-4 rounded-full" />

					<View>
						<Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
							<Rect width="56" height="56" rx="8" fill="#F5F5F5" />
							<Path
								d="M24.658 16.9165C21.5474 16.9874 19.7305 17.2835 18.4891 18.5206C17.4026 19.6033 17.0394 21.1253 16.918 23.5665M31.3446 16.9165C34.4552 16.9874 36.2721 17.2835 37.5136 18.5206C38.6 19.6033 38.9632 21.1253 39.0846 23.5665M31.3446 39.0832C34.4552 39.0123 36.2721 38.7162 37.5136 37.4791C38.6 36.3964 38.9632 34.8743 39.0846 32.4332M24.658 39.0832C21.5474 39.0123 19.7305 38.7162 18.4891 37.4791C17.4026 36.3964 17.0394 34.8743 16.918 32.4332"
								stroke="url(#paint0_linear_1461_9966)"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<Path
								d="M23.3335 33.8337C25.4784 30.8057 30.472 30.6405 32.6668 33.8337M30.9168 25.0837C30.9168 26.6945 29.611 28.0003 28.0002 28.0003C26.3893 28.0003 25.0835 26.6945 25.0835 25.0837C25.0835 23.4728 26.3893 22.167 28.0002 22.167C29.611 22.167 30.9168 23.4728 30.9168 25.0837Z"
								stroke="url(#paint1_linear_1461_9966)"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<Defs>
								<LinearGradient
									id="paint0_linear_1461_9966"
									x1="28.0013"
									y1="16.9165"
									x2="28.0013"
									y2="39.0832"
									gradientUnits="userSpaceOnUse"
								>
									<Stop stopColor="#EE0979" />
									<Stop offset="1" stopColor="#FF6A00" />
								</LinearGradient>
								<LinearGradient
									id="paint1_linear_1461_9966"
									x1="28.0002"
									y1="22.167"
									x2="28.0002"
									y2="33.8337"
									gradientUnits="userSpaceOnUse"
								>
									<Stop stopColor="#EE0979" />
									<Stop offset="1" stopColor="#FF6A00" />
								</LinearGradient>
							</Defs>
						</Svg>
					</View>

					{/**
                    |--------------------------------------------------
                    | Title
                    |--------------------------------------------------
                    */}
					<MPText weight="bold" style={{ fontSize: 18 }} className="mt-5">
						Enable biometrics
					</MPText>
					<MPText weight="regular" className="text-[#767676] text-center text-sm mt-1">
						You can enable face ID/ touch ID to gain access to your account easily.
					</MPText>

					{/**
                    |--------------------------------------------------
                    | Toggler
                    |--------------------------------------------------
                    */}
					<Toggler
						className="mt-6"
						title="Biometrics"
						onChange={handleBiometrics}
						checked={biometricsInfo?.isTurnedOn}
						subtitle="Use fingerprint or face to unlock "
					/>

					{/**
					|--------------------------------------------------
					| Action buttons
					|--------------------------------------------------
					*/}
					<View className="flex-row justify-between mt-8 mb-8">
						<MPButton onPress={() => setVisible()} className="w-[45%] max-w-[45%]">
							<MPText className="text-sm text-[#FF6A00]" weight="semibold">
								Cancel
							</MPText>
						</MPButton>

						{/**
						|--------------------------------------------------
						| Remind me later
						|--------------------------------------------------
						*/}
						<MPButton
							useGradientBg
							className="w-[45%] max-w-[45%]"
							onPress={() => {
								setBiometricsModal(false);
								setBiometricsInfo({ ...biometricsInfo, remindMeLater: true });
							}}
						>
							<MPText weight="semibold" className="text-sm text-white">
								Remind me later
							</MPText>
						</MPButton>
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}
