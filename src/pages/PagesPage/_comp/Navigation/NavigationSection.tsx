import { useTranslation } from 'react-i18next';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import NavigationCard from './_comp/NavigationCard';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';

export default function NavigationSection() {
	//  hooks
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { xs } = useResponsive();

	const array = [...Array(3)];
	return (
		<div className='flex-col-global'>
			{!xs && (
				<div>
					<Button
						onClick={() => navigate('AddNavigation')}
						variant='primary'
						LeftIcon={IoIosAddCircle}
					>
						{t('Add Page')}
					</Button>
				</div>
			)}

			<hr />
			<div className='flex-col-global'>
				{array?.map((e, i) => (
					<NavigationCard key={i} title='Main menu' sub_title1='About' sub_title2='home' id='1' />
				))}
			</div>
			{xs && <AddButtonMobile path='AddNavigation' />}
		</div>
	);
}
