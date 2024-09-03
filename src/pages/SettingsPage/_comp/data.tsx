import { nanoid } from 'nanoid';
import { getImageUrl } from 'src/app/utils';
import { FiPhoneCall } from 'react-icons/fi';
import { TfiEmail, TfiWorld } from 'react-icons/tfi';
import { PaymentProvider } from '../PaymentSettings/PaymentProviders/PaymentTable/utils';

const images = [
	{ id: 1, ImageURL: getImageUrl('companies/express.svg') },
	{ id: 2, ImageURL: getImageUrl('companies/aramexred.svg') },
	{ id: 3, ImageURL: getImageUrl('companies/fastlo.svg') },
	{ id: 4, ImageURL: getImageUrl('companies/aymakan.svg') },
	{ id: 5, ImageURL: getImageUrl('companies/redbox.svg') },
	{ id: 6, ImageURL: getImageUrl('companies/dhlred.svg') },
];

const pricing = [
	{ id: nanoid(), name: 'Setup fees', value: 200 },
	{ id: nanoid(), name: 'first 15 KG', value: 15 },
	{ id: nanoid(), name: '1 KG after 15 KG', value: 20 },
];

const contact = [
	{ id: nanoid(), contact: 'Smsa.com/help-center', icon: <TfiWorld color='#8791A8' size={15} /> },
	{ id: nanoid(), contact: 'web@Smsa.com.sa', icon: <TfiEmail color='#8791A8' size={15} /> },
	{ id: nanoid(), contact: 966502456733, icon: <FiPhoneCall color='#8791A8' size={15} /> },
];

const paymentProvidersData: PaymentProvider[] = [
	{
		provider: { name: 'payTabs', url: '/payTabs' },
		monthlyFees: { planOne: '', planTwo: '' },
		setupFees: { planOne: 938, planTwo: '' },
		creditTransactions: {
			paymentCards: ['visa', 'amex', 'masterCard'],
			local: {
				flatFee: 1,
				percentageFee: 2.7,
			},
			global: {
				flatFee: 1,
				percentageFee: 2.7,
			},
		},
		methodsTransactions: [
			{
				method: 'mada',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'stcPay',
				fee: {
					flatFee: 1,
					percentageFee: 1.7,
				},
			},
			{
				method: 'apple',
				fee: {
					flatFee: '',
					percentageFee: 1.7,
				},
			},
			{
				method: 'knet',
				fee: {
					flatFee: 1,
					percentageFee: '',
				},
			},
			{
				method: 'amex',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'visa',
				fee: {
					flatFee: 1,
					percentageFee: 1.45,
				},
			},
			{ method: 'masterCard', fee: 2.1 },
		],
		banks: ['Riyadh', 'Al Ahly', 'Al-Rajhi', 'Al Enmaa', 'El Belad', 'SAB', 'ANB', 'QNB'],
	},
	{
		provider: { name: 'moyasar', url: '/moyasar' },
		monthlyFees: { planOne: 200, planTwo: '' },
		setupFees: { planOne: 1000, planTwo: '' },
		creditTransactions: {
			paymentCards: ['visa', 'amex', 'masterCard'],
			local: {
				flatFee: 1,
				percentageFee: 2.7,
			},
			global: {
				flatFee: 1,
				percentageFee: 2.7,
			},
		},
		methodsTransactions: [
			{
				method: 'mada',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'stcPay',
				fee: {
					flatFee: 1,
					percentageFee: 1.7,
				},
			},
			{
				method: 'apple',
				fee: {
					flatFee: '',
					percentageFee: 1.7,
				},
			},
			{
				method: 'knet',
				fee: {
					flatFee: 1,
					percentageFee: '',
				},
			},
			{
				method: 'amex',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'visa',
				fee: {
					flatFee: 1,
					percentageFee: 1.45,
				},
			},
			{ method: 'masterCard', fee: 2.1 },
		],
		banks: ['Riyadh', 'Al Ahly', 'Al-Rajhi', 'Al Enmaa', 'El Belad', 'SAB', 'ANB', 'QNB'],
	},
	{
		provider: { name: 'hyperPay', url: '/hyperPay' },
		monthlyFees: { planOne: '', planTwo: 500 },
		setupFees: { planOne: '', planTwo: 5000 },
		creditTransactions: {
			paymentCards: ['visa', 'amex', 'masterCard'],
			local: {
				flatFee: 1,
				percentageFee: 2.7,
			},
			global: {
				flatFee: 1,
				percentageFee: 2.7,
			},
		},
		methodsTransactions: [
			{
				method: 'mada',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'stcPay',
				fee: {
					flatFee: 1,
					percentageFee: 1.7,
				},
			},
			{
				method: 'apple',
				fee: {
					flatFee: '',
					percentageFee: 1.7,
				},
			},
			{
				method: 'knet',
				fee: {
					flatFee: 1,
					percentageFee: '',
				},
			},
			{
				method: 'amex',
				fee: {
					flatFee: '',
					percentageFee: '',
				},
			},
			{
				method: 'visa',
				fee: {
					flatFee: 1,
					percentageFee: 1.45,
				},
			},
			{ method: 'masterCard', fee: 2.1 },
		],
		banks: ['Riyadh', 'Al Ahly', 'Al-Rajhi', 'Al Enmaa', 'El Belad', 'SAB', 'ANB', 'QNB'],
	},
];
export { images, pricing, contact, paymentProvidersData };
