import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from 'src/app/React-Query/authApi';
import { useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';

export interface IdentifierFormProps {
    setStep: (step: number) => void;
    onIdentifierChange: (identifier: string) => void;
    setEmail: (e: string) => void;
}

const schemas = {
    emailOrPhone: z.string().min(1, { message: 'Input is required' }),
};

export default function useIdentifierForm({
    setStep,
    onIdentifierChange,
    setEmail,
}: IdentifierFormProps) {
    const navigate = useNavigate();
    const { mutate, isLoading, error } = useMutation(AuthApi.getDomain);

    const { formStore, onSubmit } = useForm({
        schema: schemas,
        handleSubmit: (values: { emailOrPhone: string }) => {
            const loginData = {
                email: values.emailOrPhone, // Ensure you use the correct key
            };

            console.log('loginData', loginData);

            mutate(loginData, {
                onSuccess: (response) => {
                    setEmail(values.emailOrPhone);
                    if (response.status === 200) {
                        setStep(2);
                    } else {
                        navigate('/register');
                    }
                    console.log('Success:', response);
                },
                onError: (error) => {
                    console.error('Error:', error);
                },
            });
        },
        defaultValues: { emailOrPhone: '' },
    });

    useEffect(() => {
        const subscription = formStore.watch((value) => {
            const emailOrPhoneValue = value.emailOrPhone ?? '';
            onIdentifierChange(emailOrPhoneValue);
        });
        return () => subscription.unsubscribe();
    }, [formStore, onIdentifierChange]);

    return { formStore, onSubmit, isLoading, error };
}



// import { useEffect } from 'react';
// import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import { AuthApi } from 'src/app/React-Query/authApi';
// import { useForm } from 'src/app/utils/hooks/form';
// import { z } from 'zod';

// export interface IdentifierFormProps {
// 	setStep: (step: number) => void;
// 	onIdentifierChange: (Identifier: string) => void;
// 	setEmail: (e: string) => void;
// }

// const schemas = {
// 	emailOrPhone: z.string().min(1, { message: 'Input is required' }),
// };
// export default function useIdentifierForm({
// 	setStep,
// 	onIdentifierChange,
// 	setEmail,
// }: IdentifierFormProps) {
// 	const dispatch = useAppDispatch();
// 	const { subdomain } = useAppSelector((state) => state.subdomains);

// 	console.log('subdomains', subdomain);

// 	const { formStore, onSubmit } = useForm({
// 		schema: schemas,
// 		handleSubmit: (values: { emailOrPhone: string }) => {
// 			dispatch(getSubdomain(values.emailOrPhone));
// 			setEmail(values.emailOrPhone);
// 			// setStep(2);
// 		},
// 		defaultValues: { emailOrPhone: '' },
// 	});

// 	useEffect(() => {
// 		const subscription = formStore.watch((value) => {
// 			const emailOrPhoneValue = value.emailOrPhone ?? '';
// 			onIdentifierChange(emailOrPhoneValue);
// 		});
// 		return () => subscription.unsubscribe();
// 	}, [formStore, onIdentifierChange]);

// 	return { formStore, onSubmit };
// }




// import { useEffect } from 'react';
// import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import { AuthApi } from 'src/app/React-Query/authApi';
// import { useAppDispatch, useAppSelector } from 'src/app/store';
// import { getSubdomain } from 'src/app/store/slices/subdomains/subdomainAsyncThunks';
// import { useForm } from 'src/app/utils/hooks/form';
// import { z } from 'zod';

// export interface IdentifierFormProps {
// 	setStep: (step: number) => void;
// 	onIdentifierChange: (Identifier: string) => void;
// 	setEmail: (e: string) => void;
// }

// const schemas = {
// 	emailOrPhone: z.string().min(1, { message: 'Input is required' }),
// };

// export default function useIdentifierForm({
// 	setStep,
// 	onIdentifierChange,
// 	setEmail,
// }: IdentifierFormProps) {
// 	const navigate = useNavigate();


// 	const { mutate, isLoading, error } = useMutation(AuthApi.getDomain, {
// 		onSuccess: (response) => {
// 			if (response.status === 200) {
// 				setStep(2);
// 				setEmail(response.data.email); 
// 			} else {
// 				navigate('/register'); 
// 			}
// 		},
// 		onError: (error) => {
// 			console.error('Error fetching domain:', error); 
// 		},
// 	});

// 	const { formStore, onSubmit } = useForm({
// 		schema: schemas,
// 		handleSubmit: (values: { emailOrPhone: string }) => {
// 			const loginData = { identifier: values.emailOrPhone };
// 			mutate(loginData);
// 		},
// 		defaultValues: { emailOrPhone: '' },
// 	});

// 	useEffect(() => {
// 		const emailOrPhoneValue = formStore.getValues('emailOrPhone');
// 		if (emailOrPhoneValue) {
// 			dispatch(getSubdomain(emailOrPhoneValue));
// 		}
// 	}, [dispatch, formStore]);

// 	useEffect(() => {
// 		const subscription = formStore.watch((value) => {
// 			const emailOrPhoneValue = value.emailOrPhone ?? '';
// 			onIdentifierChange(emailOrPhoneValue);
// 		});
// 		return () => subscription.unsubscribe();
// 	}, [formStore, onIdentifierChange]);

// 	return { formStore, onSubmit, isLoading, error };
// }



// const { formStore, onSubmit } = useForm({
// 	schema: schemas,
// 	handleSubmit: (values: { emailOrPhone: string }) => {
// 		const loginData = {
// 			identifier: values.emailOrPhone,
// 		};
// console.log('kk', loginData)
// 		mutate(loginData, {
// 			onSuccess: (response) => {
// 				setEmail(values.emailOrPhone);
// 				if (response.status === 200) {
// 					setStep(2);
// 				} else {
// 					navigate('/register');
// 				}
// 				console.log('Success:', response);
// 			},
// 			onError: (error) => {
// 				console.error('Error:', error);
// 			},
// 		});
// 	},
// 	defaultValues: { emailOrPhone: '' },
// });
