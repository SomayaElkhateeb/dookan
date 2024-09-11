import { z } from 'zod';

// Define the FAQ schema
export const faqRawSchema = z.object({
	tempId: z.string(),
	questionEn: z.string().min(3).max(100),
	questionAr: z.string().min(3).max(100),
	answerEn: z.string().min(3).max(1000),
	answerAr: z.string().min(3).max(1000),
});

// Define the Product FAQs schema
export const productFaqsSchema = z.object({
	faqs: z.array(faqRawSchema),
});

// Define default values for the schema
export const productFaqsDefaultValues = {
	faqs: [],
};
