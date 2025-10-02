/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/

import React from 'react';
import { useUserStore } from '@/zustand/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus, TouchableWithoutFeedback } from 'react-native';

/**
|--------------------------------------------------
| 1 minute in ms
|--------------------------------------------------
*/
const INACTIVITY_LIMIT = 120 * 1000;

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
        | Listen for app state changes (background /
        | foreground)
        |--------------------------------------------------
        */
		const subscription = AppState.addEventListener('change', async (nextAppState) => {
			if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
				/**
                |--------------------------------------------------
                | App going to background → store timestamp
                |--------------------------------------------------
                */
				await AsyncStorage.setItem('lastBackgroundTime', Date.now().toString());
			}

			/**
            |--------------------------------------------------
            | If the user is inactive or in the background
            |--------------------------------------------------
            */
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				/**
                |--------------------------------------------------
                | App coming back → check time difference
                |--------------------------------------------------
                */
				const lastTime = await AsyncStorage.getItem('lastBackgroundTime');
				if (lastTime) {
					const elapsed = Date.now() - parseInt(lastTime, 10);
					if (elapsed > INACTIVITY_LIMIT) {
						/**
                        |--------------------------------------------------
                        | Logout after idle for 1 minute
                        |--------------------------------------------------
                        */
						useUserStore.getState().setIsLoggedIn(false);
					}
				}
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
