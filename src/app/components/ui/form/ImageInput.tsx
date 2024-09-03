import React from 'react';
import FileInput from '../file-input';

import { UseFormReturn, Path, FieldValues, PathValue } from 'react-hook-form';
import FormField from './field';
interface ImageInputProps<T extends FieldValues> {
	formStore: UseFormReturn<T>;
	name: Path<T>;
	children: React.ReactNode;
}
export default function ImageInput<T extends FieldValues>({
	children,

	formStore,
	name,
}: ImageInputProps<T>) {
	const onImageSubmit = (option: File) => {
		formStore.setValue(name, option as PathValue<T, Path<T>>);
		formStore.setError(name, { message: '', type: 'drop-rejected' });
	};
	return (
		<FormField
			formStore={formStore}
			name={name}
			render={(field) => (
				<FileInput id={field.name} onImageSubmit={onImageSubmit}>
					{children}
				</FileInput>
			)}
		/>
	);
}
