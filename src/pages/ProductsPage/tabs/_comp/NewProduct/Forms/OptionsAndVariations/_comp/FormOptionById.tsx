import { GlobalDialog } from 'src/app/components/shared';

interface FormOptionByIdProps {
    handleClose: () => void;
    openFormById: boolean;
    selectedOptionId: number | null;
    selectedOptionName: string | null;
}

const FormOptionById = ({
    handleClose,
    openFormById,
    selectedOptionId,
    selectedOptionName,
}: FormOptionByIdProps) => {
    console.log('Selected Option ID:', selectedOptionId);
    console.log('Selected Option Name:', selectedOptionName);

    const dialogStyle = {
        width: { lg: '50%', md: '70%', xs: '90%' },
        height: { md: '350px', xs: '350px' },
    };

    return (
        <GlobalDialog openDialog={openFormById} handleClose={handleClose} style={dialogStyle}>
            {selectedOptionId && (
                <div className="p-4">
                    <p>Selected Option ID: {selectedOptionId}</p>
                    <p>Selected Option Name: {selectedOptionName}</p>
                </div>
            )}
        </GlobalDialog>
    );
};

export default FormOptionById;

