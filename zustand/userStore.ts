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
import { User } from '@/interfaces/user.interface';
import { Wallet } from '@/interfaces/wallet.interface';

type VerificationData = {
	email?: string;
	sessionId?: string;
	phoneNumber?: string;
	verificationType?: string;
	currentStep?: 'phone' | 'email' | 'create account' | 'bvn' | 'veriff';
};

export interface LoginResponse {
	user: User | null;
	access_token: string | null;
	refresh_token: string | null;
	token_type: 'BEARER' | string | null;
}

interface BiometricsData {
	email?: string;
	password?: string;
	isTurnedOn?: boolean;
	remindMeLater?: boolean;
	hasPromptedUser?: boolean;
}

/**
|--------------------------------------------------
| User interface
|--------------------------------------------------
*/
interface UserState {
	name: string;
	isLoggedIn: boolean;
	isRegistered: boolean;
	showBiometricsModal: boolean;
	selectedWallet: Wallet | null;
	userData: LoginResponse | undefined;
	biometricsInfo: BiometricsData | null;
	verificationData: VerificationData | undefined;

	/**
	|--------------------------------------------------
	| Setters
	|--------------------------------------------------
	*/
	setName: (name: string) => void;
	setIsLoggedIn: (status: boolean) => void;
	setIsRegistered: (value: boolean) => void;
	setUserData: (data: LoginResponse) => void;
	setSelectedWallet: (wallet: Wallet) => void;
	setBiometricsModal: (value: boolean) => void;
	setBiometricsInfo: (data: BiometricsData | null) => void;
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
			userData: undefined,
			selectedWallet: null,
			biometricsInfo: null,
			showBiometricsModal: false,
			verificationData: undefined,

			/**
			|--------------------------------------------------
			| Setters
			|--------------------------------------------------
			*/
			setName: (name) => set({ name }),
			setIsLoggedIn: (status) => set({ isLoggedIn: status }),
			setIsRegistered: (value) => set({ isRegistered: value }),
			setBiometricsInfo: (data) => set({ biometricsInfo: data }),
			setSelectedWallet: (value) => set({ selectedWallet: value }),
			setBiometricsModal: (value) => set({ showBiometricsModal: value }),
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
			setUserData: (data) => set({ userData: data }),
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
