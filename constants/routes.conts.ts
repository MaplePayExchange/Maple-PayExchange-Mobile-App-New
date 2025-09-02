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
	SET_TRANSACTION_PIN = 'SetTransactionPinScreen',
	SEND_FUNDS_FEEDBACK = 'SendFundsFeedbackScreen',
	SEND_FUNDS_BENEFICIARY = 'SendFundsBeneficiaryScreen',
	SEND_FUNDS_ERROR_FEEDBACK = 'SendFundsErrorFeedbackScreen',
}
