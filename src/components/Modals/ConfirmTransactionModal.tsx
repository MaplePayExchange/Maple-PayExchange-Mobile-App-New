/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View, Modal, Platform } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from '../MPText';
import HeaderWrapper from '../Header';
import ScreenWrapper from '../Wrapper';
import CustomKeyboard from '../CustomKeyboard';

interface Props {
	setVisible: any;
	visible: boolean;
	isLoading?: boolean;
	onComplete?: (value: string) => void;
}
export default function ConfirmTransactionModal({ onComplete, visible, setVisible, isLoading }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={visible} animationType="slide">
			{Platform.OS === 'ios' && <View className="mt-[70px]" />}
			<ScreenWrapper className={clsx(isLoading && 'pointer-events-none opacity-45')}>
				<HeaderWrapper onlClick={() => setVisible(false)} useNavigation title="Confirm Transaction" center />

				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<View className="items-center mt-8 mb-10">
					<MPText weight="medium" className="text-[#1A1A1A] text-[18px]">
						Enter Transaction PIN
					</MPText>
					<MPText weight="medium" className="text-[#767676] text-sm">
						This is your unique 4digit number
					</MPText>
				</View>

				{/**
                |--------------------------------------------------
                | Custom keyboard
                |--------------------------------------------------
                */}
				<CustomKeyboard onComplete={(value) => onComplete?.(value)} />
			</ScreenWrapper>
		</Modal>
	);
}
