import { useTranslation } from 'react-i18next';
import { Button, ClientBox } from 'src/app/components/optimized';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';
import { FaCheck } from 'react-icons/fa6';
import ConversationCard from 'src/app/components/optimized/Cards/ConversationCard';
import { useState } from 'react';

export default function SuccessfullyPurchased() {
	const [showChat, setShowChat] = useState(false);
	const { t } = useTranslation();
	return (
		<>
			<div className='flex-row-global justify-center  h-screen '>
				<div className='flex-col-global  gap-12 md:w-[50%] '>
					{/* card */}
					<div className=' global-cards gap-[.3rem] w-[24rem] mx-auto relative'>
						<ClientBox
							avatar={<Avatar variant='user' firstName='Samy' lastName='Ryan' size='lg' />}
							title='Samy Ryan'
							details='Identity designer'
						/>
						<p className='title font-normal text-sm'>{t("Let's generate sales")}</p>
						<div className='size-[3.5rem] bg-secondary rounded-full absolute left-[42%] -bottom-[35%] shadow-lg flex justify-center items-center'>
							<FaCheck color='white' size='20' />
						</div>
					</div>
					{/* title */}
					<div className='px-5'>
						<h2 className='text-title text-[1.375rem] font-semibold text-center '>
							{t('Service is successfully purchased')}
						</h2>
						<p className='text-subtitle text-sm  text-center'>
							Samy is supposed to reply to you in 2 business days at most, you can save the hassle
							and send him any message or question
						</p>
					</div>
					{/* button */}
					<div className='mx-auto'>
						<Button className='text-sm' variant='primary' onClick={() => setShowChat(true)}>
							{t('send message')}
						</Button>
					</div>
					{showChat && <ConversationCard onClose={() => setShowChat(false)} showChat={showChat} />}
				</div>
			</div>
		</>
	);
}
