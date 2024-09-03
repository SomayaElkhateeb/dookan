import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, LabelIcon, SubHeader } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';

import data from './data.json';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import { nanoid } from 'nanoid';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { RemoveIcon } from 'src/app/utils/icons';

interface SocialAppData {
	name: string;
	image: string;
	description: string;
	videoUrl: string;
	features: { title: string; description: string }[];
	posters?: { [key: string]: string };
	backgroundColor: [string, string];
	status: 'free' | 'installed';
	mostPopular?: boolean;
}
const SocialAppDetails: React.FC = () => {
	const { platform } = useParams<string>();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { selectedOption, handleSelect } = useSelectBox();
	const [socialPlatform, setSocialPlatform] = useState<SocialAppData | null>(null);

	const SubMenu = [
		{
			id: nanoid(),
			text: t('Uninstall'),
			icon: <RemoveIcon className='iconClass' />,
		},
	];
	useEffect(() => {
		const fetchSocialPlatformContent = () => {
			const content = data.apps[platform];
			setSocialPlatform(content);
		};
		fetchSocialPlatformContent();
	}, [platform]);

	if (!socialPlatform) {
		return <div>Loading...</div>;
	}

	const { name, image, description, videoUrl, posters, features, backgroundColor, status } =
		socialPlatform;
	const [fColor, sColor] = backgroundColor;

	let bgColor, textColor;
	switch (status) {
		case 'free':
			bgColor = '#EEF9F5';
			textColor = '#49A882';
			break;
		case 'installed':
			bgColor = '#F3F7FF';
			textColor = '#0B47D9';
			break;
		default:
			bgColor = 'gray';
			textColor = 'black';
			break;
	}

	return (
		<div className='flex flex-col gap-6'>
			<SubHeader title={name}>
				<ThreeDotsButton
					sortMenus={SubMenu}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
				<Button variant='secondary' onClick={() => navigate(`/marketing/${name}/${name}-setup`)}>
					{t('open setup')}
				</Button>
			</SubHeader>

			{/*  poster */}
			<div
				style={{
					backgroundImage: `linear-gradient(313.9deg, ${fColor} -2.74%, ${sColor} 140.56%)`,
				}}
				className='p-5 flex justify-between h-[11.25rem]'
			>
				<div className='flex gap-4 items-center'>
					<div className='size-[120px] global-cards'>
						<img src={getImageUrl(image)} alt={name} className='w-full h-full' />
					</div>
					<div className='max-w-[450px] text-white flex flex-col justify-between h-full py-2'>
						<h2 className='capitalize font-semibold text-lg'>{name}</h2>
						<p className='text-sm leading-6'>{description}</p>
						<div className='flex'>
							<LabelIcon
								text={status}
								backgroundColor={bgColor}
								textColor={textColor}
								icon={status === 'installed' ? <FaCheck size={10} color='#0B47D9' /> : null}
							/>
						</div>
					</div>
				</div>

				<div className='hidden lg:block'>
					<iframe width='384' height='216' src={videoUrl} title={name} allowFullScreen />
				</div>
			</div>

			<div className='custom_container flex flex-col gap-6'>
				<FeatureList features={features} />
				<PosterList posters={posters} />
			</div>
		</div>
	);
};

export default SocialAppDetails;

interface Feature {
	title: string;
	description: string;
}

interface Poster {
	[key: string]: string;
}

interface FeatureListProps {
	features: Feature[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
	<div className='flex flex-col gap-4 w-[90%] md:w-[50%]'>
		{features.map((feature, index) => (
			<div key={index}>
				<h2 className='title font-semibold'>{feature.title}</h2>
				<p className=' text-pri-dark'>{feature.description}</p>
			</div>
		))}
	</div>
);

const PosterList: React.FC<{ posters?: Poster }> = ({ posters }) => (
	<div className='flex flex-wrap justify-between gap-4'>
		{posters ? (
			<div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{Object.entries(posters).map(([key, value]) => (
					<div key={key}>
						<img src={getImageUrl(value)} alt={key} className=' w-full h-full' />
					</div>
				))}
			</div>
		) : (
			<div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{[...Array(4)].map((_, index) => (
					<div key={index} className='col-span-1 bg-gray-200 w-[450px] h-[250px]'></div>
				))}
			</div>
		)}
	</div>
);
