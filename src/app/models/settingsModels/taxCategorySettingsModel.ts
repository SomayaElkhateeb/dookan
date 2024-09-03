
import { statusGlobal } from "..";
import { TaxCategory } from "src/pages/SettingsPage/Taxes/taxCategories/_hook/HookTaxCategories";

export const handelDefaultValue = () => {
	return {
		cod: '',
		name: '',
		description: '',
		taxrates: []
	};
};

type HandelTaxCategoryType = ReturnType<typeof handelDefaultValue>;


export interface taxCategoriesSettingsSliceModel extends statusGlobal {
	taxCategoriesList: TaxCategory[];
	taxCategoriesShow: HandelTaxCategoryType;

}
