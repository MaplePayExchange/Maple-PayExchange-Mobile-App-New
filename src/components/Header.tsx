/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Pressable, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import { BackArrowIcon } from '@/assets/svgs';
import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';

interface Props {
	title: string;
	center?: boolean;
	subtitle?: string;
	onlClick?: () => void;
	useNavigation?: boolean;
}

export default function HeaderWrapper({
	center,
	subtitle,
	onlClick,
	title = 'This is the title',
	useNavigation: useNavigate = true,
}: Props) {
	const navigation = useNavigation();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View>
			{/**
            |--------------------------------------------------
            | Header
            |--------------------------------------------------
            */}
			<View className="flex flex-row items-center gap-4">
				{useNavigate && (
					<Pressable
						onPress={() => {
							if (onlClick) onlClick?.();
							else navigation.goBack();
						}}
					>
						<BackArrowIcon />
					</Pressable>
				)}

				<View className={clsx(center && '-translate-x-[50%] left-1/2 absolute')}>
					<MPText weight="semibold" style={{ lineHeight: 26 }} className={clsx('text-2xl text-[#1A1A1A]')}>
						{title}
					</MPText>
				</View>
			</View>

			{/**
            |--------------------------------------------------
            | Subtitle
            |--------------------------------------------------
            */}
			<MPText weight="medium" className="text-sm mt-1 text-[#767676] leading-6">
				{subtitle}
			</MPText>
		</View>
	);
}
