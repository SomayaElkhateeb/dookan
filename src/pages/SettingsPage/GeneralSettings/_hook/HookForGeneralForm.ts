import { z } from "zod";

export interface GeneralSettingsInterface {
    general: {
        settings: {
            store: {
                name: string;
                email: string;
                industry: string;
                phone: string;
            },
            media: {
                logo: File;
                icon: File;
            },
            social: {
                links: {
                    facebook: string;
                    instagram: string;
                    twitter: string;
                    youtube: string;
                }
            },
            legal: {
                type: string;
                national_id: string;
                national_image: File;
                commercial_no?: number;
                commercial_image?: File |null;
            }
        },
    },
    someke: {
        key: string;
    }
}

export default function useCustomHookGeneralForm() {

    const handelDefaultValue = () => {
        return {
            general: {
                settings: {
                    store: {
                        name: '',
                        email: '',
                        industry: '',
                        phone: '',
                    },
                    media: {
                        logo: undefined,
                        icon: undefined,
                    },
                    social: {
                        links: {
                            facebook: '',
                            instagram: '',
                            twitter: '',
                            youtube: '',
                        }
                    },
                    legal: {
                        type: 'individual', // single choice
                        national_id: '',
                        national_image: undefined,
                        commercial_no: 0,
                        commercial_image: undefined,
                    }
                }
            },
            someke: {
                key: '',
            }
        };
    };

    const zodString = z.string().min(1);
    const generalSettingsSchema = {
        general: z.object({
            settings: z.object({
                store: z.object({
                    name: zodString,
                    email: zodString.email(),
                    industry: zodString,
                    phone: zodString,
                }),
                media: z.object({
                    logo: z.instanceof(File),
                    icon: z.instanceof(File),
                }),
                social: z.object({
                    links: z.object({
                        facebook: z.string().url(),
                        instagram: z.string().url(),
                        twitter: z.string().url(),
                        youtube: z.string().url(),
                    })
                }),
                legal: z.object({
                    type: zodString,
                    national_id: zodString,
                    national_image: z.instanceof(File).nullable(),
                    commercial_no: z.coerce.number().optional(),
                    commercial_image: z.instanceof(File).optional(),
                })
            }),
        }),
        someke: z.object({
            key: z.string(),
        })
    };

    return {
        generalSettingsSchema,
        handelDefaultValue
    };
}
