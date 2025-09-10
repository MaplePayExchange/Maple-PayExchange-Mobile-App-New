export enum ROUTE_NAMES {
	/**
	|--------------------------------------------------
	| Auth routes
	|--------------------------------------------------
	*/
	LOGIN = 'LoginScreen',
	SPLASH = 'SplashScreen',
	KYC_STEPS = 'KycStepsScreen',
	ONBOARDING = 'OnboardingScreen',
	CREATE_USER = 'CreateUserScreen',
	VERIFY_EMAIL = 'VerifyEmailScreen',
	RESET_PASSWORD = 'ResetPasswordScreen',
	VERIFY_PHONE = 'VerifyPhoneNumberScreen',
	FORGOT_PASSWORD = 'ForgotPasswordScreen',
	BVN_VERIFICATION = 'BVNVerificationScreen',
	PHONE_VERIFICATION = 'PhoneVerificationScreen',
	EMAIL_VERIFICATION = 'EmailVerificationScreen',
	TAILOR_YOUR_EXPERIENCE = 'TailorYourExperienceScreen',

	/**
	|--------------------------------------------------
	| Protected routes
	|--------------------------------------------------
	*/
	DASHBOARD = 'Home',
	SUPPORT = 'Support',
	PROFILE = 'Profile',
	TRANSACTION = 'Transaction',
	AMOUNT_SCREEN = 'AmountScreen',
	SEND_NGN_FUNDS = 'SendNGNScreen',
	SEND_CAD_FUNDS = 'SendCADScreen',
	NOTIFICATION_SCREEN = 'NotificationScreen',
	TRANSACTIONS_SCREEN = 'TransactionsScreen',
	SET_TRANSACTION_PIN = 'SetTransactionPinScreen',
	SUPPORT_DETAILS_SCREEN = 'SupportDetailsScreen',
	SEND_FUNDS_FEEDBACK = 'SendFundsFeedbackScreen',
	SEND_FUNDS_BENEFICIARY = 'SendFundsBeneficiaryScreen',
	EXCHANGE_FUNDS_FEEDBACK = 'ExchangeFundsFeedbackScreen',
	SEND_FUNDS_ERROR_FEEDBACK = 'SendFundsErrorFeedbackScreen',
}
