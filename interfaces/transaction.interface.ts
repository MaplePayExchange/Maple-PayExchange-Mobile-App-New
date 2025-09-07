export interface TransactionLimits {
	dailyLimit: Partial<Record<Currency, number>>;
	weeklyLimit: Partial<Record<Currency, number>>;
	monthlyLimit: Partial<Record<Currency, number>>;
	singleTransferLimit: Partial<Record<Currency, number>>;
}

/**
|--------------------------------------------------
| Allowed currencies
|--------------------------------------------------
*/
export const _ALLOWED_CURRENCIES = [
	'USD', // US Dollar
	'EUR', // Euro
	'JPY', // Japanese Yen
	'GBP', // British Pound Sterling
	'AUD', // Australian Dollar
	'CAD', // Canadian Dollar
	'CHF', // Swiss Franc
	'CNY', // Chinese Yuan
	'HKD', // Hong Kong Dollar
	'NZD', // New Zealand Dollar;
	'NGN', // Nigerian Naira
] as const;

export type Currency = (typeof _ALLOWED_CURRENCIES)[number];

export interface TransactionInterface {
	user?: string;
	walletId?: string;
	sourceCurrency: string;
	fincraWalletId?: string;
	destinationCurrency: string;
	type: 'FundSwap' | 'Incoming' | 'Outgoing' | 'Reward';
	status: 'successful' | 'failed' | 'pending' | 'processing';

	business?: string;
	sessionId?: string;
	interacReference?: string;

	senderBankName?: string;
	receiverBankName?: string;
	senderAccountName?: string;
	senderAccountNumber?: string;
	receiverAccountName?: string;
	receiverAccountNumber?: string;

	senderInteracEmail?: string;
	recieverInteracEmail?: string;

	fee?: number;
	amountSent?: number;
	sourceAmount?: number;
	amountReceived?: number;
	destinationAmount?: number;

	reason?: string;
	description?: string;
	customerName?: string;
	paymentScheme?: string;
	settlementDestination?: string;

	initiatedAt?: Date;
	interacTransactionDate?: Date;

	reference?: string;
	preAmount?: number;
	reversed?: boolean;
	postAmount?: number;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface InteracTransactionRequest {
	email: string;
	amount: number;
	lastName: string;
	firstName: string;
	description?: string;
	transactionPin: string;
	securityQuestion: string;
	saveBeneficiary?: boolean;
	securityQuestionAnswer: string;
	currency: (typeof _ALLOWED_CURRENCIES)[number];
}

export interface BankTransferRequest {
	bank: {
		name: string;
		code: string;
	};
	amount: number;
	accountName: string;
	accountNumber: string;
	transactionPin: string;
	saveBeneficiary?: boolean;
	currency: (typeof _ALLOWED_CURRENCIES)[number];
}

export interface BankAccount {
	_id: string;
	user: string;
	bankName?: string;
	bankCode?: string;
	nickname?: string;
	mapleEmail?: string;
	accountName?: string;
	accountNumber?: string;
	interacEmail?: string;
	type: 'Bank' | 'MapleEmail' | 'Interac';
}

export interface ExchangePayload {
	rate: number;
	amount: number;
	transactionPin: string;
	currency: (typeof _ALLOWED_CURRENCIES)[number];
	exchangeCurrency: (typeof _ALLOWED_CURRENCIES)[number];
}

export interface FundSwapTransaction {
	user: string;
	type: 'FundSwap';
	walletId: string;
	preAmount: number;
	reference: string;
	amountSent: number;
	status: 'successful';
	sourceAmount: number;
	amountRecieved: number;
	sourceCurrency: string;
	destinationAmount: number;
	destinationCurrency: string;
}

export interface INotification {
	to: string;
	title?: string;
	message: string;
	isRead?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	from?: string | null;
	metadata?: Record<string, any>;
	status?: 'pending' | 'sent' | 'failed';
	type: 'login' | 'rates' | 'reward' | 'security' | 'transaction' | 'account-creation' | 'account-verification';
}
