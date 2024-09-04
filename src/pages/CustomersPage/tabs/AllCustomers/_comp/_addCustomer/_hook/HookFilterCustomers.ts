import { z } from 'zod';

const isNotPastDate = (value: string | null | undefined) => {
    if (!value) return true;

    const today = new Date();
    const inputDate = new Date(value);

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate >= today;
};

export interface CustomersFilter {
    sort: string;
    // order: number;
    date_from?: string;
    date_to?: string;
    country_id?: string;
    // city_id?: string;
    gender?: string;
    customer_group_id?: string;
    per_page?: string;
    email?: string;
}



export default function useCustomersFilter() {
    const handelDefaultValue = () => {
        return {
            sort:'',
            // order: '',
            date_from: '',
            date_to: '',
            country_id: '',
            // city_id: '',
            gender: '',
            customer_group_id: '',
            per_page: '',
            email: '',
        };
    };

    const CustomersFilterSchema = {
        sort: z.string().optional(),
        // order: z.number().optional(),
        date_from: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'Date must be in the format YYYY-MM-DD',
        }).refine(isNotPastDate, {
            message: 'Date cannot be in the past',
        }).optional(),
        date_to: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'Date must be in the format YYYY-MM-DD',
        }).optional(),
        country_id: z.string().optional(),
        // city_id: z.string().min(1).optional(),
        gender: z.string().min(1).optional(),
        customer_group_id: z.string().min(1).optional(),
        per_page: z.string().min(1).optional(),
        email: z.string().min(1).optional(),
    };

    return {
        handelDefaultValue,
        CustomersFilterSchema,
    };
}
