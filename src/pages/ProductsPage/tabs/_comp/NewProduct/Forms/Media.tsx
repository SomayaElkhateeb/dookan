import { useTranslation } from 'react-i18next';
import TabsBuilder, { TabsBuilderItem } from 'src/app/components/shared/builders/Tabs';
import { Card, CardContent } from 'src/app/components/ui/card';
import FileInput, { getDefaultFileInputOptions } from 'src/app/components/ui/file-input';
import FormField from 'src/app/components/ui/form/field';
import { TfiUpload } from 'react-icons/tfi';
import { ProductFormStore } from '../Pages/Configurable/types';

interface FileElemProps {
	formStore: ProductFormStore;
	name: 'videoMedia' | 'threeDModelMedia' | 'threeSixtyViewMedia';
	accept: { [key: string]: string[] };
	title: React.ReactNode;
}

interface ImagesElemProps {
	formStore: ProductFormStore;
}

function ImagesElem({ formStore }: ImagesElemProps) {
	const { t } = useTranslation();

	return (
		<FormField
			formStore={formStore}
			name='imagesMedia'
			render={({ onChange, value, ...field }) => (
				<FileInput
					className='flex flex-col items-center justify-center h-32 gap-2'
					{...field}
					options={getDefaultFileInputOptions({
						accept: { 'image/*': [] },
						setError: (error) => {
							formStore.setError('imagesMedia', { message: error.message });
						},
						onFileLoad: (params) => {
							onChange([...value, params.file]);
						},
					})}
				>
					<div className='flex flex-col items-center'>
						<TfiUpload className='text-4xl mb-2' />
						<p className='text-title'>
							<strong>{t('Upload Images')}</strong>
						</p>
						<p className='text-subtitle'>{t('Or just drag and drop')}</p>
					</div>
				</FileInput>
			)}
		/>
	);
}

function FileElem({ formStore, name, accept, title }: FileElemProps) {
	const { t } = useTranslation();
	return (
		<FormField
			formStore={formStore}
			name={name}
			render={({ onChange, value, ...field }) => (
				<FileInput
					className='flex flex-col items-center justify-center h-32 gap-2'
					{...field}
					options={getDefaultFileInputOptions({
						accept,
						setError: (error) => {
							formStore.setError(name, { message: error.message });
						},
						onFileLoad: (params) => {
							onChange(params.file);
						},
					})}
				>
					<TfiUpload />
					<div className='text-center'>
						<p className='text-title'>
							<strong>{title}</strong>
						</p>
						<p className='text-subtitle'>{t('Or just drag and drop')}</p>
					</div>
				</FileInput>
			)}
		/>
	);
}

const tabsItems: TabsBuilderItem<{ formStore: ProductFormStore }>[] = [
	{
		title: 'Images',
		Elem: ({ formStore }) => <ImagesElem formStore={formStore} />,
	},
	{
		title: 'Video',
		Elem: ({ formStore }) => {
			const { t } = useTranslation();
			return (
				<FileElem
					formStore={formStore}
					name='videoMedia'
					accept={{ 'video/*': [] }}
					title={t('Upload Video')}
				/>
			);
		},
	},
	{
		title: '360o View',
		Elem: ({ formStore }) => {
			const { t } = useTranslation();
			return (
				<FileElem
					formStore={formStore}
					name='threeSixtyViewMedia'
					accept={{
						'image/*': ['.jpg', '.jpeg', '.png'],
						'video/*': ['.mp4', '.webm'],
					}}
					title={
						<>
							{t('Upload 360')}
							<sup>o</sup> {t('View')}
						</>
					}
				/>
			);
		},
		isInProgress: true,
	},
	{
		title: '3D View',
		Elem: ({ formStore }) => {
			const { t } = useTranslation();
			return (
				<FileElem
					formStore={formStore}
					name='threeDModelMedia'
					accept={{ '': ['.obj', '.stl', '.fbx', '.glb', '.gltf', '.dae'] }}
					title={t('Upload 3D View')}
				/>
			);
		},
		isInProgress: true,
	},
];

interface ProductFormMediaSectionProps {
	formStore: ProductFormStore;
	id?: string;
}

export default function ProductFormMediaSection({ formStore, id }: ProductFormMediaSectionProps) {
	return (
		<Card id={id}>
			<CardContent>
				<TabsBuilder items={tabsItems} sharedProps={{ formStore }} />
			</CardContent>
		</Card>
	);
}
