import { useTranslation } from 'react-i18next';

export default function Bills() {
	const { t } = useTranslation();
	return (
		<section className='global-cards gap-3'>
			<div>
				<h2 className='title'>{t('Bills')}</h2>
				<p className='text-subtitle text-sm pt-1'>{t('Next bill will be issued in')}: 7 Oct 2022</p>
			</div>

			<RowBills paid={true} />
			<hr />
			<RowBills paid={false} />
		</section>
	);
}

function RowBills({ paid }: { paid: boolean }) {
	const { t } = useTranslation();
	return (
		<div className='flex-row-global-items-start flexResponsive'>
			<div className='flex-col-global gap-1'>
				<div className='flex-row-global gap-2'>
					<h2 className='title text-sm'>{t('Monthly bill issued')}</h2>
					<span
						className={`text-white ${
							paid ? 'bg-secondary' : 'bg-error'
						}  rounded text-xs py-1 px-2`}
					>
						{paid ? t('Paid') : t('Cancelled')}
					</span>
				</div>
				<p className='subtitle text-sm text-sm'>7 Oct 2022</p>
			</div>
			<p className='subtitle text-sm'>#965646545</p>
		</div>
	);
}
