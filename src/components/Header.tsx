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

interface Props {
	title: string;
	subtitle?: string;
	useNavigation?: boolean;
}

export default function HeaderWrapper({
	subtitle,
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
			<View className="flex items-center gap-4" style={{ flexDirection: 'row' }}>
				{useNavigate && (
					<Pressable onPress={() => navigation.goBack()}>
						<BackArrowIcon />
					</Pressable>
				)}
				<MPText style={{ lineHeight: 26 }} weight="semibold" className="text-2xl text-[#1A1A1A]">
					{title}
				</MPText>
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
