import MainApi from "../api/MainApi";

export const CountriesApi = {
	countries: () => {
		return MainApi.get(
			'merchant/settings/countries',
		);
	},
	cities: (id: string) => {
		 return id&& MainApi.get(
			`settings/country/${id}/states`,
		);
	},




};
