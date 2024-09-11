import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { productBasicInfoSchema } from './utils';
import { ValidFormStoreByValues } from 'src/utils/types';

export type Values = InferredZodSchema<typeof productBasicInfoSchema>;

export type Props<TFormStore> = {
	formStore: ValidFormStoreByValues<TFormStore, Values>;
	id?: string;
};
