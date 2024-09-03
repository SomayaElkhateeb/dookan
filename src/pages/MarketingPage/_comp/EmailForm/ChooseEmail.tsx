import { useState } from 'react';
import SubscriptionOptions from './_comp/SubscriptionOptions';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/app/utils';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';

const ChooseEmail = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState<string>('50000');

	const subscriptionOptions = [
		{ value: '20000', label: '20,000 emails/month', price: 'SAR 50' },
		{ value: '50000', label: '50,000 emails/month', price: 'SAR 50' },
	];

	const cardsData = [
		{ id: 1, text: 'Project', image: 'images/mailTwo.png', path: '' },
		{ id: 2, text: 'Surprise', image: 'images/mailOne.png', path: '' },
	];

	const handleOptionChange = (value: string) => {
		setSelectedOption(value);
	};

	return (
		<>
			<SubHeader title={t('Choose email template')} />
			<section className='p-5 flex flex-col gap-4'>
				<div>
					<SubscriptionOptions
						click={() => navigate('/subscribeEmail')}
						currentEmails={1000}
						options={subscriptionOptions}
						selectedOption={selectedOption}
						onOptionChange={handleOptionChange}
						buttonText={t('Subscribe To Package')}
					/>
				</div>

				<div className='flex gap-4'>
					{cardsData.map((item) => {
						return <Card key={item.id} {...item} />;
					})}
				</div>
			</section>
		</>
	);
};

export default ChooseEmail;

const Card = ({ image, text, path }: { image: React.ReactNode; text: string; path: string }) => {
	return (
		<Link to={path}>
			<div className='shadow-md bg-white rounded-md p-5 cursor-pointer'>
				<img src={getImageUrl(image)} alt={text} />
				<p className='title text-sm'>{text}</p>
			</div>
		</Link>
	);
};
