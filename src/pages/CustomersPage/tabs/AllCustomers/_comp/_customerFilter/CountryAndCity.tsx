import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CountriesInterface } from 'src/app/interface/CountriesInterface';

const CountryAndCity = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
    //  hooks
    const { t } = useTranslation();

    //  get CountriesData  with api request
    const { data: countriesData } = useQuery(['countriesData'], () => CountriesApi.countries());

    const CountryId = formStore.getValues('country_id') || '';
    const { data: citiesData } = useQuery(['city_id', CountryId], () => {
        if (CountryId) {
            return CountriesApi.cities(CountryId);
        }
        return Promise.resolve(null);
    }, {
        enabled: !!CountryId
    });

    const countries = countriesData?.data?.data || [];
    const cities = citiesData?.data?.data || [];

    return (
        <DropDownMenu title={t('Country & City')}>
            {countries?.length > 0 && (
                <SelectFormField
                    name='country_id'
                    label={t('Country')}
                    formStore={formStore}
                    options={countries.map((e: CountriesInterface) => ({
                        label: e.name,
                        value: e.id.toString(),
                    }))}
                    placeholder={t('Select country')}
                />
            )}

            {/* {cities?.length > 0 && (
                <SelectFormField
                    name='city_id'
                    label={t('City')}
                    formStore={formStore}
                    options={cities.map((e: CountriesInterface) => ({
                        label: e.name,
                        value: e.id.toString(),
                    }))}
                    placeholder={t('Select city')}
                />
            )} */}
        </DropDownMenu>
    )
}

export default CountryAndCity;
