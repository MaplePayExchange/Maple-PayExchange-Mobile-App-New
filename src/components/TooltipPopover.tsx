/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { View, TouchableOpacity, Modal, Pressable } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';

interface Props {
	text?: string;
	textClassName?: string;
	children?: React.ReactNode;
}

export default function TooltipPopover({ text = 'This is some dummy text', textClassName, children }: Props) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showPopover, setShowPopover] = React.useState<boolean>(false);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<TouchableOpacity activeOpacity={0.7}>
			{/**
            |--------------------------------------------------
            | CLickable icon
            |--------------------------------------------------
            */}
			<Pressable onPress={() => setShowPopover(!showPopover)}>
				{children ? (
					children
				) : (
					<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<G clip-path="url(#clip0_1315_7221)">
							<Path
								d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
								stroke="#484848"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</G>
						<Defs>
							<ClipPath id="clip0_1315_7221">
								<Rect width="16" height="16" fill="white" />
							</ClipPath>
						</Defs>
					</Svg>
				)}
			</Pressable>

			{/**
            |--------------------------------------------------
            | Modal
            |--------------------------------------------------
            */}
			<Modal animationType="fade" visible={showPopover} transparent onDismiss={() => setShowPopover(false)}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => setShowPopover(false)}
					className="w-full flex-1 items-center justify-center bg-black/20 px-[4%]"
				>
					{/**
                    |--------------------------------------------------
                    | View
                    |--------------------------------------------------
                    */}
					<View className="min-h-[100px] w-full rounded-md bg-[#0E314C] p-6">
						<MPText weight="medium" fontSize="FONT14" className={clsx('text-white', textClassName)}>
							{text}
						</MPText>
					</View>
				</TouchableOpacity>
			</Modal>
		</TouchableOpacity>
	);
}
