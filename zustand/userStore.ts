/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { zustand_helper } from './helper';

/**
|--------------------------------------------------
| User interface
|--------------------------------------------------
*/
interface UserState {
	name: string;
	isLoggedIn: boolean;
	setName: (name: string) => void;
	setIsLoggedIn: (status: boolean) => void;
}

/**
|--------------------------------------------------
| Store
|--------------------------------------------------
*/
export const useUserStore = create<UserState>()(
	/**
    |--------------------------------------------------
    | Ensures that the data is persisted
    |--------------------------------------------------
    */
	persist(
		(set) => ({
			name: '',
			isLoggedIn: false,
			setName: (name) => set({ name }),
			setIsLoggedIn: (status) => set({ isLoggedIn: status }),
		}),

		/**
        |--------------------------------------------------
        | Configuration for the persistence
        |--------------------------------------------------
        */
		{
			name: 'user-storage',
			...zustand_helper,
		}
	)
);
