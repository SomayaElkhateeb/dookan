// PaymentTableInterfaces.ts

export interface Fee {
	flatFee: number | string;
	percentageFee: number | string;
}

export interface CreditTransactions {
	paymentCards: string[];
	local: Fee;
	global: Fee;
}

export interface MethodTransaction {
	method: string;
	fee: Fee | number;
}

export interface Provider {
	name: string;
	url: string;
}

export interface PaymentProvider {
	provider: Provider;
	monthlyFees: {
		planOne: string;
		planTwo: string;
	};
	setupFees: {
		planOne: number | string;
		planTwo: number | string;
	};
	creditTransactions: CreditTransactions;
	methodsTransactions: MethodTransaction[];
	banks: string[];
}



const CURRENCY = 'SAR';

export const feeFormat = (fee: string | number): string => {
	return fee ? `${CURRENCY} ${fee}` : 'free';
};

export const transactionFormat = (fee: {
	flatFee: string | number;
	percentageFee: string | number;
}) => {
	const { flatFee, percentageFee } = fee;
	if (flatFee && percentageFee) {
		return `${percentageFee}% + ${CURRENCY} ${flatFee}`;
	} else if (flatFee && !percentageFee) {
		return `${CURRENCY} ${flatFee}`;
	} else if (!flatFee && percentageFee) {
		return `${percentageFee}%`;
	} else {
		return 'Free';
	}
};

