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
import MPText from '@src/components/MPText';

interface Props {
	title?: string;
	checked?: boolean;
	subtitle?: string;
	useText?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: () => void;
	icon?: React.ReactNode;
}

export default function Toggler({
	icon,
	checked,
	disabled,
	onChange,
	subtitle,
	className,
	useText = true,
	title = 'Title',
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
			duration: 200,
			useNativeDriver: true,
			toValue: checked ? 20 : 0,
			easing: Easing.out(Easing.circle),
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
			{useText && (
				<View className="flex-row gap-4">
					{/**
					|--------------------------------------------------
					| If there is an icon
					|--------------------------------------------------
					*/}
					{icon && icon}
					<View className="items-start">
						<MPText weight="semibold" className="">
							{title}
						</MPText>
						{subtitle && (
							<MPText style={{ fontSize: 11 }} weight="regular" className="text-[#767676]">
								{subtitle}
							</MPText>
						)}
					</View>
				</View>
			)}

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
