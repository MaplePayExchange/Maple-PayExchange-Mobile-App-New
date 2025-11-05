/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Svg, Path as _Path, Stop, Defs, G, LinearGradient, ClipPath, Rect } from 'react-native-svg';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import { CarretDownIcon, CloseIcon } from '@assets/svgs';

interface Props {
	label?: string;
	disabled?: boolean;
	isLoading?: boolean;
	isVisible?: boolean;
	wrapperClassName?: string;
	triggerClassName?: string;
	closeOnModalClick?: boolean;
	onSelect?: (value: any) => void;
	triggerChildren?: React.ReactNode;
	contentChildren?: React.ReactNode;
	setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectField({
	label,
	disabled,
	isVisible,
	isLoading,
	setIsVisible,
	triggerChildren,
	triggerClassName,
	contentChildren,
	wrapperClassName,
	closeOnModalClick = true,
}: Props) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showModal, setShowModal] = React.useState<boolean>(isVisible || false);

	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		if (isVisible !== undefined) setShowModal(isVisible);
	}, [isVisible]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View className={clsx('gap-1 w-full', wrapperClassName)}>
			{/**
            |--------------------------------------------------
            | If label
            |--------------------------------------------------
            */}
			{label && (
				<View>
					<MPText weight="medium" className="text-sm text-[#1A1A1A]">
						{label}
					</MPText>
				</View>
			)}

			{/**
            |--------------------------------------------------
            | Trigger
            |--------------------------------------------------
            */}
			<Pressable
				onPress={() => {
					if (setIsVisible) setIsVisible(true);
					else setShowModal(true);
				}}
				className={clsx(
					'bg-[#F7F7F7] rounded-[8px] w-full justify-between items-center flex-row h-[42px] px-4',
					triggerClassName,
					disabled && 'pointer-events-none'
				)}
			>
				{/**
                |--------------------------------------------------
                | Trigger children
                |--------------------------------------------------
                */}
				{triggerChildren}

				{/**
                |--------------------------------------------------
                | Carret Arrow
                |--------------------------------------------------
                */}
				<Pressable className="ml-auto pointer-events-none">
					{isLoading ? (
						<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<G clipPath="url(#clip0_5_1384)">
								<_Path
									d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
									stroke="url(#paint0_linear_5_1384)"
									strokeWidth="1.66667"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</G>
							<Defs>
								<LinearGradient
									id="paint0_linear_5_1384"
									x1="10.0001"
									y1="1.66663"
									x2="10.0001"
									y2="18.3333"
									gradientUnits="userSpaceOnUse"
								>
									<Stop stopColor="#EE0979" />
									<Stop offset="1" stopColor="#FF6A00" />
								</LinearGradient>
								<ClipPath id="clip0_5_1384">
									<Rect width="20" height="20" fill="white" />
								</ClipPath>
							</Defs>
						</Svg>
					) : (
						<CarretDownIcon />
					)}
				</Pressable>
			</Pressable>

			{/**
            |--------------------------------------------------
            | Modal for selection
            |--------------------------------------------------
            */}
			<Modal transparent visible={isVisible || showModal} animationType="slide">
				<Pressable
					className="flex-1 bg-black/10"
					onPress={() => {
						if (closeOnModalClick) {
							setShowModal(false);
							setIsVisible?.(false);
						}
					}}
				>
					<View className="bg-white min-h-[200px] max-h-[80%] rounded-3xl p-5 mt-auto">
						{/**
						|--------------------------------------------------
						| Carret Arrow
						|--------------------------------------------------
						*/}
						<Pressable
							className="ml-auto absolute right-4 top-4 z-30"
							onPress={() => {
								setShowModal(false);
								setIsVisible?.(false);
							}}
						>
							<CloseIcon />
						</Pressable>

						{/**
						|--------------------------------------------------
						| Children
						|--------------------------------------------------
						*/}
						{contentChildren}
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}
