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

type VerificationData = {
	email?: string;
	sessionId?: string;
	phoneNumber?: string;
	verificationType?: string;
	currentStep?: 'phone' | 'email' | 'create account' | 'bvn' | 'veriff';
};

/**
|--------------------------------------------------
| User interface
|--------------------------------------------------
*/
interface UserState {
	name: string;
	isLoggedIn: boolean;
	isRegistered: boolean;
	verificationData: VerificationData | undefined;

	/**
	|--------------------------------------------------
	| Setters
	|--------------------------------------------------
	*/
	setName: (name: string) => void;
	setIsLoggedIn: (status: boolean) => void;
	setIsRegistered: (value: boolean) => void;
	setVerificationData: (data: Partial<VerificationData>) => void;
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
			isRegistered: false,
			verificationData: undefined,

			/**
			|--------------------------------------------------
			| Setters
			|--------------------------------------------------
			*/
			setName: (name) => set({ name }),
			setIsLoggedIn: (status) => set({ isLoggedIn: status }),
			setIsRegistered: (value) => set({ isRegistered: value }),
			setVerificationData: (data) =>
				set((state) => {
					/**
					|--------------------------------------------------
					| If current step
					|--------------------------------------------------
					*/
					if (data?.currentStep && state.verificationData)
						state.verificationData.currentStep = data.currentStep;

					/**
					|--------------------------------------------------
					| Verification type
					|--------------------------------------------------
					*/
					if (data.verificationType && state.verificationData)
						state.verificationData.verificationType = data.verificationType;

					/**
					|--------------------------------------------------
					| Phone number
					|--------------------------------------------------
					*/
					if (data.phoneNumber && state.verificationData)
						state.verificationData.phoneNumber = data.phoneNumber;
					/**
					|--------------------------------------------------
					| Email
					|--------------------------------------------------
					*/
					if (data.email && state.verificationData) state.verificationData.email = data.email;

					/**
					|--------------------------------------------------
					| Session id
					|--------------------------------------------------
					*/
					if (data.sessionId && state.verificationData) state.verificationData.sessionId = data.sessionId;

					return state;
				}),
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
