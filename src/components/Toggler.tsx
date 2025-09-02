/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { Animated, Easing, View } from 'react-native';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPButton from './MPButton';
import MPText from '@/src/components/MPText';

interface Props {
	title?: string;
	checked?: boolean;
	subtitle?: string;
	disabled?: boolean;
	className?: string;
	onChange?: () => void;
}

export default function Toggler({
	checked,
	disabled,
	onChange,
	className,
	title = 'Title',
	subtitle = 'Subtitle',
}: Props) {
	/**
	|--------------------------------------------------
	| States
	|--------------------------------------------------
	*/
	const translateX = React.useRef(new Animated.Value(checked ? 20 : 0)).current;

	/**
	|--------------------------------------------------
	| Trigger animation when toggle changes
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		Animated.timing(translateX, {
			toValue: checked ? 20 : 0,
			duration: 200,
			easing: Easing.out(Easing.circle),
			useNativeDriver: true,
		}).start();
	}, [checked]);

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<View
			style={{ opacity: disabled ? 0.5 : 1 }}
			className={clsx('flex-row items-center justify-between w-full', className)}
		>
			{/**
			|--------------------------------------------------
			| Title and subtitle
			|--------------------------------------------------
			*/}
			<View className="items-start">
				<MPText weight="semibold" className="">
					{title}
				</MPText>
				<MPText style={{ fontSize: 10 }} weight="regular" className="text-[#767676]">
					{subtitle}
				</MPText>
			</View>

			{/**
			|--------------------------------------------------
			| Toggle
			|--------------------------------------------------
			*/}
			<MPButton
				onPress={() => {
					onChange?.();
				}}
				style={{ width: 44, height: 24 }}
				useGradientBg={checked === true}
				customClassName={{ justifyContent: 'flex-start', borderRadius: 99999, width: 40 }}
				className={clsx(
					'w-[44px] h-[24px] rounded-full justify-center px-1',
					checked === true ? '' : 'bg-[#F5F5F5]'
				)}
			>
				<Animated.View
					style={{
						transform: [{ translateX }],
					}}
					className={clsx('bg-white size-5 rounded-full')}
				/>
			</MPButton>
		</View>
	);
}
