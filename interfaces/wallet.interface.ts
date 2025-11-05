/**
|--------------------------------------------------
| Account information
|--------------------------------------------------
*/
export interface AccountInformation {
	bankName: string;
	reference?: string;
	accountName: string;
	accountNumber: string;
}

/**
|--------------------------------------------------
| Wallet interface
|--------------------------------------------------
*/
export interface Wallet {
	_id?: string;
	user: string;
	email: string;
	createdAt?: Date;
	currency: string;
	updatedAt?: Date;
	business?: string;
	accountType?: string;
	walletBalance: number;
	currencyType?: string;
	isPermanent?: boolean;
	isSubAccount?: boolean;
	fincraWalletId?: string;
	accountOpeningFee: number;
	virtualAccountType?: string;
	accountInformation?: AccountInformation;
	status: 'Pending' | 'Approved' | 'Declined';
}
