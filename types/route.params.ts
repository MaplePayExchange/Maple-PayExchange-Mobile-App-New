import { FAQItem } from '@/interfaces/support.interface';
import { BankAccount, FundSwapTransaction } from '@/interfaces/transaction.interface';

export type RootStackParamList = {
	Home: undefined;
	SplashScreen: undefined;
	DashboardScreen: undefined;
	VerifyBvnScreen: undefined;
	SendCADScreen?: BankAccount;
	SendNGNScreen?: BankAccount;
	OnboardingScreen: undefined;
	CreateUserScreen: undefined;
	VerifyEmailScreen: undefined;
	VerifyPhoneScreen: undefined;
	TransactionScreen: undefined;
	SendFundsBeneficiaryScreen: {
		currency: 'CAD' | 'NGN';
	};
	TransactionsScreen: undefined;
	NotificationScreen?: undefined;
	LoginScreen: { email?: string };
	ForgotPasswordScreen: undefined;
	BVNVerificationScreen: undefined;
	KycStepsScreen: { email?: string };
	VerifyPhoneNumberScreen: undefined;
	EmailVerificationScreen: undefined;
	PhoneVerificationScreen: undefined;
	SetTransactionPinScreen: undefined;
	SendFundsFeedbackScreen: undefined;
	ResetPasswordScreen: { email: string };
	TailorYourExperienceScreen: undefined;
	ExchangeFundsFeedbackScreen?: FundSwapTransaction;
	AmountScreen: {
		lastName?: string;
		firstName?: string;
		accountName?: string;
		interacEmail?: string;
		accountNumber?: string;
		securityAnswer?: string;
		currency?: 'CAD' | 'NGN';
		securityQuestion?: string;
		saveAsBeneficiary?: boolean;
		narration?: string | undefined;
		bank?: { code: string; name: string };
		transactionType: 'SWAP' | 'CAD-to-CAD' | 'NGN-to-NGN';
	};
	SupportDetailsScreen: FAQItem[];
};
