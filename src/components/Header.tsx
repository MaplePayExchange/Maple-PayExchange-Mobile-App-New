/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Pressable, View } from 'react-native';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import MPText from './MPText';
import { BackArrowIcon } from '@assets/svgs';
import { fontSizes } from '@constants/app.constant';
import { useNavigation } from '@react-navigation/native';

interface Props {
	title: string;
	center?: boolean;
	subtitle?: string;
	onlClick?: () => void;
	useNavigation?: boolean;
	titleFontSize?: keyof typeof fontSizes;
	rightNavigationItem?: React.ReactNode;
	subTitleFontSize?: keyof typeof fontSizes;
}

export default function HeaderWrapper({
	center,
	subtitle,
	onlClick,
	titleFontSize,
	subTitleFontSize,
	rightNavigationItem,
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
		<View className="mt-4">
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

				<View className={clsx(center && 'absolute left-1/2 -translate-x-[50%]')}>
					<MPText
						weight="bold"
						className={clsx('text-[#1A1A1A]')}
						style={{ lineHeight: 26, fontSize: fontSizes[titleFontSize || 'FONT16'] }}
					>
						{title}
					</MPText>
				</View>

				{/**
				|--------------------------------------------------
				| Right icon
				|--------------------------------------------------
				*/}
				{rightNavigationItem && <View className={clsx('ml-auto')}>{rightNavigationItem}</View>}
			</View>

			{/**
            |--------------------------------------------------
            | Subtitle
            |--------------------------------------------------
            */}
			<MPText fontSize={subTitleFontSize} weight="medium" className="mt-2 leading-6 text-[#767676]">
				{subtitle}
			</MPText>
		</View>
	);
}
