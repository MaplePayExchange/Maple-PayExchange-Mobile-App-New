/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import MPText from '@src/components/MPText';
import HomeNavigation from './HomeNavigation';
import SupportNavigation from './SupportNavigation';
import ProfileNavigation from './ProfileNavigation';
import { ROUTE_NAMES } from '@constants/routes.conts';
import TransactionNavigation from './TransactionNavigation';
import AppStateManager from '@src/hooks/useAppStateManager';
import { HomeIcon, SettingsIcon, SupportIcon, TransactionIcon } from '@assets/svgs';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const Tab = createBottomTabNavigator();

/**
|--------------------------------------------------
| Tab label component
|--------------------------------------------------
*/
const TabLabel = ({ children, focused }: { children: string; focused: boolean }) => {
	/**
	|--------------------------------------------------
	| Rendered view
	|--------------------------------------------------
	*/
	return (
		<View className="min-h-[20px] w-max items-center justify-center">
			<MPText
				weight="semibold"
				fontSize="FONT11"
				className={clsx('', focused ? 'text-[#FF6A00]' : 'text-[#A3A3A3]')}
			>
				{children}
			</MPText>

			{/**
			|--------------------------------------------------
			| ...
			|--------------------------------------------------
			*/}
			{focused && (
				<View className="absolute bottom-[-10px]">
					<Svg width="40" height="4" viewBox="0 0 40 4" fill="none">
						<Path
							d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4H0Z"
							fill="url(#paint0_linear_2752_8894)"
						/>
						<Defs>
							<LinearGradient
								id="paint0_linear_2752_8894"
								x1="0"
								y1="2"
								x2="40"
								y2="2"
								gradientUnits="userSpaceOnUse"
							>
								<Stop stopColor="#EE0979" />
								<Stop offset="1" stopColor="#FF6A00" />
							</LinearGradient>
						</Defs>
					</Svg>
				</View>
			)}
		</View>
	);
};

/**
|--------------------------------------------------
| Icon config
|--------------------------------------------------
*/
const iconConfig = (focused: boolean) => {
	return focused ? undefined : { stopColor: '#484848', offsetColor: '#484848', fillColor: '#484848' };
};

/**
|--------------------------------------------------
| Custom Tab Bar
|--------------------------------------------------
*/
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps & { insets?: any }) {
	/**
	|--------------------------------------------------
	| ...
	|--------------------------------------------------
	*/
	const insets = useSafeAreaInsets();
	const unfocusedTint = '#484848';
	const focusedTintColor = '#FF6A00';

	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<View className={clsx('bg-white/20 pt-3', Platform.OS === 'android' ? 'pb-6' : '')}>
			<View
				style={{
					top: 32,
					height: 24,
					width: '88%',
					paddingTop: 4,
					alignSelf: 'center',
					position: 'absolute',
					flexDirection: 'row',
					paddingHorizontal: 12,
					backgroundColor: 'white',
					shadowColor: '#0000000',
				}}
				className="shadow-[0px_0px_12px_0px_#0000000D]"
			/>
			<View
				style={{
					height: 64,
					width: '95%',
					paddingTop: 2,
					zIndex: 99999,
					borderWidth: 0,
					borderRadius: 9999,
					alignSelf: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					paddingHorizontal: 12,
					backgroundColor: 'white',
					borderColor: '#D1D1D1',
					justifyContent: 'center',
					shadowColor: '#0000000',
					marginBottom: insets.bottom - 6,
				}}
			>
				{state.routes.map((route: any, index: any) => {
					const isFocused = state.index === index;
					const { options } = descriptors[route.key];

					/**
					|--------------------------------------------------
					| Attempt to get label text from options in order
					| of preference
					|--------------------------------------------------
					*/
					const label =
						typeof options.tabBarLabel === 'string' ? options.tabBarLabel : (options.title ?? route.name);

					/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/
					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});
						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/
					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					/**
					|--------------------------------------------------
					| Render icon if provided in options.tabBarIcon
					|--------------------------------------------------
					*/
					let IconComponent: React.ReactNode = null;
					if (typeof options.tabBarIcon === 'function') {
						IconComponent = options.tabBarIcon({
							focused: isFocused,
							color: isFocused ? focusedTintColor : unfocusedTint,
						});
					}

					/**
					|--------------------------------------------------
					| ...
					|--------------------------------------------------
					*/
					return (
						<TouchableOpacity
							key={route.key}
							onPress={onPress}
							activeOpacity={0.8}
							onLongPress={onLongPress}
							style={{
								flex: 1,
								paddingVertical: 8,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							accessibilityRole="button"
							testID={options.tabBarTestID}
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
						>
							{/**
							|--------------------------------------------------
							| Icon
							|--------------------------------------------------
							*/}
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>{IconComponent}</View>

							{/**
							|--------------------------------------------------
							| Label
							|--------------------------------------------------
							*/}
							<TabLabel focused={isFocused}>
								{typeof options.tabBarLabel === 'function'
									? // @ts-ignore: some descriptors may provide function children
										(options.tabBarLabel as any)({ focused: isFocused })
									: (label as string)}
							</TabLabel>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

/**
|--------------------------------------------------
| Tab Navigation (uses CustomTabBar)
|--------------------------------------------------
*/
export default function TabNavigation() {
	const insets = useSafeAreaInsets();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<AppStateManager>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
				}}
				tabBar={(props: any) => <CustomTabBar {...props} insets={insets} />}
			>
				{/**
				|--------------------------------------------------
				| Home
				|--------------------------------------------------
				*/}
				<Tab.Screen
					component={HomeNavigation}
					name={ROUTE_NAMES.DASHBOARD}
					options={{
						tabBarIcon: ({ focused }: { focused: boolean }) => <HomeIcon color={iconConfig(focused)} />,
						tabBarLabel: 'Home',
					}}
				/>

				{/**
				|--------------------------------------------------
				| Transaction
				|--------------------------------------------------
				*/}
				<Tab.Screen
					name={ROUTE_NAMES.TRANSACTION}
					component={TransactionNavigation}
					options={{
						tabBarIcon: ({ focused }: { focused: boolean }) => (
							<TransactionIcon color={iconConfig(focused)} />
						),
						tabBarLabel: 'Transaction',
					}}
				/>

				{/**
				|--------------------------------------------------
				| Support
				|--------------------------------------------------
				*/}
				<Tab.Screen
					name={ROUTE_NAMES.SUPPORT}
					component={SupportNavigation}
					options={{
						tabBarIcon: ({ focused }: { focused: boolean }) => <SupportIcon color={iconConfig(focused)} />,
						tabBarLabel: 'Support',
					}}
				/>

				{/**
				|--------------------------------------------------
				| Profile
				|--------------------------------------------------
				*/}
				<Tab.Screen
					name={ROUTE_NAMES.PROFILE}
					component={ProfileNavigation}
					options={{
						tabBarIcon: ({ focused }: { focused: boolean }) => <SettingsIcon color={iconConfig(focused)} />,
						tabBarLabel: 'Profile',
					}}
				/>
			</Tab.Navigator>
		</AppStateManager>
	);
}
