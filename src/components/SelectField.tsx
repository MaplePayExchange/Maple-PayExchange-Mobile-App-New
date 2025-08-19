/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import { CarretDownIcon } from '@/assets/svgs';

interface Props {
	label?: string;
	disabled?: boolean;
	wrapperClassName?: string;
	triggerClassName?: string;
	onSelect?: (value: any) => void;
	triggerChildren?: React.ReactNode;
	contentChildren?: React.ReactNode;
}

export default function SelectField({
	label,
	disabled,
	triggerChildren,
	triggerClassName,
	contentChildren,
	wrapperClassName,
}: Props) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const [showModal, setShowModal] = React.useState<boolean>(false);

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
				onPress={() => setShowModal(true)}
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
					<CarretDownIcon />
				</Pressable>
			</Pressable>

			{/**
            |--------------------------------------------------
            | Modal for selection
            |--------------------------------------------------
            */}
			<Modal transparent visible={showModal} animationType="slide">
				<Pressable onPress={() => setShowModal(false)} className="flex-1 bg-black/10">
					<View className="bg-white min-h-[200px] max-h-[80%] rounded-3xl p-5 mt-auto">
						{contentChildren}
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}
