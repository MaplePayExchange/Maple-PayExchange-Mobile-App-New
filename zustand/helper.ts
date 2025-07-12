/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import AsyncStorage from '@react-native-async-storage/async-storage';

export const zustand_helper = {
	storage: {
		/**
        |--------------------------------------------------
        | Gets the item
        |--------------------------------------------------
        */
		getItem: async <TData>(name: string) => {
			const value = await AsyncStorage.getItem(name);
			return JSON.parse(value as any) as TData;
		},

		/**
        |--------------------------------------------------
        | Sets the item
        |--------------------------------------------------
        */
		setItem: async <T>(name: string, value: T | string) => {
			await AsyncStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
		},

		/**
        |--------------------------------------------------
        | Removes the item
        |--------------------------------------------------
        */
		removeItem: async (name: string) => {
			await AsyncStorage.removeItem(name);
		},
	},
};
