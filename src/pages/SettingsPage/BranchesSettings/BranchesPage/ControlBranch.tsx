import ActionHandlerImportSheet from 'src/app/utils/ActionHandlerImportSheet';
import SearchInput from 'src/app/components/ui/form/SearchInput';
import ActionHandler from 'src/app/utils/ActionMethods';
import { ExportIcon, ImportIcon } from 'src/app/utils/icons';
import { useRef, useState } from 'react';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import { BranchInterface } from 'src/app/interface/BranchInterface';

const ControlBranch = ({
	filteredBranch,
	setSearchQuery,
}: {
	filteredBranch: BranchInterface[];
	setSearchQuery: (query: string) => void;
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [importedData, setImportedData] = useState<any[]>([]);
	const { t } = useTranslation();

	// export data
	const handleExportFile = () => {
		ActionHandler.exportToExcel(filteredBranch, 'branch.xlsx');
	};

	// import data
	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			try {
				const data = await ActionHandlerImportSheet.importFromExcel(file);
				setImportedData(data);
				
			} catch (error) {
				console.error('Error importing Excel file:', error);
			}
		}
	};

	const triggerFileUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='px-5'>
			<div className='md:flex-row-global flex-col-global justify-between w-full py-5'>
				<SearchInput setSearchQuery={setSearchQuery} />
				<div className='flex-row-global gap-3'>
					<Button onClick={handleExportFile} variant='secondary' LeftIcon={ExportIcon}>
						{t('Export')}
					</Button>
					<Button onClick={triggerFileUpload} variant='secondary' className='py-0'>
						<div className='flex items-center gap-2'>
							<ImportIcon className='mb-2' />
							<p>{t('Import')}</p>
						</div>
					</Button>
				</div>
			</div>
			<hr />

			<input
				type='file'
				accept='.xlsx, .xls'
				ref={fileInputRef}
				onChange={handleFileUpload}
				style={{ display: 'none' }}
			/>
		</div>
	);
};

export default ControlBranch;
