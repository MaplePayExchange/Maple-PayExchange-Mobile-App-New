/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import MPButton from '@/src/components/MPButton';
import MPText from '@/src/components/MPText';
import ScreenWrapper from '@/src/components/Wrapper';
import { useUserStore } from '@/zustand/userStore';
import React from 'react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

export default function DashboardScreen() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<ScreenWrapper>
			<MPButton onPress={() => useUserStore.setState({ isLoggedIn: false })}>
				<MPText>Log out</MPText>
			</MPButton>
		</ScreenWrapper>
	);
}
