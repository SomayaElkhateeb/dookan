import { z } from 'zod';
import { selectItemsInterface } from '../../../../CustomersPage/tabs/AllCustomers/_comp/_addCustomer/_comp/GeneralInfoCustomerForm';

export interface addPageInterface {
	pageTitle: string;
	link: string;
	metaKey: string;
	metaDescription: string;
	titleEn: string;
	titleAr: string;
	descriptionEn: string;
	descriptionAr: string;
	image?: File;
	Metakeywords: selectItemsInterface[];
}

export default function useCustomHookAddBlogOrPage(addblog?: boolean) {
	const handelDefaultValue = () => {
		return {
			pageTitle: '',
			link: '',
			metaKey: '',
			metaDescription: '',
			titleEn: '',
			titleAr: '',
			descriptionEn: '',
			descriptionAr: '',
			image: undefined,
			Metakeywords: [],
		};
	};
	// //////////////////////////////////////////
	const pageSchema = {
		pageTitle: z.string().min(3, { message: 'Page title is required' }),
		link: z.string().url(),
		metaKey: z.string(),
		metaDescription: z.string().min(7, { message: 'Meta description is required' }),
		titleEn: z.string().min(3).max(50),
		titleAr: z.string().min(3).max(50),
		descriptionEn: z.string().min(10).max(200),
		descriptionAr: z.string().min(10).max(200),
		image: addblog ? z.instanceof(File) : z.optional(z.instanceof(File)),
		Metakeywords: z.array(
			z.object({
				id: z.string().min(1),
				name: z.string().min(1),
			}),
		),
	};

	return {
		pageSchema,
		handelDefaultValue,
	};
}
