import React from 'react';
import { Button } from 'src/app/components/optimized';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSendgridSetup } from './_comp/getSendgridSetup';
import SetupLogo from '../_comp/SetupLogo';
import { LinkIcon } from 'src/app/utils/icons';

interface Props {
	platform: string;
}

const SendgridSetup: React.FC<Props> = ({ platform }) => {
	const [_, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const { mega_title, settings } = getSendgridSetup(platform);

	if (!platform) {
		return null;
	}

	const { settings_title, sendgrid_intro, privacy_notice, agreement_terms } = settings;

	return (
		<section className='p-5 w-[90%] lg:w-[60%] mx-auto flex flex-col gap-4'>
			<div className='global-cards'>
				<h2 className='title text-center text-base'>{mega_title}</h2>
				<div className='w-2/4 m-auto'>
					<SetupLogo iconPath='social/sendgrid.svg' />
				</div>
			</div>

			<div className='global-cards p-0 overflow-hidden'>
				<h2 className='title text-base pb-3 p-5'>{settings_title}</h2>
				{sendgrid_intro.map((item, index) => (
					<>
						<div
							className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-5'
							key={item.title}
						>
							<h3 className='text-title text-sm'>{item.title}</h3>
							<p className='text-sm cursor-pointer text-primary'>{item.linkText}</p>
						</div>
						{index !== sendgrid_intro.length - 1 && <hr />}
					</>
				))}

				<div className='bg-constrained border-t py-2 px-5'>
					<span className='text-title text-sm'>{privacy_notice.text}</span>
					<span className='cursor-pointer text-primary text-sm'>
						{privacy_notice.linkText}
						<LinkIcon className='fill-primary inline p-0.5' />
					</span>
				</div>
			</div>

			<div className='flex flex-col md:flex-row md:justify-end my-5 gap-3'>
				<Button variant='secondary' onClick={() => navigate('/apps/tiktok')}>
					{t('Discard')}
				</Button>
				<Button onClick={() => setSearchParams({ add_channel: 'true' })}>
					{t('Add Sales Channel')}
				</Button>
			</div>

			<div className=' text-center'>
				<p className='text-sm text-subtitle'>
					{agreement_terms.text}
					<span className='cursor-pointer text-primary'>
						{agreement_terms.linkText}
						<LinkIcon className='fill-primary inline p-0.5' />
					</span>
				</p>
			</div>
		</section>
	);
};

export default SendgridSetup;
