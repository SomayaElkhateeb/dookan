import { useEffect, useState } from 'react';

export default function useLanguage() {
	const [language, setLanguage] = useState(() => {
		return localStorage.getItem('language') || 'en';
	});

	useEffect(() => {
		localStorage.setItem('language', language);
	}, [language]);

	const toggleLanguage = () => {
		const newLanguage = language === 'ar' ? 'en' : 'ar';
		setLanguage(newLanguage);
		window.location.reload();
	};

	return { language, toggleLanguage };
}
