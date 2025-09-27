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

interface NotificationsSettings {
	rateAlerts: boolean;
	loginAlerts: boolean;
	promotionAlerts: boolean;
	transactionAlerts: boolean;
	inAppNotifications: boolean;
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
	notificationSettings: NotificationsSettings;
	verificationData: VerificationData | undefined;

	/**
	|--------------------------------------------------
	| Setters
	|--------------------------------------------------
	*/
	setName: (name: string) => void;
	setIsLoggedIn: (status: boolean) => void;
	setIsRegistered: (value: boolean) => void;
	setSelectedWallet: (wallet: Wallet) => void;
	setBiometricsModal: (value: boolean) => void;
	setUserData: (data: LoginResponse | undefined) => void;
	setBiometricsInfo: (data: BiometricsData | null) => void;
	setVerificationData: (data: Partial<VerificationData>) => void;
	setNotificationSettings: (data: Partial<NotificationsSettings>) => void;
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
			notificationSettings: {
				rateAlerts: false,
				loginAlerts: false,
				promotionAlerts: false,
				transactionAlerts: false,
				inAppNotifications: false,
			},

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

			/**
			|--------------------------------------------------
			| Verification data
			|--------------------------------------------------
			*/
			setVerificationData: (data) =>
				set((state) => ({
					...state,
					verificationData: state.verificationData
						? {
								...state.verificationData,
								...(data.email !== undefined && { email: data.email }),
								...(data.sessionId !== undefined && { sessionId: data.sessionId }),
								...(data.currentStep !== undefined && { currentStep: data.currentStep }),
								...(data.phoneNumber !== undefined && { phoneNumber: data.phoneNumber }),
								...(data.verificationType !== undefined && { verificationType: data.verificationType }),
							}
						: state.verificationData,
				})),

			/**
			|--------------------------------------------------
			| User data
			|--------------------------------------------------
			*/
			setUserData: (data) => set({ userData: data }),

			/**
			|--------------------------------------------------
			| Notification settings
			|--------------------------------------------------
			*/
			setNotificationSettings: (data) =>
				set((state) => ({
					...state,
					notificationSettings: {
						...state.notificationSettings,
						...(data.rateAlerts !== undefined && { rateAlerts: data.rateAlerts }),
						...(data.loginAlerts !== undefined && { loginAlerts: data.loginAlerts }),
						...(data.promotionAlerts !== undefined && { promotionAlerts: data.promotionAlerts }),
						...(data.transactionAlerts !== undefined && { transactionAlerts: data.transactionAlerts }),
						...(data.inAppNotifications !== undefined && { inAppNotifications: data.inAppNotifications }),
					},
				})),
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
