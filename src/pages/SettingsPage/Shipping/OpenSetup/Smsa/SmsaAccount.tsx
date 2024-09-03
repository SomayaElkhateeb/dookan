import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import { BsPeople } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
export default function SmsaAccount() {
	const { t } = useTranslation();
	return (
		<div className='cardDetails-sharedClass p-5 w-full lg:w-3/4'>
			<img src={getImageUrl('companies/express.svg')} />
			<p className='text-title text-sm pt-1.5 pb-3 w-[65%]'>
				{t("Make sure you have SMSA account if you have an account you can proceed,if you don't,")}
				<span className='btn-lin p-0'> {t('Create an account')} </span>
				{t('and proceed')}
			</p>

			<h3 className='text-title font-semibold'>{t('What you need')}</h3>
			<div className='flex flex-col gap-5 lg:flex-row lg:gap-[6rem] py-3'>
				<Choose
					ChooseOne={t('National ID')}
					ChooseTwo={t('Residency identification')}
					icon={<BsPeople color='white' size={18} />}
					title={t('For Individuals')}
				/>
				<Choose
					ChooseOne={t('Tax ID')}
					ChooseTwo={t('Commercial Registration')}
					icon={<HiOutlineBuildingOffice2 color='white' size={18} />}
					title={t('For businesses')}
				/>
			</div>
			<div className='flex justify-end w-full'>
				<Button variant='primary'>{t('i have an account')}</Button>
			</div>
		</div>
	);
}

function Choose({
	ChooseOne,
	ChooseTwo,
	icon,
	title,
}: {
	ChooseOne: string;
	ChooseTwo: string;
	icon: React.ReactNode;
	title: string;
}) {
	const { t } = useTranslation();
	return (
		<div className='text-title text-sm'>
			<div className='bg-primary rounded-full size-[36px] flex items-center justify-center'>
				{icon}
			</div>
			<h4 className='font-semibold py-1'>{title}</h4>
			<p>{t('You should provide them:')}</p>
			<p>- {ChooseOne}</p>
			<p>- {ChooseTwo}</p>
		</div>
	);
}
