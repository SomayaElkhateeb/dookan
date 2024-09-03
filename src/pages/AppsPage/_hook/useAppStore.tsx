import { type ComponentType, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import data from "../_comp/data.json"

export interface AppData {
	id: number;
	url: string;
	name: string;
	status: string;
	imageUrl: string;
	description: string;
}
export interface AppsWrapperProps {
	title: string;
	socialApps: AppData[];
	warningMessage?: string;
	onButtonClick: () => void;
	ChildrenComponent: ComponentType<AppData>;
	cards?: boolean;
}

interface Option {
	name: string;
	socialApps: string[];
}

const category: Option[] = [
	{ name: 'Marketing', socialApps: ['Facebook', 'TikTok', 'Snapchat', 'Mailchimp', 'SendGrid'] },
	{ name: 'Sales', socialApps: ['WhatsApp', 'Telegram', 'Google'] },
	{ name: 'Support', socialApps: ['Twitter'] },
	{ name: 'Chat', socialApps: ['WhatsApp', 'Telegram'] },
	{ name: 'Service', socialApps: ['SMS', 'Email'] },
	{ name: 'Design', socialApps: [] },
];

const price: Option[] = [
	{
		name: 'Free',
		socialApps: ['Telegram', 'WhatsApp', 'Snapchat', 'TikTok', 'Mailchimp', 'SendGrid'],
	},
	{ name: 'Paid', socialApps: ['SMS', 'Email', 'Google', 'Twitter', 'Facebook'] },
];
export default function useAppStore() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
	const [warningMessage, setWarningMessage] = useState<string>('');
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const categoryParam = searchParams.get('apps_group');

	useEffect(() => {
		setSelectedCategories(category.map((item) => item.name));
		setSelectedPrices(price.map((item) => item.name));
	}, []);

	useEffect(() => {
		const hasCategory = selectedCategories.length > 0;
		const hasPrice = selectedPrices.length > 0;

		setWarningMessage(
			!hasCategory && !hasPrice
				? 'At least one option must be chosen from each list.'
				: !hasCategory
				? 'You must choose from the Category list.'
				: !hasPrice
				? 'You must choose from the Price list.'
				: '',
		);
	}, [selectedCategories, selectedPrices]);

	const handleClickViewAll = (category: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('apps_group', category);

		setSearchParams(newSearchParams);
		navigate({ pathname: '/apps', search: newSearchParams.toString() });
	};

	const getCommonApps = useMemo(() => {
		const categoriesApps = selectedCategories.flatMap(
			(item) => category.find((opt) => opt.name === item)?.socialApps || [],
		);
		const priceApps = selectedPrices.flatMap(
			(item) => price.find((opt) => opt.name === item)?.socialApps || [],
		);

		return [...new Set(categoriesApps.filter((app) => priceApps.includes(app)))];
	}, [selectedCategories, selectedPrices]);

	const filteredApps = data.appsStore.filter((app) => getCommonApps.includes(app.name));
	const installedApps = data.appsStore.filter((app) => app.status === 'installed');

	return {
		selectedCategories,
		selectedPrices,
		warningMessage,
		categoryParam,
		filteredApps,
		installedApps,
		handleClickViewAll,
		setSelectedCategories,
		setSelectedPrices,
	};
}
