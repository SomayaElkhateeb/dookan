import { ChangeEvent, useState } from 'react';
import ImageCard from '../optimized/Cards/ImageCard';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';

export function getDefaultFileInputOptions({ setError, onFileLoad, ...params }) {
	return {
		onError: (error) => setError({ message: error.message, type: 'error' }),
		onDropRejected: (rejectedFiles) => {
			setError({ message: 'file is not supported', type: 'drop-rejected' });
		},
		onDrop: (acceptedFiles) => {
			acceptedFiles.forEach((file) => {
				const reader = new FileReader();

				reader.onabort = () => setError({ message: 'file reading was aborted', type: 'abort' });
				reader.onerror = () => setError({ message: 'file reading has failed', type: 'file-error' });
				reader.onload = () => {
					onFileLoad({ file, reader });
				};
				reader.readAsArrayBuffer(file);
			});
		},
		multiple: false,
		...params,
	};
}

type Props = {
	// error: string;
	onImageSubmit: (file: File) => void;
	children: React.ReactNode;
	label?: string;
	id: string;
};

const FileInput = ({ onImageSubmit, children, label, id }: Props) => {
	const [preview, setPreview] = useState<string>('');

	const onImageSelected = (e: ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files || !e.target.files[0]) {
			return;
		}

		const imageFile = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === FileReader.DONE) {
				setPreview(reader.result as string);
				onImageSubmit(imageFile);
			}
		};

		reader.readAsDataURL(imageFile);
	};

	return (
		<div className='flex-col-global'>
			{label && <p className='title'>{label}</p>}
			<div className='flex-row-global w-[6.25rem] h-[6.25rem] '>
				<input
					accept='image/*'
					id={id}
					onChange={onImageSelected}
					type='file'
					name='photo'
					hidden
				/>
				<label
					htmlFor={id}
					className='cursor-pointer flex-row-global h-full w-full rounded-sm border-2 border-dashed'
				>
					{preview ? (
						<ImageCard preview={preview} />
					) : (
						<div className='flex-col-global items-center justify-center w-full h-full'>
							{children}
						</div>
					)}
				</label>
			</div>
			
		</div>
	);
};

export default FileInput;
