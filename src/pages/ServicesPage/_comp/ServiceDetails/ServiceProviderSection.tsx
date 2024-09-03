import Avatar from 'src/app/components/optimized/UiKits/Avatar';

export default function ServiceProviderSection() {
	const parentDivclassName = 'flex-col-global gap-[.2rem]';
	const titleClassName = 'text-title text-[.9rem] font-semibold';
	const subTitleClassName = 'text-subtitle text-[.7rem]';

	return (
		<div className='global-cards p-[1rem]'>
			<div className='flex-col-global gap-[1.2rem]'>
				<div className='flex-col-global gap-[.9rem]'>
					<p className='text-[.8rem] text-subtitle'>Service provider</p>
					<div className='bg-success flex-row-global  justify-center text-white  text-[.8rem] w-[9rem] h-[1.4rem] rounded'>
						Online 2 hours ago
					</div>
					<div className='flex-row-global justify-start gap-[.3rem]'>
						<Avatar
							variant='user'
							firstName='Samy'
							lastName='Ryan'
							imageUrl='Services/avatar.svg'
						/>
						<div className='flex-col-global gap-[.1rem]'>
							<p className={titleClassName}>Samy Ryan</p>
							<p className={subTitleClassName}>Identity designer</p>
						</div>
					</div>
				</div>

				<div className='flex-row-global justify-between'>
					<div className={parentDivclassName}>
						<p className={subTitleClassName}>Completed services</p>
						<p className={titleClassName}>24</p>
					</div>

					<div className={parentDivclassName}>
						<p className={subTitleClassName}>Experience</p>
						<p className={titleClassName}>Experienced</p>
					</div>
				</div>
			</div>
		</div>
	);
}
