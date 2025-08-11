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
