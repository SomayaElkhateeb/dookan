import { z } from 'zod';

export const productSeoSchema = {
	page_title: z.string().min(3).max(70),
	meta_title:z.string().min(3).max(70),
	meta_description: z.string().min(3).max(160),
	
	en:z.object({
		meta_keywords:z.string().min(3).max(70)
	}),
	ar:z.object({
		meta_keywords:z.string().min(3).max(70)
	}),
};

// Define default values for the schema
export const productSeoDefaultValues = {
	page_title: '',
	meta_title:'',
	// metaKeywords: [],
	meta_description: '',
	en:{
		meta_keywords:'',
	},
	ar:{
		meta_keywords:'',
	},
};
