import React from 'react';
import { Button } from 'src/app/components/optimized';
import { FaArrowRight } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';

const TikTokBusiness: React.FC = () => {
	return (
		<div className='max-w-lg bg-red-600'>
			<div className='flex space-y-4  justify-between items-center'>
				<div className='text-2xl font-bold '>Tik Tok: For Business</div>
				<div className='flex items-center  space-x-2'>
					<Avatar
						alt='Remy Sharp'
						src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
					/>

					<div className='text-left flex flex-col items-start'>
						<p className='text-xl text-center'>partner</p>
						<p className='text-gray-500 text-center'>6969233747830227970</p>
					</div>
				</div>
			</div>
			<div className='w-full  bg-white rounded-lg shadow-md p-4 text-center'>
				<div className='flex flex-col items-center m-auto text-center mt-8 border-b'>
					<div className='flex items-center justify-between'>
						<img
							className='w-20 h-20'
							src='https://www.freepnglogos.com/uploads/shopify-logo-png/shopify-logo-icon-png-8.png'
							alt='TikTok Logo'
						/>
						<span className='ms-6'>
							<FaArrowRight />
						</span>
						<img
							className='w-32 h-20'
							src='https://www.freepnglogos.com/uploads/tik-tok-logo-png/tik-tok-how-use-tiktok-create-cool-videos-with-iphone-14.png'
							alt='TikTok Logo'
						/>
					</div>

					<div className='mt-4 text-center my-3'>Connect to Shopify?</div>
				</div>
				<div className='flex flex-row justify-between mt-4 space-x-4'>
					<Button className='bg-gray-200 text-black hover:bg-green-600 text-base'>Cancel</Button>
					<Button className='bg-[#23457E] hover:bg-[#2E5BA6] text-base'>Connect</Button>
				</div>
			</div>
		</div>
	);
};

export default TikTokBusiness;
