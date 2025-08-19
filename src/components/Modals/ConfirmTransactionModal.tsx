/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { View, Modal } from 'react-native';

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
	visible: boolean;
	setVisible: any;
	onComplete?: (value: string) => void;
}
export default function ConfirmTransactionModal({ onComplete, visible, setVisible }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Modal visible={visible} animationType="slide">
			<View className="mt-[70px]" />
			<ScreenWrapper>
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
