/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
				style={{ fontSize: 12 }}
				className={clsx('text-[15px]', focused ? 'text-[#FF6A00]' : 'text-[#A3A3A3]')}
			>
				{children}
			</MPText>
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
					tabBarStyle: {
						height: 64,
						width: '95%',
						paddingTop: 2,
						zIndex: 99999,
						borderWidth: 0.2,
						paddingInline: 12,
						borderRadius: 9999,
						alignSelf: 'center',
						alignItems: 'center',
						backgroundColor: 'white',
						borderColor: '#D1D1D1',
						justifyContent: 'center',
						shadowColor: '#ffffff',
						marginBottom: insets.bottom,
					},
				}}
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
						tabBarIcon: ({ focused }) => <HomeIcon color={iconConfig(focused)} />,
						tabBarLabel: ({ children, color, focused }) => (
							<TabLabel children={children} focused={focused} />
						),
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
						tabBarIcon: ({ focused }) => <TransactionIcon color={iconConfig(focused)} />,
						tabBarLabel: ({ children, color, focused }) => (
							<TabLabel children={children} focused={focused} />
						),
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
						tabBarIcon: ({ focused }) => <SupportIcon color={iconConfig(focused)} />,
						tabBarLabel: ({ children, color, focused }) => (
							<TabLabel children={children} focused={focused} />
						),
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
						tabBarIcon: ({ focused }) => <SettingsIcon color={iconConfig(focused)} />,
						tabBarLabel: ({ children, color, focused }) => (
							<TabLabel children={children} focused={focused} />
						),
					}}
				/>
			</Tab.Navigator>
		</AppStateManager>
	);
}
