/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/

import React from 'react';
import { useUserStore } from '@zustand/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus, TouchableWithoutFeedback } from 'react-native';

/**
|--------------------------------------------------
| 1 minute in ms
|--------------------------------------------------
*/
const INACTIVITY_LIMIT = 300 * 1000;

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const inactivityTimer = React.useRef<NodeJS.Timeout | null>(null);
	const appState = React.useRef<AppStateStatus>(AppState.currentState);

	/**
    |--------------------------------------------------
    | ...
    |--------------------------------------------------
    */
	React.useEffect(() => {
		/**
        |--------------------------------------------------
        |
        |--------------------------------------------------
        */
		const checkInactivity = async () => {
			const lastTime = await AsyncStorage?.getItem('lastBackgroundTime');
			if (lastTime) {
				const elapsed = Date.now() - parseInt(lastTime, 10);
				if (elapsed > INACTIVITY_LIMIT) {
					useUserStore.getState().setAutoLogout('auto');
					useUserStore.getState().setIsLoggedIn(false);
				}
			}
		};

		/**
        |--------------------------------------------------
        | Check on mount (cold start)
        |--------------------------------------------------
        */
		checkInactivity();

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		const subscription = AppState?.addEventListener('change', async (nextAppState) => {
			if (appState.current?.match(/active/) && nextAppState?.match(/inactive|background/)) {
				await AsyncStorage?.setItem('lastBackgroundTime', Date.now().toString());
			}

			if (appState.current?.match(/inactive|background/) && nextAppState === 'active') {
				await checkInactivity();
			}

			appState.current = nextAppState;
		});

		/**
        |--------------------------------------------------
        | Clean up
        |--------------------------------------------------
        */
		return () => {
			subscription.remove();
			if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
		};
	}, []);

	/**
    |--------------------------------------------------
    | Rendered Wrapper
    |--------------------------------------------------
    */
	return <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>;
}
