import { useTranslation } from 'react-i18next';
import {
	Accordion,
	HeaderSettings,
	LabelIcon,
	SubHeader,
	Button,
} from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MoreIcon } from 'src/app/utils/icons';
import MenuOptions from 'src/app/components/optimized/Menu/MenuOptions';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { contact, pricing } from 'src/pages/SettingsPage/_comp/data';
import { useNavigate } from 'react-router-dom';
import ContactCard from 'src/app/components/optimized/Cards/ContactCard';
import { nanoid } from 'nanoid';

export default function Smsa() {
	const { t } = useTranslation();
	const [install, setInstall] = useState(false);
	const navigate = useNavigate();

	// Determine the status based on the install state
	const status = install ? 'installed' : 'free';

	let backgroundColor: string, textColor: string;

	switch (status) {
		case 'free':
			backgroundColor = '#EEF9F5';
			textColor = '#49A882';
			break;
		case 'installed':
			backgroundColor = '#F3F7FF';
			textColor = '#0B47D9';
			break;
		default:
			backgroundColor = 'gray';
			textColor = 'white';
			break;
	}


	const smsa = [
		{
			id: nanoid(),
			title: t('Grow your reach'),
			description: t(
				'Advertise and sell your products directly through your Facebook page and reach billions of potential customers.',
			),
		},
		{
			id: nanoid(),
			title: t('Increase your revenue'),
			description: t(
				'Merchants see an average increase of 15% in revenue when selling on Facebook.',
			),
		},
		{
			id: nanoid(),
			title: t('Easy checkout'),
			description: t(
				'With Facebook Shop, your customers will be able to easily browse products on mobile and checkout on any device.',
			),
		},
	];

	return (
		<div className='flex-col-global '>
			{install ? (
				<HeaderSettings
					title={t('SMSA')}
					variant='settingBtnAndIcon'
					btn1={{
						text: t('open setup'),
						onClick: () => {
							navigate('openSetup');
						},
					}}
					icon={
						<MenuOptions
							btn={<MoreIcon className='fill-subtitle' />}
							options={[
								{
									id: 1,
									text: t('Delete'),
									icon: <RiDeleteBin5Line color='pri-dark' />,
									click: console.log('uninstall')
								},
							]}
						/>
					}
				/>
			) : (
				<SubHeader title={t('SMSA')}>
					<Button variant='primary' onClick={() => setInstall(true)}>
						{t('Install Now')}
					</Button>
				</SubHeader>
			)}
			<div className='custom-grid-parent custom_container'>
				<div className='flex-col-global grid-left'>
					<section className='cardDetails-sharedClass p-5'>
						<div className='flex gap-3 pb-2'>
							<img src={getImageUrl('companies/express.svg')} className='w-44' />
							<div>
								<h2 className=' title text-[16px]'>{t('SMSA')}</h2>
								<p className='text-title text-xs capitalize pt-1.5 pb-3'>
									{t('Saudi Arabia')} <span className='text-primary'>(120 Cities)</span>
								</p>

								<div className='w-fit'>
									<LabelIcon
										text={install ? status : 'free'}
										backgroundColor={backgroundColor}
										textColor={textColor}
										icon={status === 'installed' ? <FaCheck size={10} color='#0B47D9' /> : null}
									/>
								</div>
							</div>
						</div>
						<p className='bg-secondary rounded text-sm text-white px-2 py-1 w-fit'>
							% {t('Discounted rates')}
						</p>
						<div className='pt-5 flex flex-col gap-5 w-[60%]'>
							{smsa.map((item) => (
								<div key={item.id}>
									<h3 className='title'>{item.title}</h3>
									<p className='text-sm text-title'>{item.description}</p>
								</div>
							))}
						</div>
					</section>
					{/* FAQs */}
					<section className='cardDetails-sharedClass p-5'>
						<h3>{t('FAQs')}</h3>
						<div className='flex flex-col gap-4 pt-5'>
							<Accordion title='Do they deliver in 1 day?' subtitle='Do they deliver in 1 day?' />
							<Accordion
								title='Do they charge for monthly plans'
								subtitle='Yes we do that exactly'
							/>
						</div>
					</section>
				</div>

				<div className='grid-right flex flex-col gap-5'>
					<ContactCard title={t('Pricing')} data={pricing} contacts={false} />
					<ContactCard title={t('Contact')} data={contact} contacts={true} />
				</div>
			</div>
		</div>
	);
}
