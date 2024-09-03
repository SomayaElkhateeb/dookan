import { nanoid } from "nanoid";
import FilterButton from "src/app/components/optimized/Buttons/FilterButton"
import SearchInput from "src/app/components/ui/form/SearchInput"
const HeaderTaxCategories = ({
    handleSelect,
    selectedOption,
    setSearchQuery
}: {
    handleSelect: (e: string) => void;
    selectedOption: string;
    setSearchQuery: (query: string) => void;
}) => {
    const sortMenus = [
        { id: nanoid(), text: 'Name A to Z' },
        { id: nanoid(), text: 'Name Z to A' },
    ];

    return (
        <div className='md:flex-row-global flex-col-global justify-between w-full '>
            <SearchInput setSearchQuery={setSearchQuery} />
            <div className='flex-row-global gap-3'>
                <FilterButton
                    sortMenus={sortMenus}
                    selectedOption={selectedOption}
                    handelSelect={handleSelect}
                />
            </div>
        </div>
    )
}

export default HeaderTaxCategories
