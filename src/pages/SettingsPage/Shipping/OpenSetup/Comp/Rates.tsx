import { useTranslation } from 'react-i18next';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import { AiOutlineQuestion } from 'react-icons/ai';
import General from '../Tabs/General';
import SaudiArabia from '../Tabs/SaudiArabia';
import GulfAndEgypt from '../Tabs/GulfAndEgypt';
import EuropeAndUS from '../Tabs/EuropeAndUS';

export default function Rates({ addStyle }: { addStyle: boolean }) {
	const { t } = useTranslation();

	return (
		<div className={addStyle ? 'global-cards gap-4' : ''}>
			{!addStyle && <hr className='pb-5' />}
			<h3 className='text-title font-semibold flex gap-2 items-center'>
				{t('Rates(2)')}
				<span className='bg-secondary rounded-full size-[18px] flex items-center justify-center cursor-pointer'>
					<AiOutlineQuestion size={12} color='white' />
				</span>
			</h3>

			<Tabs
				body={
					<>
						<TabPanel value={'1'}>
							<General />
						</TabPanel>
						<TabPanel value={'2'}>
							<SaudiArabia addStyle={addStyle} />
						</TabPanel>
						<TabPanel value={'3'}>
							<GulfAndEgypt addStyle={addStyle} />
						</TabPanel>
						<TabPanel value={'4'}>
							<EuropeAndUS addStyle={addStyle} />
						</TabPanel>
					</>
				}
			>
				{/*  children */}
				<Tab label={t('General')} value={'1'} />
				<Tab label={t('Saudi Arabia')} value={'2'} />
				<Tab label={t('Gulf & Egypt')} value={'3'} />
				<Tab label={t('Europe & US')} value={'4'} />
			</Tabs>
		</div>
	);
}

// ///////////////////////////////////
