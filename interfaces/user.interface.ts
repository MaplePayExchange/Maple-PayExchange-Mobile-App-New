import { TransactionLimits } from './transaction.interface';

export interface User {
	_id?: string;
	email: string;
	nextStep: 'BVN_VERIFICATION' | 'ID_VERIFICATION' | 'COMPLETED';
	firstName: string;
	lastName: string;
	birthDate?: string;
	bvn?: string;
	sessionId: string;
	isBvnVerified: boolean;
	business?: string;
	profileImage?: string;
	role: 'admin' | 'user';
	mail: {
		email: string;
		isVerified: boolean;
		emailOtp?: string;
		otpExpires?: Date;
	};
	phone?: string;
	phoneIsVerified: boolean;
	verification?: {
		property: 'BVN' | 'PHONE' | 'EMAIL';
		otp?: string;
		otpExpires?: Date;
	};

	middleName?: string;
	occupation?: string;
	usagePurpose: string;
	annualSalaryRange?: string;
	primarySourceOfFunds?: string;
	isPolliticallyExposed?: boolean;
	countryUserMostlySendsMoneyTo?: string;

	veriffSessionToken?: {
		sessionToken: string;
		sessionExpiresAt: Date;
	};

	country?: string;
	street?: string;
	city?: string;
	provinceState?: string;
	postalCode?: string;
	bankAccount?: {
		nairaAccountNumber?: string;
		bank?: string;
		interacEmail?: string;
	};
	password: string;
	identityFile?: string;
	veriffId?: string;
	veriffStatus?:
		| 'submitted'
		| 'resubmission_requested'
		| 'approved'
		| 'started'
		| 'declined'
		| 'abandoned'
		| 'expired'
		| 'review'
		| 'pending';
	isVerified: boolean;
	is2FA: boolean;
	ipAddresses: string[];
	refreshToken?: string;
	isLoggedin: boolean;
	isLockedOut: boolean;
	verificationHash?: string;
	verificationHashChangedAt?: Date;
	VerificationHashResetExpires?: Date;
	referralCode?: string;
	referralValue: number;
	isNgnWallet: boolean;
	isCadWallet: boolean;
	referrer?: string;
	Wallets?: string[];
	deviceOtp?: string;
	deviceOtpExpires?: Date;
	transactionLimits?: TransactionLimits;
	passwordChangedAt?: Date;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	passwordResetOTP?: string;
	otpExpires?: Date;
	userCategory: 'regular' | 'vip';
	transactionPin?: string | null;
	pinResetToken?: string;
	pinResetExpires?: Date;
	pinResetOTP?: string;
	referrals?: { reference: string; createdAt: Date }[];
	pushToken?: string;
	notificationSettings: {
		rateAlerts: boolean;
		loginAlerts: boolean;
		promotionAlerts: boolean;
		transactionAlerts: boolean;
		inAppNotifications: boolean;
	};
}
